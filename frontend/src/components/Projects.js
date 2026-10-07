import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Code2, ExternalLink, Github } from "lucide-react";
import { PERSON, PROJECTS } from "../data/content";
import { EASE, Reveal, SectionHead } from "./Reveal";
import ProjectModal from "./ProjectModal";

const GithubButton = ({ project, testid }) =>
  project.github ? (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testid}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-emerald-300 hover:-translate-y-0.5 transition-[color,transform] duration-300"
    >
      <Github size={15} /> GitHub
    </a>
  ) : null;

const DemoButton = ({ project, testid }) =>
  project.demo ? (
    <a
      href={project.demo}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testid}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-300 hover:text-emerald-200 hover:-translate-y-0.5 transition-[color,transform] duration-300"
    >
      Live Demo <ExternalLink size={14} />
    </a>
  ) : null;

const Preview = ({ project, alt, className = "", testid }) => (
  <div className={`relative overflow-hidden dot-grid bg-[#0B1220] ${className}`}>
    {project.screenshot ? (
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="w-full h-full"
      >
        <img
          src={project.screenshot}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top saturate-[0.88] group-hover:scale-[1.03] transition-transform duration-500 will-change-transform"
        />
      </motion.div>
    ) : (
      <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center gap-3" data-testid={`project-preview-placeholder-${project.id}`}>
        <Code2 size={26} className="text-slate-600" />
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">Project Preview</p>
      </div>
    )}
    <div className="pointer-events-none absolute inset-0 bg-emerald-100 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300" aria-hidden="true" />
  </div>
);

export default function Projects() {
  const [active, setActive] = useState(null);
  const featured = PROJECTS.find((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-28 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="03"
          label="Projects"
          title="What I've built."
          sub="Full-stack projects built with Java, Spring Boot, React and FastAPI — open any card for the problem, what I built and key features."
        />

        <Reveal scale={0.98}>
          <div
            className="group grid lg:grid-cols-2 rounded-2xl border border-white/[0.08] bg-[#0E131F]/80 overflow-hidden hover:border-emerald-400/30 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(16,185,129,0.09)] transition-[border-color,transform,box-shadow] duration-300"
            data-testid="project-card-featured"
          >
            <button
              className="relative text-left cursor-pointer"
              onClick={() => setActive(featured)}
              data-testid="project-details-open-staffhub"
              aria-label="Open StaffHub project details"
            >
              <Preview project={featured} alt="StaffHub dashboard interface" className="h-full min-h-[240px] lg:min-h-[340px]" />
              <span className="absolute top-4 left-4 rounded-full border border-emerald-400/30 bg-[#07090E]/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                Featured Project
              </span>
            </button>
            <div className="p-6 sm:p-9 flex flex-col">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live demo available
              </div>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-slate-50" data-testid="featured-project-title">
                {featured.name}
              </h3>
              <p className="mt-1 text-sm text-slate-400">{featured.subtitle}</p>
              <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed" data-testid="featured-project-description">
                {featured.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {featured.tech.map((t) => (
                  <span key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-slate-300" data-testid="featured-project-tech">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-8 flex flex-wrap items-center gap-6">
                <DemoButton project={featured} testid="featured-project-live-demo-button" />
                <GithubButton project={featured} testid="featured-project-github-button" />
                <button
                  onClick={() => setActive(featured)}
                  data-testid="featured-project-details-button"
                  className="group/btn inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-300 hover:-translate-y-0.5 transition-[color,transform] duration-300"
                >
                  View Details
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          {others.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} scale={0.98} className="h-full">
              <div
                className="group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#0E131F]/80 overflow-hidden hover:border-emerald-400/30 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-[border-color,transform,box-shadow] duration-300"
                data-testid={`project-card-${p.id}`}
              >
                <button onClick={() => setActive(p)} className="relative cursor-pointer" data-testid={`project-details-open-${p.id}`} aria-label={`Open ${p.name} project details`}>
                  <Preview project={p} alt={p.screenshotAlt || `${p.name} interface`} className="w-full aspect-[16/10]" />
                </button>
                <div className="flex flex-1 flex-col p-6">
                  <h4 className="font-display text-lg font-semibold text-slate-100">{p.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{p.subtitle}</p>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-5 flex items-center gap-6">
                    <DemoButton project={p} testid={`project-live-demo-${p.id}`} />
                    <GithubButton project={p} testid={`project-github-${p.id}`} />
                    <button
                      onClick={() => setActive(p)}
                      data-testid={`project-details-button-${p.id}`}
                      className="group/btn inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-300 hover:-translate-y-0.5 transition-[color,transform] duration-300"
                    >
                      View Details
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.24} scale={0.98} className="h-full">
            <a
              href={PERSON.github}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="projects-more-github-card"
              className="group flex h-full min-h-[220px] flex-col items-start justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-[#0E131F]/40 p-6 hover:border-emerald-400/40 hover:-translate-y-1.5 transition-[border-color,transform] duration-300"
            >
              <span className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] p-2.5 text-emerald-300">
                <Github size={20} />
              </span>
              <p className="font-display text-lg font-semibold text-slate-100">More on GitHub</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Source code, issues and development history —{" "}
                <span className="text-emerald-300 inline-flex items-center gap-1">
                  github.com/Harshitha0501
                  <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </p>
            </a>
          </Reveal>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
