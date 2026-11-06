export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://digital-growth-portfolio-3e42.vercel.app"
).replace(/\/$/, "");

export const LOCALES = ["en", "fr", "ar"] as const;

export const PROJECT_SLUGS = [
  "meryem-youssoufi",
  "pdfpro",
  "sahatracker",
  "azulamazigh",
  "ansae",
  "crochetpatternsco",
] as const;

export const PROJECT_TITLES: Record<string, string> = {
  "meryem-youssoufi": "Dr. Meryem Youssoufi",
  pdfpro: "PDFPro",
  sahatracker: "SahaTracker",
  azulamazigh: "Tachelhit 30",
  ansae: "Najah Souss Échecs",
  crochetpatternsco: "Crochet Patterns Co",
};

export const DESCRIPTIONS: Record<string, string> = {
  en: "Web developer and SEO specialist in Agadir, Morocco, building for clients since 2007: WordPress, Next.js, SEO, UI/UX and AI integrations.",
  fr: "Développeur web et spécialiste SEO à Agadir, Maroc, au service de clients depuis 2007 : WordPress, Next.js, SEO, UI/UX et intégrations IA.",
  ar: "مطوّر ويب وخبير SEO في أكادير، المغرب، أعمل مع العملاء منذ 2007: ووردبريس وNext.js وSEO وتصميم الواجهات وحلول الذكاء الاصطناعي.",
};
