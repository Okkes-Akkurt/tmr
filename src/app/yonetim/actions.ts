"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const sb = await createClient();
  const { data } = await sb.auth.getClaims();
  const uid = data?.claims?.sub;
  if (!uid) return null;
  const { data: row } = await sb.from("admins").select("user_id").eq("user_id", uid).maybeSingle();
  return row ? sb : null;
}

/** Panelde yapılan değişikliklerden sonra herkese açık sayfaları yeniler. */
export async function revalidateSite() {
  if (!(await requireAdmin())) return { ok: false };
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function signOut() {
  const sb = await createClient();
  await sb.auth.signOut();
  redirect("/yonetim/giris");
}
