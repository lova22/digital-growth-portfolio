"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Lock } from "lucide-react";

export default function RightClickGuard() {
  const t = useTranslations("guard");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setShowToast(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = (e.key || "").toUpperCase();
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (key === "I" || key === "J" || key === "C")) ||
        (e.ctrlKey && key === "U")
      ) {
        e.preventDefault();
        setShowToast(true);
      }
    };

    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-6 py-3.5 bg-[#0D0D0D] border border-[var(--color-accent-gold)] shadow-[0_15px_40px_rgba(0,0,0,0.8)] text-white text-xs font-mono uppercase tracking-[0.15em] whitespace-nowrap"
        >
          <Lock className="text-[var(--color-accent-gold)] animate-pulse" size={14} />
          <span>{t("blocked")}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
