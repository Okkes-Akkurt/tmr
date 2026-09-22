"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { createServiceClient } from "@/lib/supabase/server";
import { serviceById } from "@/lib/services";

export type LeadState = { status: "idle" | "ok" | "error"; code?: "invalid" | "rate" | "server"; fields?: string[]; phone?: string };

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

/** Telefonu +<ülke kodu><numara> biçimine çevirir; geçersizse null döner. */
function normalizePhone(raw: string): string | null {
  const s = raw.trim();
  if (!/^[+\d\s().-]+$/.test(s)) return null;
  let d = s.replace(/\D/g, "");
  if (s.startsWith("+")) {
    // uluslararası biçim, olduğu gibi
  } else if (s.startsWith("00")) {
    d = d.slice(2);
  } else if (d.length === 11 && d.startsWith("0")) {
    d = "90" + d.slice(1);           // Türkiye: 0532..., 0216...
  } else if (d.length === 10 && /^[2-5]/.test(d)) {
    d = "90" + d;                    // Türkiye: 532... (başında 0 yok)
  } else {
    return null;                     // ülke kodu olmayan yabancı numara belirsiz
  }
  return d.length >= 8 && d.length <= 15 ? "+" + d : null;
}

export async function submitLead(_prev: LeadState, form: FormData): Promise<LeadState> {
  // Bot tuzakları: görünmez alan doldurulmuşsa veya form 3 saniyeden kısa sürede gönderildiyse sessizce "başarılı" dön.
  if (clean(form.get("website"), 200)) return { status: "ok" };
  const started = Number(form.get("t") || 0);
  if (started && Date.now() - started < 3000) return { status: "ok" };

  const v = {
    name: clean(form.get("name"), 120),
    phone: clean(form.get("phone"), 40),
    email: clean(form.get("email"), 200),
    company: clean(form.get("company"), 200),
    location: clean(form.get("location"), 200),
    message: clean(form.get("message"), 4000),
    lang: clean(form.get("lang"), 2) === "en" ? "en" : "tr",
  };
  const serviceRaw = clean(form.get("service"), 10);
  const service = serviceRaw === "diger" ? "Diğer / birden fazla iş kalemi" : serviceById(serviceRaw)?.tr.t ?? null;

    const phone = normalizePhone(v.phone);
    const fields: string[] = [];
    if (v.name.length < 2) fields.push('name');
    if (!phone) fields.push('phone');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) fields.push('email');
    if (v.company.length < 2) fields.push('company');
    if (!service) fields.push('service');
    if (v.location.length < 2) fields.push('location');
    if (v.message.length < 10) fields.push('message');
    if (form.get('kvkk') !== 'on') fields.push('kvkk');
    if (fields.length) return { status: 'error', code: 'invalid', fields };

  try {
    const h = await headers();
    const ip = (h.get("x-forwarded-for") || h.get("x-real-ip") || "").split(",")[0].trim();
    const ip_hash = ip ? createHash("sha256").update(ip + (process.env.LEAD_HASH_SALT || "")).digest("hex").slice(0, 32) : null;
    const sb = createServiceClient();

    // Basit hız sınırı: aynı IP'den 15 dakikada en fazla 5 talep
    if (ip_hash) {
      const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
      const { count } = await sb.from("leads").select("id", { count: "exact", head: true }).eq("ip_hash", ip_hash).gte("created_at", since);
      if ((count ?? 0) >= 5) return { status: "error", code: "rate" };
    }

    const { error } = await sb.from('leads').insert({ ...v, phone, service, ip_hash });
    if (error) throw error;

    await notify({ ...v, service }).catch(() => {});
    return { status: "ok", phone: v.phone };
  } catch (e) {
    console.error("lead insert failed", e);
    return { status: "error", code: "server" };
  }
}

/** İsteğe bağlı e-posta bildirimi (RESEND_API_KEY tanımlıysa). */
async function notify(l: { name: string; phone: string; email: string | null; company: string | null; location: string | null; message: string | null; service: string | null; lang: string }) {
  const key = process.env.RESEND_API_KEY, to = process.env.LEAD_NOTIFY_TO, from = process.env.LEAD_NOTIFY_FROM;
  if (!key || !to || !from) return;
  const text = [
    `Ad: ${l.name}`, `Telefon: ${l.phone}`, l.email && `E-posta: ${l.email}`, l.company && `Firma: ${l.company}`,
    `Hizmet: ${l.service || "-"}`, l.location && `Konum: ${l.location}`, `Dil: ${l.lang}`, "", l.message || "",
  ].filter((x) => x !== null && x !== undefined).join("\n");
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject: `Yeni teklif talebi: ${l.name}`, text }),
  });
}
