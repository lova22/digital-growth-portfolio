// src/components/PortfolioGrid.tsx
"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

// -------------------------------------------------------------------
// Selected real projects
// -------------------------------------------------------------------
const projects: {
  title: string;
  slug?: string;
  category: string;
  desc: string;
  tech: string[];
  img: string;
}[] = [
  {
    title: "Dr. Meryem Youssoufi",
    slug: "meryem-youssoufi",
    category: "Web Dev",
    desc: "Trilingual (AR/FR/EN) academic platform for a sociology professor: books, research, supervision, media and courses.",
    tech: ["React", "SEO", "RTL Support", "Vercel CI/CD"],
    img: "/projects/meryem-youssoufi-card.jpg",
  },
  {
    title: "PDFPro",
    slug: "pdfpro",
    category: "Web Dev",
    desc: "Privacy-first PDF toolkit: 26 tools that run 100% in the browser via WebAssembly. Files never leave your device.",
    tech: ["Next.js 16", "React 19", "WebAssembly", "Supabase"],
    img: "/projects/pdfpro-card.jpg",
  },
  {
    title: "SahaTracker",
    slug: "sahatracker",
    category: "AI Solutions",
    desc: "AI health platform linking food to symptoms, with family monitoring, fasting timer and CRM. English + Arabic RTL.",
    tech: ["React 18", "Tailwind CSS", "Claude API", "SVG Charts"],
    img: "/projects/sahatracker-card.jpg",
  },
  {
    title: "Tachelhit 30",
    slug: "azulamazigh",
    category: "Web Dev",
    desc: "Free trilingual platform for learning spoken Tashelhit: 48 audio lessons, a 17,000-word dictionary and Tifinagh tools.",
    tech: ["Astro", "Cloudflare", "Multilingual SEO", "Tifinagh Tools"],
    img: "/projects/azulamazigh-card.jpg",
  },
  {
    title: "Najah Souss Échecs",
    slug: "ansae",
    category: "Web Dev",
    desc: "Premium trilingual website for an Agadir chess club founded in 1987: honors, academy, events, press and shop.",
    tech: ["WordPress", "Headless React", "Polylang", "REST API"],
    img: "/projects/ansae-card.jpg",
  },
  {
    title: "Crochet Patterns Co",
    slug: "crochetpatternsco",
    category: "Web Dev",
    desc: "Fast free crochet-pattern library with a custom WordPress theme and plugin: skill levels, categories and one-click PDFs.",
    tech: ["WordPress", "Custom Theme", "Custom Plugin", "Rank Math SEO"],
    img: "/projects/crochetpatternsco-card.jpg",
  },
];

const filterKeys = [
  { key: "all", value: "All" },
  { key: "web", value: "Web Dev" },
  { key: "ai", value: "AI Solutions" },
];

export default function PortfolioGrid() {
  const t = useTranslations("portfolio");
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="portfolio" className="section-container bg-[#0A0A0A]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="content-wrapper">
        
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16 flex flex-col items-center w-full"
        >
          <span className="badge rounded-full px-5 py-2 border-white/10 bg-white/5 backdrop-blur-sm mb-8">{t("badge")}</span>
          <h2 
            className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight"
            style={{ lineHeight: "1.25" }}
          >
            {t("heading")}
          </h2>
          <p 
            className="text-white/60 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            {t("subheading")}
          </p>
        </motion.div>

        {/* Premium Pill-shaped Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-12 mb-16 max-w-3xl mx-auto relative z-20 px-2">
          {filterKeys.map((opt) => {
            const isActive = activeFilter === opt.value;
            return (
              <button
                key={opt.key}
                onClick={() => setActiveFilter(opt.value)}
                className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 select-none cursor-pointer outline-none ${
                  isActive
                    ? "bg-white text-black font-bold border-white"
                    : "border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t(`categories.${opt.key}`)}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start w-full">
          <AnimatePresence mode="popLayout">
            {filtered.map((proj) => {
              const projectSlug = proj.slug ?? proj.title.toLowerCase().replace(/ /g, "-");
              return (
                <motion.div
                  key={proj.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="group relative rounded-2xl overflow-hidden bg-white/[0.01] backdrop-blur-md border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-500 shadow-xl"
                >
                  <Link href={`/${locale}/portfolio/${projectSlug}`} className="flex flex-col justify-between h-full cursor-pointer">
                    <div>
                      {/* Image Container */}
                      <div className="relative h-56 overflow-hidden">
                        <motion.img
                          src={proj.img}
                          alt={proj.title}
                          className="object-cover w-full h-full"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <div className="px-5 py-2 bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-gold-light)] text-black text-xs font-bold rounded-full flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            {t("viewProject")} <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>

                      {/* Textual content with nested flex gap layout */}
                      <div className="mt-5 px-5 sm:px-6 flex flex-col gap-4">
                        <div>
                          <div className="text-[10px] font-mono tracking-widest text-[var(--color-accent-gold)] mb-2 uppercase">
                            {proj.category}
                          </div>
                          <h3 
                            className="text-xl font-bold text-white tracking-tight"
                            style={{ lineHeight: "1.4" }}
                          >
                            {proj.title}
                          </h3>
                        </div>
                        <p 
                          className="text-sm text-white/70 font-light line-clamp-2"
                          style={{ lineHeight: locale === "ar" ? "1.8" : "1.6" }}
                        >
                          {proj.desc}
                        </p>
                        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[var(--color-accent-gold)] uppercase">
                          {t("viewProject")} <ArrowRight size={14} className="rtl:rotate-180" />
                        </span>
                      </div>
                    </div>

                    {/* Tech Pills Footer */}
                    <div className="px-5 sm:px-6 pt-3 pb-5 flex flex-wrap gap-2">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-[10px] font-semibold bg-white/5 border border-white/5 text-white/50 tracking-wider rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
      </div>
    </section>
  );
}
