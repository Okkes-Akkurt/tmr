import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceExplorer from "@/components/ServiceExplorer";
import Gantt from "@/components/Gantt";
import Projects, { type ProjectView } from "@/components/Projects";
import QuoteForm from "@/components/QuoteForm";
import ContactInfo from "@/components/ContactInfo";
import { getDict, isLocale } from "@/lib/i18n";
import { SERVICES } from "@/lib/services";
import { getSiteData, heroImage, projectScope, projectService, projectTitle, serviceImage, siteUrl, storageUrl, waLink } from "@/lib/site";

// Yönetim panelinde yapılan her kayıttan sonra sayfa anında yenilenir (revalidatePath); bu süre yedek.
export const revalidate = 3600;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const { settings: s, media, projects, refs } = await getSiteData();
  const en = locale === "en";

  const images = Object.fromEntries(SERVICES.map((x) => [x.id, serviceImage(media, x.id)]));
  const custom = Object.fromEntries(SERVICES.map((x) => [x.id, !!media["s" + x.id]]));
  const notes = Object.fromEntries(SERVICES.map((x) => [x.id, (en ? media["e" + x.id] : media["n" + x.id]) || ""]));
  const allCustom = SERVICES.every((x) => custom[x.id]) && !!media.hero;

  const projectViews: ProjectView[] = projects.map((p) => {
    const imgs = (p.images || []).map(storageUrl);
    return {
      id: p.id,
      title: projectTitle(p, locale),
      meta: [projectService(p, locale), [p.location, p.year].filter(Boolean).join(", ")].filter(Boolean).join(" | "),
      scope: projectScope(p, locale),
      images: imgs,
      cover: Math.max(0, (p.images || []).indexOf(p.cover || "")),
    };
  });
  const showProjects = projectViews.length > 0 || refs.length > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "TMR Engineering",
    legalName: s.legalName || undefined,
    url: `${siteUrl()}/${locale}`,
    logo: `${siteUrl()}/images/logo.png`,
    image: `${siteUrl()}/images/hero.jpg`,
    telephone: s.phone1 || undefined,
    email: s.email1 || undefined,
    address: { "@type": "PostalAddress", streetAddress: s.address || undefined, addressLocality: "İstanbul", addressCountry: "TR" },
    areaServed: "TR",
  };

  return (
    <>
      <a className="skip" href="#main">{d.skip}</a>
      <Header locale={locale} d={d} hrefs={{ tr: "/tr", en: "/en" }} showProjects={showProjects} />
      <main id="main">
        <section className="hero" id="top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="bg" src={heroImage(media)} alt="" fetchPriority="high" />
          <div className="wrap">
            <div className="rule" />
            <h1><span>{d["h.1"]}</span><span>{d["h.2"]}</span><span>{d["h.3"]}</span></h1>
            <p>{en ? s.heroSubEn : s.heroSub}</p>
            <div className="ctas">
              <a className="btn btn-o" href="#teklif">{d["cta.quote"]}</a>
              <a className="btn btn-ghost" href={waLink(s.whatsapp, d["wa.hello"])} target="_blank" rel="noopener">{d["cta.wa"]}</a>
            </div>
          </div>
        </section>

        <section className="pillars" aria-label={d["nav.services"]}>
          <div className="wrap">
            {(["p1", "p2", "p3"] as const).map((k) => (
              <div className="pillar" key={k}><h2 style={{ margin: "0 0 6px", fontSize: "1.35rem", fontVariationSettings: '"wdth" 118', fontWeight: 800 }}>{d[`${k}.t`]}</h2><p>{d[`${k}.d`]}</p></div>
            ))}
          </div>
        </section>

        <section className="block" id="hizmetler">
          <div className="wrap">
            <div className="svc-head"><div>
              <h2 className="x">{d["svc.h"]}</h2>
              <p className="lead">{d["svc.l"]}</p>
            </div></div>
            <ServiceExplorer locale={locale} d={d} images={images} custom={custom} notes={notes} whatsapp={s.whatsapp} />
          </div>
        </section>

        <section className="block alt" id="surec">
          <div className="wrap">
            <h2 className="x">{d["pr.h"]}</h2>
            <p className="lead">{d["pr.l"]}</p>
            <Gantt d={d} />
            <h3 style={{ margin: "56px 0 0", fontSize: "1.25rem" }}>{d["sec.h"]}</h3>
            <div className="sectors">
              {(["sec.1", "sec.2", "sec.3", "sec.4", "sec.5"] as const).map((k) => <span key={k}>{d[k]}</span>)}
            </div>
          </div>
        </section>

        {showProjects && (
          <section className="block" id="projeler">
            <div className="wrap">
              {projectViews.length > 0 && <>
                <h2 className="x">{d["pj.h"]}</h2>
                <p className="lead">{d["pj.l"]}</p>
                <Projects items={projectViews} d={d} />
              </>}
              {refs.length > 0 && <>
                <h3 style={{ margin: projectViews.length ? "64px 0 0" : 0, fontSize: "1.25rem" }}>{d["rf.h"]}</h3>
                <div className="refs">
                  {refs.map((r) => (
                    <div className="ref" key={r.id} title={r.name}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {r.logo ? <img src={storageUrl(r.logo)} alt={r.name} loading="lazy" /> : r.name}
                    </div>
                  ))}
                </div>
              </>}
            </div>
          </section>
        )}

        <section className="block alt" id="iletisim">
          <div className="wrap contact">
            <div className="cinfo">
              <h2 className="x">{d["ct.h"]}</h2>
              <p className="lead">{en ? s.respNoteEn : s.respNote}</p>
              <ContactInfo d={d} s={s} />
            </div>
            <QuoteForm locale={locale} d={d} whatsapp={s.whatsapp} email={s.email1} />
          </div>
        </section>
      </main>
      <Footer locale={locale} d={d} s={s} allCustomImages={allCustom} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
