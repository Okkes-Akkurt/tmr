import Link from "next/link";
import type { Dict, Locale, Settings } from "@/lib/i18n";
import { waLink } from "@/lib/site";

export default function Footer({ locale, d, s, allCustomImages }: { locale: Locale; d: Dict; s: Settings; allCustomImages: boolean }) {
  const legal = [s.legalName, s.taxInfo, s.mersis ? `MERSİS: ${s.mersis}` : ""].filter(Boolean);
  return (
    <>
      <footer>
        <div className="wrap">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="TMR Engineering" width={912} height={315} />
            <p style={{ marginTop: 14 }}>{d["ft.tag"]}</p>
          </div>
          <div>{legal.map((x) => <p key={x}>{x}</p>)}</div>
          <div>
            {!allCustomImages && <p className="small">{d["ft.img"]}</p>}
            <p className="small"><Link href={`/${locale}/kvkk`} style={{ color: "inherit" }}>{d.kvkk}</Link></p>
            <p className="small">© {new Date().getFullYear()} TMR Engineering</p>
          </div>
        </div>
      </footer>
      {s.whatsapp && (
        <a className="wa" href={waLink(s.whatsapp, d["wa.hello"])} target="_blank" rel="noopener" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.41 9.41 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 9.44 9.45c0 5.2-4.24 9.43-9.46 9.43m8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.63l6.03-1.58a11.33 11.33 0 0 0 5.43 1.38h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.9-3.33-8.04" /></svg>
        </a>
      )}
    </>
  );
}
