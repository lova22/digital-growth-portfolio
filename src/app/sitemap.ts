import type { MetadataRoute } from "next";
import { SITE_URL, LOCALES, PROJECT_SLUGS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...PROJECT_SLUGS.map((s) => `/portfolio/${s}`)];
  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      },
    }))
  );
}
