import type { Dict, Settings } from "@/lib/i18n";
import { telHref, waLink } from "@/lib/site";

export default function ContactInfo({ d, s }: { d: Dict; s: Settings }) {
  const phones = [s.phone1, s.phone2].filter(Boolean);
  const mails = [s.email1, s.email2].filter(Boolean);
  return (
    <dl>
      {phones.length > 0 && <dt>{d["c.phone"]}</dt>}
      {phones.map((p) => <dd key={p}><a href={telHref(p)}>{p}</a></dd>)}
      {s.whatsapp && <><dt>{d["c.wa"]}</dt><dd><a href={waLink(s.whatsapp, d["wa.hello"])} target="_blank" rel="noopener">{s.whatsapp}</a></dd></>}
      {mails.length > 0 && <dt>{d["c.email"]}</dt>}
      {mails.map((m) => <dd key={m}><a href={`mailto:${m}`}>{m}</a></dd>)}
      {s.address && <><dt>{d["c.addr"]}</dt><dd style={{ whiteSpace: "pre-line" }}>{s.address}</dd></>}
    </dl>
  );
}
