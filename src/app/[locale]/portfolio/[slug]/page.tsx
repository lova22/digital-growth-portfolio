import CaseStudyClient from "@/components/CaseStudyClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const slugs = [
  "lumina-ai-dashboard",
  "riyadh-estates",
  "fintech-secureapp",
  "nomad-documentary",
  "oasis-e-commerce",
  "govtech-analytics"
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

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  
  if (!slugs.includes(slug)) {
    notFound();
  }

  return <CaseStudyClient locale={locale} slug={slug} />;
}
