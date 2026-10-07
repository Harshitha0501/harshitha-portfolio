import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 26, scale = 1, className = "", ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, scale: scale === 1 ? undefined : scale }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.7, delay, ease: EASE }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const SectionHead = ({ index, label, title, sub }) => (
  <Reveal className="mb-12 sm:mb-16">
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400/90 mb-4">
      {index} / {label}
    </p>
    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-50">
      {title}
    </h2>
    {sub ? <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-400 leading-relaxed">{sub}</p> : null}
  </Reveal>
);

export const scrollToHash = (hash) => {
  const el = document.querySelector(hash);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -76, duration: 1.2 });
  else el.scrollIntoView({ behavior: "smooth" });
};
