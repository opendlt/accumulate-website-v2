import type { Metadata } from "next";
import { spaceGrotesk, inter, jetbrainsMono } from "./fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { RouteProgress } from "@/components/motion/route-progress";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Accumulate — Delegated Authority You Can Prove",
  description:
    "Governance-first blockchain for real-world identity and multi-party approval. Model org structure, enforce delegation, keep costs predictable.",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
    apple: "/favicon-96.png",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://accumulatenetwork.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ScrollProgress />
          <RouteProgress />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Accumulate",
                applicationCategory: "BlockchainApplication",
                description:
                  "Governance-first blockchain for real-world identity, multi-party approval, and verifiable delegation.",
                url: "https://accumulatenetwork.io",
                operatingSystem: "Cross-platform",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                  description:
                    "Open-source protocol with credit-based transaction fees",
                },
              }),
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
