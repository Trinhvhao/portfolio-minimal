import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "@/src/components/app/data";
import { AboutSection } from "@/src/components/app/sections/AboutSection";
import { ArchiveSection } from "@/src/components/app/sections/ArchiveSection";
import { AiFutureSection } from "@/src/components/app/sections/AiFutureSection";
import { CapabilitiesSection } from "@/src/components/app/sections/CapabilitiesSection";
import { ContactSection } from "@/src/components/app/sections/ContactSection";
import { DigitalPresenceSection } from "@/src/components/app/sections/DigitalPresenceSection";
import { ExperienceSection } from "@/src/components/app/sections/ExperienceSection";
import { FloatingDock } from "@/src/components/app/FloatingDock";
import { HeroSection } from "@/src/components/app/sections/HeroSection";
import { InspirationSection } from "@/src/components/app/sections/InspirationSection";
import { LabSection } from "@/src/components/app/sections/LabSection";
import { ProcessSection } from "@/src/components/app/sections/ProcessSection";
import { ProjectsSection } from "@/src/components/app/sections/ProjectsSection";
import { SkillsSection } from "@/src/components/app/sections/SkillsSection";
import { TechArsenalSection } from "@/src/components/app/sections/TechArsenalSection";
import { TerminalSection } from "@/src/components/app/sections/TerminalSection";
import { VibeStationSection } from "@/src/components/app/sections/VibeStationSection";

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

  return (
    <div className="min-h-screen bg-bg-dark text-text-light selection:bg-white selection:text-black">
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
        {projects.map((project) => (
          <img key={`preload-${project.title}`} src={project.image} alt="" loading="lazy" decoding="async" />
        ))}
      </div>

      <HeroSection />
      <AboutSection />
      <CapabilitiesSection />
      <ProcessSection />
      <ExperienceSection />
      <TechArsenalSection />
      <ProjectsSection />
      <ArchiveSection />
      <LabSection />
      <SkillsSection />
      <TerminalSection />
      <AiFutureSection />
      <DigitalPresenceSection />
      <VibeStationSection />
      <InspirationSection />
      <ContactSection />
      <FloatingDock />
    </div>
  );
}
