import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Projects, { type ProjectView } from "@/components/Projects";
import QuoteForm from "@/components/QuoteForm";
import { getDict, type Locale } from "@/lib/i18n";
import { SERVICES, servicePath, type Service } from "@/lib/services";
import { getSiteData, projectScope, projectTitle, serviceImage, storageUrl } from "@/lib/site";

export default async function ServicePage({ locale, service }: { locale: Locale; service: Service }) {
  const d = getDict(locale);
  const { settings: s, media, projects, refs } = await getSiteData();
  const t = service[locale];
  const note = (locale === "en" ? media["e" + service.id] : media["n" + service.id]) || "";
  const related: ProjectView[] = projects.filter((p) => p.service_id === service.id).map((p) => ({
    id: p.id,
    title: projectTitle(p, locale),
    meta: [p.location, p.year].filter(Boolean).join(", "),
    scope: projectScope(p, locale),
    images: (p.images || []).map(storageUrl),
    cover: Math.max(0, (p.images || []).indexOf(p.cover || "")),
  }));
  const allCustom = SERVICES.every((x) => media["s" + x.id]) && !!media.hero;

  return (
    <>
      <a className="skip" href="#main">{d.skip}</a>
      <Header locale={locale} d={d} hrefs={{ tr: servicePath("tr", service), en: servicePath("en", service) }} showProjects={projects.length > 0 || refs.length > 0} />
      <main id="main">
        <section className="page-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={serviceImage(media, service.id)} alt="" />
          <div className="wrap">
            <a className="crumb" href={`/${locale}#hizmetler`}>{d["svc.back"]}</a>
            <h1>{t.t}</h1>
            <p>{t.d}</p>
          </div>
          {!media["s" + service.id] && <span className="tag">{d.tag}</span>}
        </section>
        <section className="block">
          <div className="wrap">
            {note && <p className="lead" style={{ marginBottom: 36 }}>{note}</p>}
            <div className="svc-detail">
              <div><h2>{t.la || d["d.la"]}</h2><ul>{t.a.map((x) => <li key={x}>{x}</li>)}</ul></div>
              <div><h2>{t.lb || d["d.lb"]}</h2><ul>{t.b.map((x) => <li key={x}>{x}</li>)}</ul></div>
            </div>
          </div>
        </section>
        {related.length > 0 && (
          <section className="block alt">
            <div className="wrap">
              <h2 className="x">{d["svc.related"]}</h2>
              <Projects items={related} d={d} />
            </div>
          </section>
        )}
        <section className="block alt" id="iletisim">
          <div className="wrap contact">
            <div className="cinfo">
              <h2 className="x">{d["svc.cta"]}</h2>
              <p className="lead">{locale === "en" ? s.respNoteEn : s.respNote}</p>
            </div>
            <QuoteForm locale={locale} d={d} whatsapp={s.whatsapp} email={s.email1} defaultService={String(service.id)} />
          </div>
        </section>
      </main>
      <Footer locale={locale} d={d} s={s} allCustomImages={allCustom} />
    </>
  );
}

export function serviceMetadata(locale: Locale, service: Service) {
  const t = service[locale];
  return {
    title: t.t,
    description: `${t.d} ${t.b.slice(0, 3).join(", ")}.`,
    alternates: {
      canonical: servicePath(locale, service),
      languages: { tr: servicePath("tr", service), en: servicePath("en", service), "x-default": servicePath("tr", service) },
    },
    openGraph: { images: [{ url: `/images/services/s${service.id}.jpg` }] },
  };
}
