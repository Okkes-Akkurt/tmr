"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { GROUPS, SERVICES, servicePath } from "@/lib/services";

type Props = {
  locale: Locale;
  d: Dict;
  images: Record<number, string>;
  custom: Record<number, boolean>;
  notes: Record<number, string>;
  whatsapp: string;
};

export function requestQuote(serviceId: number | string) {
  window.dispatchEvent(new CustomEvent("tmr:quote", { detail: String(serviceId) }));
  document.getElementById("teklif")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

export default function ServiceExplorer({ locale, d, images, custom, notes, whatsapp }: Props) {
  const [group, setGroup] = useState(GROUPS[0].id);
  const [openId, setOpenId] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dlg.current;
    if (!el) return;
    if (openId !== null && !el.open) el.showModal();
    if (openId === null && el.open) el.close();
  }, [openId]);

  const g = GROUPS.find((x) => x.id === group)!;
  const row = (id: number) => {
    const s = SERVICES.find((x) => x.id === id)!;
    const txt = s[locale];
    return (
      <a key={id} className="svc-row" href={servicePath(locale, s)} onClick={(e) => { e.preventDefault(); setOpenId(id); }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[id]} alt="" loading="lazy" width={112} height={76} />
        <div><strong>{txt.t}</strong><span>{txt.d}</span></div>
      </a>
    );
  };

  const cur = openId !== null ? SERVICES.find((x) => x.id === openId)! : null;
  const ct = cur ? cur[locale] : null;
  const wa = (text: string) => {
    let n = whatsapp.replace(/\D/g, "");
    if (n.startsWith("0")) n = "90" + n.slice(1);
    return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="svc">
      <div className="groups" role="tablist" aria-label={d["svc.h"]}>
        {GROUPS.map((x) => (
          <button key={x.id} className="group-btn" role="tab" aria-selected={x.id === group} onClick={() => setGroup(x.id)}>
            <strong>{x[locale].t}</strong>
            <small>{x[locale].d}</small>
          </button>
        ))}
      </div>
      <div className="svc-list" role="tabpanel">
        {g.ids.map(row)}
        {g.extraIds.length > 0 && <p className="subhead">{g[locale].x}</p>}
        {g.extraIds.map(row)}
      </div>

      <dialog ref={dlg} aria-labelledby="svcT" onClose={() => setOpenId(null)} onClick={(e) => { if (e.target === dlg.current) setOpenId(null); }}>
        {cur && ct && (
          <>
            <div className="dlg-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[cur.id]} alt="" />
              <button className="x-close" aria-label={d["d.close"]} onClick={() => setOpenId(null)}>×</button>
            </div>
            <div className="dlg-body">
              <h3 className="x" id="svcT">{ct.t}</h3>
              <p className="lead">{ct.d}</p>
              {notes[cur.id] && <p style={{ margin: "14px 0 0" }}>{notes[cur.id]}</p>}
              <div className="dlg-cols">
                <div><h4>{ct.la || d["d.la"]}</h4><ul>{ct.a.map((x) => <li key={x}>{x}</li>)}</ul></div>
                <div><h4>{ct.lb || d["d.lb"]}</h4><ul>{ct.b.map((x) => <li key={x}>{x}</li>)}</ul></div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn btn-o" onClick={() => { const id = cur.id; setOpenId(null); requestQuote(id); }}>{d["d.quote"]}</button>
                <a className="btn btn-ghost" href={servicePath(locale, cur)}>{d["svc.more"]}</a>
                <a className="btn btn-ghost" target="_blank" rel="noopener" href={wa(d["wa.svc"].replace("{s}", ct.t))}>{d["d.ask"]}</a>
              </div>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
