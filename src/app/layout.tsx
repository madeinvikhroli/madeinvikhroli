import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./ui/components/common/Navbar";
import Footer from "./ui/components/common/Footer";
import {Noto_Sans_Modi, Poppins} from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const notoSansModi = Noto_Sans_Modi({
  subsets: ['modi'],
  weight: ['400'],
  variable: '--font-modi',
  display: 'swap',
})


export const metadata: Metadata = {
  title: "Made in Vikhroli",
  description: "An Art Collective",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${notoSansModi.variable}`}>
      <body
        className={`antialiased flex flex-col gap-[24px]`}
      > 
        <div className="w-full md:w-[1240px] mx-auto flex flex-col gap-[24px]">
          <Navbar />
          <div className="px-2 lg:px-0">{children}</div>
        </div>
        <div id="portal-root" />
        <Footer />
      </body>
    </html>
  );
}
