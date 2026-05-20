"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: (index % 3) * 0.2,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="portfolio-card masonry-item group rounded-none overflow-hidden border border-white/5 bg-[#050505] relative cursor-pointer"
    >
      <a href="#contact" className="block w-full h-full relative aspect-[4/3] overflow-hidden">
        {/* Image */}
        <img
          src={project.image_url}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-[4px] flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-4 group-hover:translate-y-0">
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[var(--color-accent-red)] mb-2 block">
            {project.category}
          </span>
          <h3 className="text-2xl font-black text-white leading-tight mb-4 tracking-tight">
            {title}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-none text-[9px] font-bold text-white/80 tracking-wider uppercase"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white group-hover:text-[var(--color-accent-red)] transition-colors mt-auto">
            {locale === "en" ? "View project" : locale === "fr" ? "Voir le projet" : "عرض المشروع"}
            <ExternalLink size={14} />
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function PortfolioGrid() {
  const t = useTranslations("portfolio");
  const locale = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  const tabs = [
    { id: "all", label: locale === "en" ? "All" : locale === "fr" ? "Tous" : "الكل" },
    { id: "web", label: locale === "en" ? "Web & Mobile" : locale === "fr" ? "Web & Mobile" : "الويب والهاتف" },
    { id: "ai", label: locale === "en" ? "AI" : locale === "fr" ? "IA" : "الذكاء الاصطناعي" },
    { id: "identity", label: locale === "en" ? "Identity" : locale === "fr" ? "Identité" : "الهوية البصرية" },
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "web") return p.category === "Web Development" || p.category === "Data Insights";
    if (activeTab === "ai") return p.category === "AI Engineering";
    if (activeTab === "identity") return p.category === "Motion Design";
    return true;
  });

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
    <section id="portfolio" className="section bg-[#0A0A0A]">
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
          <p className="text-white/80 text-lg md:text-xl font-light max-w-xl mx-auto leading-loose mt-4">
            {t("subheading")}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 border",
                activeTab === tab.id
                  ? "border-[var(--color-accent-red)] text-white bg-[var(--color-accent-red)]/10"
                  : "border-white/5 text-white/60 hover:text-white hover:border-white/15"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

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
            {filteredProjects.map((project, i) => (
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
