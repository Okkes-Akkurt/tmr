import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Yönetim adresi burada bilerek listelenmez (robots.txt herkese açıktır).
    // Panel, X-Robots-Tag ve noindex meta etiketiyle arama motorlarından gizlenir.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
