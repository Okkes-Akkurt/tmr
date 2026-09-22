import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { archivo } from "@/lib/fonts";
import { LOCALES, getDict, isLocale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1628" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: d.title, template: "%s | TMR Engineering" },
    description: d["meta.desc"],
    alternates: { canonical: `/${locale}`, languages: { tr: "/tr", en: "/en", "x-default": "/tr" } },
    openGraph: {
      type: "website",
      siteName: "TMR Engineering",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      images: [{ url: "/images/hero.jpg", width: 1536, height: 1024 }],
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
