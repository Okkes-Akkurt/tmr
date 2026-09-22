"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";

/** hrefs: aynı sayfanın her dildeki adresi (dil değiştirince kullanıcı aynı içerikte kalır). */
type Props = { locale: Locale; d: Dict; hrefs: Record<Locale, string>; showProjects: boolean };

export default function Header({ locale, d, hrefs, showProjects }: Props) {
  const [open, setOpen] = useState(false);
  const home = `/${locale}`;
  const close = () => setOpen(false);
  const setLangCookie = (l: Locale) => {
    document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`;
  };
  return (
    <header className="top">
      <div className="wrap">
        <Link className="logo" href={home} aria-label="TMR Engineering">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-adapt" src="/images/logo.png" alt="TMR Engineering" width={912} height={315} />
        </Link>
        <button className="menu-btn" aria-label={d.menu} aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
          <span></span><span></span><span></span>
        </button>
        <nav className={`main${open ? " open" : ""}`} id="nav">
          <a href={`${home}#hizmetler`} onClick={close}>{d["nav.services"]}</a>
          <a href={`${home}#surec`} onClick={close}>{d["nav.process"]}</a>
          {showProjects && <a href={`${home}#projeler`} onClick={close}>{d["nav.projects"]}</a>}
          <a href={`${home}#iletisim`} onClick={close}>{d["nav.contact"]}</a>
          <div className="lang" role="group" aria-label="Dil / Language">
            {(["tr", "en"] as const).map((l) => (
              <Link key={l} href={hrefs[l]} hrefLang={l} lang={l} aria-current={locale === l} onClick={() => setLangCookie(l)}>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <a className="btn btn-o btn-sm" href={`${home}#teklif`} onClick={close}>{d["cta.quote"]}</a>
        </nav>
      </div>
    </header>
  );
}
