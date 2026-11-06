import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter, Tajawal } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import LocaleHtmlSetup from "@/components/LocaleHtmlSetup";

import CustomCursor from "@/components/CustomCursor";
import MotionProvider from "@/components/MotionProvider";
import { SITE_URL, LOCALES, DESCRIPTIONS } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

const TITLES: Record<string, string> = {
  en: "Web Developer & SEO Specialist in Agadir | Digital Growth",
  fr: "Développeur Web & Spécialiste SEO à Agadir | Digital Growth",
  ar: "مطوّر ويب وخبير SEO في أكادير | Digital Growth",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { absolute: TITLES[locale] ?? TITLES.en },
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.en,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: TITLES[locale] ?? TITLES.en,
      description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.en,
      url: `/${locale}`,
      locale: locale === "ar" ? "ar_MA" : locale === "fr" ? "fr_FR" : "en_US",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Digital Growth",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  description: DESCRIPTIONS.en,
  email: "rachidelaouad@gmail.com",
  telephone: "+212659402611",
  foundingDate: "2007",
  address: { "@type": "PostalAddress", addressLocality: "Agadir", addressCountry: "MA" },
  areaServed: "Worldwide",
  knowsLanguage: ["en", "fr", "ar"],
  sameAs: ["https://github.com/lova22"],
  knowsAbout: ["WordPress", "Next.js", "SEO", "UI/UX Design", "WooCommerce", "Generative AI"],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();
  const isRTL = locale === "ar";
  const fontClass = isRTL
    ? tajawal.variable
    : inter.variable;

  return (
    <>
      <LocaleHtmlSetup locale={locale} fontClass={fontClass} />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div
          dir={isRTL ? "rtl" : "ltr"}
          lang={locale}
          className={`${fontClass} gradient-bg min-h-screen`}
        >
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <MotionProvider>
            <CustomCursor />
            <Navbar />
            <main>{children}</main>
          </MotionProvider>
        </div>
      </NextIntlClientProvider>
    </>
  );
}
