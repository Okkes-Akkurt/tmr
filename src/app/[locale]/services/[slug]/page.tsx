import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage, { serviceMetadata } from "@/components/ServicePage";
import { SERVICES, serviceBySlug } from "@/lib/services";

export const revalidate = 3600;
export const dynamicParams = false;

// İngilizce hizmet sayfaları: /en/services/<slug>
export function generateStaticParams() {
  return SERVICES.map((s) => ({ locale: "en", slug: s.slug.en }));
}

type P = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = locale === "en" ? serviceBySlug("en", slug) : undefined;
  return s ? serviceMetadata("en", s) : {};
}

export default async function Page({ params }: P) {
  const { locale, slug } = await params;
  const s = locale === "en" ? serviceBySlug("en", slug) : undefined;
  if (!s) notFound();
  return <ServicePage locale="en" service={s} />;
}
