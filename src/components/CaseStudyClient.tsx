"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

interface StatItem {
  value: string;
  label: string;
}

interface CaseStudyContent {
  title: string;
  subtitle: string;
  client?: string;
  timeline?: string;
  role: string;
  tech: string[];
  deliverables?: string[];
  liveUrl?: string;
  hideLive?: boolean;
  challenge: string;
  solution: string;
  impact: StatItem[];
  nextTitle: string;
  nextSlug: string;
}

const caseStudies: Record<string, Record<string, CaseStudyContent>> = {
  "meryem-youssoufi": {
    en: {
      title: "Dr. Meryem Youssoufi",
      subtitle: "A trilingual academic platform showcasing research, books and international work.",
      client: "Dr. Meryem Youssoufi, Ibn Zohr University",
      role: "Web Designer & Developer",
      tech: ["React", "RTL / i18n", "Vercel", "GitHub CI/CD"],
      deliverables: ["Web Design", "SEO Audit", "Website Customization", "Responsive Design", "Web Development"],
      liveUrl: "https://meryemyoussoufi.com",
      challenge: "Dr. Meryem Youssoufi, a sociology professor at Ibn Zohr University, needed a professional platform to showcase her research, books, and international academic work in 3 languages.",
      solution: "I built a modern React web application covering 5+ published books, research projects, supervised students, media appearances, and online courses, fully in Arabic (RTL), French, and English. The site is fast-loading, SEO-optimized, and auto-deployed to Vercel via GitHub CI/CD, with instant language switching and no page reload.",
      impact: [
        { value: "5+", label: "Published Books Showcased" },
        { value: "3", label: "Languages (AR · FR · EN)" },
        { value: "0", label: "Page Reloads on Language Switch" }
      ],
      nextTitle: "PDFPro",
      nextSlug: "pdfpro"
    },
    fr: {
      title: "Dr. Meryem Youssoufi",
      subtitle: "Une plateforme académique trilingue valorisant recherches, ouvrages et travaux internationaux.",
      client: "Dr. Meryem Youssoufi, Université Ibn Zohr",
      role: "Web Designer & Développeur",
      tech: ["React", "RTL / i18n", "Vercel", "GitHub CI/CD"],
      deliverables: ["Web Design", "Audit SEO", "Personnalisation du site", "Design Responsive", "Développement Web"],
      liveUrl: "https://meryemyoussoufi.com",
      challenge: "Dr. Meryem Youssoufi, professeure de sociologie à l'Université Ibn Zohr, avait besoin d'une plateforme professionnelle pour présenter ses recherches, ses ouvrages et ses travaux académiques internationaux en 3 langues.",
      solution: "J'ai développé une application web React moderne couvrant plus de 5 ouvrages publiés, des projets de recherche, les étudiants encadrés, les apparitions médiatiques et des cours en ligne, entièrement en arabe (RTL), français et anglais. Le site est rapide, optimisé pour le SEO et déployé automatiquement sur Vercel via GitHub CI/CD, avec un changement de langue instantané sans rechargement de page.",
      impact: [
        { value: "5+", label: "Ouvrages Présentés" },
        { value: "3", label: "Langues (AR · FR · EN)" },
        { value: "0", label: "Rechargement au Changement de Langue" }
      ],
      nextTitle: "PDFPro",
      nextSlug: "pdfpro"
    },
    ar: {
      title: "د. مريم يوسفي",
      subtitle: "منصة أكاديمية بثلاث لغات تعرض الأبحاث والكتب والأعمال الدولية.",
      client: "د. مريم يوسفي، جامعة ابن زهر",
      role: "مصمم ومطور مواقع",
      tech: ["React", "RTL / i18n", "Vercel", "GitHub CI/CD"],
      deliverables: ["تصميم المواقع", "تدقيق SEO", "تخصيص الموقع", "تصميم متجاوب", "تطوير الويب"],
      liveUrl: "https://meryemyoussoufi.com",
      challenge: "احتاجت الدكتورة مريم يوسفي، أستاذة علم الاجتماع بجامعة ابن زهر، إلى منصة احترافية تعرض أبحاثها وكتبها وأعمالها الأكاديمية الدولية بثلاث لغات.",
      solution: "قمت ببناء تطبيق ويب حديث بتقنية React يغطي أكثر من 5 كتب منشورة، والمشاريع البحثية، والطلبة المؤطَّرين، والظهور الإعلامي، والدورات عبر الإنترنت، وذلك بالكامل بالعربية (من اليمين إلى اليسار) والفرنسية والإنجليزية. الموقع سريع التحميل ومهيأ لمحركات البحث، ويُنشر تلقائياً على Vercel عبر GitHub CI/CD، مع تبديل فوري للغة دون إعادة تحميل الصفحة.",
      impact: [
        { value: "5+", label: "كتب منشورة معروضة" },
        { value: "3", label: "لغات (عربية · فرنسية · إنجليزية)" },
        { value: "0", label: "إعادة تحميل عند تغيير اللغة" }
      ],
      nextTitle: "PDFPro",
      nextSlug: "pdfpro"
    }
  },
  "pdfpro": {
    en: {
      title: "PDFPro",
      subtitle: "A privacy-first PDF toolkit where every tool runs inside your browser.",
      role: "Full-Stack Developer",
      tech: ["Next.js 16", "React 19", "WebAssembly", "Supabase Auth", "Node.js"],
      deliverables: ["Web Application", "Web Development", "JavaScript", "Full-Stack Development", "Next.js"],
      hideLive: true,
      challenge: "Most free PDF tools force users to upload sensitive documents, such as tax returns, contracts and medical records, to unknown servers. A serious privacy risk.",
      solution: "PDFPro eliminates this: all 26 tools run 100% inside the browser via WebAssembly, so files never leave your device. Tools include merge, split, compress, watermark, sign, scan with webcam, convert Word/Excel/PowerPoint, encrypt, unlock, extract tables, repair, and more. Built with Next.js 16, React 19, Supabase authentication, and a Node.js backend for heavy operations. Supports 12 languages including Arabic RTL.",
      impact: [
        { value: "26", label: "Browser-Based PDF Tools" },
        { value: "12", label: "Languages incl. Arabic RTL" },
        { value: "100%", label: "Client-Side Processing" }
      ],
      nextTitle: "SahaTracker",
      nextSlug: "sahatracker"
    },
    fr: {
      title: "PDFPro",
      subtitle: "Une boîte à outils PDF respectueuse de la vie privée, où chaque outil s'exécute dans votre navigateur.",
      role: "Développeur Full-Stack",
      tech: ["Next.js 16", "React 19", "WebAssembly", "Supabase Auth", "Node.js"],
      deliverables: ["Application Web", "Développement Web", "JavaScript", "Développement Full-Stack", "Next.js"],
      hideLive: true,
      challenge: "La plupart des outils PDF gratuits obligent à envoyer des documents sensibles (déclarations fiscales, contrats, dossiers médicaux) vers des serveurs inconnus. Un risque sérieux pour la vie privée.",
      solution: "PDFPro élimine ce risque : les 26 outils s'exécutent à 100 % dans le navigateur grâce à WebAssembly, les fichiers ne quittent donc jamais votre appareil. Fusion, découpage, compression, filigrane, signature, numérisation par webcam, conversion Word/Excel/PowerPoint, chiffrement, déverrouillage, extraction de tableaux, réparation et bien plus. Développé avec Next.js 16, React 19, l'authentification Supabase et un backend Node.js pour les opérations lourdes. Disponible en 12 langues, dont l'arabe (RTL).",
      impact: [
        { value: "26", label: "Outils PDF dans le Navigateur" },
        { value: "12", label: "Langues dont l'Arabe RTL" },
        { value: "100%", label: "Traitement Local" }
      ],
      nextTitle: "SahaTracker",
      nextSlug: "sahatracker"
    },
    ar: {
      title: "PDFPro",
      subtitle: "مجموعة أدوات PDF تحترم الخصوصية، تعمل كل أداة فيها داخل متصفحك.",
      role: "مطور شامل (Full-Stack)",
      tech: ["Next.js 16", "React 19", "WebAssembly", "Supabase Auth", "Node.js"],
      deliverables: ["تطبيق ويب", "تطوير الويب", "JavaScript", "تطوير Full-Stack", "Next.js"],
      hideLive: true,
      challenge: "تجبر معظم أدوات PDF المجانية المستخدمين على رفع وثائق حساسة، كالإقرارات الضريبية والعقود والسجلات الطبية، إلى خوادم مجهولة. وهو خطر حقيقي على الخصوصية.",
      solution: "يعالج PDFPro هذه المشكلة: تعمل جميع الأدوات الـ26 بالكامل داخل المتصفح عبر WebAssembly، فلا تغادر الملفات جهازك أبداً. تشمل الأدوات الدمج والتقسيم والضغط والعلامة المائية والتوقيع والمسح عبر كاميرا الويب وتحويل Word وExcel وPowerPoint والتشفير وفك القفل واستخراج الجداول والإصلاح وغيرها. بُني باستخدام Next.js 16 وReact 19 ومصادقة Supabase وخادم Node.js للعمليات الثقيلة، ويدعم 12 لغة بما فيها العربية من اليمين إلى اليسار.",
      impact: [
        { value: "26", label: "أداة PDF تعمل في المتصفح" },
        { value: "12", label: "لغة بما فيها العربية RTL" },
        { value: "100%", label: "معالجة محلية على الجهاز" }
      ],
      nextTitle: "SahaTracker",
      nextSlug: "sahatracker"
    }
  },
  "sahatracker": {
    en: {
      title: "SahaTracker",
      subtitle: "An AI health platform that connects what you eat to how you feel, built for Arabic and English users.",
      role: "Developer & UI/UX Designer",
      tech: ["React 18", "Tailwind CSS", "Anthropic Claude API", "Custom SVG Charts"],
      deliverables: ["Web Application", "Game UI/UX Design", "Web Development", "AI App Development", "Multilingual Translation"],
      hideLive: true,
      challenge: "Most health apps track data but never connect it: your food log doesn't warn you which meal causes your headaches. Arabic-speaking users are almost entirely ignored by existing apps.",
      solution: "SahaTracker is a full health platform with 7 screens: an AI chat health coach (Anthropic Claude API), a food and symptom correlation tracker, family health monitoring, a fasting timer, a medication log, an in-app store, and a business CRM dashboard. It is fully bilingual (English and Arabic RTL), with dark and light themes, hand-built SVG charts, and print-to-PDF health reports. Built with React 18 and Tailwind CSS.",
      impact: [
        { value: "7", label: "App Screens" },
        { value: "2", label: "Languages (EN + AR RTL)" },
        { value: "2", label: "Themes (Dark + Light)" }
      ],
      nextTitle: "Tachelhit 30",
      nextSlug: "azulamazigh"
    },
    fr: {
      title: "SahaTracker",
      subtitle: "Une plateforme santé IA qui relie ce que vous mangez à ce que vous ressentez, pensée pour l'arabe et l'anglais.",
      role: "Développeur & UI/UX Designer",
      tech: ["React 18", "Tailwind CSS", "Anthropic Claude API", "Graphiques SVG sur mesure"],
      deliverables: ["Application Web", "Design UI/UX de jeu", "Développement Web", "Développement d'Apps IA", "Traduction Multilingue"],
      hideLive: true,
      challenge: "La plupart des applications santé collectent des données sans jamais les relier : votre journal alimentaire ne vous dit pas quel repas provoque vos maux de tête. Les utilisateurs arabophones sont presque totalement ignorés.",
      solution: "SahaTracker est une plateforme santé complète de 7 écrans : un coach santé IA conversationnel (API Anthropic Claude), un suivi des corrélations alimentation-symptômes, la surveillance de la santé familiale, un minuteur de jeûne, un journal de médicaments, une boutique intégrée et un tableau de bord CRM. Entièrement bilingue (anglais et arabe RTL), avec thèmes sombre et clair, graphiques SVG faits main et rapports de santé exportables en PDF. Développé avec React 18 et Tailwind CSS.",
      impact: [
        { value: "7", label: "Écrans" },
        { value: "2", label: "Langues (EN + AR RTL)" },
        { value: "2", label: "Thèmes (Sombre + Clair)" }
      ],
      nextTitle: "Tachelhit 30",
      nextSlug: "azulamazigh"
    },
    ar: {
      title: "SahaTracker",
      subtitle: "منصة صحية ذكية تربط ما تأكله بما تشعر به، مصممة للمستخدمين بالعربية والإنجليزية.",
      role: "مطور ومصمم واجهات وتجربة مستخدم",
      tech: ["React 18", "Tailwind CSS", "Anthropic Claude API", "رسوم SVG مخصصة"],
      deliverables: ["تطبيق ويب", "تصميم واجهات وتجربة مستخدم للألعاب", "تطوير الويب", "تطوير تطبيقات الذكاء الاصطناعي", "الترجمة متعددة اللغات"],
      hideLive: true,
      challenge: "تسجّل معظم تطبيقات الصحة البيانات دون أن تربط بينها، فسجل طعامك لا يخبرك أي وجبة تسبب لك الصداع. كما أن المستخدمين الناطقين بالعربية شبه مهمَلين في التطبيقات الحالية.",
      solution: "SahaTracker منصة صحية متكاملة من 7 شاشات: مدرب صحي بالذكاء الاصطناعي عبر المحادثة (واجهة Anthropic Claude)، وتتبع العلاقة بين الطعام والأعراض، ومراقبة صحة العائلة، ومؤقت صيام، وسجل أدوية، ومتجر داخل التطبيق، ولوحة CRM للأعمال. ثنائية اللغة بالكامل (الإنجليزية والعربية من اليمين إلى اليسار)، مع وضعين داكن وفاتح، ورسوم بيانية SVG مبنية يدوياً، وتقارير صحية قابلة للطباعة بصيغة PDF. بُنيت باستخدام React 18 وTailwind CSS.",
      impact: [
        { value: "7", label: "شاشات" },
        { value: "2", label: "لغتان (EN + AR RTL)" },
        { value: "2", label: "وضعان (داكن + فاتح)" }
      ],
      nextTitle: "Tachelhit 30",
      nextSlug: "azulamazigh"
    }
  },
  "azulamazigh": {
    en: {
      title: "Tachelhit 30",
      subtitle: "A free, trilingual platform for learning spoken Tashelhit, with 48 audio lessons and a 17,000-word dictionary.",
      role: "Designer & Developer",
      tech: ["Astro", "Cloudflare", "Multilingual (EN · FR · AR)", "Tifinagh Tools"],
      deliverables: ["Web Development", "Web Design", "Multilingual SEO", "Responsive Design", "Cloudflare Hosting"],
      liveUrl: "https://azulamazigh.com",
      challenge: "Tashelhit is widely spoken in southern Morocco, yet travelers and learners have few structured, audio-based online courses, and tools for the Tifinagh script are hard to find.",
      solution: "I built Tachelhit 30 with Astro and deployed it on Cloudflare. It offers 48 short spoken lessons with audio across four levels (Tourist Express, Beginner, Intermediate, Advanced), based on the Peace Corps Morocco Tashlheet textbook, with progress tracking and free sign-up. Learners also get an Amazigh dictionary of 17,000+ words, a Tifinagh alphabet reference, an on-screen Tifinagh keyboard and a Latin-to-Tifinagh converter, alongside tutoring and translation services. The site is available in English, French and Arabic with multilingual SEO, light and dark themes, and a fast, mobile-first experience.",
      impact: [
        { value: "48", label: "Spoken Lessons" },
        { value: "17k+", label: "Dictionary Words" },
        { value: "3", label: "Languages (EN · FR · AR)" }
      ],
      nextTitle: "Najah Souss Échecs",
      nextSlug: "ansae"
    },
    fr: {
      title: "Tachelhit 30",
      subtitle: "Une plateforme gratuite et trilingue pour apprendre le tachelhit oral, avec 48 leçons audio et un dictionnaire de plus de 17 000 mots.",
      role: "Designer & Développeur",
      tech: ["Astro", "Cloudflare", "Multilingue (EN · FR · AR)", "Outils Tifinagh"],
      deliverables: ["Développement Web", "Web Design", "SEO Multilingue", "Design Responsive", "Hébergement Cloudflare"],
      liveUrl: "https://azulamazigh.com",
      challenge: "Le tachelhit est largement parlé dans le sud du Maroc, pourtant voyageurs et apprenants disposent de peu de cours en ligne structurés et audio, et les outils pour l'écriture tifinagh sont difficiles à trouver.",
      solution: "J'ai conçu Tachelhit 30 avec Astro et l'ai déployé sur Cloudflare. La plateforme propose 48 leçons orales courtes avec audio, réparties en quatre niveaux (Tourist Express, Débutant, Intermédiaire, Avancé), basées sur le manuel Tashlheet du Peace Corps Maroc, avec suivi de progression et inscription gratuite. Les apprenants disposent aussi d'un dictionnaire amazigh de plus de 17 000 mots, d'un abécédaire tifinagh, d'un clavier tifinagh en ligne et d'un convertisseur latin-tifinagh, ainsi que de services de tutorat et de traduction. Le site est disponible en anglais, français et arabe, avec un SEO multilingue, des thèmes clair et sombre et une expérience rapide pensée pour le mobile.",
      impact: [
        { value: "48", label: "Leçons Orales" },
        { value: "17k+", label: "Mots dans le Dictionnaire" },
        { value: "3", label: "Langues (EN · FR · AR)" }
      ],
      nextTitle: "Najah Souss Échecs",
      nextSlug: "ansae"
    },
    ar: {
      title: "Tachelhit 30",
      subtitle: "منصة مجانية بثلاث لغات لتعلّم التشلحيت المنطوقة، تضم 48 درساً صوتياً وقاموساً يزيد عن 17 ألف كلمة.",
      role: "مصمم ومطور",
      tech: ["Astro", "Cloudflare", "متعدد اللغات (EN · FR · AR)", "أدوات تيفيناغ"],
      deliverables: ["تطوير الويب", "تصميم الويب", "تحسين محركات البحث متعدد اللغات", "تصميم متجاوب", "استضافة Cloudflare"],
      liveUrl: "https://azulamazigh.com",
      challenge: "يُتحدَّث بالتشلحيت على نطاق واسع في جنوب المغرب، ومع ذلك يجد المسافرون والمتعلمون القليل من الدورات المنظمة المدعومة بالصوت عبر الإنترنت، كما يصعب العثور على أدوات لكتابة حرف تيفيناغ.",
      solution: "بنيت Tachelhit 30 باستخدام Astro ونشرته على Cloudflare. تقدم المنصة 48 درساً منطوقاً قصيراً بالصوت موزعة على أربعة مستويات (Tourist Express والمبتدئ والمتوسط والمتقدم)، مبنية على كتاب Tashlheet الصادر عن هيئة السلام الأمريكية بالمغرب، مع تتبع للتقدم وتسجيل مجاني. كما يحصل المتعلمون على قاموس أمازيغي يضم أكثر من 17 ألف كلمة، ودليل لحروف تيفيناغ، ولوحة مفاتيح تيفيناغ على الشاشة، ومحوّل من الحروف اللاتينية إلى تيفيناغ، إلى جانب خدمات الدروس الخصوصية والترجمة. الموقع متاح بالإنجليزية والفرنسية والعربية مع تحسين متعدد اللغات لمحركات البحث، ووضعين فاتح وداكن، وتجربة سريعة مصممة للهاتف أولاً.",
      impact: [
        { value: "48", label: "درساً منطوقاً" },
        { value: "17k+", label: "كلمة في القاموس" },
        { value: "3", label: "لغات (EN · FR · AR)" }
      ],
      nextTitle: "نجاح سوس للشطرنج",
      nextSlug: "ansae"
    }
  },
  "ansae": {
    en: {
      title: "Najah Souss Échecs",
      subtitle: "A premium trilingual website for an Agadir chess club founded in 1987, built from scratch with WordPress and a React front end.",
      role: "Designer & Full-Stack Developer",
      tech: ["WordPress", "Headless React", "Polylang (FR · AR · EN)", "REST API"],
      deliverables: ["Web Design", "Web Development", "WordPress Development", "Headless React Front End", "Multilingual Setup"],
      liveUrl: "https://ansae.org",
      challenge: "Najah Souss Échecs, a chess club in Agadir founded in 1987 and winner of the 2025 Coupe du Trône, needed a professional website to showcase its titles, players and academy, and to attract new members, partners and sponsors in three languages.",
      solution: "I built the site from scratch on WordPress with a custom headless React front end, in a dark, gold-accented design that matches the club's premium identity. It covers the club story, honors and Hall of Fame, a FIDE ratings table, a three-level training academy, an event calendar, a photo gallery, press coverage, news, staff, an official merchandise shop, a sponsorship page and a contact form with a simple sign-up process. Content is managed in WordPress and served in French, Arabic and English through Polylang.",
      impact: [
        { value: "1987", label: "Club Founded" },
        { value: "8", label: "National Gold Medals (2025–26)" },
        { value: "3", label: "Languages (FR · AR · EN)" }
      ],
      nextTitle: "Lumina AI Dashboard",
      nextSlug: "lumina-ai-dashboard"
    },
    fr: {
      title: "Najah Souss Échecs",
      subtitle: "Un site trilingue haut de gamme pour un club d'échecs d'Agadir fondé en 1987, développé de zéro avec WordPress et un front-end React.",
      role: "Designer & Développeur Full-Stack",
      tech: ["WordPress", "React Headless", "Polylang (FR · AR · EN)", "API REST"],
      deliverables: ["Web Design", "Développement Web", "Développement WordPress", "Front-end React Headless", "Mise en place multilingue"],
      liveUrl: "https://ansae.org",
      challenge: "Najah Souss Échecs, club d'échecs d'Agadir fondé en 1987 et vainqueur de la Coupe du Trône 2025, avait besoin d'un site professionnel pour mettre en valeur ses titres, ses joueurs et son académie, et attirer de nouveaux membres, partenaires et sponsors en trois langues.",
      solution: "J'ai développé le site de zéro sur WordPress, avec un front-end React headless sur mesure, dans un design sombre aux accents dorés fidèle à l'identité haut de gamme du club. Il présente l'histoire du club, le palmarès et le Hall of Fame, un classement FIDE, une académie à trois niveaux, un calendrier d'événements, une galerie photo, la revue de presse, les actualités, l'équipe, une boutique officielle, une page partenariat et un formulaire de contact avec un processus d'inscription simple. Le contenu est géré dans WordPress et proposé en français, arabe et anglais grâce à Polylang.",
      impact: [
        { value: "1987", label: "Année de Fondation" },
        { value: "8", label: "Médailles d'Or Nationales (2025–26)" },
        { value: "3", label: "Langues (FR · AR · EN)" }
      ],
      nextTitle: "Lumina AI Dashboard",
      nextSlug: "lumina-ai-dashboard"
    },
    ar: {
      title: "نجاح سوس للشطرنج",
      subtitle: "موقع فاخر بثلاث لغات لنادي شطرنج بأكادير تأسس سنة 1987، بُني من الصفر باستخدام WordPress وواجهة React.",
      role: "مصمم ومطور Full-Stack",
      tech: ["WordPress", "React Headless", "Polylang (FR · AR · EN)", "REST API"],
      deliverables: ["تصميم الويب", "تطوير الويب", "تطوير WordPress", "واجهة React منفصلة (Headless)", "إعداد متعدد اللغات"],
      liveUrl: "https://ansae.org",
      challenge: "كان نادي نجاح سوس للشطرنج بأكادير، الذي تأسس سنة 1987 وفاز بكأس العرش 2025، بحاجة إلى موقع احترافي يبرز ألقابه ولاعبيه وأكاديميته ويستقطب أعضاء وشركاء ورعاة جدداً بثلاث لغات.",
      solution: "بنيت الموقع من الصفر على WordPress مع واجهة أمامية React منفصلة (Headless) مخصصة، بتصميم داكن بلمسات ذهبية يعكس الهوية الفاخرة للنادي. يعرض الموقع قصة النادي وسجل الإنجازات وقاعة المشاهير، وجدول تصنيف FIDE، وأكاديمية تدريب بثلاثة مستويات، وتقويماً للفعاليات، ومعرض صور، وتغطية صحفية، وأخباراً، وفريق العمل، ومتجراً رسمياً، وصفحة شراكة، ونموذج اتصال مع خطوات تسجيل بسيطة. تُدار المحتويات في WordPress وتُعرض بالفرنسية والعربية والإنجليزية عبر Polylang.",
      impact: [
        { value: "1987", label: "سنة التأسيس" },
        { value: "8", label: "ميداليات ذهبية وطنية (2025–26)" },
        { value: "3", label: "لغات (FR · AR · EN)" }
      ],
      nextTitle: "لوحة تحكم Lumina AI",
      nextSlug: "lumina-ai-dashboard"
    }
  },
  "lumina-ai-dashboard": {
    en: {
      title: "Lumina AI Dashboard",
      subtitle: "Generative AI analytics platform for enterprise data pipelines.",
      client: "Lumina Analytics Corp",
      timeline: "3 Months",
      role: "Lead Architect & UI Designer",
      tech: ["Next.js", "OpenAI API", "Supabase", "Tailwind CSS"],
      challenge: "Enterprise clients were overwhelmed by raw JSON logs and tabular AI metrics. They needed a luxury visual environment to track real-time agent decisions without browser lag or high operational friction.",
      solution: "Developed an architectural design system utilizing virtualized grid layers, real-time web socket integrations, and pre-computed vector statistics. Embedded an AI chat prompt to query complex databases in natural language.",
      impact: [
        { value: "+150%", label: "Conversion Rate" },
        { value: "-40%", label: "Load Time" },
        { value: "10k+", label: "Active Users" }
      ],
      nextTitle: "Riyadh Estates",
      nextSlug: "riyadh-estates"
    },
    fr: {
      title: "Lumina AI Dashboard",
      subtitle: "Plateforme d'analyse d'IA générative pour flux de données.",
      client: "Lumina Analytics Corp",
      timeline: "3 Mois",
      role: "Architecte Principal & UI Designer",
      tech: ["Next.js", "OpenAI API", "Supabase", "Tailwind CSS"],
      challenge: "Les clients professionnels étaient submergés par des journaux de données complexes. Ils nécessitaient une interface haut de gamme pour surveiller les agents intelligents sans latence.",
      solution: "Conception d'une interface dynamique avec virtualisation de données massives et connecteurs temps réel. Intégration d'un copilote d'IA facilitant les requêtes complexes en langage naturel.",
      impact: [
        { value: "+150%", label: "Taux de Conversion" },
        { value: "-40%", label: "Temps de Chargement" },
        { value: "10k+", label: "Utilisateurs Actifs" }
      ],
      nextTitle: "Riyadh Estates",
      nextSlug: "riyadh-estates"
    },
    ar: {
      title: "لوحة تحكم Lumina AI",
      subtitle: "منصة تحليلات الذكاء الاصطناعي التوليدي لبيانات المؤسسات المعقدة.",
      client: "شركة لومينا للتحليلات",
      timeline: "3 أشهر",
      role: "مهندس رئيسي ومصمم واجهات",
      tech: ["Next.js", "OpenAI API", "Supabase", "Tailwind CSS"],
      challenge: "كان عملاء المؤسسات يعانون من صعوبة قراءة سجلات البيانات الضخمة والمعقدة، وكانوا بحاجة لبيئة بصرية فاخرة لمتابعة قرارات خوارزميات الذكاء الاصطناعي مباشرة وبلا أي بطء.",
      solution: "قمنا بتطوير بنية تصميمية تعتمد على جداول افتراضية سريعة وتكامل بيانات فوري، مع دمج مساعد محادثة ذكي للاستعلام الفوري باللغة الطبيعية.",
      impact: [
        { value: "+150%", label: "معدل التحويل" },
        { value: "-40%", label: "سرعة التحميل" },
        { value: "10k+", label: "مستخدم نشط" }
      ],
      nextTitle: "عقارات الرياض",
      nextSlug: "riyadh-estates"
    }
  },
  "riyadh-estates": {
    en: {
      title: "Riyadh Estates",
      subtitle: "High-end real estate portal with immersive virtual tours.",
      client: "Dar Al Riyadh Estates",
      timeline: "4 Months",
      role: "Full-Stack Developer & 3D Designer",
      tech: ["React", "Three.js", "Tailwind CSS", "Framer Motion"],
      challenge: "HNW buyers in Riyadh were unable to visit listings physically, causing prolonged sales cycles and complex negotiation phases for remote clients.",
      solution: "Engineered a custom Three.js WebGL rendering viewport enabling fully virtual 3D property walkthroughs. Paired this with dynamic interactive floor plans and private client consultation rooms.",
      impact: [
        { value: "+240%", label: "Virtual Tours Viewed" },
        { value: "-35%", label: "Sales Cycle Duration" },
        { value: "$50M+", label: "Real Estate Volume" }
      ],
      nextTitle: "FinTech SecureApp",
      nextSlug: "fintech-secureapp"
    },
    fr: {
      title: "Riyadh Estates",
      subtitle: "Portail immobilier de prestige avec visites virtuelles 3D.",
      client: "Dar Al Riyadh Estates",
      timeline: "4 Mois",
      role: "Développeur Full-Stack & Designer 3D",
      tech: ["React", "Three.js", "Tailwind CSS", "Framer Motion"],
      challenge: "Les acheteurs haut de gamme ne pouvaient pas visiter physiquement les biens de luxe, allongeant considérablement les processus d'achat.",
      solution: "Développement d'une visionneuse interactive WebGL 3D avec Three.js. Intégration de plans interactifs et de salons virtuels sécurisés pour les consultants.",
      impact: [
        { value: "+240%", label: "Visites Effectuées" },
        { value: "-35%", label: "Cycle de Vente" },
        { value: "$50M+", label: "Volume de Transactions" }
      ],
      nextTitle: "FinTech SecureApp",
      nextSlug: "fintech-secureapp"
    },
    ar: {
      title: "عقارات الرياض",
      subtitle: "بوابة عقارية فاخرة تتيح جولات افتراضية ثلاثية الأبعاد.",
      client: "دار الرياض العقارية",
      timeline: "4 أشهر",
      role: "مطور تطبيقات ومصمم ثلاثي الأبعاد",
      tech: ["React", "Three.js", "Tailwind CSS", "Framer Motion"],
      challenge: "واجه المستثمرون صعوبة في زيارة العقارات الفاخرة ميدانياً، مما أدى لطول فترات البيع وصعوبة اتخاذ القرار للمشترين عن بعد.",
      solution: "قمنا بتطوير محرك عرض ثلاثي الأبعاد تفاعلي بتقنية WebGL، مما يتيح للعميل استكشاف العقارات بالكامل افتراضياً مع تصفح مخططات الطوابق وحجز الاستشارات المباشرة.",
      impact: [
        { value: "+240%", label: "مشاهدات الجولات" },
        { value: "-35%", label: "مدة إغلاق الصفقات" },
        { value: "50M+$", label: "حجم العقارات المباعة" }
      ],
      nextTitle: "FinTech SecureApp",
      nextSlug: "fintech-secureapp"
    }
  },
  "fintech-secureapp": {
    en: {
      title: "FinTech SecureApp",
      subtitle: "Next‑generation mobile crypto tracking and secure banking platform.",
      client: "SecureBank Ltd",
      timeline: "5 Months",
      role: "Mobile Architect & Security Lead",
      tech: ["React Native", "Node.js", "PostgreSQL", "Biometrics"],
      challenge: "High net-worth crypto asset holders were anxious about mobile platform security and demanded instantaneous, end-to-end encrypted transaction tracking.",
      solution: "Created an encrypted local database system with biometric authentication and end-to-end payload signature checking.",
      impact: [
        { value: "99.99%", label: "Security Uptime" },
        { value: "1.2s", label: "Avg Transaction Time" },
        { value: "100k+", label: "Active Downloads" }
      ],
      nextTitle: "Nomad Documentary",
      nextSlug: "nomad-documentary"
    },
    fr: {
      title: "FinTech SecureApp",
      subtitle: "Application bancaire sécurisée et suivi crypto de nouvelle génération.",
      client: "SecureBank Ltd",
      timeline: "5 Mois",
      role: "Architecte Mobile & Sécurité",
      tech: ["React Native", "Node.js", "PostgreSQL", "Biometrics"],
      challenge: "Les détenteurs de portefeuilles crypto exigeaient un environnement impénétrable combiné à un suivi de transaction instantané.",
      solution: "Mise en place d'un protocole cryptographique de pointe avec double authentification biométrique et base locale chiffrée.",
      impact: [
        { value: "99.99%", label: "Taux de Disponibilité" },
        { value: "1.2s", label: "Transaction Moyenne" },
        { value: "100k+", label: "Téléchargements Actifs" }
      ],
      nextTitle: "Nomad Documentary",
      nextSlug: "nomad-documentary"
    },
    ar: {
      title: "FinTech SecureApp",
      subtitle: "تطبيق بنكي ومحفظة رقمية مشفرة لتتبع الأصول المالية.",
      client: "بنك سيكيور ليميتد",
      timeline: "5 أشهر",
      role: "مهندس أمن البرمجيات وتطبيقات الهاتف",
      tech: ["React Native", "Node.js", "PostgreSQL", "Biometrics"],
      challenge: "طالب مستخدمو العملات الرقمية ببيئة تصفح ومعاملات آمنة تماماً خالية من الثغرات، مع تحديث فوري وسريع للأصول المالية.",
      solution: "صممنا نظام تشفير محلي متطور يعتمد على البصمة الحيوية مع مكاملة بروتوكولات حماية متكاملة تضمن سرية مطلقة لكافة البيانات المعالجة.",
      impact: [
        { value: "99.99%", label: "جاهزية النظام الأمنية" },
        { value: "1.2ث", label: "سرعة معالجة المعاملة" },
        { value: "100k+", label: "تحميلات نشطة" }
      ],
      nextTitle: "وثائقي Nomad",
      nextSlug: "nomad-documentary"
    }
  },
  "nomad-documentary": {
    en: {
      title: "Nomad Documentary",
      subtitle: "Immersive storytelling campaign and cinematic motion graphics.",
      client: "Nomad Media Initiative",
      timeline: "2 Months",
      role: "Creative Director & Motion Designer",
      tech: ["After Effects", "Premiere Pro", "Cinema 4D", "WebGL"],
      challenge: "Capturing organic user interest for an indie documentary required an unconventional, deeply atmospheric digital campaign that stood out from standard flat social cards.",
      solution: "Produced full-frame cinematic video teasers, WebGL scroll-interactive site maps, and audio transitions triggered by the user's cursor.",
      impact: [
        { value: "5M+", label: "Campaign Reach" },
        { value: "+180%", label: "Engagement Rate" },
        { value: "12", label: "Global Awards" }
      ],
      nextTitle: "Oasis E-Commerce",
      nextSlug: "oasis-e-commerce"
    },
    fr: {
      title: "Nomad Documentary",
      subtitle: "Campagne immersive et motion design cinématographique.",
      client: "Nomad Media Initiative",
      timeline: "2 Mois",
      role: "Directeur Artistique & Motion Designer",
      tech: ["After Effects", "Premiere Pro", "Cinema 4D", "WebGL"],
      challenge: "Capter l'attention du public pour un documentaire indépendant nécessitait une expérience narrative immersive et percutante.",
      solution: "Création de teasers cinématiques rythmés, d'une carte interactive WebGL au défilement et de transitions sonores réactives au curseur.",
      impact: [
        { value: "5M+", label: "Portée de Campagne" },
        { value: "+180%", label: "Taux d'Engagement" },
        { value: "12", label: "Prix Internationaux" }
      ],
      nextTitle: "Oasis E-Commerce",
      nextSlug: "oasis-e-commerce"
    },
    ar: {
      title: "وثائقي Nomad",
      subtitle: "حملة رقمية ومؤثرات بصرية سينمائية وثائقية تفاعلية.",
      client: "مبادرة نواميد الإعلامية",
      timeline: "شهرين",
      role: "المخرج الإبداعي ومصمم المؤثرات",
      tech: ["After Effects", "Premiere Pro", "Cinema 4D", "WebGL"],
      challenge: "تطلب جذب الجمهور لوثائقي مستقل تجربة بصرية مغايرة تماماً للحملات التقليدية لجذب انتباه المتصفحين بسرعة.",
      solution: "صممنا إعلانات ترويجية سينمائية وخرائط تفاعلية متحركة تعتمد على التمرير، مع ربط المؤثرات البصرية والصوتية بحركة مؤشر الفأرة.",
      impact: [
        { value: "5M+", label: "تأثير الحملة الكلي" },
        { value: "+180%", label: "معدل التفاعل الإيجابي" },
        { value: "12", label: "جوائز عالمية" }
      ],
      nextTitle: "موقع Oasis التجاري",
      nextSlug: "oasis-e-commerce"
    }
  },
  "oasis-e-commerce": {
    en: {
      title: "Oasis E-Commerce",
      subtitle: "High‑conversion fashion storefront with headless commerce architecture.",
      client: "Oasis Luxury Apparel",
      timeline: "3 Months",
      role: "UX Engineer & Integrator",
      tech: ["Next.js", "Stripe API", "Headless CMS", "Tailwind CSS"],
      challenge: "High checkout abandonment due to slow page loads and complex form wizard interfaces on the legacy platform.",
      solution: "Migrated infrastructure to Next.js static architecture with optimized headless Stripe API checkouts and micro-interaction animations.",
      impact: [
        { value: "+85%", label: "Checkout Completion" },
        { value: "+30%", label: "Average Order Value" },
        { value: "100k+", label: "Monthly Transactions" }
      ],
      nextTitle: "GovTech Analytics",
      nextSlug: "govtech-analytics"
    },
    fr: {
      title: "Oasis E-Commerce",
      subtitle: "Boutique en ligne haut de gamme à conversion optimisée.",
      client: "Oasis Luxury Apparel",
      timeline: "3 Mois",
      role: "Ingénieur UX & Développeur",
      tech: ["Next.js", "Stripe API", "Headless CMS", "Tailwind CSS"],
      challenge: "Des taux d'abandon importants causés par des temps de chargement trop longs sur l'ancien système de paiement.",
      solution: "Transition vers une architecture Next.js découplée intégrant l'API Stripe optimisée et des transitions fluides à l'achat.",
      impact: [
        { value: "+85%", label: "Finalisation d'Achat" },
        { value: "+30%", label: "Panier Moyen" },
        { value: "100k+", label: "Transactions Mensuelles" }
      ],
      nextTitle: "GovTech Analytics",
      nextSlug: "govtech-analytics"
    },
    ar: {
      title: "موقع Oasis التجاري",
      subtitle: "منصة تجارة إلكترونية فاخرة متكاملة عالية التحويل للمبيعات.",
      client: "أزياء أوايسس الفاخرة",
      timeline: "3 أشهر",
      role: "مهندس تجربة المستخدم والمكاملة",
      tech: ["Next.js", "Stripe API", "Headless CMS", "Tailwind CSS"],
      challenge: "تراجع المبيعات وزيادة نسب إلغاء الطلبات بسبب بطء استجابة النماذج وبوابات الدفع على النظام القديم.",
      solution: "قمنا بالانتقال إلى معمارية خادم ساكنة بالكامل باستخدام Next.js وربط بوابة دفع Stripe بشكل مخصص لضمان شحن وبيع فوري آمن.",
      impact: [
        { value: "+85%", label: "إتمام الدفع بنجاح" },
        { value: "+30%", label: "متوسط قيمة الطلب" },
        { value: "100k+", label: "عملية شراء شهرياً" }
      ],
      nextTitle: "GovTech Analytics",
      nextSlug: "govtech-analytics"
    }
  },
  "govtech-analytics": {
    en: {
      title: "GovTech Analytics",
      subtitle: "High-performance public database visualizations and SEO indexing.",
      client: "Municipal Office of Data",
      timeline: "6 Months",
      role: "AI Platform Engineer",
      tech: ["Python", "React", "Google Analytics 4", "Tailwind CSS"],
      challenge: "Public dashboard had low usability rankings and struggled to search across large dataset logs efficiently.",
      solution: "Introduced lightning-fast indexing layers and integrated dynamic interactive SVG data tables accessible to all screen-readers.",
      impact: [
        { value: "100%", label: "WCAG Compliance" },
        { value: "0.1s", label: "Instant Search return" },
        { value: "500k+", label: "Citizens Reached" }
      ],
      nextTitle: "Dr. Meryem Youssoufi",
      nextSlug: "meryem-youssoufi"
    },
    fr: {
      title: "GovTech Analytics",
      subtitle: "Visualisation de bases de données publiques à haute performance.",
      client: "Municipal Office of Data",
      timeline: "6 Mois",
      role: "Ingénieur IA & Données",
      tech: ["Python", "React", "Google Analytics 4", "Tailwind CSS"],
      challenge: "Le portail souffrait d'un mauvais classement d'accessibilité et de temps de recherche excessivement longs.",
      solution: "Mise en place de couches d'indexation rapides et création de tableaux interactifs SVG compatibles avec les lecteurs d'écran.",
      impact: [
        { value: "100%", label: "Conformité WCAG" },
        { value: "0.1s", label: "Recherche Instantanée" },
        { value: "500k+", label: "Citoyens Touchés" }
      ],
      nextTitle: "Dr. Meryem Youssoufi",
      nextSlug: "meryem-youssoufi"
    },
    ar: {
      title: "GovTech Analytics",
      subtitle: "لوحة تحكم وتصور للبيانات الحكومية العامة عالية الأداء.",
      client: "مكتب البيانات البلدي",
      timeline: "6 أشهر",
      role: "مهندس تحليلات وبنية خوادم",
      tech: ["Python", "React", "Google Analytics 4", "Tailwind CSS"],
      challenge: "ضعف نسب الوصول للمعلومات في الواجهة السابقة وصعوبة البحث الفوري داخل ملايين السجلات المالية العامة.",
      solution: "بناء نظام فهرسة فائق السرعة مع تمثيل البيانات عبر رسوم بيانية تفاعلية SVG متوافقة بالكامل مع معايير الوصول العالمية.",
      impact: [
        { value: "100%", label: "مطابقة معايير WCAG" },
        { value: "0.1ث", label: "زمن استرجاع البحث" },
        { value: "500k+", label: "مواطن مستفيد" }
      ],
      nextTitle: "د. مريم يوسفي",
      nextSlug: "meryem-youssoufi"
    }
  }
};

