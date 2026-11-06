import CaseStudyClient from "@/components/CaseStudyClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECT_TITLES, LOCALES } from "@/lib/site";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const slugs = [
  "meryem-youssoufi",
  "pdfpro",
  "sahatracker",
  "azulamazigh",
  "ansae",
  "crochetpatternsco"
];

// Generate static routing parameters list for build time pre-rendering
export function generateStaticParams() {
  const locales = ["en", "fr", "ar"];
  const paramsList = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      paramsList.push({ locale, slug });
    }
  }
  return paramsList;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const title = PROJECT_TITLES[slug];
  if (!title) return {};
  return {
    title: `${title} | Case Study`,
    alternates: {
      canonical: `/${locale}/portfolio/${slug}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/portfolio/${slug}`])),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  
  if (!slugs.includes(slug)) {
    notFound();
  }

  return <CaseStudyClient locale={locale} slug={slug} />;
}
