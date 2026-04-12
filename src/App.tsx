import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";
import { projects } from "@/src/components/app/data";
import { AboutSection } from "@/src/components/app/sections/AboutSection";
import { ArchiveSection } from "@/src/components/app/sections/ArchiveSection";
import { AiFutureSection } from "@/src/components/app/sections/AiFutureSection";
import { CapabilitiesSection } from "@/src/components/app/sections/CapabilitiesSection";
import { CertificationShowcaseSection } from "@/src/components/app/sections/CertificationShowcaseSection";
import { ContactSection } from "@/src/components/app/sections/ContactSection";
import { DigitalPresenceSection } from "@/src/components/app/sections/DigitalPresenceSection";
import { ExperienceSection } from "@/src/components/app/sections/ExperienceSection";
import { FloatingDock } from "@/src/components/app/FloatingDock";
import { FilmGrain } from "@/src/components/ui/film-grain";
import { HeroSection } from "@/src/components/app/sections/HeroSection";
import { InspirationSection } from "@/src/components/app/sections/InspirationSection";
import { LabSection } from "@/src/components/app/sections/LabSection";
import { OpenSourceSection } from "@/src/components/app/sections/OpenSourceSection";
import { ProcessSection } from "@/src/components/app/sections/ProcessSection";
import { ProjectsSection } from "@/src/components/app/sections/ProjectsSection";
import { TestimonialsSection } from "@/src/components/app/sections/TestimonialsSection";
import { TechArsenalSection } from "@/src/components/app/sections/TechArsenalSection";
import { MarqueeBannerSection } from "@/src/components/app/sections/MarqueeBannerSection";
import { FloatingVibeStation } from "@/src/components/app/FloatingVibeStation";

type SectionRevealConfig = {
  initial: Record<string, number | string>;
  whileInView: Record<string, number | string>;
  transition: {
    duration: number;
    ease: [number, number, number, number];
    delay?: number;
  };
  viewport?: {
    once: boolean;
    margin: string;
  };
};

const REVEAL_PRESETS: SectionRevealConfig[] = [
  {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  {
    initial: { opacity: 0, x: -48 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
  {
    initial: { opacity: 0, x: 48 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
  {
    initial: { opacity: 0, scale: 0.96, y: 24 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 1] },
  },
  {
    initial: { opacity: 0, rotateX: -8, y: 28 },
    whileInView: { opacity: 1, rotateX: 0, y: 0 },
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
  {
    initial: { opacity: 0, filter: "blur(8px)", y: 20 },
    whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
];

function SectionReveal({ index, children }: { index: number; children: ReactNode }) {
  const config = REVEAL_PRESETS[index % REVEAL_PRESETS.length];

  return (
    <motion.div
      className="section-compact-block"
      initial={config.initial}
      whileInView={config.whileInView}
      viewport={config.viewport ?? { once: true, margin: "-110px" }}
      transition={config.transition}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    const handleCustomScroll = (e: Event) => {
      const customEvent = e as CustomEvent;
      lenis.scrollTo(customEvent.detail.target, { offset: -88 });
    };
    window.addEventListener('custom-scroll', handleCustomScroll as EventListener);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('custom-scroll', handleCustomScroll as EventListener);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-bg-dark text-text-light selection:bg-white selection:text-black">
      <FilmGrain />
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[100] bg-bg-dark flex flex-col items-center justify-center font-mono text-text-muted text-sm md:text-base"
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col items-start gap-2">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                &gt; SYSTEM BOOT...
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                &gt; LOADING ASSETS...
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
                &gt; INITIALIZING WORKSPACE...
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="text-white">
                &gt; READY.
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden">
        {projects.slice(0, 2).map((project) => (
          <img key={`preload-${project.title}`} src={project.image} alt="" loading="lazy" decoding="async" />
        ))}
      </div>

      <HeroSection />
      <div className="section-compact-flow">
        <SectionReveal index={0}>
          <AboutSection />
        </SectionReveal>
        <SectionReveal index={1}>
          <CapabilitiesSection />
        </SectionReveal>
        <SectionReveal index={2}>
          <ProcessSection />
        </SectionReveal>
        <SectionReveal index={3}>
          <ExperienceSection />
        </SectionReveal>
        <SectionReveal index={4}>
          <TechArsenalSection />
        </SectionReveal>
        <SectionReveal index={5}>
          <ProjectsSection />
        </SectionReveal>
        <SectionReveal index={6}>
          <CertificationShowcaseSection />
        </SectionReveal>
        <SectionReveal index={7}>
          <TestimonialsSection />
        </SectionReveal>
        <SectionReveal index={8}>
          <OpenSourceSection />
        </SectionReveal>
        <SectionReveal index={9}>
          <ArchiveSection />
        </SectionReveal>
        <SectionReveal index={10}>
          <LabSection />
        </SectionReveal>
        <SectionReveal index={11}>
          <MarqueeBannerSection />
        </SectionReveal>
        <SectionReveal index={12}>
          <AiFutureSection />
        </SectionReveal>
        <SectionReveal index={13}>
          <DigitalPresenceSection />
        </SectionReveal>
        <SectionReveal index={14}>
          <InspirationSection />
        </SectionReveal>
        <SectionReveal index={15}>
          <ContactSection />
        </SectionReveal>
      </div>
      <FloatingVibeStation />
      <FloatingDock />
    </div>
  );
}
