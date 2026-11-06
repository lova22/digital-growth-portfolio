import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Digital Growth Architect & AI Solutions",
    template: "%s | One-Man Digital Agency",
  },
  description:
    "One-man digital agency in Agadir, Morocco: web development, UI/UX, AI engineering, SEO and motion graphics. Building for clients since 2007.",
  keywords: ["digital agency", "UI/UX", "AI engineering", "web development", "SEO"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Digital Growth",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Digital Growth, web developer and SEO specialist in Agadir" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
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
