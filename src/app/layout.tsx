import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Digital Growth Architect & AI Solutions",
    template: "%s | Digital Agency",
  },
  description:
    "Premium one-man digital agency specializing in UI/UX, AI engineering, SEO analytics, and motion graphics.",
  keywords: ["digital agency", "UI/UX", "AI engineering", "web development", "SEO"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Digital Growth Architect",
  },
};

// Root layout: minimal shell with suppressHydrationWarning so the
// nested [locale]/layout can set lang/dir via a client component
// without React hydration warnings.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
