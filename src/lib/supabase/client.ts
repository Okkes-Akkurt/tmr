import { createBrowserClient } from "@supabase/ssr";

/** Tarayıcı istemcisi (yönetim paneli). Yetkiyi veritabanındaki RLS kuralları belirler. */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