const imageMap: Record<string, { hero: string; gallery: string[]; stack?: boolean; darkenHero?: boolean }> = {
  "meryem-youssoufi": {
    hero: "/projects/meryem-youssoufi-hero.jpg",
    gallery: [
      "/projects/meryem-youssoufi-about.jpg"
    ],
    stack: true,
    darkenHero: true
  },
  "pdfpro": {
    hero: "/projects/pdfpro-hero.jpg",
    gallery: [
      "/projects/pdfpro-showcase.jpg"
    ],
    stack: true,
    darkenHero: true
  },
  "sahatracker": {
    hero: "/projects/sahatracker-hero.jpg",
    gallery: [
      "/projects/sahatracker-today.jpg",
      "/projects/sahatracker-insights.jpg",
      "/projects/sahatracker-hub.jpg",
      "/projects/sahatracker-store.jpg"
    ],
    stack: true
  },
  "azulamazigh": {
    hero: "/projects/azulamazigh-hero.jpg",
    gallery: [
      "/projects/azulamazigh-levels.jpg",
      "/projects/azulamazigh-lessons.jpg",
      "/projects/azulamazigh-tools.jpg"
    ],
    stack: true,
    darkenHero: true
  },
  "ansae": {
    hero: "/projects/ansae-hero.jpg",
    gallery: [
      "/projects/ansae-about.jpg",
      "/projects/ansae-academy.jpg",
      "/projects/ansae-events.jpg"
    ],
    stack: true
  },
  "lumina-ai-dashboard": {
    hero: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  "riyadh-estates": {
    hero: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  "fintech-secureapp": {
    hero: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  "nomad-documentary": {
    hero: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  "oasis-e-commerce": {
    hero: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  "govtech-analytics": {
    hero: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80"
    ]
  }
};

function LiveCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const numberMatch = value.match(/\d+/);
  const targetNum = numberMatch ? parseInt(numberMatch[0], 10) : 0;
  const prefix = value.split(/\d+/)[0] || "";
  const suffix = value.split(/\d+/)[1] || "";

  useEffect(() => {
    if (inView && targetNum > 0) {
      const node = ref.current;
      if (!node) return;

      const controls = animate(0, targetNum, {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(latest) {
          node.textContent = prefix + Math.round(latest).toString() + suffix;
        },
      });

      return () => controls.stop();
    } else if (ref.current) {
      ref.current.textContent = value;
    }
  }, [inView, targetNum, prefix, suffix, value]);

  return (
    <div className="flex flex-col p-8 bg-white/[0.01] border border-white/5 rounded-2xl backdrop-blur-md shadow-lg hover:border-white/10 transition-colors duration-500 text-center">
      <span ref={ref} className="text-5xl md:text-6xl font-black text-[var(--color-accent-red)] tracking-tight">
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-4 font-bold">
        {label}
      </span>
    </div>
  );
}

export default function CaseStudyClient({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  const activeLocale = ["en", "fr", "ar"].includes(locale) ? locale : "en";
  const projectSlug = caseStudies[slug] ? slug : "lumina-ai-dashboard";

  const data = caseStudies[projectSlug][activeLocale];
  const images = imageMap[projectSlug];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const labels: Record<string, Record<string, string>> = {
    en: {
      client: "Client",
      timeline: "Timeline",
      role: "Role & Scope",
      tech: "Technologies",
      deliverables: "Deliverables",
      liveBtn: "Launch Live Project",
      challenge: "The Challenge",
      solution: "The Solution",
      impact: "Key Impact Metrics",
      gallery: "Project Gallery",
      nextProject: "Next Case Study",
      backHome: "Back to Home",
    },
    fr: {
      client: "Client",
      timeline: "Durée",
      role: "Rôle & Scope",
      tech: "Technologies",
      deliverables: "Livrables",
      liveBtn: "Visiter le Projet Live",
      challenge: "Le Défi",
      solution: "La Solution",
      impact: "Métriques d'Impact Clés",
      gallery: "Galerie de Projet",
      nextProject: "Étude de Cas Suivante",
      backHome: "Retour à l'Accueil",
    },
    ar: {
      client: "العميل",
      timeline: "مدة المشروع",
      role: "الدور والمسؤوليات",
      tech: "التقنيات المستخدمة",
      deliverables: "المخرجات",
      liveBtn: "زيارة الموقع المباشر",
      challenge: "التحدي القائم",
      solution: "الحل الابتكاري",
      impact: "مؤشرات التأثير والنتائج",
      gallery: "معرض صور المشروع",
      nextProject: "دراسة الحالة التالية",
      backHome: "العودة للرئيسية",
    },
  };

  const currentLabels = labels[activeLocale];
  const isRTL = activeLocale === "ar";

  const btnRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.03)`;
    };
    const handleLeave = () => {
      btn.style.transform = "";
    };
    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <article className="min-h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* 1. Cinematic Hero Header */}
      <div ref={heroRef} className="relative h-[85vh] w-full flex items-end justify-center overflow-hidden bg-black">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <img
            src={images.hero}
            alt={data.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {images.darkenHero && <div className="absolute inset-0 bg-black/55 pointer-events-none" />}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#050505] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-[#050505]/40 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pb-20 md:pb-24 flex flex-col items-start gap-6">
          <Link
            href={`/${activeLocale}`}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors mb-4"
          >
            {isRTL ? <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> : <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />}
            {currentLabels.backHome}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.1] uppercase mb-6 text-white">
              {data.title}
            </h1>
            <p className="text-lg md:text-2xl text-white/70 font-light leading-relaxed max-w-2xl mb-8">
              {data.subtitle}
            </p>
          </motion.div>

          {!data.hideLive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                ref={btnRef}
                href={data.liveUrl ?? "#contact"}
                {...(data.liveUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full shadow-2xl hover:bg-[var(--color-accent-gold)] transition-colors duration-500"
                style={{ transitionProperty: "transform, background-color" }}
              >
                <span>{currentLabels.liveBtn}</span>
                <ExternalLink size={14} />
              </a>
            </motion.div>
          )}
        </div>
      </div>

      {/* 2. Project Metadata Grid */}
      <section className="relative z-20 bg-[#050505] border-y border-white/10 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start divide-y md:divide-y-0 md:divide-x divide-white/10 rtl:divide-x-reverse">
            
            {data.client && (
              <div className="flex flex-col gap-3 pt-6 md:pt-0">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">{currentLabels.client}</span>
                <span className="text-sm font-semibold text-white/90">{data.client}</span>
              </div>
            )}

            {data.timeline && (
              <div className="flex flex-col gap-3 pt-6 md:pt-0 md:pl-8 rtl:md:pl-0 rtl:md:pr-8 md:first:pl-0 rtl:md:first:pr-0">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">{currentLabels.timeline}</span>
                <span className="text-sm font-semibold text-white/90">{data.timeline}</span>
              </div>
            )}

            {data.deliverables && (
              <div className="flex flex-col gap-3 pt-6 md:pt-0 md:pl-8 rtl:md:pl-0 rtl:md:pr-8 md:first:pl-0 rtl:md:first:pr-0">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">{currentLabels.deliverables}</span>
                <ul className="flex flex-col gap-1.5">
                  {data.deliverables.map((item) => (
                    <li key={item} className="text-sm font-semibold text-white/90">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-6 md:pt-0 md:pl-8 rtl:md:pl-0 rtl:md:pr-8 md:first:pl-0 rtl:md:first:pr-0">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">{currentLabels.role}</span>
              <span className="text-sm font-semibold text-white/90">{data.role}</span>
            </div>

            <div className="flex flex-col gap-3 pt-6 md:pt-0 md:pl-8 rtl:md:pl-0 rtl:md:pr-8 md:first:pl-0 rtl:md:first:pr-0">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">{currentLabels.tech}</span>
              <div className="flex flex-wrap gap-2">
                {data.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-white/5 border border-white/15 text-[10px] font-semibold text-white/60 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Storytelling Section */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col gap-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-accent-gold)] font-bold mb-4">
                01 / {currentLabels.challenge}
              </h2>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                {isRTL ? "مواجهة المشكلة وتبسيطها" : "REDEFINING THE BARRIERS"}
              </h3>
            </div>

            <div className="lg:col-span-8">
              <p 
                className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-6"
                style={{ lineHeight: isRTL ? "1.9" : "1.75" }}
              >
                {data.challenge}
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-white/5" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-accent-gold)] font-bold mb-4">
                02 / {currentLabels.solution}
              </h2>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                {isRTL ? "هندسة الحل والتنفيذ" : "THE EXECUTION STRATEGY"}
              </h3>
            </div>

            <div className="lg:col-span-8">
              <p 
                className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-6"
                style={{ lineHeight: isRTL ? "1.9" : "1.75" }}
              >
                {data.solution}
              </p>
            </div>
          </div>

          {/* Impact/Stats Metrics Component Area */}
          <div className="mt-16 flex flex-col gap-12">
            <div className="text-center">
              <h2 className="text-xs uppercase tracking-[0.25em] text-white/40 font-bold mb-4">
                03 / {currentLabels.impact}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto w-full">
              {data.impact.map((metric, i) => (
                <LiveCounter key={i} value={metric.value} label={metric.label} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Gallery/Showcase Section */}
      <section className="py-32 bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-500/5 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-accent-gold)] font-bold mb-4">
              04 / {currentLabels.gallery}
            </h2>
          </div>

          <div className={images.stack ? (images.gallery.length > 2 ? "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto items-start" : "grid grid-cols-1 gap-8 md:gap-12 max-w-5xl mx-auto items-stretch") :"grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto items-stretch"}>
            {images.gallery.map((imgUrl, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden shadow-2xl p-4 md:p-6 flex items-center justify-center group"
              >
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <img
                  src={imgUrl}
                  alt={`${data.title} Mockup ${i + 1}`}
                  className={images.stack ? "rounded-2xl w-full h-auto border border-white/10 shadow-lg" : "rounded-2xl object-cover w-full h-full border border-white/10 shadow-lg"}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Next Project Navigation */}
      <section className="relative bg-[#050505] border-t border-white/10 group cursor-pointer overflow-hidden">
        <Link
          href={`/${activeLocale}/portfolio/${data.nextSlug}`}
          className="flex flex-col items-center justify-center py-32 px-4 sm:px-8 md:px-16 lg:px-24 w-full text-center relative z-10"
        >
          <div className="absolute inset-0 bg-white/[0.02] transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out -z-10" />

          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black mb-4 block group-hover:text-[var(--color-accent-gold)] transition-colors">
            {currentLabels.nextProject}
          </span>
          
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white flex items-center justify-center gap-6">
            <span>{data.nextTitle}</span>
            <span className="inline-block transform group-hover:translate-x-3 rtl:group-hover:-translate-x-3 transition-transform duration-500">
              {isRTL ? <ArrowLeft size={48} className="text-[var(--color-accent-red)]" /> : <ArrowRight size={48} className="text-[var(--color-accent-red)]" />}
            </span>
          </h2>
        </Link>
      </section>

    </article>
  );
}
