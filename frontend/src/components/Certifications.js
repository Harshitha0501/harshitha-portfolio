import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import { CERTIFICATIONS } from "../data/content";
import { Reveal, SectionHead } from "./Reveal";

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 sm:py-20 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead index="06" label="Certifications" title="Certified." />
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.07} className="h-full">
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`certification-link-${i}`}
                className="group flex h-full items-center gap-4 rounded-xl border border-white/[0.07] bg-[#0E131F]/70 px-5 py-4 hover:border-emerald-400/30 hover:-translate-y-0.5 transition-[border-color,transform] duration-300"
              >
                <span className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] p-2.5 text-emerald-300">
                  <Award size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-200 group-hover:text-emerald-300 transition-colors">{cert.title}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                    <ShieldCheck size={12} className="text-emerald-400" /> {cert.issuer} · Certificate
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300">
                    View Certificate <ExternalLink size={12} />
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
