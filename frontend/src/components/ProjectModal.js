import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Code2, ExternalLink, X } from "lucide-react";

export default function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();

    const panel = panelRef.current;
    const focusables = () =>
      panel
        ? Array.from(panel.querySelectorAll("a[href], button:not([disabled])"))
        : [];
    const focusTimer = setTimeout(() => focusables()[0]?.focus(), 60);

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = "";
      if (window.__lenis) window.__lenis.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md flex items-start sm:items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
          data-testid="project-modal-overlay"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} project details`}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-3xl my-6 max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0E131F] shadow-[0_40px_100px_rgba(0,0,0,0.7)] overflow-x-hidden"
            onClick={(e) => e.stopPropagation()}
            data-testid="project-modal-panel"
          >
            <div className="sticky top-0 z-20 flex justify-end p-4 pointer-events-none">
              <button
                onClick={onClose}
                data-testid="project-modal-close-button"
                aria-label="Close project details"
                className="pointer-events-auto rounded-full border border-white/15 bg-[#07090E]/90 p-2 text-slate-300 hover:text-emerald-300 hover:border-emerald-400/40 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {project.screenshot ? (
              <img src={project.screenshot} alt={project.screenshotAlt || `${project.name} interface`} loading="lazy" className="w-full h-48 sm:h-60 -mt-16 object-cover object-top border-b border-white/[0.07]" />
            ) : (
              <div className="w-full h-48 sm:h-60 -mt-16 dot-grid bg-[#0B1220] border-b border-white/[0.07] flex flex-col items-center justify-center gap-3">
                <Code2 size={26} className="text-slate-600" />
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">Project Preview</p>
              </div>
            )}

            <div className="p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold text-slate-50" data-testid="project-modal-title">
                {project.name}
              </h3>
              <p className="text-sm text-emerald-400/90 mt-0.5">{project.subtitle}</p>

              <div className="mt-6 grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">Problem / purpose</p>
                  <p className="text-sm text-slate-300 leading-relaxed" data-testid="project-modal-problem">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">What I built</p>
                  <p className="text-sm text-slate-300 leading-relaxed" data-testid="project-modal-built">
                    {project.built}
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">Key features</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2" data-testid="project-modal-features">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check size={15} className="mt-0.5 shrink-0 text-emerald-400" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">Technologies</p>
                <div className="flex flex-wrap gap-2" data-testid="project-modal-technologies">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="project-modal-github-button"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-slate-200 hover:border-emerald-400/40 hover:text-emerald-300 hover:-translate-y-0.5 transition-[border-color,color,transform] duration-300"
                  >
                    GitHub Repository
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="project-modal-live-button"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-[#04130c] hover:bg-emerald-300 hover:-translate-y-0.5 transition-[background-color,transform] duration-300"
                  >
                    Live Demo <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
