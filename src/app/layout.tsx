import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sekian Info - Dashboard Informasi Harian Indonesia",
    template: "%s | Sekian Info",
  },
  description: "Dashboard informasi harian Indonesia: berita terkini, cuaca, jadwal sholat, harga emas, kurs mata uang, harga sembako, jadwal penerbangan, film bioskop, dan trending Google.",
  keywords: [
    "info indonesia",
    "berita indonesia",
    "cuaca indonesia",
    "jadwal sholat",
    "harga emas",
    "kurs rupiah",
    "harga sembako",
    "jadwal penerbangan",
    "film bioskop",
    "google trends indonesia",
    "dashboard info",
  ],
  authors: [{ name: "Krisna Renaldi" }],
  creator: "Krisna Renaldi",
  publisher: "Sekian Info",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sekian-info.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "Sekian Info - Dashboard Informasi Harian Indonesia",
    description: "Dashboard informasi harian Indonesia: berita terkini, cuaca, jadwal sholat, harga emas, kurs mata uang, harga sembako, jadwal penerbangan, film bioskop, dan trending Google.",
    siteName: "Sekian Info",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sekian Info - Dashboard Informasi Harian Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sekian Info - Dashboard Informasi Harian Indonesia",
    description: "Dashboard informasi harian Indonesia: berita terkini, cuaca, jadwal sholat, harga emas, kurs mata uang, harga sembako, jadwal penerbangan, film bioskop, dan trending Google.",
    images: ["/og-image.png"],
    creator: "@krisnarenaldi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon.ico" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
