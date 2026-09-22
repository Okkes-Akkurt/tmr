import { Archivo } from "next/font/google";

// Değişken font: ağırlık + genişlik (wdth) ekseni. latin-ext Türkçe karakterler için gerekli.
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});
