import { GraduationCap } from "lucide-react";
import { ABOUT_TEXT, EDUCATION, FOCUSED_ON } from "../data/content";
import { Reveal, SectionHead } from "./Reveal";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead index="01" label="About" title="About me." />
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">
          <Reveal>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl" data-testid="about-text">
              {ABOUT_TEXT}
            </p>
            <div className="mt-8 rounded-2xl border border-white/[0.07] bg-[#0E131F]/70 p-6" data-testid="education-card">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                <GraduationCap size={15} className="text-emerald-400" /> Education
              </p>
              <p className="mt-4 text-sm sm:text-base font-medium text-slate-100 leading-snug">{EDUCATION.institution}</p>
              <p className="mt-1 text-sm text-slate-400">{EDUCATION.degree}</p>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-slate-500">
                <span className="text-emerald-300/90">{EDUCATION.period}</span>
                <span>{EDUCATION.cgpa}</span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-white/[0.07] bg-[#0E131F]/70 p-6 h-fit">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 mb-4">Currently focused on</p>
              <div className="flex flex-wrap gap-2" data-testid="about-focused-badges">
                {FOCUSED_ON.map((tech) => (
                  <span
                    key={tech}
                    data-testid={`focus-badge-${tech.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="rounded-md border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 font-mono text-xs text-emerald-300 hover:bg-emerald-400/15 hover:-translate-y-0.5 transition-[background-color,transform] duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
