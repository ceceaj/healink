import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SelenaProvider } from "@/context/SelenaContext";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SELENA - Ruang Aman Pemulihan",
  description:
    "Self-awareness, Emotional understanding, Listening, Empathy, Nurturing, Acceptance. Aman, Terpercaya, dan Membantu (ATM).",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SELENA",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icons/icon-512x512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icons/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#CDB4DB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={nunito.variable}>
      <body className="min-h-screen bg-[#EFEFEF] text-selena-text font-sans antialiased flex justify-center selection:bg-selena-pink selection:text-selena-text">
        <SelenaProvider>
          <div className="w-full max-w-md mx-auto min-h-screen bg-[#FAFAFA] text-selena-text shadow-xl relative flex flex-col overflow-x-hidden">
            {children}
          </div>
        </SelenaProvider>
      </body>
    </html>
  );
}
