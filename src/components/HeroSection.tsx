"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Sparkles, Code2, Brain, TrendingUp } from "lucide-react";

// Ambient Glow
function AmbientGlow({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 10, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// Animated tech badge
function TechBadge({
  icon: Icon,
  label,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="glass flex items-center gap-2 px-4 py-2 rounded-none border border-[var(--color-border)] text-xs tracking-[0.25em] uppercase font-medium text-[var(--color-text-secondary)] select-none"
    >
      <Icon size={14} className="text-[var(--color-accent-gold)]" />
      {label}
    </motion.div>
  );
}

// Text character reveal animation
function AnimatedText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: delay + i * 0.1,
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>{"\u00A0"}</span>}
        </span>
      ))}
    </span>
  );
}

// Animated Stat Counter Component
function AnimatedStat({
  value,
  suffix = "",
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      node.textContent = String(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 2.0,
      delay: delay + 0.2, // Small delay for mount smoothness
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        node.textContent = Math.round(latest).toString();
      },
    });

    return () => controls.stop();
  }, [value, delay]);

  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-baseline justify-center">
        <span ref={ref}>0</span>
        <span className="text-[var(--color-accent-red)]">{suffix}</span>
      </div>
      <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 mt-2 font-medium">
        {label}
      </div>
    </div>
  );
}

// Updated HeroSection with demo data
export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Magnetic button effect remains unchanged
  const btnRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
    };
    const handleLeave = () => { btn.style.transform = ""; };
    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);
    return () => { btn.removeEventListener("mousemove", handleMove); btn.removeEventListener("mouseleave", handleLeave); };
  }, []);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background ambient glows */}
      <AmbientGlow className="top-1/4 left-1/4 w-[400px] h-[400px] bg-red-500/10" delay={0} />
      <AmbientGlow className="bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/5" delay={2} />

      {/* Grid lines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Parallax content */}
      <motion.div style={{ y, opacity }} className="relative z-10 section-inner px-6 text-center max-w-5xl">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex justify-center mb-10">
          <span className="badge rounded-full px-5 py-2 border-white/10 bg-white/5 backdrop-blur-sm ltr:tracking-[0.25em] rtl:tracking-normal">
            <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent-gold)]" />
            {t("badge")}
          </span>
        </motion.div>

        {/* Main headline */}
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight mb-8 overflow-hidden"
          style={{ lineHeight: locale === "ar" ? "1.3" : "1.22" }}
        >
          <span className="block text-[var(--color-text-primary)] font-light"><AnimatedText text={t("title1")} delay={0.15} /></span>
          <span className="block font-black text-white"><AnimatedText text={t("title2")} delay={0.3} /></span>
          <span className="block text-[var(--color-text-secondary)] text-3xl sm:text-4xl md:text-5xl font-light mt-4"><AnimatedText text={t("title3")} delay={0.5} /></span>
        </h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1.0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }} 
          className="max-w-3xl mx-auto text-base md:text-lg text-white/70 font-light"
          style={{ 
            lineHeight: locale === "ar" ? "1.9" : "1.65", 
            marginBottom: "3.5rem" 
          }}
        >
          {t("subtitle")}
        </motion.p>

        {/* Structural spacing wrapper for CTA buttons and Stats Capsule */}
        <div className="flex flex-col gap-14 items-center w-full my-12">
          {/* CTA buttons */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="flex flex-wrap items-center justify-center gap-6">
            <a ref={btnRef} href="#contact" id="hero-cta-primary" className="btn-magnetic text-xs rounded-full px-8 py-4 transition-all duration-200" style={{ transitionProperty: "transform, box-shadow" }}>
              <span className="flex items-center gap-2 ltr:uppercase ltr:tracking-[0.2em] rtl:normal-case rtl:tracking-normal font-bold">
                {t("cta")} <ArrowRight size={14} />
              </span>
            </a>
            <a href="#portfolio" id="hero-cta-secondary" className="flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold text-[var(--color-text-secondary)] hover:text-white border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/5 ltr:uppercase ltr:tracking-[0.2em] rtl:normal-case rtl:tracking-normal">
              {t("portfolio")}
            </a>
          </motion.div>

          {/* Stats Row Capsule */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-4xl mx-auto p-8 md:py-8 md:px-14 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <AnimatedStat value={100} suffix="+" label={t("stats.projects")} delay={1.5} />
            <div className="hidden md:block w-px h-10 bg-white/10 self-center" />
            <AnimatedStat value={89} label={t("stats.clients")} delay={1.7} />
            <div className="hidden md:block w-px h-10 bg-white/10 self-center" />
            <div className="flex flex-col items-center text-center px-4">
              <div className="text-xl md:text-2xl font-black text-emerald-400 tracking-tight flex items-center justify-center gap-2 md:h-[48px] h-[40px]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="uppercase tracking-widest text-emerald-400">
                  {locale === "en" ? "Available" : locale === "fr" ? "Disponible" : "متاح"}
                </span>
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 mt-2 font-medium">{t("stats.availability")}</div>
            </div>
          </motion.div>
        </div>

        {/* Structural spacing wrapper for Tech pills and Scroll indicator */}
        <div className="flex flex-col gap-12 items-center w-full mt-16">
          {/* New tech line structured as pill badges */}
          <div className="flex flex-wrap gap-4 mt-6 justify-center items-center max-w-2xl mx-auto">
            {["WordPress", "Adobe CC", "AI Automation", "Google Analytics 4"].map((tool) => (
              <span 
                key={tool} 
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-300 select-none"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="flex flex-col items-center gap-2 text-[var(--color-text-muted)] text-xs tracking-[0.3em] uppercase">
            <span>{t("scroll")}</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
