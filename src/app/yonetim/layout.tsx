import type { Metadata } from "next";
import "../globals.css";
import { archivo } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Yönetim | TMR Engineering",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
