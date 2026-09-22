import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDict, isLocale } from "@/lib/i18n";
import { SERVICES } from "@/lib/services";
import { getSiteData } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? getDict(locale).kvkk : "KVKK", alternates: { languages: { tr: "/tr/kvkk", en: "/en/kvkk" } } };
}

// ÖNEMLİ: Aşağıdaki metin bir iskelettir. Yayına almadan önce bir hukukçuya kontrol ettirip köşeli parantezli alanları doldurun.
export default async function Kvkk({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const { settings: s, media, projects, refs } = await getSiteData();
  const owner = s.legalName || "[Ticari unvan]";
  const allCustom = SERVICES.every((x) => media["s" + x.id]) && !!media.hero;
  return (
    <>
      <Header locale={locale} d={d} hrefs={{ tr: "/tr/kvkk", en: "/en/kvkk" }} showProjects={projects.length > 0 || refs.length > 0} />
      <main id="main" className="block">
        <div className="wrap prose">
          {locale === "tr" ? (
            <>
              <h1 className="x" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>Kişisel verilerin işlenmesine ilişkin aydınlatma metni</h1>
              <p className="todo">Taslak metin: yayına almadan önce hukuki kontrolden geçirilmeli ve köşeli parantezli alanlar doldurulmalıdır.</p>
              <h2>Veri sorumlusu</h2>
              <p>{owner}, {s.address || "[açık adres]"}. İletişim: {s.email1}</p>
              <h2>İşlenen veriler</h2>
              <p>Teklif formu aracılığıyla ilettiğiniz ad soyad, telefon, e-posta, firma, proje konumu ve mesaj içeriği ile kötüye kullanımı önlemek amacıyla IP adresinizin geri döndürülemez özeti.</p>
              <h2>İşleme amacı ve hukuki sebep</h2>
              <p>Talebinize dönüş yapılması, teklif hazırlanması ve sözleşme öncesi görüşmelerin yürütülmesi. [KVKK madde 5 kapsamındaki hukuki sebep hukukçu tarafından belirtilmelidir.]</p>
              <h2>Aktarım</h2>
              <p>Veriler, barındırma ve veritabanı hizmeti sağlayıcılarımızın sunucularında saklanır. [Sağlayıcıların adı ve yurt dışı aktarım durumu belirtilmelidir.]</p>
              <h2>Saklama süresi</h2>
              <p>[Süre belirtilmelidir.]</p>
              <h2>Haklarınız</h2>
              <p>KVKK madde 11 kapsamındaki haklarınıza ilişkin taleplerinizi {s.email1} adresine iletebilirsiniz.</p>
            </>
          ) : (
            <>
              <h1 className="x" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>Privacy notice on the processing of personal data</h1>
              <p className="todo">Draft text: must be reviewed by a lawyer and the bracketed fields completed before going live.</p>
              <h2>Data controller</h2>
              <p>{owner}, {s.address || "[address]"}. Contact: {s.email1}</p>
              <h2>Data processed</h2>
              <p>The name, phone number, email, company, project location and message you send through the quote form, and an irreversible hash of your IP address used to prevent abuse.</p>
              <h2>Purpose</h2>
              <p>Responding to your request, preparing a quotation and carrying out pre-contract discussions. [Legal basis to be specified.]</p>
              <h2>Transfers</h2>
              <p>Data is stored on the servers of our hosting and database providers. [Providers and any cross-border transfer to be specified.]</p>
              <h2>Retention</h2>
              <p>[Period to be specified.]</p>
              <h2>Your rights</h2>
              <p>You can send requests regarding your rights under Article 11 of Law No. 6698 (KVKK) to {s.email1}.</p>
            </>
          )}
        </div>
      </main>
      <Footer locale={locale} d={d} s={s} allCustomImages={allCustom} />
    </>
  );
}
