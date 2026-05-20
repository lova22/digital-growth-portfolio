"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Working with this agency fundamentally changed how we are perceived online. The attention to microscopic detail is unlike anything we've seen.",
    author: "Elena R.",
    role: "CEO, TechVentures",
  },
  {
    quote: "A rare breed of talent. The intersection of highly technical engineering and an almost obsessive eye for luxury design.",
    author: "Marcus T.",
    role: "Founder, Apex Capital",
  },
  {
    quote: "They don't just build websites, they engineer digital authority. The final product commanded absolute respect from our investors.",
    author: "Sarah L.",
    role: "VP Marketing, Lumina",
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section py-40 bg-[#050505] flex items-center justify-center relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        <span className="text-[var(--color-accent-gold)] text-xs tracking-[0.3em] uppercase mb-16 block">
          Client Authority
        </span>

        <div className="min-h-[300px] sm:min-h-[220px] md:min-h-[180px] flex items-center justify-center relative w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center justify-center text-center"
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/95 leading-relaxed tracking-wide italic mb-10 max-w-4xl">
                &ldquo;{testimonials[index].quote}&rdquo;
              </p>
              
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm tracking-[0.2em] text-[var(--color-accent-gold)] font-semibold uppercase">
                  {testimonials[index].author}
                </span>
                <span className="text-xs text-white/40 tracking-[0.15em] uppercase">
                  {testimonials[index].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-4 mt-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="group py-4 px-2"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className={`h-px transition-all duration-700 ${
                  i === index ? "w-12 bg-[var(--color-accent-gold)]" : "w-6 bg-white/20 group-hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
