import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Angelika & Patryk | Wedding",
  description: "02 lipca 2027",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${heading.variable} ${body.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-stone-50 text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
