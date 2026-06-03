"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

interface ValueItem {
  num: string;
  title: string;
  desc: string;
}

function ValueCard({ item, index, locale }: { item: ValueItem; index: number; locale: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const label = locale === "en" ? "Principle" : locale === "fr" ? "Principe" : "المبدأ";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`relative p-6 sm:p-8 md:p-10 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md overflow-hidden group hover:border-white/10 transition-all duration-500 flex flex-col justify-between min-h-[320px] md:min-h-[350px] ${
        index === 2 ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      {/* Subtle top red light */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div>
        {/* Floating Number */}
        <div className="text-sm font-mono tracking-widest text-[var(--color-accent-gold)] mb-8 flex items-center justify-between">
          <span className="uppercase">{label} {item.num}</span>
          <span className="text-white/20 select-none font-bold text-lg">//{item.num}</span>
        </div>

        {/* Title */}
        <h3 
          className="text-2xl font-bold text-white mb-6 tracking-tight group-hover:text-[var(--color-accent-gold)] transition-colors duration-300"
          style={{ lineHeight: "1.4" }}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p 
          className="text-sm text-white/50 font-light leading-loose"
        >
          {item.desc}
        </p>
      </div>

      {/* Bottom alignment group */}
      <div>
        {/* Elegant bottom interaction button */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--color-accent-gold)] uppercase group-hover:text-white transition-colors duration-300 mt-8">
          <span>{locale === "en" ? "Explore" : locale === "fr" ? "Explorer" : "استكشف"}</span>
          <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
        </div>
        
        {/* Animated bottom bar */}
        <div className="w-full h-[2px] bg-white/5 mt-6 overflow-hidden relative">
          <div className="absolute inset-0 bg-red-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
        </div>
      </div>
    </motion.div>
  );
}

export default function ValuesSection() {
  const t = useTranslations("values");
  const locale = useLocale();
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  const items = t.raw("items") as ValueItem[];

  return (
    <section id="values" className="w-full bg-[#050505] py-36 md:py-48 lg:py-64 relative overflow-hidden flex flex-col items-center">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500/5 blur-[130px] rounded-full pointer-events-none" />

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
            {t("subheading")}
          </p>
        </motion.div>

        {/* 3-Column Values Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-stretch w-full">
          {items.map((item, index) => (
            <ValueCard key={item.num} item={item} index={index} locale={locale} />
          ))}
        </div>

      </div>
    </section>
  );
}
