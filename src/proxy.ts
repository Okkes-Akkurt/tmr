import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";

function preferredLocale(request: NextRequest) {
  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  if (saved && (LOCALES as readonly string[]).includes(saved)) return saved;
  const header = (request.headers.get("accept-language") || "").toLowerCase();
  // Türkçe tarayıcılar ve dil belirtmeyenler Türkçe; diğerleri İngilizce
  if (!header || header.startsWith("tr") || header.includes(",tr")) return DEFAULT_LOCALE;
  return "en";
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Yönetim paneli: sitede link verilmez, yalnızca adres üzerinden erişilir; oturum zorunludur.
  if (pathname === "/yonetim" || pathname.startsWith("/yonetim/")) {
    return updateSession(request);
  }

  // Dil öneki olmayan adresleri uygun dile yönlendir: / -> /tr
  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api|images|icon.png|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
