"use client";

import { useEffect } from "react";

interface Props {
  locale: string;
  fontClass: string;
}

/**
 * Sets lang, dir, and font class on <html> immediately after mount.
 * This keeps the root layout minimal while still correctly reflecting
 * the locale in the HTML element for SEO and RTL CSS selectors.
 */
export default function LocaleHtmlSetup({ locale, fontClass }: Props) {
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
    html.className = `${fontClass} dark`;
  }, [locale, fontClass]);

  return null;
}
