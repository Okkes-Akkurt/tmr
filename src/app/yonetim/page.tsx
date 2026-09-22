import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminApp from "@/components/admin/AdminApp";
import { signOut } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const sb = await createClient();
  const { data } = await sb.auth.getClaims();
  const uid = data?.claims?.sub;
  if (!uid) redirect("/yonetim/giris");

  const { data: admin } = await sb.from("admins").select("user_id").eq("user_id", uid).maybeSingle();
  if (!admin) {
    return (
      <main className="gate">
        <div>
          <h1 className="x" style={{ fontSize: "1.6rem" }}>Bu hesabın yönetim yetkisi yok</h1>
          <p className="lead" style={{ margin: "10px auto 24px" }}>Yetki için hesabın Supabase&apos;deki admins tablosuna eklenmesi gerekir.</p>
          <form action={signOut}><button className="btn btn-o">Çıkış yap</button></form>
        </div>
      </main>
    );
  }
  return <AdminApp supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!} />;
}
