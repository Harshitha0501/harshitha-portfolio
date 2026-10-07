import { motion } from "framer-motion";

const LIGHTS = [
  {
    className: "-top-40 -left-32 h-[560px] w-[560px] bg-emerald-500/[0.09]",
    x: [0, 90, 0],
    y: [0, 60, 0],
    duration: 14,
  },
  {
    className: "top-1/4 -right-48 h-[640px] w-[640px] bg-blue-500/[0.08]",
    x: [0, -80, 0],
    y: [0, 70, 0],
    duration: 17,
  },
  {
    className: "bottom-[-220px] left-1/4 h-[520px] w-[520px] bg-emerald-400/[0.05]",
    x: [0, 70, 0],
    y: [0, -50, 0],
    duration: 12,
  },
];

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true" data-testid="ambient-background">
      {LIGHTS.map((l, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[150px] will-change-transform ${l.className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: l.x, y: l.y }}
          transition={{
            opacity: { duration: 1.4, ease: "easeOut" },
            x: { duration: l.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
            y: { duration: l.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
          }}
        />
      ))}
    </div>
  );
}
