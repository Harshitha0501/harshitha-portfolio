import { motion } from "framer-motion";
import { EXPERIENCE } from "../data/content";
import { EASE, SectionHead } from "./Reveal";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const lineVar = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 1.1, ease: EASE } },
};

const nodeVar = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

const cardVar = (i) => ({
  hidden: { opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 8 },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: EASE } },
});

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-20 sm:py-28 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead index="02" label="Experience" title="Where I've worked." />
        <motion.div
          className="relative"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          data-testid="experience-timeline"
        >
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-slate-800/70" aria-hidden="true" />
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-gradient-to-b from-emerald-400/70 via-emerald-400/30 to-blue-400/40 origin-top will-change-transform"
            variants={lineVar}
            data-testid="experience-line"
            aria-hidden="true"
          />
          {EXPERIENCE.map((job, i) => (
            <div key={job.company} className="relative pb-14 last:pb-0 pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-16">
              <motion.span
                variants={nodeVar}
                data-testid={`experience-node-${i + 1}`}
                className="absolute left-4 md:left-1/2 top-3 z-10 -translate-x-1/2 flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="absolute size-4 rounded-full bg-emerald-400/20" />
                <span className="relative size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
              </motion.span>

              <motion.div
                variants={cardVar(i)}
                data-testid={`experience-card-${i + 1}`}
                className={`group rounded-2xl border border-white/[0.07] bg-[#0E131F]/75 p-6 sm:p-7 hover:-translate-y-1 hover:border-emerald-400/30 hover:shadow-[0_24px_60px_rgba(8,12,20,0.6),0_0_30px_rgba(16,185,129,0.07)] transition-[border-color,transform,box-shadow] duration-300 ${
                  i % 2 === 0 ? "md:col-start-1" : "md:col-start-2"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-3xl font-bold text-slate-800 group-hover:text-emerald-400/50 transition-colors duration-300">
                    {job.num}
                  </span>
                  <span className="font-mono text-[11px] text-emerald-300 border border-emerald-400/20 bg-emerald-400/[0.06] rounded px-2 py-1 whitespace-nowrap">
                    {job.period}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg sm:text-xl font-semibold text-slate-100" data-testid={`experience-role-${i + 1}`}>
                  {job.role}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {job.company} <span className="text-slate-600">·</span> {job.location}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{job.project}</p>
                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
                      <span className="mt-[7px] size-1.5 shrink-0 rounded-sm bg-emerald-400/70" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-slate-400 group-hover:-translate-y-0.5 group-hover:border-emerald-400/30 group-hover:text-emerald-300/90 transition-[border-color,color,transform] duration-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
