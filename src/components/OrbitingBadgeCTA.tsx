"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface OrbitingBadgeCTAProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function OrbitingBadgeCTA({
  text,
  onClick,
  type = "button",
  disabled = false,
}: OrbitingBadgeCTAProps) {
  // Repeated pattern for SVG circular text path
  const repeatedText = `${text.toUpperCase()} · ${text.toUpperCase()} · `;

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover="hover"
      className="relative flex items-center justify-center w-28 h-28 rounded-full focus:outline-none select-none group disabled:opacity-50"
    >
      {/* Outer spinning text (SVG) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear",
        }}
        className="absolute inset-0 w-full h-full text-white/40 group-hover:text-[var(--color-accent-gold)] transition-colors duration-500"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            id="textPathId"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            fill="none"
          />
          <text className="text-[7px] font-mono font-medium uppercase tracking-[2px] fill-current">
            <textPath href="#textPathId" startOffset="0%">
              {repeatedText}
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Inner hover circle with arrow */}
      <motion.div
        variants={{
          hover: { scale: 1.1, backgroundColor: "var(--color-accent-gold)" },
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 group-hover:border-transparent transition-colors duration-500"
      >
        <motion.div
          variants={{
            hover: { rotate: 45, color: "#000000" },
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-white"
        >
          <ArrowUpRight size={18} />
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
