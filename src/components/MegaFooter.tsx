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

          {/* Socials & Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between lg:items-end text-left lg:text-right"
          >
            <div className="w-full lg:w-auto">
              <h3 className="text-sm tracking-widest uppercase text-white/40 mb-12">
                Connect
              </h3>
              <ul className="flex flex-col gap-6 lg:items-end">
                {socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      className="text-2xl sm:text-3xl md:text-4xl font-light text-white hover:text-[var(--color-accent-gold)] transition-colors duration-500 flex items-center lg:justify-end group"
                    >
                      <span className="relative overflow-hidden">
                        <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                          {social.name}
                        </span>
                        <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-[var(--color-accent-gold)]">
                          {social.name}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-24 lg:mt-0 text-sm tracking-widest uppercase text-white/20 w-full lg:text-right">
              © {new Date().getFullYear()} Digital Growth. All rights reserved.
            </div>
          </motion.div>

        </div>
      </div>
    </footer>
  );
}
