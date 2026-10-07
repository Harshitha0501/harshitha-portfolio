import { useMemo, useRef } from "react";
import { Fragment } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Download, Github, MapPin } from "lucide-react";
import { PERSON } from "../data/content";
import { EASE, scrollToHash } from "./Reveal";

// Entrance choreography (seconds) — photo hangs in, then text follows.
const T = {
  photo: 0.05,
  badge: 0.3,
  name: 0.55,
  role: 0.85,
  tech: 1.1,
  intro: 1.35,
  cta: 1.55,
};

const TECH_ITEMS = PERSON.techLine.split("•").map((t) => t.trim());

export default function Hero() {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { isNarrow, finePointer } = useMemo(
    () => ({
      isNarrow: window.matchMedia("(max-width: 1023px)").matches,
      finePointer: window.matchMedia("(pointer: fine)").matches,
    }),
    []
  );

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yCard = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : isNarrow ? 18 : 45]);

  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const rotX = useSpring(rawRX, { stiffness: 130, damping: 18, mass: 0.6 });
  const rotY = useSpring(rawRY, { stiffness: 130, damping: 18, mass: 0.6 });

  const onTilt = (e) => {
    if (reduceMotion || !finePointer || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rawRY.set((px - 0.5) * 7);
    rawRX.set(-(py - 0.5) * 7);
    cardRef.current.style.setProperty("--mx", `${px * 100}%`);
    cardRef.current.style.setProperty("--my", `${py * 100}%`);
  };

  const resetTilt = () => {
    rawRX.set(0);
    rawRY.set(0);
  };

  const goProjects = (e) => {
    e.preventDefault();
    scrollToHash("#projects");
  };

  // PHASE 1 — photo "hanging" entrance: drops from above, rotates to 0, soft spring settle.
  const photoEntrance = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6, delay: T.photo, ease: "easeOut" },
      }
    : {
        initial: { opacity: 0, y: isNarrow ? -32 : -52, rotate: isNarrow ? -2 : -5, scale: 0.95 },
        animate: { opacity: 1, y: 0, rotate: 0, scale: 1 },
        transition: {
          type: "spring",
          stiffness: 105,
          damping: 13,
          mass: 1,
          delay: T.photo,
          opacity: { duration: 0.5, delay: T.photo, ease: "easeOut" },
        },
      };

  // Continuous float — 3.5px, extremely slow, starts only after the photo settles.
  const floatProps = reduceMotion
    ? {}
    : {
        animate: { y: [0, -3.5, 0] },
        transition: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.3 },
      };

  const sharp = (delay, y, blur, duration, extra = {}) => ({
    initial: reduceMotion
      ? { opacity: 0, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y, filter: `blur(${blur}px)` },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: reduceMotion
      ? { duration: 0.4, delay, ease: "easeOut", ...extra }
      : { duration, delay, ease: EASE, ...extra },
  });

  const ctaAnim = (i) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: reduceMotion
      ? { duration: 0.4, delay: T.cta + i * 0.06, ease: "easeOut" }
      : { duration: 0.5, delay: T.cta + i * 0.08, ease: EASE },
  });

  const techItem = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: reduceMotion ? { duration: 0.3, ease: "easeOut" } : { duration: 0.4, ease: EASE },
    },
  };

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden dot-grid">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -ml-[410px] h-[420px] w-[820px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(16,185,129,0.08), rgba(59,130,246,0.04) 45%, transparent 72%)",
          filter: "blur(40px)",
        }}
        animate={reduceMotion ? undefined : { x: [0, 14, 0], y: [0, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        data-testid="hero-glow"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 pt-28 pb-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-10 items-center">
        <div>
          <motion.p
            {...sharp(T.badge, 14, 4, 0.5)}
            className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-emerald-400/90 border border-emerald-400/20 bg-emerald-400/[0.06] rounded-full px-4 py-1.5"
            data-testid="hero-availability-badge"
          >
            <span
              aria-hidden="true"
              className="inline-block size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
            />
            Open to Software Development Opportunities
          </motion.p>

          <h1 className="mt-7 font-display font-bold tracking-tight leading-[0.98] text-slate-50 text-[clamp(2.6rem,6.2vw,5.4rem)]">
            <motion.span
              className="block"
              {...sharp(T.name, 32, 10, 0.8)}
              data-testid="hero-name"
            >
              {PERSON.nameUpper}
            </motion.span>
            <motion.span
              className="block text-[clamp(1.4rem,3.2vw,2.7rem)] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-blue-400"
              {...sharp(T.role, 20, 6, 0.55)}
              data-testid="hero-role"
            >
              SOFTWARE DEVELOPER
            </motion.span>
            <motion.span
              aria-hidden="true"
              className="block h-[2px] w-28 mt-3 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 origin-left"
              initial={reduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0.85 }}
              animate={reduceMotion ? { opacity: 0.85 } : { scaleX: 1, opacity: 0.85 }}
              transition={{ delay: T.role + 0.5, duration: reduceMotion ? 0.3 : 0.5, ease: EASE }}
              data-testid="hero-role-underline"
            />
          </h1>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: T.tech } } }}
            className="mt-5 inline-flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-xs sm:text-sm text-emerald-300/90 tracking-wide"
            data-testid="hero-tech-line"
          >
            {TECH_ITEMS.map((tech, i) => (
              <Fragment key={tech}>
                {i > 0 && (
                  <motion.span variants={techItem} className="text-slate-600" aria-hidden="true">
                    •
                  </motion.span>
                )}
                <motion.span variants={techItem} data-testid={`hero-tech-item-${i}`}>
                  {tech}
                </motion.span>
              </Fragment>
            ))}
          </motion.div>

          <motion.p
            {...sharp(T.tech, 10, 3, 0.45)}
            className="mt-3 flex w-fit items-center gap-1.5 font-mono text-xs text-slate-500"
            data-testid="hero-location"
          >
            <MapPin size={12} className="text-emerald-400/70" /> {PERSON.location}
          </motion.p>

          <motion.p
            {...sharp(T.intro, 18, 6, 0.6)}
            className="mt-6 max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed"
            data-testid="hero-tagline"
          >
            {PERSON.tagline}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            data-testid="hero-cta-group"
          >
            <motion.a
              href="#projects"
              onClick={goProjects}
              {...ctaAnim(0)}
              data-testid="hero-view-projects-button"
              className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#04130c] shadow-[0_0_28px_rgba(16,185,129,0.35)] hover:bg-emerald-300 hover:-translate-y-0.5 transition-[background-color,transform,box-shadow] duration-300"
            >
              View Projects
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href={PERSON.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Harshitha_C_Resume.pdf"
              {...ctaAnim(1)}
              data-testid="hero-download-resume-button"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-6 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-400/20 hover:-translate-y-0.5 transition-[background-color,border-color,transform] duration-300"
            >
              <Download size={16} /> Download Resume
            </motion.a>
            <motion.a
              href={PERSON.github}
              target="_blank"
              rel="noopener noreferrer"
              {...ctaAnim(2)}
              data-testid="hero-github-button"
              aria-label="GitHub profile"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-200 hover:border-emerald-400/40 hover:text-emerald-300 hover:-translate-y-0.5 transition-[border-color,color,transform] duration-300"
            >
              <Github size={16} className="transition-transform duration-300 group-hover:scale-110" /> GitHub
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          style={{ y: yCard }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
          data-testid="hero-photo-wrapper"
        >
          <motion.div {...photoEntrance}>
            <motion.div {...floatProps}>
              <motion.div
                ref={cardRef}
                onMouseMove={onTilt}
                onMouseLeave={resetTilt}
                style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
                className="group relative rounded-2xl border border-white/10 bg-[#0E131F]/80 backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.55)] overflow-hidden hover:border-emerald-400/25 transition-[border-color] duration-300 will-change-transform"
                data-testid="hero-photo-card"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(16,185,129,0.14), transparent 65%)",
                  }}
                />
                <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
                  <span className="size-3 rounded-full bg-[#ff5f57]" />
                  <span className="size-3 rounded-full bg-[#febc2e]" />
                  <span className="size-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 font-mono text-[11px] text-slate-500">harshitha.config.js</span>
                </div>
                <div className="relative">
                  <img
                    src={PERSON.photo}
                    alt="Harshitha C. — Software Developer"
                    data-testid="hero-photo"
                    className="w-full aspect-[4/4.4] object-cover object-top saturate-[0.88] contrast-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090E]/85 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-mono text-[11px] text-emerald-300">$ whoami</p>
                    <p className="font-mono text-xs text-slate-300 mt-1">&gt; java · spring boot · react · rest apis</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
