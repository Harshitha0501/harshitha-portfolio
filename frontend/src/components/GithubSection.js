import { ArrowUpRight } from "lucide-react";
import { PERSON, REPOS } from "../data/content";
import { Reveal } from "./Reveal";

export default function GithubSection() {
  return (
    <section id="github" className="scroll-mt-24 py-20 sm:py-28 border-t border-white/[0.05] relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-emerald-500/[0.05] blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400/90 mb-4">05 / GitHub</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-50" data-testid="github-headline">
            Selected Code &amp; Repositories
          </h2>
          <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-400 leading-relaxed">
            Explore selected projects, source code and development work on GitHub.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-3" data-testid="github-stats">
            <span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-4 py-1.5 font-mono text-xs text-emerald-300">
              Selected repositories
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-slate-400">
              Java • Spring Boot • React • Python • SQL
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REPOS.map((repo, i) => (
            <Reveal key={repo.name} delay={i * 0.08} className="h-full">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`repo-card-${repo.name}`}
                className="group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-[#0E131F]/70 p-6 hover:border-emerald-400/30 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-[border-color,transform,box-shadow] duration-300"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-sm text-slate-100 group-hover:text-emerald-300 transition-colors truncate">
                    {repo.name}
                  </p>
                  <ArrowUpRight size={16} className="shrink-0 text-slate-500 group-hover:text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-[color,transform] duration-300" />
                </div>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{repo.desc}</p>
                <div className="mt-auto pt-4 flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                  <span className="text-xs text-slate-500">{repo.lang}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10">
            <a
              href={PERSON.github}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="github-view-profile-button"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#04130c] shadow-[0_0_28px_rgba(16,185,129,0.3)] hover:bg-emerald-300 hover:-translate-y-0.5 transition-[background-color,transform,box-shadow] duration-300"
            >
              View GitHub Profile <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
