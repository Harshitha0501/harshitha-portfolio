import { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2, Download, Github, Linkedin, Loader2, Mail, MapPin, RotateCcw, Send } from "lucide-react";
import { PERSON } from "../data/content";
import { EASE, Reveal, SectionHead } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SUCCESS_MSG = "Message sent successfully. Thank you for reaching out!";
const ERROR_MSG = "Unable to send your message right now. Please email me directly at harshithac0512@gmail.com.";

const LINKS = [
  { icon: Github, label: "GitHub", value: "Harshitha0501", href: PERSON.github, testid: "contact-github-link" },
  { icon: Linkedin, label: "LinkedIn", value: "in/harshitha-c2605", href: PERSON.linkedin, testid: "contact-linkedin-link" },
];

const inputClass =
  "w-full rounded-lg border border-white/10 bg-[#07090E]/80 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-400/50 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)] transition-[border-color,box-shadow] duration-200";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) next.email = "Please enter a valid email address.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (sending || !validate()) return;
    setSending(true);
    setStatus("sending");
    try {
      await axios.post(`${API}/contact`, {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      setForm({ name: "", email: "", message: "" });
      setErrors({});
      setStatus("success");
      toast.success(SUCCESS_MSG);
    } catch (err) {
      setStatus("error");
      toast.error(ERROR_MSG);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead index="07" label="Contact" title="Let's build something meaningful." />
        <Reveal>
          <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed" data-testid="contact-subtext">
            I'm open to Software Developer, Java Developer and Full Stack Developer opportunities. Send a message below or
            email me directly — I reply quickly.
          </p>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Reveal className="sm:col-span-2" delay={0.05}>
                <a
                  href={`mailto:${PERSON.email}`}
                  data-testid="contact-email-link"
                  className="group flex items-center gap-4 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] px-5 py-4 hover:border-emerald-400/50 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,185,129,0.12)] transition-[border-color,transform,box-shadow] duration-300"
                >
                  <span className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-2.5 text-emerald-300 transition-transform duration-300 group-hover:scale-110">
                    <Mail size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-slate-500">Email — fastest reply</span>
                    <span className="block truncate text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">{PERSON.email}</span>
                  </span>
                </a>
              </Reveal>
              {LINKS.map(({ icon: Icon, label, value, href, testid }, i) => (
                <Reveal key={label} delay={0.12 + i * 0.06} className="h-full">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={testid}
                    className="group flex h-full items-center gap-4 rounded-xl border border-white/[0.07] bg-[#0E131F]/70 px-5 py-4 hover:border-emerald-400/30 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-[border-color,transform,box-shadow] duration-300"
                  >
                    <span className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] p-2.5 text-emerald-300 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-slate-500">{label}</span>
                      <span className="block truncate text-sm text-slate-200 group-hover:text-emerald-300 transition-colors">{value}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
              <Reveal delay={0.24} className="h-full">
                <div className="flex h-full items-center gap-4 rounded-xl border border-white/[0.07] bg-[#0E131F]/70 px-5 py-4" data-testid="contact-location-card">
                  <span className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] p-2.5 text-emerald-300">
                    <MapPin size={16} />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-500">Location</span>
                    <span className="block text-sm text-slate-200">{PERSON.location}</span>
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${PERSON.email}`}
                  data-testid="contact-email-cta-button"
                  className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#04130c] shadow-[0_0_28px_rgba(16,185,129,0.3)] hover:bg-emerald-300 hover:-translate-y-0.5 transition-[background-color,transform,box-shadow] duration-300"
                >
                  <Mail size={15} /> Email Me
                </a>
                <a
                  href={PERSON.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Harshitha_C_Resume.pdf"
                  data-testid="contact-resume-button"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-200 hover:border-emerald-400/40 hover:text-emerald-300 hover:-translate-y-0.5 transition-[border-color,color,transform] duration-300"
                >
                  <Download size={15} /> Download Resume
                </a>
              </div>
            </Reveal>
          </div>

          <motion.form
            onSubmit={submit}
            noValidate
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="h-fit rounded-2xl border border-white/[0.08] bg-[#0E131F]/80 p-6 sm:p-8"
            data-testid="contact-form"
            aria-label="Contact form"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="cf-name" className="block font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                  Name
                </label>
                <input
                  id="cf-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "cf-name-error" : undefined}
                  data-testid="contact-form-name-input"
                  placeholder="Your name"
                  className={inputClass}
                />
                {errors.name && (
                  <p id="cf-name-error" className="mt-2 text-xs text-red-400" data-testid="contact-form-name-error" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="cf-email" className="block font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                  Email
                </label>
                <input
                  id="cf-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "cf-email-error" : undefined}
                  data-testid="contact-form-email-input"
                  placeholder="you@company.com"
                  className={inputClass}
                />
                {errors.email && (
                  <p id="cf-email-error" className="mt-2 text-xs text-red-400" data-testid="contact-form-email-error" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="cf-message" className="block font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                  Message
                </label>
                <textarea
                  id="cf-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "cf-message-error" : undefined}
                  data-testid="contact-form-message-input"
                  placeholder="Tell me about the role or project..."
                  className={`${inputClass} resize-none`}
                />
                {errors.message && (
                  <p id="cf-message-error" className="mt-2 text-xs text-red-400" data-testid="contact-form-message-error" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="flex items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.08] px-4 py-4"
                    data-testid="contact-form-success"
                    role="status"
                  >
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-300" />
                    <div className="min-w-0 text-sm">
                      <p className="font-medium text-emerald-300" data-testid="contact-form-success-message">{SUCCESS_MSG}</p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        data-testid="contact-form-send-another-button"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-emerald-300 transition-colors"
                      >
                        <RotateCcw size={12} /> Send another message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="submit-area" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: [0, -4, 4, -2, 2, 0] }}
                        transition={{ duration: 0.45 }}
                        className="flex items-start gap-3 rounded-xl border border-red-400/25 bg-red-400/[0.06] px-4 py-3.5"
                        data-testid="contact-form-error"
                        role="alert"
                      >
                        <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
                        <p className="text-sm text-red-300 leading-relaxed" data-testid="contact-form-error-message">
                          Unable to send your message right now. Please email me directly at{" "}
                          <a href={`mailto:${PERSON.email}`} className="underline underline-offset-2">
                            {PERSON.email}
                          </a>
                          .
                        </p>
                      </motion.div>
                    )}
                    <button
                      type="submit"
                      disabled={sending}
                      data-testid="contact-form-submit-button"
                      className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-emerald-400 px-7 py-3 text-sm font-semibold text-[#04130c] shadow-[0_0_24px_rgba(16,185,129,0.3)] hover:bg-emerald-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 transition-[background-color,transform,box-shadow,opacity] duration-300"
                    >
                      {sending ? (
                        <>
                          Sending <Loader2 size={15} className="animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Message <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
