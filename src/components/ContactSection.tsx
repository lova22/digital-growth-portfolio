"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle, AlertCircle } from "lucide-react";
import OrbitingBadgeCTA from "@/components/OrbitingBadgeCTA";

export default function ContactSection() {
  const t = useTranslations("contact");
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
    <section id="contact" className="w-full bg-[#050505] py-24 md:py-32 relative overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-24">
        <div className="max-w-2xl mx-auto w-full">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-center mb-12">
              <span className="badge mt-32 mb-16 inline-flex">{t("badge")}</span>
              <h2 className="text-4xl md:text-5xl font-black text-[var(--color-text-primary)] mb-4">
                {t("heading")}
              </h2>
              <p className="text-white/80 text-lg leading-loose">
                {t("subheading")}
              </p>
            </div>

            {/* Form card */}
            <div className="pt-8">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                >
                  <CheckCircle
                    size={48}
                    className="text-emerald-400"
                  />
                  <p className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {t("success")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder={t("name")}
                      className="w-full p-4 rounded-none bg-transparent border-b border-white/20 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-white transition-colors text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder={t("email")}
                      className="w-full p-4 rounded-none bg-transparent border-b border-white/20 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-white transition-colors text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder={t("message")}
                      className="w-full p-4 rounded-none bg-transparent border-b border-white/20 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-white transition-colors text-sm resize-none"
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-400 text-sm"
                    >
                      <AlertCircle size={15} />
                      {errorMsg}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <div className="flex justify-center pt-16 mt-8">
                    <OrbitingBadgeCTA
                      type="submit"
                      text={status === "loading" ? "Sending" : t("send")}
                      disabled={status === "loading"}
                    />
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
