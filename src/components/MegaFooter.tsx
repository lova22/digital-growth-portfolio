"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function MegaFooter() {
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

  const socials = [
    { name: "LinkedIn", href: "#" },
    { name: "X (Twitter)", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "Behance", href: "#" },
  ];

  return (
    <footer id="contact" className="bg-[#050505] pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Massive Headline */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-32 text-center lg:text-left"
        >
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] font-black text-white tracking-tighter leading-none uppercase">
            Let&apos;s Build<br />
            <span className="text-white/20">Something Great</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-sm tracking-widest uppercase text-[var(--color-accent-gold)] mb-12">
              Start a Conversation
            </h3>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-start gap-6 py-12"
              >
                <CheckCircle size={48} className="text-[var(--color-accent-gold)]" />
                <p className="text-2xl font-light text-white tracking-wide">
                  Message received. We will be in touch shortly.
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
                    placeholder="Your Name"
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent-gold)] transition-colors text-lg font-light tracking-wide peer"
                  />
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent-gold)] transition-colors text-lg font-light tracking-wide peer"
                  />
                </div>

                <div className="relative group">
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Tell me about your project"
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent-gold)] transition-colors text-lg font-light tracking-wide resize-none peer"
                  />
                </div>

                {status === "error" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-400 text-sm tracking-widest">
                    <AlertCircle size={15} />
                    {errorMsg}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative inline-flex items-center gap-4 text-sm tracking-[0.2em] uppercase text-white hover:text-[var(--color-accent-gold)] transition-colors disabled:opacity-50 mt-4"
                >
                  <span className="relative z-10">
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </span>
                  {(status === "idle" || status === "error") && <Send size={16} className="relative z-10 transition-transform group-hover:translate-x-2" />}
                </button>
              </form>
            )}
          </motion.div>

          {/* Categorized Footer Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between text-left"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-16 w-full">
              <div>
                <h4 className="text-xs tracking-[0.25em] uppercase text-white/40 mb-6 font-semibold">Navigation</h4>
                <ul className="space-y-4 text-sm font-light tracking-wide">
                  <li><a href="#services" className="text-white/70 hover:text-[var(--color-accent-gold)] transition-colors duration-300">Services</a></li>
                  <li><a href="#portfolio" className="text-white/70 hover:text-[var(--color-accent-gold)] transition-colors duration-300">Portfolio</a></li>
                  <li><a href="#skills" className="text-white/70 hover:text-[var(--color-accent-gold)] transition-colors duration-300">Expertise</a></li>
                  <li><a href="#contact" className="text-white/70 hover:text-[var(--color-accent-gold)] transition-colors duration-300">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs tracking-[0.25em] uppercase text-white/40 mb-6 font-semibold">Connect</h4>
                <ul className="space-y-4 text-sm font-light tracking-wide">
                  <li><a href="#" className="text-white/70 hover:text-[var(--color-accent-gold)] transition-colors duration-300">LinkedIn</a></li>
                  <li><a href="#" className="text-white/70 hover:text-[var(--color-accent-gold)] transition-colors duration-300">GitHub</a></li>
                  <li><a href="#" className="text-white/70 hover:text-[var(--color-accent-gold)] transition-colors duration-300">X / Twitter</a></li>
                  <li><a href="#" className="text-white/70 hover:text-[var(--color-accent-gold)] transition-colors duration-300">Behance</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs tracking-[0.25em] uppercase text-white/40 mb-6 font-semibold">Legal</h4>
                <ul className="space-y-4 text-sm font-light tracking-wide">
                  <li><a href="#" className="text-white/70 hover:text-[var(--color-accent-gold)] transition-colors duration-300">Privacy Policy</a></li>
                  <li><a href="#" className="text-white/70 hover:text-[var(--color-accent-gold)] transition-colors duration-300">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-20 text-xs tracking-[0.25em] uppercase text-white/30 font-light">
              © {new Date().getFullYear()} Digital Growth. All rights reserved.
            </div>
          </motion.div>

        </div>
      </div>
    </footer>
  );
}
