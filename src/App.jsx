/*
Modern Portfolio — Single-file React component (Tailwind + Framer Motion)
Dark theme upgrade + improved animations + layout fixes

How to use:
 1) Paste this file into a React app (Create React App / Vite / Next.js page). Tailwind must be configured.
 2) Install dependencies: framer-motion, lucide-react, lottie-web (optional for local import).
 3) Replace placeholder data (PROFILE, PROJECTS, EXPERIENCE) or pass your resume JSON to `initialData`.

Key changes in this dark version:
 - Default dark-first UI with polished color palette
 - Lottie animation moved behind content (no overlap) and set pointer-events: none
 - Cursor spotlight softened and placed behind content so it doesn't cover text
 - Page transitions with AnimatePresence and motion wrapper
 - Animated skill bars, staggered experience timeline, and subtle 3D tilt on project cards
 - Accessible contrast and reduced motion option respected
*/

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, DownloadCloud, Github, Linkedin, ExternalLink } from "lucide-react";

// ---------- data (replace with real resume data or import) ----------
const initialData = {
  name: "Samarth",
  title: "Senior Data Engineer (AWS | Big Data | GenAI)",
  location: "India",
  about:
    "Data Engineering professional with 5+ years of experience architecting scalable AWS and big data solutions that increased processing efficiency by 80% and automated 60% of manual workflows.",
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/sam23kawade",
    linkedin: "https://www.linkedin.com/in/samarth-kawade-391693176 ",
    email: "samarthkawade23899@gmail.com",
  },
  projects: [
    {
      id: "axion",
      title: "Axion — Interview Prep Platform",
      description:
        "Progressive interview-prep platform combining DSA, PySpark and SQL practice with realistic interview-style scenarios and progressive roadmaps.",
      tags: ["Product", "React", "PySpark", "DSA"],
      repo: "https://github.com/sam23kawade/AI-Collab-Work.git",
      live: null,
    },
    {
      id: "tradelens",
      title: "TradeLens — Real-time Market Analytics",
      description:
        "Real-time analytics platform using Kafka, PySpark, and AWS, enabling ultra-low-latency KPIs.",
      tags: ["Kafka", "PySpark", "Streaming", "AWS"],
      repo: "https://github.com/sam23kawade/TradeLens.git",
      live: null,
    },
  ],
  skills: [
    { name: "Python, PySpark and SQL", level: 95 },
    { name: "LLM & GenAI (LangChain, LangGraph, Gemini)", level: 92 },
    { name: "AWS (Redshift, Glue, Lambda, StepFunction, Athena, S3)", level: 90 },
    { name: "Kafka & Kinesis", level: 88 },
  ],
  experience: [
    {
    company: "Deloitte USI",
    role: "Senior Data Engineer / Consultant",
    start: "Aug 2024",
    end: "Present",
    bullets: [
    "Engineered a GenAI-powered Test Data Management platform using LangGraph, Gemini, and Streamlit, enabling production-grade dataset generation and improving QA accuracy by 40%+.",
    "Designed and optimized cross-environment data pipelines using Python, PySpark, and Hive, integrating datasets across Redshift, Hadoop, and AWS and reducing processing latency.",
    "Built high-throughput orchestration frameworks with Airflow, Step Functions, and Glue Workflows, achieving near-zero data loss across structured and streaming data sources.",
    "Implemented real-time analytics pipelines using Kafka, Kinesis, and Spark Structured Streaming, enabling rapid anomaly detection and accelerating decision-making.",
    "Automated engineering workflows using GenAI and Spark/SQL optimizations, reducing manual effort by 60%+ and improving delivery consistency.",
    "Developed executive dashboards in Tableau and QuickSight, increasing reporting precision by 80% and providing leadership real‑time visibility.",
    "Optimized large-scale ingestion and transformation workloads, cutting operational delays by 80% and stabilizing downstream consumption.",
    "Enhanced data models and analytical queries, reducing report turnaround time and improving analytical accuracy across high‑volume scenarios."
    ],
    },
    {
    company: "Accenture Solutions Pvt. Ltd.",
    role: "Data Engineering Analyst",
    start: "Oct 2020",
    end: "July 2024",
    bullets: [
    "Developed dynamic ETL using PySpark and Glue with CDC replication from SAP legacy systems.",
    "Built automation scripts for Glue job and ETL configuration generation using Python.",
    "Implemented data cleaning and orchestration using Step Functions and EventBridge.",
    "Delivered stakeholder updates and monthly knowledge-transfer sessions."
    ],
    },
  ],
  education: [],
  certifications: [],
  interests: ["Dance", "PC FPS Games", "MotoVlogging"],
};

