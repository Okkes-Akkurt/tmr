import { createPublicClient } from "@/lib/supabase/server";
import { DEFAULT_SETTINGS, type Locale, type Settings } from "@/lib/i18n";
import { defaultServiceImage, serviceById } from "@/lib/services";

export type Project = {
  id: string;
  title: string;
  title_en: string | null;
  service_id: number | null;
  location: string | null;
  year: string | null;
  scope: string | null;
  scope_en: string | null;
  images: string[];
  cover: string | null;
  published: boolean;
  created_at: string;
};
export type ClientRef = { id: string; name: string; logo: string | null };
export type SiteData = { settings: Settings; media: Record<string, string>; projects: Project[]; refs: ClientRef[] };

export const storageUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/site/${path.split("/").map(encodeURIComponent).join("/")}`;

export const siteUrl = () => (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Herkese açık sayfaların verisi. Hata olursa site varsayılan içerikle açılmaya devam eder. */
export async function getSiteData(): Promise<SiteData> {
  const empty: SiteData = { settings: { ...DEFAULT_SETTINGS }, media: {}, projects: [], refs: [] };
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return empty;
  try {
    const sb = createPublicClient();
    const [s, m, p, r] = await Promise.all([
      sb.from("site_settings").select("data").eq("id", 1).maybeSingle(),
      sb.from("site_media").select("key,value"),
      sb.from("projects").select("*").eq("published", true).order("created_at", { ascending: false }),
      sb.from("client_references").select("id,name,logo").order("created_at", { ascending: true }),
    ]);
    const saved = (s.data?.data || {}) as Partial<Settings>;
    const settings = { ...DEFAULT_SETTINGS } as Settings;
    for (const k of Object.keys(saved) as (keyof Settings)[]) if (saved[k]) settings[k] = saved[k] as string;
    return {
      settings,
      media: Object.fromEntries((m.data || []).map((x: { key: string; value: string }) => [x.key, x.value])),
      projects: (p.data || []) as Project[],
      refs: (r.data || []) as ClientRef[],
    };
  } catch {
    return empty;
  }
}

export const serviceImage = (media: Record<string, string>, id: number) =>
  media["s" + id] ? storageUrl(media["s" + id]) : defaultServiceImage(id);
export const heroImage = (media: Record<string, string>) => (media.hero ? storageUrl(media.hero) : "/images/hero.jpg");

export const projectTitle = (p: Project, l: Locale) => (l === "en" && p.title_en ? p.title_en : p.title);
export const projectScope = (p: Project, l: Locale) => (l === "en" && p.scope_en ? p.scope_en : p.scope) || "";
export const projectService = (p: Project, l: Locale) => {
  const s = serviceById(p.service_id);
  return s ? s[l].t : "";
};

export const digits = (v: string) => String(v || "").replace(/\D/g, "");
export function waLink(number: string, text?: string) {
  let d = digits(number);
  if (d.startsWith("0")) d = "90" + d.slice(1);
  return `https://wa.me/${d}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
export const telHref = (p: string) => `tel:+${digits(p).replace(/^0/, "90")}`;
