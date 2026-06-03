"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const logos = [
  <svg className="w-36 h-12 text-white opacity-40 mb-8" viewBox="0 0 140 40" fill="currentColor" key="logo-0">
    <path d="M10,12 L20,6 L30,12 L30,24 L20,30 L10,24 Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M10,12 L20,18 L30,12" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M20,18 L20,30" fill="none" stroke="currentColor" strokeWidth="2" />
    <text x="40" y="24" fontSize="9" fontWeight="900" letterSpacing="2" fill="currentColor">TECHVENTURES</text>
  </svg>,
  <svg className="w-36 h-12 text-white opacity-40 mb-8" viewBox="0 0 140 40" fill="currentColor" key="logo-1">
    <path d="M10,28 L22,6 L34,28 Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M15,28 L22,14 L29,28 Z" fill="currentColor" />
    <text x="44" y="24" fontSize="9" fontWeight="900" letterSpacing="2" fill="currentColor">APEX CAPITAL</text>
  </svg>,
  <svg className="w-36 h-12 text-white opacity-40 mb-8" viewBox="0 0 140 40" fill="currentColor" key="logo-2">
    <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="20" y1="6" x2="20" y2="10" stroke="currentColor" strokeWidth="2" />
    <line x1="20" y1="30" x2="20" y2="34" stroke="currentColor" strokeWidth="2" />
    <line x1="6" y1="20" x2="10" y2="20" stroke="currentColor" strokeWidth="2" />
    <line x1="30" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="2" />
    <text x="44" y="24" fontSize="9" fontWeight="900" letterSpacing="2" fill="currentColor">LUMINA INTERN</text>
  </svg>
];

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  initials: string;
}

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const [index, setIndex] = useState(0);

  const items = t.raw("items") as TestimonialItem[];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <section className="section py-32 bg-[#050505] flex items-center justify-center relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        
        <span className="text-[var(--color-accent-red)] text-xs tracking-[0.3em] uppercase mb-12 block font-semibold">
          {t("badge")}
        </span>

        <div className="min-h-[400px] sm:min-h-[340px] md:min-h-[300px] flex items-center justify-center relative w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center justify-center text-center animate-fade-in"
            >
              {/* Company Logo at 30% Opacity */}
              <div className="flex justify-center mb-6">
                {logos[index]}
              </div>

              {/* Quote */}
              <p 
                className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 tracking-wide italic mb-10 max-w-4xl"
                style={{ lineHeight: locale === "ar" ? "1.9" : "1.7" }}
              >
                &ldquo;{items[index].quote}&rdquo;
              </p>
              
              {/* Circular Avatar Placeholder (80px) & Details */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-base font-black text-[var(--color-accent-red)] mb-4 shadow-[0_0_20px_rgba(255,0,0,0.05)]">
                  {items[index].initials}
                </div>
                <span className="text-sm tracking-[0.2em] text-white font-bold uppercase mb-1">
                  {items[index].author}
                </span>
                <span className="text-xs text-white/40 tracking-[0.15em] uppercase font-medium">
                  {items[index].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-3 mt-10">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="group py-2 px-1"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className={`h-[2px] transition-all duration-700 ${
                  i === index ? "w-10 bg-[var(--color-accent-red)]" : "w-5 bg-white/20 group-hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