// ---------------- UI helpers ----------------
function Tag({ children }) {
  return (
    <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-slate-800/60 text-slate-100 mr-2">
      {children}
    </span>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// ---------------- Components ----------------
function SkillBar({ name, level }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs text-slate-300">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="w-full h-2 bg-slate-800/50 rounded-full mt-1 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: reduced ? 0 : 1.2, ease: 'easeOut' }}
          className="h-2 rounded-full"
          style={{ background: 'linear-gradient(90deg,#7c3aed,#06b6d4)' }}
        />
      </div>
    </div>
  );
}

function CursorSpotlight() {
  useEffect(() => {
    const root = document.documentElement;
    function move(e) {
      root.style.setProperty('--spot-x', `${e.clientX}px`);
      root.style.setProperty('--spot-y', `${e.clientY}px`);
    }
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return null; // purely CSS-driven
}

// 3D tilt (lightweight) using pointer events
function TiltCard({ children }) {
  useEffect(() => {}, []);
  const ref = React.useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function handle(e) {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateZ(6px)`;
    }
    function reset() {
      el.style.transform = '';
    }
    el.addEventListener('pointermove', handle);
    el.addEventListener('pointerleave', reset);
    return () => {
      el.removeEventListener('pointermove', handle);
      el.removeEventListener('pointerleave', reset);
    };
  }, []);
  return (
    <div ref={ref} className="transition-transform will-change-transform">
      {children}
    </div>
  );
}

// ---------------- Main UI ----------------
export default function Portfolio({ data = initialData }) {
  const reduced = usePrefersReducedMotion();
  const [dark, setDark] = useState(true);
  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  const pageVariants = {
    initial: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* spotlight background */}
      <style>{`:root{--spot-x:50vw;--spot-y:50vh}
        body::before{content:'';position:fixed;inset:0;pointer-events:none;background:radial-gradient(500px 240px at var(--spot-x) var(--spot-y), rgba(255,255,255,0.03), rgba(255,255,255,0) 35%);mix-blend-mode:overlay;z-index:0;transition:background .12s linear}
      `}</style>
      <CursorSpotlight />

      {/* Lottie background (behind content) */}
      <div aria-hidden className="fixed top-6 right-6 w-56 h-56 md:w-72 md:h-72 opacity-30 pointer-events-none -z-10">
        <lottie-player
          src="https://assets2.lottiefiles.com/packages/lf20_tfb3estd.json"
          background="transparent"
          speed="0.9"
          style={{ width: '100%', height: '100%' }}
          loop
          autoplay
        />
      </div>

      <div className="page-container max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
        {/* Left column */}
        <aside className="lg:col-span-1">
          <AnimatePresence>
            <motion.div
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: reduced ? 0 : 0.5 }}
              className="p-6 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/80 backdrop-blur-md border border-slate-700 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 flex-none rounded-xl bg-gradient-to-br from-indigo-600 to-teal-500 flex items-center justify-center text-white text-xl font-semibold">
                  {data.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{data.name}</h1>
                  <p className="text-sm opacity-80">{data.title}</p>
                  <p className="mt-2 text-sm text-slate-400">{data.location}</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-300 leading-relaxed">{data.about}</p>

              <div className="mt-6 flex gap-2">
                <a href={data.resumeUrl} download className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-teal-400 text-slate-900 text-sm font-medium">
                  <DownloadCloud size={16} /> Resume
                </a>
                <button onClick={() => setDark(!dark)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 text-sm">
                  {dark ? 'Dark' : 'Light'}
                </button>
              </div>

              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-wide text-slate-400">Top skills</h4>
                <div className="mt-3">
                  {data.skills.slice(0, 4).map((s) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} />
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-3 text-slate-300">
                <a href={data.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href={data.social.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github size={18} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </aside>

        {/* Right column */}
        <main className="lg:col-span-2">
          <AnimatePresence>
            <motion.section
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: reduced ? 0 : 0.5 }}
            >
              {/* Projects */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Personal Projects</h2>
                    <p className="text-sm text-slate-400 mt-1">Production-ready work, scaled for users.</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.projects.map((p) => (
                    <TiltCard key={p.id}>
                      <motion.article
                        whileHover={!reduced ? { translateY: -8, boxShadow: '0 20px 40px rgba(2,6,23,0.6)' } : {}
                        }
                        className="p-5 rounded-xl border border-slate-700 bg-gradient-to-b from-slate-900/40 to-slate-900/20"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{p.title}</h3>
                            <p className="text-sm mt-2 text-slate-400">{p.description}</p>
                            <div className="mt-3">
                              {p.tags.map((t) => (
                                <Tag key={t}>{t}</Tag>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            {p.repo ? (
                              <a href={p.repo} target="_blank" rel="noreferrer" className="text-sm inline-flex items-center gap-2 text-slate-300">
                                <Github size={14} /> Repo
                              </a>
                            ) : null}

                            {p.live ? (
                              <a href={p.live} target="_blank" rel="noreferrer" className="text-sm inline-flex items-center gap-2 text-slate-300">
                                <ExternalLink size={14} /> Live
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </motion.article>
                    </TiltCard>
                  ))}
                </div>
              </div>

              {/* Experience timeline */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Experience</h2>
                <div className="mt-4 space-y-4">
                  {data.experience.map((e, i) => (
                    <motion.div
                      key={e.company + e.role}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-4 rounded-lg bg-slate-800/50 border border-slate-700"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{e.role}</div>
                          <div className="text-sm text-slate-400">{e.company}</div>
                        </div>
                        <div className="text-sm text-slate-400">{e.start} — {e.end}</div>
                      </div>
                      <ul className="mt-2 ml-4 list-disc text-sm text-slate-300">
                        {e.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="mt-8 p-6 rounded-xl bg-slate-800/40 border border-slate-700">
                <h2 className="text-lg font-semibold">Contact</h2>
                <p className="text-sm text-slate-400 mt-2">Want to collaborate or interview? Drop a line.</p>

                <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  const dataF = new FormData(form);
                  const subject = encodeURIComponent(`Portfolio inquiry from ${dataF.get('name')}`);
                  const body = encodeURIComponent(`Name: ${dataF.get('name')}\nEmail: ${dataF.get('email')}\nMessage:\n${dataF.get('message')}`);
                  window.location.href = `mailto:${initialData.social.email}?subject=${subject}&body=${body}`;
                }}>
                  <input name="name" required placeholder="Name" className="p-3 rounded-lg border border-slate-700 bg-transparent" />
                  <input name="email" required placeholder="Email" className="p-3 rounded-lg border border-slate-700 bg-transparent" />
                  <textarea name="message" required placeholder="Message" className="md:col-span-2 p-3 rounded-lg border border-slate-700 bg-transparent h-32" />
                  <button type="submit" className="md:col-span-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-teal-400 text-slate-900">
                    <Mail size={16} /> Send message
                  </button>
                </form>
              </div>

              <footer className="mt-8 text-sm text-slate-400">© {new Date().getFullYear()} {initialData.name} — Built with ❤️</footer>
            </motion.section>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
