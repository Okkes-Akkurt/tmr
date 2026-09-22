"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitLead, type LeadState } from "@/app/actions";
import { fmt, type Dict, type Locale } from "@/lib/i18n";
import { GROUPS, serviceById } from "@/lib/services";

type Props = { locale: Locale; d: Dict; whatsapp: string; email: string; defaultService?: string };

export default function QuoteForm({ locale, d, whatsapp, email, defaultService = "" }: Props) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, { status: "idle" });
  const [service, setService] = useState(defaultService);
  const [started, setStarted] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const last = useRef<Record<string, string>>({});

  useEffect(() => setStarted(Date.now()), []);
  useEffect(() => {
    const h = (e: Event) => { setService((e as CustomEvent<string>).detail); setTimeout(() => document.getElementById("q_name")?.focus({ preventScroll: true }), 500); };
    window.addEventListener("tmr:quote", h);
    return () => window.removeEventListener("tmr:quote", h);
  }, []);
  useEffect(() => {
    if (state.status === "ok") { formRef.current?.reset(); setService(defaultService); }
  }, [state, defaultService]);

  // WhatsApp yedeği: formdaki bilgilerle hazır mesaj
  const waText = () => {
    const val = (n: string) => (last.current[n] || "").trim();
    const sv = val("service");
    const svc = sv === "diger" ? d["f.other"] : serviceById(sv)?.[locale].t || d["f.none"];
    const lines = [d["wa.quote"], `${d["wa.name"]}: ${val("name")}`, `${d["wa.phone"]}: ${val("phone")}`,
      val("company") && `${d["wa.company"]}: ${val("company")}`, `${d["wa.service"]}: ${svc}`, val("location") && `${d["wa.loc"]}: ${val("location")}`,
      val("message") && `\n${val("message")}`].filter(Boolean);
    let n = whatsapp.replace(/\D/g, "");
    if (n.startsWith("0")) n = "90" + n.slice(1);
    return `https://wa.me/${n}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const invalid = (f: string) => state.status === "error" && state.code === "invalid" && state.fields?.includes(f);
  const errNames: Record<string, string> = { name: d["f.errName"], phone: d["f.errPhone"], kvkk: d["f.errKvkk"], email: d["f.email"] };

  return (
    <form className="quote" id="teklif" ref={formRef} noValidate
      onSubmit={(e) => {
        // action prop yerine elle gönderim: hata durumunda React formu sıfırlamasın, girilen bilgiler kaybolmasın
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        last.current = Object.fromEntries([...fd.entries()].map(([k, v]) => [k, String(v)]));
        startTransition(() => action(fd));
      }}>
      <h3 style={{ margin: "0 0 18px", fontSize: "1.3rem" }}>{d["f.h"]}</h3>
      <input type="hidden" name="lang" value={locale} />
      <input type="hidden" name="t" value={started} />
      <div aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}>
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="fgrid">
        <div className="f"><label htmlFor="q_name">{d["f.name"]}</label>
          <input id="q_name" name="name" required autoComplete="name" aria-invalid={invalid("name")} /></div>
        <div className="f"><label htmlFor="q_phone">{d["f.phone"]}</label>
          <input id="q_phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="05xx xxx xx xx" aria-invalid={invalid("phone")} /></div>
        <div className="f"><label htmlFor="q_email">{d["f.email"]}</label>
          <input id="q_email" name="email" type="email" autoComplete="email" aria-invalid={invalid("email")} /></div>
        <div className="f"><label htmlFor="q_company">{d["f.company"]}</label>
          <input id="q_company" name="company" autoComplete="organization" /></div>
        <div className="f"><label htmlFor="q_service">{d["f.service"]}</label>
          <select id="q_service" name="service" value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">{d["f.select"]}</option>
            {GROUPS.map((g) => (
              <optgroup key={g.id} label={g[locale].t}>
                {[...g.ids, ...g.extraIds].map((id) => <option key={id} value={id}>{serviceById(id)![locale].t}</option>)}
              </optgroup>
            ))}
            <option value="diger">{d["f.other"]}</option>
          </select></div>
        <div className="f"><label htmlFor="q_loc">{d["f.loc"]}</label>
          <input id="q_loc" name="location" placeholder={d["f.locph"]} /></div>
        <div className="f full"><label htmlFor="q_msg">{d["f.msg"]}</label>
          <textarea id="q_msg" name="message" placeholder={d["f.msgph"]} maxLength={4000} /></div>
        <label className="check full">
          <input type="checkbox" name="kvkk" required aria-invalid={invalid("kvkk")} />
          <span>{d["f.kvkk"]} <Link href={`/${locale}/kvkk`} target="_blank">{d["f.kvkkLink"]}</Link></span>
        </label>
      </div>
      <div className="form-foot">
        <button className="btn btn-o" type="submit" disabled={pending}>{pending ? d["f.sending"] : d["f.submit"]}</button>
        {email && <span className="note">{d["f.note1"]} <a href={`mailto:${email}`}>{d["f.note2"]}</a> {d["f.note3"]}</span>}
      </div>
      <div role="status" aria-live="polite">
        {state.status === "ok" && (
          <div className="msg"><strong>{d["f.ok1"]}</strong> {state.phone ? fmt(d["f.ok2"], { phone: state.phone }) : ""}{" "}
            <a href={waText()} target="_blank" rel="noopener">{d["f.ok3"]}</a>.</div>
        )}
        {state.status === "error" && state.code === "invalid" && (
          <div className="msg err">{d["f.errPre"]}{(state.fields || []).map((f) => errNames[f]).join(", ")}.</div>
        )}
        {state.status === "error" && state.code !== "invalid" && (
          <div className="msg err">{state.code === "rate" ? d["f.errRate"] : d["f.errGeneric"]}{" "}
            <a href={waText()} target="_blank" rel="noopener">{d["f.fail2"]}</a>.</div>
        )}
      </div>
    </form>
  );
}
