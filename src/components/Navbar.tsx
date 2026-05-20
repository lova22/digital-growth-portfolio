"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const locales = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [pathname]);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setLangOpen(false);
  };

  const navLinks = [
    { href: "#services", label: t("services") },
    { href: "#portfolio", label: t("portfolio") },
    { href: "#contact", label: t("contact") },
  ];

  const currentLocale = locales.find((l) => l.code === locale);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled || mobileOpen
            ? "glass-navbar"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            id="nav-logo"
            className="flex items-center gap-2 group z-[60]"
          >
            <span className="w-8 h-8 flex items-center justify-center text-white font-black text-sm border border-white/20 bg-white/5 backdrop-blur-sm">
              DG
            </span>
            <span className="font-bold text-sm text-[var(--color-text-primary)] hidden sm:block tracking-widest uppercase group-hover:text-[var(--color-accent-gold)] transition-colors duration-500">
              Digital Growth
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-gold)] transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-[var(--color-accent-gold)] hover:after:w-full after:transition-all after:duration-500"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: lang switcher + CTA */}
          <div className="flex items-center gap-6 z-[60]">
            {/* Language switcher */}
            <div className="relative hidden sm:block">
              <button
                id="lang-switcher-btn"
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors duration-300"
              >
                <Globe size={14} />
                <span>{currentLocale?.code.toUpperCase()}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute end-0 mt-4 w-40 bg-[#050505] border border-white/10 shadow-2xl overflow-hidden"
                  >
                    {locales.map((loc) => (
                      <button
                        key={loc.code}
                        id={`lang-${loc.code}`}
                        onClick={() => switchLocale(loc.code)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 text-xs tracking-widest uppercase transition-colors duration-300",
                          loc.code === locale
                            ? "bg-white/5 text-[var(--color-accent-gold)]"
                            : "text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <span>{loc.flag}</span>
                        <span>{loc.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA button (desktop) */}
            <a
              href="#contact"
              id="nav-cta"
              className="hidden md:inline-flex border-b border-white/20 hover:border-white pb-1 text-xs uppercase tracking-widest text-white transition-colors duration-500"
            >
              {t("cta")}
            </a>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 text-white hover:text-[var(--color-accent-gold)] transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-center px-6 sm:px-12"
          >
            <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 md:gap-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white hover:text-[var(--color-accent-gold)] transition-colors duration-500"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="pt-12 mt-12 border-t border-white/10 flex flex-col gap-6"
              >
                <div className="flex flex-col gap-4">
                  <span className="text-xs uppercase tracking-widest text-white/40">Language</span>
                  <div className="flex gap-4">
                    {locales.map((loc) => (
                      <button
                        key={loc.code}
                        onClick={() => switchLocale(loc.code)}
                        className={cn(
                          "text-sm uppercase tracking-widest transition-colors duration-300",
                          loc.code === locale ? "text-[var(--color-accent-gold)]" : "text-white hover:text-white/60"
                        )}
                      >
                        {loc.label}
                      </button>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex text-lg text-[var(--color-accent-gold)] mt-8 uppercase tracking-widest border-b border-[var(--color-accent-gold)] pb-2 w-max hover:text-white hover:border-white transition-colors duration-500"
                >
                  {t("cta")}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
