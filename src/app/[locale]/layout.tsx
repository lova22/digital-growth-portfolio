import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter, Tajawal } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import LocaleHtmlSetup from "@/components/LocaleHtmlSetup";

import CustomCursor from "@/components/CustomCursor";
import RightClickGuard from "@/components/RightClickGuard";

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

export const metadata: Metadata = {
  title: "Digital Growth Architect & AI Solutions",
  description:
    "Premium one-man digital agency — UI/UX, AI Engineering, SEO, and Motion Graphics.",
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
          <CustomCursor />
          <RightClickGuard />
          <Navbar />
          <main>{children}</main>
        </div>
      </NextIntlClientProvider>
    </>
  );
}
