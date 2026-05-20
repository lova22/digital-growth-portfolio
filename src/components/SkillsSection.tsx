"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, useSpring, useTransform } from "framer-motion";

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

function SkillItem({ skill, index }: { skill: { name: string; level: number }; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="group cursor-default py-8">
      <div className="flex items-end justify-between mb-5">
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl font-light text-white tracking-wide group-hover:text-[var(--color-accent-gold)] transition-colors duration-500"
        >
          {skill.name}
        </motion.h4>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: index * 0.1 + 0.5 }}
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
          transition={{ duration: 2.5, delay: index * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-white/20 origin-left"
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section py-32 bg-[#050505]">
      <div className="section-inner max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            Mastery &<br />
            <span className="font-light text-white/60">Execution</span>
          </h2>
          <p className="text-lg text-white/40 font-light max-w-lg leading-loose">
            Precision engineering paired with high-end aesthetic execution. 
            Delivering bleeding-edge performance wrapped in uncompromising luxury.
          </p>
        </motion.div>

        {/* Skills List - doubled vertical spacing */}
        <div className="flex flex-col gap-12">
          {skills.map((skill, index) => (
            <SkillItem key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
