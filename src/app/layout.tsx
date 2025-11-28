import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import Scene from "@/components/canvas/Scene";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

import Navbar from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "Premium Developer Portfolio",
  description: "A minimal, premium developer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased bg-background text-foreground selection:bg-white selection:text-black">
        <Providers>
          <Scene />
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
