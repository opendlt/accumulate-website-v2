import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://accumulatenetwork.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/use-cases",
    "/use-cases/vendor-authority",
    "/use-cases/treasury-controls",
    "/use-cases/coalition-delegation",
    "/how-it-works",
    "/pilot",
    "/security",
    "/docs",
    "/about",
    "/network-status",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/pilot" ? 0.9 : 0.7,
  }));
}
