"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";

export type ProjectView = { id: string; title: string; meta: string; scope: string; images: string[]; cover: number };

export default function Projects({ items, d }: { items: ProjectView[]; d: Dict }) {
  const [open, setOpen] = useState<ProjectView | null>(null);
  const [idx, setIdx] = useState(0);
  const dlg = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dlg.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  const n = open?.images.length || 0;
  const go = (step: number) => setIdx((i) => (i + step + n) % n);

  return (
    <>
      <div className="proj-grid">
        {items.map((p) => (
          <button key={p.id} className="proj" onClick={() => { setIdx(p.cover); setOpen(p); }}>
            <div className="ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.images[p.cover] && <img src={p.images[p.cover]} alt="" loading="lazy" />}
            </div>
            <strong>{p.title}</strong>
            <span>{p.meta}</span>
          </button>
        ))}
      </div>
      <dialog ref={dlg} aria-labelledby="projT" onClose={() => setOpen(null)} onClick={(e) => { if (e.target === dlg.current) setOpen(null); }}
        onKeyDown={(e) => { if (n > 1 && e.key === "ArrowRight") go(1); if (n > 1 && e.key === "ArrowLeft") go(-1); }}>
        {open && (
          <>
            <div className="gal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {n > 0 && <img src={open.images[idx]} alt={`${open.title}, ${d["d.photo"]} ${idx + 1}`} />}
              <button className="x-close" aria-label={d["d.close"]} onClick={() => setOpen(null)}>×</button>
              {n > 1 && <>
                <button className="nav prev" aria-label={d["d.prev"]} onClick={() => go(-1)}>‹</button>
                <button className="nav next" aria-label={d["d.next"]} onClick={() => go(1)}>›</button>
              </>}
            </div>
            {n > 1 && (
              <div className="thumbs">
                {open.images.map((src, i) => (
                  <button key={src} aria-current={i === idx} onClick={() => setIdx(i)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
            <div className="dlg-body">
              <h3 className="x" id="projT">{open.title}</h3>
              <p className="lead">{open.meta}</p>
              {open.scope && <p style={{ whiteSpace: "pre-line", marginTop: 14 }}>{open.scope}</p>}
              <a className="btn btn-o" style={{ marginTop: 12 }} href="#teklif" onClick={() => setOpen(null)}>{d["d.similar"]}</a>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
