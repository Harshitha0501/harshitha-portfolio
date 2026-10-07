import { motion } from "framer-motion";
import { SKILLS } from "../data/content";
import { EASE, SectionHead } from "./Reveal";

const cardContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const catHead = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const chip = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-20 sm:py-28 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead index="04" label="Skills" title="Technologies I work with." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.category}
              variants={cardContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className={`h-full rounded-2xl border border-white/[0.07] bg-[#0E131F]/70 p-6 ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
              data-testid={`skills-group-${group.category.toLowerCase()}`}
            >
              <motion.p variants={catHead} className="font-mono text-xs uppercase tracking-[0.22em] text-emerald-400/90 mb-4" data-testid={`skills-heading-${group.category.toLowerCase()}`}>
                {group.category}
              </motion.p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <motion.span key={skill} variants={chip} data-testid={`skill-badge-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="will-change-transform">
                    <span className="flex rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs sm:text-sm text-slate-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-emerald-400/40 hover:text-emerald-300 transition-[border-color,color,transform] duration-200 cursor-default">
                      {skill}
                    </span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
