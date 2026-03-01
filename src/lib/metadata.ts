import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://accumulatenetwork.io";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

export function createMetadata({
  title,
  description,
  path,
  ogImage = "/meta.png",
}: PageMeta): Metadata {
  const url = `${BASE_URL}${path}`;
  const fullTitle = path === "/" ? title : `${title} — Accumulate`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Accumulate",
      images: [{ url: `${BASE_URL}${ogImage}`, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${BASE_URL}${ogImage}`],
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}
