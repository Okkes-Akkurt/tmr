"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const { error } = await createClient().auth.signInWithPassword({
      email: String(f.get("email") || "").trim(),
      password: String(f.get("password") || ""),
    });
    setBusy(false);
    if (error) { setErr("E-posta veya şifre hatalı."); return; }
    router.replace("/yonetim");
    router.refresh();
  }

  return (
    <main className="login">
      <form onSubmit={onSubmit}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo-adapt" src="/images/logo.png" alt="TMR Engineering" />
        <h1 style={{ fontSize: "1.4rem", margin: "0 0 18px" }}>Yönetim girişi</h1>
        <div className="f" style={{ marginBottom: 14 }}><label htmlFor="email">E-posta</label><input id="email" name="email" type="email" autoComplete="username" required /></div>
        <div className="f" style={{ marginBottom: 18 }}><label htmlFor="password">Şifre</label><input id="password" name="password" type="password" autoComplete="current-password" required /></div>
        <button className="btn btn-o" style={{ width: "100%" }} disabled={busy}>{busy ? "Giriş yapılıyor…" : "Giriş yap"}</button>
        {err && <div className="msg err" role="alert">{err}</div>}
      </form>
    </main>
  );
}
