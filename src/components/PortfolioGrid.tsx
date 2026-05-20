"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ExternalLink } from "lucide-react";
import { supabase, type Project } from "@/lib/supabase";

// Fallback demo projects shown when Supabase isn't configured
const demoProjects: Project[] = [
  {
    id: "1",
    title: { en: "AI-Powered SaaS Dashboard", fr: "Tableau SaaS IA", ar: "لوحة تحكم SaaS مدعومة بالذكاء الاصطناعي" },
    slug: "ai-saas-dashboard",
    category: "AI Engineering",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tech_stack: ["Next.js", "OpenAI", "Supabase", "Tailwind"],
    created_at: "",
  },
  {
    id: "2",
    title: { en: "Gulf Real Estate Platform", fr: "Plateforme Immobilière", ar: "منصة عقارية خليجية" },
    slug: "gulf-real-estate",
    category: "Web Development",
    image_url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    tech_stack: ["React", "TypeScript", "Mapbox"],
    created_at: "",
  },
  {
    id: "3",
    title: { en: "Brand Identity & Motion Kit", fr: "Identité Visuelle & Motion", ar: "هوية بصرية وموشن جرافيك" },
    slug: "brand-motion-kit",
    category: "Motion Design",
    image_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    tech_stack: ["After Effects", "Figma", "Illustrator"],
    created_at: "",
  },
  {
    id: "4",
    title: { en: "SEO & Analytics Command Center", fr: "Centre Analytique SEO", ar: "مركز السيو والتحليلات" },
    slug: "seo-command-center",
    category: "Data Insights",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tech_stack: ["Python", "Looker Studio", "BigQuery"],
    created_at: "",
  },
  {
    id: "5",
    title: { en: "E-Commerce Fashion Store", fr: "Boutique Mode E-Commerce", ar: "متجر أزياء إلكتروني" },
    slug: "fashion-ecommerce",
    category: "Web Development",
    image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    tech_stack: ["Shopify", "React", "Tailwind"],
    created_at: "",
  },
  {
    id: "6",
    title: { en: "LLM Prompt Automation System", fr: "Système d'Automatisation LLM", ar: "نظام أتمتة البرومبت بالذكاء الاصطناعي" },
    slug: "llm-automation",
    category: "AI Engineering",
    image_url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    tech_stack: ["Python", "LangChain", "FastAPI"],
    created_at: "",
  },
];

const categoryColors: Record<string, string> = {
  "AI Engineering": "var(--color-accent-violet)",
  "Web Development": "var(--color-accent-cyan)",
  "Motion Design": "#f472b6",
  "Data Insights": "var(--color-accent-gold)",
};

function PortfolioCard({ project, index }: { project: Project; index: number }) {
  const locale = useLocale();
  const t = useTranslations("portfolio");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const title = project.title[locale] ?? project.title["en"];
  const catColor = categoryColors[project.category] ?? "var(--color-accent-violet)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: (index % 3) * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="portfolio-card masonry-item group"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={project.image_url}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Hover overlay */}
        <div className="overlay" />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tech_stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/50 text-white/80 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={`#`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[var(--color-accent-violet)] transition-colors"
          >
            {t("viewProject")}
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Card footer */}
      <div className="p-5">
        <span
          className="text-[11px] font-bold tracking-wider uppercase mb-2 block"
          style={{ color: catColor }}
        >
          {project.category}
        </span>
        <h3 className="font-bold text-[var(--color-text-primary)] leading-snug">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}

export default function PortfolioGrid() {
  const t = useTranslations("portfolio");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(6);

        if (error || !data || data.length === 0) {
          setProjects(demoProjects);
        } else {
          setProjects(data as Project[]);
        }
      } catch {
        setProjects(demoProjects);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="section">
      <div className="section-inner">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <div className="flex justify-center mb-8">
            <span className="badge">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--color-text-primary)] mb-6 uppercase tracking-tight">
            {t("heading")}
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed mt-4">
            {t("subheading")}
          </p>
        </motion.div>

        {/* Masonry grid */}
        {loading ? (
          <div className="masonry-grid">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="masonry-item portfolio-card animate-pulse"
              >
                <div className="aspect-[4/3] bg-white/5" />
                <div className="p-5 space-y-2">
                  <div className="h-3 w-20 bg-white/5 rounded" />
                  <div className="h-4 w-3/4 bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="masonry-grid">
            {projects.map((project, i) => (
              <PortfolioCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <a href="#contact" id="portfolio-view-all" className="btn-magnetic">
            <span>{t("viewAll")}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
