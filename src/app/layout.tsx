import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./ui/components/common/Navbar";
import Footer from "./ui/components/common/Footer";
import { Noto_Sans_Modi, Poppins } from "next/font/google";
import { AuthProvider } from "./ui/components/context/AuthProvider";
import Script from "next/script";
import { Head } from "next/document";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const notoSansModi = Noto_Sans_Modi({
  subsets: ["modi"],
  weight: ["400"],
  variable: "--font-modi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Made in Vikhroli",
  description: "An Art Collective",
  metadataBase: new URL("https://madeinvikhroli.vercel.app"),
  openGraph: {
    title: "Made in Vikhroli",
    description: "An Art Collective",
    url: "https://madeinvikhroli.vercel.app",
    siteName: "Made in Vikhroli",
    images: [
      {
        url: "/og-cover.png", // make sure this is in /public
        width: 1200,
        height: 630,
        alt: "Made in Vikhroli Open Graph Image",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Made in Vikhroli",
    description: "An Art Collective",
    images: [
      "https://ubkaudleykedlauhjmha.supabase.co/storage/v1/object/public/madeinvikhroli-storage/website-images/og-cover.png",
    ],
  },
  icons: {
    icon: "/assets/favicon.ico",
    shortcut: "/assets/favicon.ico",
  },
  authors: [
    {
      name: "Made in Vikhroli Team",
      url: "https://madeinvikhroli.vercel.app",
    },
  ],
  keywords: [
    "Vikhroli",
    "Art",
    "Collective",
    "Mumbai",
    "Art Community",
    "Design",
    "Street Art",
    "Creative Network",
  ],
  creator: "Made in Vikhroli",
  publisher: "Made in Vikhroli",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${notoSansModi.variable}`}>
      <body className={`antialiased flex flex-col gap-[24px]`}>
        <Script src="/assets/lang-config.js" strategy="beforeInteractive" />
        <Script src="/assets/translation.js" strategy="beforeInteractive" />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />
        <AuthProvider>
          <div className="w-full md:w-[1240px] mx-auto flex flex-col gap-[24px]">
            <Navbar />
            <div className="px-2 lg:px-0">{children}</div>
          </div>
          <div id="portal-root" />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
