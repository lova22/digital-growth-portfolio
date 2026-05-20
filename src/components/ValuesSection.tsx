"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const values = [
  {
    num: "01",
    title: "Uncompromising Quality",
    desc: "We do not ship standard. Every pixel, every animation, and every line of code is heavily scrutinized to deliver a flawless, Awwwards-level experience.",
  },
  {
    num: "02",
    title: "Cinematic Execution",
    desc: "Digital products should feel alive. We leverage heavy easing, microscopic hairlines, and tactical whitespace to craft experiences that command attention.",
  },
  {
    num: "03",
    title: "Architectural Velocity",
    desc: "Speed without technical debt. By utilizing Next.js, Framer Motion, and scalable Postgres databases, we build foundations that are fast to deploy and ready to scale.",
  },
];

function ValueItem({ item, index }: { item: { num: string; title: string; desc: string }; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative py-32 sm:py-40 border-b border-white/5 last:border-0 group cursor-default">
      {/* Giant Watermark Number */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 0.03, x: 0 } : {}}
        transition={{ duration: 1.5, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 -z-10 text-[12rem] sm:text-[18rem] md:text-[24rem] font-thin leading-none tracking-tighter text-white select-none pointer-events-none"
      >
        {item.num}
      </motion.div>

      <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-start relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: index * 0.2 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:w-1/3"
        >
          <span className="text-[var(--color-accent-gold)] text-sm tracking-[0.3em] uppercase mb-4 block">
            Principle {item.num}
          </span>
          <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight">
            {item.title}
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: index * 0.2 + 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="md:w-2/3"
        >
          <p className="text-xl md:text-2xl text-white/80 font-light leading-loose transition-colors duration-700">
            {item.desc}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function ValuesSection() {
  return (
    <section id="values" className="section py-0 bg-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col">
          {values.map((item, index) => (
            <ValueItem key={item.num} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
