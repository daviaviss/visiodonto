import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/LoadingScreen";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Visiodonto — Radiologia Odontológica",
  description:
    "Clínica de radiologia odontológica nos Ingleses, Florianópolis. Radiografias 2D, tomografia 3D, escaneamento e impressão de modelos.",
  icons: {
    icon: "/dente.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${dmSerif.variable} antialiased`}>
      <body className="min-h-full flex flex-col">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
