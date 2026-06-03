"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  MonitorSmartphone,
  TrendingUp,
  Palette,
  Megaphone,
  Brain,
  Rocket,
  ArrowRight,
} from "lucide-react";

const icons = [
  MonitorSmartphone,
  TrendingUp,
  Palette,
  Megaphone,
  Brain,
  Rocket,
];

const accentColors = [
  "var(--color-accent-red)",
  "#ffffff",
  "var(--color-accent-red)",
  "#ffffff",
  "var(--color-accent-red)",
  "#ffffff",
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const bentoClasses = [
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-1",
];

function ServiceCard({
  title,
  desc,
  index,
  locale,
}: {
  title: string;
  desc: string;
  index: number;
  locale: string;
}) {
  const Icon = icons[index];
  const color = accentColors[index];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      className={`service-card group flex flex-col justify-between h-full p-6 sm:p-8 md:p-10 ${bentoClasses[index]}`}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (e.currentTarget as HTMLDivElement).style.setProperty("--mx", `${x}%`);
        (e.currentTarget as HTMLDivElement).style.setProperty("--my", `${y}%`);
      }}
    >
      <div className="flex flex-col gap-5">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border"
          style={{
            background: `rgba(255, 255, 255, 0.02)`,
            borderColor: `rgba(255, 255, 255, 0.06)`,
          }}
        >
          <Icon size={20} style={{ color }} />
        </div>

        <div>
          {/* Number */}
          <span
            className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block opacity-50"
            style={{ color }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Title */}
          <h3 
            className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)]"
            style={{ lineHeight: "1.4", marginBottom: "0.75rem" }}
          >
            {title}
          </h3>

          {/* Desc */}
          <p 
            className="text-sm text-white/60 font-light"
            style={{ lineHeight: locale === "ar" ? "1.8" : "1.6", minHeight: "3.5rem" }}
          >
            {desc}
          </p>
        </div>
      </div>

      {/* Learn more */}
      <a
        href="#contact"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 group-hover:gap-2.5"
        style={{ color, marginTop: "2rem" }}
      >
        {locale === "en" ? "Learn more" : locale === "fr" ? "En savoir plus" : "اقرأ المزيد"}
        <ArrowRight size={14} />
      </a>
    </motion.div>
  );
}

export default function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();
  const items = t.raw("items") as { title: string; desc: string }[];

  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="w-full bg-[#050505] py-36 md:py-48 lg:py-64 relative overflow-hidden flex flex-col items-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24 md:mb-32 flex flex-col items-center w-full"
        >
          <span className="badge rounded-full px-5 py-2 border-white/10 bg-white/5 backdrop-blur-sm mb-8">{t("badge")}</span>
          <h2 
            className="text-4xl md:text-5xl font-black text-[var(--color-text-primary)] mb-6 uppercase tracking-tight"
            style={{ lineHeight: "1.25" }}
          >
            {t("heading")}
          </h2>
          <p 
            className="text-white/60 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            {locale === "en" ? (
              <>
                End-to-end digital solutions <span className="text-[var(--color-accent-gold)] font-medium">crafted with precision</span>.
              </>
            ) : locale === "fr" ? (
              <>
                Des solutions numériques de bout en bout <span className="text-[var(--color-accent-gold)] font-medium">conçues avec précision</span>.
              </>
            ) : (
              <>
                حلول رقمية متكاملة <span className="text-[var(--color-accent-gold)] font-medium">مصممة بدقة متناهية</span>.
              </>
            )}
          </p>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full">
          {items.map((item, i) => (
            <ServiceCard
              key={i}
              index={i}
              title={item.title}
              desc={item.desc}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
