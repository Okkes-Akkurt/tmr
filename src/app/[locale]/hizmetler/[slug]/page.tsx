import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage, { serviceMetadata } from "@/components/ServicePage";
import { SERVICES, serviceBySlug } from "@/lib/services";

export const revalidate = 3600;
export const dynamicParams = false;

// Türkçe hizmet sayfaları: /tr/hizmetler/<slug>
export function generateStaticParams() {
  return SERVICES.map((s) => ({ locale: "tr", slug: s.slug.tr }));
}

type P = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = locale === "tr" ? serviceBySlug("tr", slug) : undefined;
  return s ? serviceMetadata("tr", s) : {};
}

export default async function Page({ params }: P) {
  const { locale, slug } = await params;
  const s = locale === "tr" ? serviceBySlug("tr", slug) : undefined;
  if (!s) notFound();
  return <ServicePage locale="tr" service={s} />;
}
