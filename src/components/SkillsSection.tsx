"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

const skills = [
  { name: "Generative AI Integration", level: 95 },
  { name: "Next.js & React Architecture", level: 98 },
  { name: "UI/UX Architecture", level: 92 },
  { name: "Supabase & Postgres", level: 88 },
  { name: "Framer Motion & Animations", level: 96 },
  { name: "Technical SEO & Performance", level: 94 },
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
  const inView = useInView(ref, { once: true, margin: "-100px" });
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
    <div className="flex flex-col p-6 bg-white/[0.02] border border-white/5 backdrop-blur-sm">
      <div className="text-4xl md:text-5xl font-black text-[var(--color-accent-red)] tracking-tight">
        <span ref={ref}>0</span>
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.25em] text-white/50 mt-3 font-semibold">
        {label}
      </div>
    </div>
  );
}

function SkillItem({ skill, index }: { skill: { name: string; level: number }; index: number }) {
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
          {skill.name}
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

      {/* 1px Hairline Progress */}
      <div className="h-px w-full bg-white/[0.03] relative overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: skill.level / 100 } : {}}
          transition={{ duration: 2.5, delay: index * 0.2 + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-white/20 origin-left"
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const t = useTranslations("skills");
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section py-40 bg-[#111111] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Heading and 2x2 counters */}
          <div className="flex flex-col gap-12 lg:sticky lg:top-32">
            <motion.div
              ref={headingRef}
              initial={{ opacity: 0, y: 30 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                {t("heading")}<br />
                <span className="font-light text-white/60">{t("headingSub")}</span>
              </h2>
              <p className="text-lg text-white/80 font-light max-w-lg leading-loose">
                {t("desc")}
              </p>
            </motion.div>

            {/* 2x2 Counters Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-4">
              <ScrollCounter value={30} suffix="+" label={t("stats.tech")} />
              <ScrollCounter value={100} suffix="%" label={t("stats.pixel")} />
              <ScrollCounter value={4} suffix="+" label={t("stats.exp")} />
              <ScrollCounter value={24} suffix="h" label={t("stats.response")} />
            </div>
          </div>

          {/* Right Column: Skills Progress bars */}
          <div className="flex flex-col gap-8 lg:mt-8">
            {skills.map((skill, index) => (
              <SkillItem key={skill.name} skill={skill} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
