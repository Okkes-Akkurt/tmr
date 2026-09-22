"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";

const BARS: { left: number; width: number; navy?: boolean }[] = [
  { left: 0, width: 14, navy: true },
  { left: 9, width: 18, navy: true },
  { left: 22, width: 50 },
  { left: 32, width: 58 },
  { left: 86, width: 12, navy: true },
];

export default function Gantt({ d }: { d: Dict }) {
  const ref = useRef<HTMLDivElement>(null);
  // Çubuklar varsayılan olarak görünür; büyüme animasyonu yalnızca ek bir efekt.
  const [pre, setPre] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) return;
    setPre(true);
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setPre(false); io.disconnect(); } }, { threshold: 0.05 });
    io.observe(el);
    const t = setTimeout(() => { setPre(false); io.disconnect(); }, 6000);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  return (
    <div className={`gantt${pre ? " pre" : ""}`} ref={ref}>
      <div className="g-scale"><div></div><div><span>{d["pr.start"]}</span><span>{d["pr.end"]}</span></div></div>
      {BARS.map((b, i) => {
        const n = i + 1;
        const t = (key: string) => (d as Record<string, string>)[key];
        return (
          <div className="g-row" key={n}>
            <div className="g-label"><b>{n}</b><div><strong>{t(`s${n}.t`)}</strong><span>{t(`s${n}.d`)}</span></div></div>
            <div className="g-track">
              <i className={`g-bar${b.navy ? " navy" : ""}`} style={{ left: `${b.left}%`, width: `${b.width}%`, transitionDelay: `${i * 0.12}s` }} />
              {n === 5 && <i className="g-milestone" style={{ left: "98%" }} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
