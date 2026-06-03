"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2, Mail, MapPin, Link } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import OrbitingBadgeCTA from "@/components/OrbitingBadgeCTA";

export default function MegaFooter() {
  const locale = useLocale();
  const t = useTranslations("contact");
  const tNav = useTranslations("nav");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <footer id="contact" className="bg-[#0D0D0D] pt-36 md:pt-48 lg:pt-64 pb-16 md:pb-24 border-t border-white/5 relative overflow-hidden flex flex-col items-center">
      <div className="content-wrapper">
        
        {/* Urgency Badge with pulsing green dot above the main headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center lg:justify-start gap-2 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-emerald-400 font-semibold">
            {locale === "en"
              ? "2 slots available in June 2026"
              : locale === "fr"
              ? "2 créneaux disponibles en Juin 2026"
              : "2 مقاعد متاحة في يونيو 2026"}
          </span>
        </motion.div>

        {/* Massive Headline */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-32 text-center lg:text-left"
        >
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] font-black text-white tracking-tighter leading-[1.15] uppercase">
            {locale === "en" ? (
              <>
                Let&apos;s Build<br />
                <span className="text-white/20">Something Great</span>
              </>
            ) : locale === "fr" ? (
              <>
                Construisons<br />
                <span className="text-white/20">Quelque chose d&apos;unique</span>
              </>
            ) : (
              <>
                لنصنع معاً<br />
                <span className="text-white/20">شيئاً استثنائياً</span>
              </>
            )}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          
          {/* Contact Form (Spans 7 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <h3 className="text-sm tracking-widest uppercase text-[var(--color-accent-red)] mb-12 font-semibold">
              {locale === "en" ? "Start a Conversation" : locale === "fr" ? "Démarrer une Conversation" : "ابدأ محادثة"}
            </h3>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-start gap-6 py-12"
              >
                <CheckCircle size={48} className="text-emerald-400" />
                <p className="text-2xl font-light text-white tracking-wide">
                  {t("success")}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder={t("name")}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent-red)] transition-colors text-lg font-light tracking-wide peer"
                  />
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder={t("email")}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent-red)] transition-colors text-lg font-light tracking-wide peer"
                  />
                </div>

                <div className="relative group">
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder={t("message")}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent-red)] transition-colors text-lg font-light tracking-wide resize-none peer"
                  />
                </div>

                {status === "error" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-500 text-sm tracking-widest">
                    <AlertCircle size={15} />
                    {errorMsg}
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-8 mt-12 w-full">
                  <div className="flex justify-center sm:justify-start">
                    <OrbitingBadgeCTA
                      type="submit"
                      text={status === "loading" ? (locale === "en" ? "Sending" : locale === "fr" ? "Envoi" : "إرسال") : t("send")}
                      disabled={status === "loading"}
                    />
                  </div>
                  
                  {/* Urgency Subtext beside circular form button */}
                  <span className="text-xs text-white/40 tracking-[0.1em] font-medium max-w-[200px] leading-relaxed">
                    {locale === "en"
                      ? "Reply within 24h · No obligation"
                      : locale === "fr"
                      ? "Réponse sous 24h · Sans engagement"
                      : "الرد خلال 24 ساعة · بدون التزام"}
                  </span>
                </div>
              </form>
            )}
          </motion.div>

          {/* Quick Contact Card / Local Time Widget (Spans 5 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-start text-left lg:border-l lg:border-white/5 lg:pl-16 gap-12"
          >
            <div>
              <h3 className="text-xs tracking-[0.25em] uppercase text-white/40 mb-6 font-semibold">
                {locale === "en" ? "Direct Contact" : locale === "fr" ? "Contact Direct" : "الاتصال المباشر"}
              </h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[var(--color-accent-red)] transition-colors">
                    <Mail size={16} className="text-white/60 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-widest">Email</span>
                    <a href="mailto:hello@digitalgrowth.agency" className="text-sm font-light text-white hover:text-[var(--color-accent-red)] transition-colors">
                      hello@digitalgrowth.agency
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-white/5 flex items-center justify-center border border-white/10">
                    <MapPin size={16} className="text-white/60" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-widest">HQ Location</span>
                    <span className="text-sm font-light text-white">
                      {locale === "en" ? "Casablanca, Morocco" : locale === "fr" ? "Casablanca, Maroc" : "الدار البيضاء، المغرب"}
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs tracking-[0.25em] uppercase text-white/40 mb-4 font-semibold">
                {locale === "en" ? "Availability Status" : locale === "fr" ? "Statut de Disponibilité" : "حالة التوفر"}
              </h3>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-[0.15em] rounded-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {locale === "en" ? "Open for new projects" : locale === "fr" ? "Ouvert aux projets" : "متاح للمشاريع الجديدة"}
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4-Column Footer grid divider */}
        <div className="border-t border-white/5 pt-16 mt-20 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            
            {/* Col 1: Logo + Tagline + Social Icons */}
            <div className="flex flex-col justify-start">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center font-black text-sm text-[var(--color-accent-red)]">
                  DG
                </div>
                <span className="text-sm font-bold tracking-[0.2em] text-white">DIGITAL GROWTH</span>
              </div>
                <p className="text-xs text-white/50 leading-relaxed font-light mb-6">
                  {locale === "en"
                    ? "End-to-end digital solutions, crafted with precision and engineered for exponential growth."
                    : locale === "fr"
                      ? "Solutions digitales de bout en bout, conçues avec précision et développées pour une croissance exponentielle."
                      : "حلول رقمية متكاملة مصممة بدقة عالية ومطورة لتحقيق نمو قياسي للمشاريع."
                  }
                </p>
                <div className="flex items-center gap-4 text-white/50">
                 <a href="#" aria-label="LinkedIn" className="hover:text-[var(--color-accent-red)] transition-colors"><Link size={16} /></a>
                 <a href="#" aria-label="GitHub" className="hover:text-[var(--color-accent-red)] transition-colors"><Link size={16} /></a>
                 <a href="#" aria-label="Twitter" className="hover:text-[var(--color-accent-red)] transition-colors"><Link size={16} /></a>
                 <a href="#" aria-label="Dribbble" className="hover:text-[var(--color-accent-red)] transition-colors"><Link size={16} /></a>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-6 font-bold">
                {locale === "en" ? "Navigation" : locale === "fr" ? "Navigation" : "التنقل"}
              </h4>
              <ul className="space-y-4 text-xs font-semibold uppercase tracking-wider">
                <li><a href="#services" className="text-white/60 hover:text-[var(--color-accent-red)] transition-colors">{tNav("services")}</a></li>
                <li><a href="#portfolio" className="text-white/60 hover:text-[var(--color-accent-red)] transition-colors">{tNav("portfolio")}</a></li>
                <li><a href="#skills" className="text-white/60 hover:text-[var(--color-accent-red)] transition-colors">{tNav("about")}</a></li>
                <li><a href="#contact" className="text-white/60 hover:text-[var(--color-accent-red)] transition-colors">{tNav("contact")}</a></li>
              </ul>
            </div>

            {/* Col 3: Services List */}
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-6 font-bold">
                {locale === "en" ? "Services" : locale === "fr" ? "Expertise" : "الخدمات"}
              </h4>
              <ul className="space-y-4 text-xs font-semibold uppercase tracking-wider">
                <li><span className="text-white/60">{locale === "en" ? "Web Engineering" : locale === "fr" ? "Ingénierie Web" : "هندسة الويب"}</span></li>
                <li><span className="text-white/60">{locale === "en" ? "Mobile Apps" : locale === "fr" ? "Applications Mobile" : "تطبيقات الهاتف"}</span></li>
                <li><span className="text-white/60">{locale === "en" ? "AI Solutions" : locale === "fr" ? "Solutions IA" : "حلول الذكاء الاصطناعي"}</span></li>
                <li><span className="text-white/60">{locale === "en" ? "Brand Identity" : locale === "fr" ? "Identité de Marque" : "هوية العلامة"}</span></li>
              </ul>
            </div>

            {/* Col 4: Contact Info */}
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-6 font-bold">Contact</h4>
              <ul className="space-y-4 text-xs font-semibold uppercase tracking-wider">
                <li><a href="mailto:hello@digitalgrowth.agency" className="text-white/60 hover:text-[var(--color-accent-red)] transition-colors">hello@digitalgrowth.agency</a></li>
                <li><span className="text-white/40 normal-case font-light">Casablanca, Morocco</span></li>
                <li className="pt-2">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    {locale === "en" ? "Available" : locale === "fr" ? "Disponible" : "متاح"}
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar: Copyright + Legal Links */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-widest uppercase text-white/30 font-semibold">
            <div>
              © {new Date().getFullYear()} Digital Growth. {locale === "en" ? "All rights reserved." : locale === "fr" ? "Tous droits réservés." : "جميع الحقوق محفوظة."}
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white/60 transition-colors">
                {locale === "en" ? "Privacy Policy" : locale === "fr" ? "Politique de confidentialité" : "سياسة الخصوصية"}
              </a>
              <a href="#" className="hover:text-white/60 transition-colors">
                {locale === "en" ? "Terms of Service" : locale === "fr" ? "Mentions légales" : "الشروط والأحكام"}
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
