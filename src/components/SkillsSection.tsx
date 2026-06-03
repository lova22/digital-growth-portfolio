"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, useSpring, useTransform } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const skills = [
  { key: "ai", level: 95 },
  { key: "react", level: 98 },
  { key: "uiux", level: 92 },
  { key: "database", level: 88 },
  { key: "animations", level: 96 },
  { key: "seo", level: 94 },
];

function AnimatedCounter({ value, inView }: { value: number; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const springValue = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, springValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span>{displayValue}%</span>;
}

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
    <div className="flex flex-col p-6 bg-white/[0.01] border border-white/5 rounded-2xl backdrop-blur-md shadow-lg hover:border-white/10 transition-colors duration-500">
      <div className="text-4xl md:text-5xl font-black text-[var(--color-accent-red)] tracking-tight">
        <span ref={ref}>0</span>
        {suffix}
      </div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-3 font-bold">
        {label}
      </div>
    </div>
  );
}

function SkillItem({ skill, index }: { skill: { key: string; level: number }; index: number }) {
  const t = useTranslations("skills");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="group cursor-default py-8">
      <div className="flex items-end justify-between mb-5">
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl font-light text-white tracking-wide group-hover:text-[var(--color-accent-gold)] transition-colors duration-500"
        >
          {t(`items.${skill.key}`)}
        </motion.h4>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: index * 0.2 + 0.5 }}
          className="text-sm font-medium text-white/40 tracking-widest"
        >
          <AnimatedCounter value={skill.level} inView={inView} />
        </motion.div>
      </div>

      {/* 3px Sleek Dashboard Progress */}
      <div className="h-[3px] w-full bg-white/5 rounded-full relative overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: skill.level / 100 } : {}}
          transition={{ duration: 2.2, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 bg-gradient-to-r from-red-500 to-amber-500 origin-left rounded-full"
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const t = useTranslations("skills");
  const locale = useLocale();
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="w-full bg-[#050505] py-24 md:py-32 relative overflow-hidden flex flex-col items-center">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Heading and 2x2 counters */}
          <div className="flex flex-col gap-10 lg:sticky lg:top-32">
            <motion.div
              ref={headingRef}
              initial={{ opacity: 0, y: 30 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex mb-6">
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
                className="text-base text-white/60 max-w-2xl"
                style={{ lineHeight: locale === "ar" ? "1.9" : "1.65" }}
              >
                {t("desc")}
              </p>
              {/* Tech Stack Mad Libs */}
              <p 
                className="mt-6 text-sm text-[var(--color-accent-gold)]/70 border-l-2 border-[var(--color-accent-gold)] pl-4 italic max-w-2xl"
                style={{ lineHeight: locale === "ar" ? "1.8" : "1.6" }}
              >
                {t("techStack")}
              </p>
            </motion.div>
 
            {/* 2x2 Counters Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-2">
              <ScrollCounter value={30} suffix="+" label={t("stats.tech")} />
              <ScrollCounter value={100} suffix="%" label={t("stats.pixel")} />
              <ScrollCounter value={4} suffix="+" label={t("stats.exp")} />
              <ScrollCounter value={24} suffix="h" label={t("stats.response")} />
            </div>
          </div>
 
          {/* Right Column: Skills Progress bars */}
          <div className="flex flex-col gap-6 lg:mt-4">
            {skills.map((skill, index) => (
              <SkillItem key={skill.key} skill={skill} index={index} />
            ))}
          </div>
 
        </div>
      </div>
    </section>
  );
}
