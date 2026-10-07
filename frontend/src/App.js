import { Component, useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Snapshot, { TechStack } from "./components/Snapshot";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import GithubSection from "./components/GithubSection";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import AmbientBackground from "./components/AmbientBackground";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-[#07090E] flex items-center justify-center p-8">
          <p className="text-slate-400 font-mono text-sm">Something went wrong — please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
}

function Portfolio() {
  useLenis();
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative min-h-screen bg-[#07090E] text-slate-200 font-body">
        <AmbientBackground />
        <Navbar />
        <main>
          <Hero />
          <TechStack />
          <Snapshot />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <GithubSection />
          <Certifications />
          <Contact />
        </main>
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Portfolio />
    </ErrorBoundary>
  );
}
