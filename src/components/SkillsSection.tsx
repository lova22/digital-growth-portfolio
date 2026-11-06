"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

type Group = { id: string; title: Record<string, string>; items: string[] };

const groups: Group[] = [
  {
    id: "web",
    title: { en: "Website building", fr: "Création de sites web", ar: "بناء المواقع" },
    items: ["WordPress", "Elementor Pro", "WooCommerce", "Website Design", "Website Development", "Web Hosting", "Cloudflare", "HTML", "CSS", "JavaScript", "PHP", "MySQL", "AI Vibe Coding"],
  },
  {
    id: "seo",
    title: { en: "SEO & analytics", fr: "SEO & analytique", ar: "تحسين البحث والتحليلات" },
    items: ["SEO", "Technical SEO", "SEO Strategy", "Website Audit", "Semrush", "Ahrefs", "Google Analytics", "Google Ads"],
  },
  {
    id: "design",
    title: { en: "Design", fr: "Design", ar: "التصميم" },
    items: ["UI/UX Design", "Figma", "Graphic Design", "Logo Design", "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign"],
  },
  {
    id: "marketing",
    title: { en: "Marketing & strategy", fr: "Marketing & stratégie", ar: "التسويق والاستراتيجية" },
    items: ["Brand Strategy", "Business Strategy", "Content Creation", "Community Management"],
  },
  {
    id: "video",
    title: { en: "Video & audio", fr: "Vidéo & audio", ar: "الفيديو والصوت" },
    items: ["Video Editing", "Adobe Premiere Pro", "Adobe After Effects", "Audio Editing"],
  },
  {
    id: "other",
    title: { en: "AI & office", fr: "IA & bureautique", ar: "الذكاء الاصطناعي والمكتب" },
    items: ["Generative AI", "Microsoft Office"],
  },
];

// Scroll-triggered Animated Counter Component
function ScrollCounter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        if (ref.current) ref.current.textContent = String(value);
        return;
      }
      const node = ref.current;
      if (!node) return;

      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress * (2 - progress);
        const current = Math.round(ease * value);
        node.textContent = String(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, value, started]);

  return (
    <div className="flex flex-col p-5 sm:p-6 bg-white/[0.01] border border-white/5 rounded-2xl backdrop-blur-md shadow-lg hover:border-white/10 transition-colors duration-500">
      <div className="text-4xl md:text-5xl font-black text-[var(--color-accent-red)] tracking-tight">
        <span ref={ref}>0</span>
        {suffix}
      </div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 mt-3 font-bold">
        {label}
      </div>
    </div>
  );
}

function SkillGroup({ group, index, locale }: { group: Group; index: number; locale: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const featured = index === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7 hover:border-white/20 transition-colors duration-500 ${featured ? "sm:col-span-2" : ""}`}
    >
      <h3 className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-gold)] mb-5">
        <span>{group.title[locale] ?? group.title.en}</span>
        <span className="text-white/60 font-mono tracking-normal">{String(group.items.length).padStart(2, "0")}</span>
      </h3>
      <ul className="flex flex-wrap gap-2" dir="ltr">
        {group.items.map((item) => (
          <li
            key={item}
            className={`px-3 py-1.5 rounded-full border text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300 ${
              featured ? "border-[var(--color-accent-gold)]/30 bg-[var(--color-accent-gold)]/5" : "border-white/10 bg-white/5"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function SkillsSection() {
  const t = useTranslations("skills");
  const locale = useLocale();
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-container bg-[#0A0A0A]">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="content-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          <div className="flex flex-col gap-10 lg:sticky lg:top-32 items-center lg:items-start text-center lg:text-left">
            <motion.div
              ref={headingRef}
              initial={{ opacity: 0, y: 30 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex mb-8 justify-center lg:justify-start">
                <span className="badge rounded-full px-5 py-2 border-white/10 bg-white/5 backdrop-blur-sm">{t("badge")}</span>
              </div>
              <h2 
                className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight"
                style={{ lineHeight: "1.3" }}
              >
                {t("heading")}<br />
                <span className="font-light text-white/50">{t("headingSub")}</span>
              </h2>
              <p 
                className="text-base text-white/60 max-w-2xl leading-relaxed mx-auto lg:mx-0"
              >
                {t("desc")}
              </p>
              {/* Tech Stack Mad Libs */}
              <p 
                className="mt-6 text-sm text-[var(--color-accent-gold)]/70 border-t lg:border-t-0 border-l-0 lg:border-l-2 border-[var(--color-accent-gold)] pt-4 lg:pt-0 pl-0 lg:pl-4 italic max-w-2xl mx-auto lg:mx-0"
                style={{ lineHeight: locale === "ar" ? "1.8" : "1.6" }}
              >
                {t("techStack")}
              </p>
            </motion.div>
 
            {/* 2x2 Counters Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-2">
              <ScrollCounter value={38} suffix="+" label={t("stats.tech")} />
              <ScrollCounter value={3} suffix="" label={t("stats.pixel")} />
              <ScrollCounter value={19} suffix="+" label={t("stats.exp")} />
              <ScrollCounter value={24} suffix="h" label={t("stats.response")} />
            </div>
          </div>
 
          {/* Right Column: grouped skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:mt-4">
            {groups.map((group, index) => (
              <SkillGroup key={group.id} group={group} index={index} locale={locale} />
            ))}
          </div>
 
        </div>
      </div>
    </section>
  );
}
