import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://video-template-studio.vercel.app"),
  title: {
    default: "Video Template Studio — Template Video Premium untuk Kreator",
    template: "%s | Video Template Studio",
  },
  description:
    "Marketplace template video premium untuk kreator konten digital. Video opening, jedag jedug, PKKMB, gaming montage, dan lainnya. Harga mulai Rp 15.000.",
  keywords: [
    "template video",
    "video opening",
    "jedag jedug",
    "template PKKMB",
    "video editing template",
    "konten kreator",
    "template CapCut",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
