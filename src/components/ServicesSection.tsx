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
  "var(--color-accent-gold)",
  "#ffffff",
  "var(--color-accent-gold)",
  "#ffffff",
  "var(--color-accent-gold)",
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

function ServiceCard({
  title,
  desc,
  index,
}: {
  title: string;
  desc: string;
  index: number;
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
      className="service-card group mb-12"
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (e.currentTarget as HTMLDivElement).style.setProperty("--mx", `${x}%`);
        (e.currentTarget as HTMLDivElement).style.setProperty("--my", `${y}%`);
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-none flex items-center justify-center mb-5 border"
        style={{
          background: `rgba(255, 255, 255, 0.02)`,
          borderColor: `rgba(255, 255, 255, 0.05)`,
        }}
      >
        <Icon size={22} style={{ color }} />
      </div>

      {/* Number */}
      <span
        className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block"
        style={{ color }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title */}
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 leading-snug">
        {title}
      </h3>

      {/* Desc */}
      <p className="text-sm text-[var(--color-text-secondary)] leading-loose mb-5">
        {desc}
      </p>

      {/* Learn more */}
      <a
        href="#contact"
        className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 group-hover:gap-2.5 mb-8"
        style={{ color }}
      >
        Learn more
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
    <section id="services" className="section">
      <div className="section-inner mb-20">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-32"
        >
          <div className="flex justify-center mb-8">
            <span className="badge">Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--color-text-primary)] mb-8 uppercase tracking-tight">
            {t("heading")}
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed tracking-wide mt-6">
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

        {/* Grid updated to 3 columns on lg to accommodate 6 cards cleanly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 xl:gap-16">
          {items.map((item, i) => (
            <ServiceCard
              key={i}
              index={i}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
