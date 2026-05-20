"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
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
        <motion.span
          key={i}
          className="inline-block me-2"
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
      ))}
    </span>
  );
}

export default function HeroSection() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Magnetic button effect
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
    const handleLeave = () => {
      btn.style.transform = "";
    };
    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Parallax content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 section-inner px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <span className="badge" style={{ letterSpacing: "0.25em" }}>
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent-gold)]"
            />
            {t("badge")}
          </span>
        </motion.div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter mb-6 overflow-hidden">
          <span className="block text-[var(--color-text-primary)] font-light">
            <AnimatedText text={t("title1")} delay={0.15} />
          </span>
          <span className="block font-black text-white">
            <AnimatedText text={t("title2")} delay={0.3} />
          </span>
          <span className="block text-[var(--color-text-secondary)] text-4xl sm:text-5xl md:text-6xl font-light mt-4">
            <AnimatedText text={t("title3")} delay={0.5} />
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 leading-loose mb-16 tracking-[0.2em] uppercase font-light"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-28"
        >
          <a
            ref={btnRef}
            href="#contact"
            id="hero-cta-primary"
            className="btn-magnetic text-base px-8 py-4 transition-all duration-200"
            style={{ transitionProperty: "transform, box-shadow" }}
          >
            <span className="flex items-center gap-2 uppercase tracking-[0.2em] text-xs font-semibold">
              {t("cta")}
              <ArrowRight size={14} />
            </span>
          </a>

          <a
            href="#portfolio"
            id="hero-cta-secondary"
            className="flex items-center gap-2 px-8 py-4 rounded-[var(--radius-btn)] text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all duration-300 hover:bg-white/5 uppercase tracking-[0.2em]"
          >
            View Portfolio
          </a>
        </motion.div>

        {/* Floating tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <TechBadge icon={Code2} label="Next.js 16" delay={1.3} />
          <TechBadge icon={Brain} label="AI / LLM" delay={1.4} />
          <TechBadge icon={Sparkles} label="Framer Motion" delay={1.5} />
          <TechBadge icon={TrendingUp} label="Supabase" delay={1.6} />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-16 flex flex-col items-center gap-2 text-[var(--color-text-muted)] text-xs tracking-[0.3em] uppercase"
        >
          <span>{t("scroll")}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-white to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
