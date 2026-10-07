import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PERSON } from "../data/content";
import { EASE, scrollToHash } from "./Reveal";

const LINKS = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Certifications", "#certifications"],
  ["Contact", "#contact"],
];

const LogoMark = () => (
  <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="14" fill="#0E131F" />
    <rect x="1.5" y="1.5" width="61" height="61" rx="12.5" fill="none" stroke="#10B981" strokeOpacity="0.45" strokeWidth="2" />
    <path d="M18 22v20M28 22v20M18 32h10" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    <path d="M38 22l8 10-8 10" fill="none" stroke="#F8FAFC" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const go = (hash) => (e) => {
  e.preventDefault();
  scrollToHash(hash);
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      if (window.__lenis) window.__lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      if (window.__lenis) window.__lenis.start();
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    const ids = LINKS.map(([, h]) => h.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-[#07090E]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          : "bg-transparent border-b border-transparent"
      }`}
      data-testid="navbar"
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between" aria-label="Main navigation">
        <a href="#home" onClick={go("#home")} data-testid="nav-logo-home" className="flex items-center gap-3 group rounded-full focus-visible:outline-none">
          <LogoMark />
          <span className="font-display font-bold tracking-tight text-slate-100 text-sm sm:text-base group-hover:text-emerald-300 transition-colors">
            {PERSON.nameUpper}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1">
          {LINKS.map(([label, hash]) => {
            const isActive = active === hash;
            return (
              <a
                key={hash}
                href={hash}
                onClick={go(hash)}
                data-testid={`nav-link-${label.toLowerCase()}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300 focus-visible:outline-none ${
                  isActive ? "text-emerald-300" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-emerald-400/10 border border-emerald-400/25"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{label}</span>
              </a>
            );
          })}
          <a
            href={PERSON.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-resume-button"
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1.5 ml-1 text-sm font-medium text-emerald-300 hover:bg-emerald-400/20 hover:-translate-y-0.5 transition-[background-color,transform] duration-300 focus-visible:outline-none"
          >
            Resume <span aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          className="md:hidden text-slate-300 hover:text-emerald-300 p-2 rounded-lg transition-colors focus-visible:outline-none"
          onClick={() => setOpen((v) => !v)}
          data-testid="nav-mobile-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
              data-testid="nav-mobile-backdrop"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute top-full inset-x-0 z-50 md:hidden overflow-hidden bg-[#07090E]/95 backdrop-blur-xl border-b border-white/[0.06]"
              data-testid="nav-mobile-menu"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
                  hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
                className="px-6 py-5 flex flex-col gap-1"
              >
                {LINKS.map(([label, hash]) => (
                  <motion.li
                    key={hash}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                    }}
                  >
                    <a
                      href={hash}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        setTimeout(() => scrollToHash(hash), 320);
                      }}
                      data-testid={`nav-mobile-link-${label.toLowerCase()}`}
                      className={`flex items-center gap-2 rounded-lg px-3 py-3 text-base transition-colors focus-visible:outline-none ${
                        active === hash ? "text-emerald-300" : "text-slate-300 hover:text-emerald-300"
                      }`}
                    >
                      <span aria-hidden="true" className={`size-1 rounded-full bg-emerald-400 ${active === hash ? "opacity-100" : "opacity-0"}`} />
                      {label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                  }}
                  className="pt-3"
                >
                  <a
                    href={PERSON.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="nav-mobile-resume-button"
                    className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300 focus-visible:outline-none"
                  >
                    Resume <span aria-hidden="true">↗</span>
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
