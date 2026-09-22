import type { MetadataRoute } from "next";
import { SERVICES, servicePath } from "@/lib/services";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/tr`, lastModified: now, changeFrequency: "weekly", priority: 1, alternates: { languages: { tr: `${base}/tr`, en: `${base}/en` } } },
    { url: `${base}/en`, lastModified: now, changeFrequency: "weekly", priority: 0.9, alternates: { languages: { tr: `${base}/tr`, en: `${base}/en` } } },
  ];
  for (const s of SERVICES) {
    const languages = { tr: base + servicePath("tr", s), en: base + servicePath("en", s) };
    pages.push({ url: languages.tr, lastModified: now, changeFrequency: "monthly", priority: 0.7, alternates: { languages } });
    pages.push({ url: languages.en, lastModified: now, changeFrequency: "monthly", priority: 0.6, alternates: { languages } });
  }
  return pages;
}
