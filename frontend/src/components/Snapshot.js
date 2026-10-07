import { motion } from "framer-motion";
import { Fragment } from "react";
import { GraduationCap, Code2, Coffee, Atom, Database, Braces, Rocket, MapPin, Leaf, Layers, Container, GitBranch } from "lucide-react";
import { SNAPSHOT, TECH_STACK } from "../data/content";
import { EASE, Reveal } from "./Reveal";

const ICONS = {
  grad: GraduationCap,
  code: Code2,
  coffee: Coffee,
  atom: Atom,
  db: Database,
  database: Database,
  braces: Braces,
  rocket: Rocket,
  pin: MapPin,
  leaf: Leaf,
  layers: Layers,
  container: Container,
  "git-branch": GitBranch,
};

const techSlug = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const stackContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const stackChip = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export function TechStack() {
  return (
    <section className="relative border-y border-white/[0.06] bg-[#0A0D14]/60 py-10 sm:py-12" data-testid="tech-stack">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal y={16}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400/90 mb-6" data-testid="tech-stack-label">
            Tech Stack
          </p>
        </Reveal>
        <motion.div
          variants={stackContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap gap-2.5"
          data-testid="tech-stack-chip-row"
        >
          {TECH_STACK.map(({ label, icon }, i) => {
            const Icon = ICONS[icon];
            return (
              <Fragment key={label}>
                <motion.span
                  variants={stackChip}
                  whileHover={{ y: -2 }}
                  className="group inline-flex cursor-default items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-4 py-2 font-mono text-xs sm:text-[13px] text-slate-300 backdrop-blur-sm hover:border-emerald-400/40 hover:text-emerald-200 transition-[border-color,color] duration-300"
                  data-testid={`tech-stack-chip-${techSlug(label)}`}
                >
                  <Icon size={13} className="text-emerald-400/80 transition-transform duration-300 group-hover:scale-110" />
                  {label}
                </motion.span>
                {i === 3 && (
                  <span aria-hidden="true" className="hidden lg:block lg:w-full lg:h-0" data-testid="tech-stack-row-break" />
                )}
              </Fragment>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default function Snapshot() {
  return (
    <section className="relative py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400/90 mb-7" data-testid="snapshot-label">
            At a Glance
          </p>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {SNAPSHOT.map(({ icon, label }, i) => {
            const Icon = ICONS[icon];
            return (
              <Reveal key={label} delay={i * 0.05}>
                <div
                  className="group h-full rounded-xl border border-white/[0.07] bg-[#0E131F]/70 px-4 py-4 hover:border-emerald-400/30 hover:-translate-y-0.5 transition-[border-color,transform] duration-300"
                  data-testid={`snapshot-item-${icon}`}
                >
                  <Icon size={16} className="text-emerald-400/90 mb-2.5" />
                  <p className="text-[13px] sm:text-sm text-slate-300 leading-snug">{label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
