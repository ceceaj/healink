import type { Metadata, Viewport } from "next";
import "./globals.css";
import { HealinkProvider } from "@/context/HealinkContext";

export const metadata: Metadata = {
  title:
    "HEALINK: SAFETY LEARNING — Laboratorium Perlindungan Anak Desa Cibodas",
  description:
    "Media Pembelajaran Keamanan Diri & Perlindungan Anak Berbasis AI — Kemitraan JEKATA Purwakarta & Yayasan CARE Peduli untuk Anak Desa Cibodas.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HEALINK KIDS",
  },
  icons: {
    icon: [
      {
        url: "/icons/icon-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        url: "/icons/icon-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/icons/icon-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#10B981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#F7FBF7] text-[#1E293B] font-sans antialiased selection:bg-[#FACC15] selection:text-[#064E3B]">
        <HealinkProvider>
          <div className="w-full min-h-screen bg-gradient-to-b from-[#F7FBF7] via-[#FFFDF5] to-[#ECFDF5]/40 text-[#1E293B] relative flex flex-col overflow-x-hidden">
            {children}
          </div>
        </HealinkProvider>
      </body>
    </html>
  );
}
