import { useEffect, useState } from "react";
import { projects } from "@/src/components/app/data";
import { AboutSection } from "@/src/components/app/sections/AboutSection";
import { ArchiveSection } from "@/src/components/app/sections/ArchiveSection";
import { CapabilitiesSection } from "@/src/components/app/sections/CapabilitiesSection";
import { ContactSection } from "@/src/components/app/sections/ContactSection";
import { ExperienceSection } from "@/src/components/app/sections/ExperienceSection";
import { HeroSection } from "@/src/components/app/sections/HeroSection";
import { InspirationSection } from "@/src/components/app/sections/InspirationSection";
import { LabSection } from "@/src/components/app/sections/LabSection";
import { LoadingScreen } from "@/src/components/app/sections/LoadingScreen";
import { ProcessSection } from "@/src/components/app/sections/ProcessSection";
import { ProjectsSection } from "@/src/components/app/sections/ProjectsSection";
import { TechArsenalSection } from "@/src/components/app/sections/TechArsenalSection";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-text-light selection:bg-white selection:text-black">
      <div className="hidden">
        {projects.map((project) => (
          <img key={`preload-${project.title}`} src={project.image} alt="" loading="lazy" decoding="async" />
        ))}
      </div>

      <LoadingScreen isLoading={isLoading} />
      <HeroSection />
      <AboutSection />
      <CapabilitiesSection />
      <ProcessSection />
      <ExperienceSection />
      <TechArsenalSection />
      <ProjectsSection />
      <ArchiveSection />
      <LabSection />
      <InspirationSection />
      <ContactSection />
    </div>
  );
}
