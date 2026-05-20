"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Working with this agency fundamentally changed how we are perceived online. The attention to microscopic detail is unlike anything we've seen.",
    author: "Elena R.",
    role: "CEO, TechVentures",
    initials: "ER",
    logo: (
      <svg className="w-36 h-12 text-white opacity-40 mb-8" viewBox="0 0 140 40" fill="currentColor">
        <path d="M10,12 L20,6 L30,12 L30,24 L20,30 L10,24 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10,12 L20,18 L30,12" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20,18 L20,30" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="40" y="24" fontSize="9" fontWeight="900" letterSpacing="2" fill="currentColor">TECHVENTURES</text>
      </svg>
    ),
  },
  {
    quote: "A rare breed of talent. The intersection of highly technical engineering and an almost obsessive eye for luxury design.",
    author: "Marcus T.",
    role: "Founder, Apex Capital",
    initials: "MT",
    logo: (
      <svg className="w-36 h-12 text-white opacity-40 mb-8" viewBox="0 0 140 40" fill="currentColor">
        <path d="M10,28 L22,6 L34,28 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M15,28 L22,14 L29,28 Z" fill="currentColor" />
        <text x="44" y="24" fontSize="9" fontWeight="900" letterSpacing="2" fill="currentColor">APEX CAPITAL</text>
      </svg>
    ),
  },
  {
    quote: "They don't just build websites, they engineer digital authority. The final product commanded absolute respect from our investors.",
    author: "Sarah L.",
    role: "VP Marketing, Lumina",
    initials: "SL",
    logo: (
      <svg className="w-36 h-12 text-white opacity-40 mb-8" viewBox="0 0 140 40" fill="currentColor">
        <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="6" x2="20" y2="10" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="30" x2="20" y2="34" stroke="currentColor" strokeWidth="2" />
        <line x1="6" y1="20" x2="10" y2="20" stroke="currentColor" strokeWidth="2" />
        <line x1="30" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="2" />
        <text x="44" y="24" fontSize="9" fontWeight="900" letterSpacing="2" fill="currentColor">LUMINA INTERN</text>
      </svg>
    ),
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
        
        <span className="text-[var(--color-accent-red)] text-xs tracking-[0.3em] uppercase mb-16 block font-semibold">
          Client Authority
        </span>

        <div className="min-h-[440px] sm:min-h-[380px] md:min-h-[340px] flex items-center justify-center relative w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center justify-center text-center"
            >
              {/* Company Logo at 40% Opacity */}
              <div className="flex justify-center">
                {testimonials[index].logo}
              </div>

              {/* Quote - Serif font */}
              <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-white/90 leading-relaxed tracking-wide italic mb-10 max-w-4xl">
                &ldquo;{testimonials[index].quote}&rdquo;
              </p>
              
              {/* Circular Avatar Placeholder (80px) & Details */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg font-black text-[var(--color-accent-red)] mb-4 shadow-[0_0_20px_rgba(255,0,0,0.05)]">
                  {testimonials[index].initials}
                </div>
                <span className="text-sm tracking-[0.2em] text-white font-bold uppercase mb-1">
                  {testimonials[index].author}
                </span>
                <span className="text-xs text-white/40 tracking-[0.15em] uppercase font-medium">
                  {testimonials[index].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-4 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="group py-4 px-2"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className={`h-[2px] transition-all duration-700 ${
                  i === index ? "w-12 bg-[var(--color-accent-red)]" : "w-6 bg-white/20 group-hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
