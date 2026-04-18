import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Briefcase, Calendar } from "lucide-react";

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
};

const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "Senior Fullstack Engineer",
    company: "TechNova Solutions",
    period: "2023 - Present",
    description:
      "Architected and developed scalable microservices and high-performance web applications. Led a team of 4 developers to migrate legacy systems to Next.js and Node.js, improving load times by 40%.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: "exp2",
    role: "Frontend Developer",
    company: "CreativeSpace Agency",
    period: "2021 - 2023",
    description:
      "Built interactive, award-winning marketing websites and landing pages. Specialized in creative coding, WebGL, and complex CSS animations to deliver highly engaging user experiences.",
    tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
  },
  {
    id: "exp3",
    role: "Web Developer",
    company: "StartUp Inc",
    period: "2019 - 2021",
    description:
      "Developed and maintained multiple client-facing dashboards. Collaborated closely with designers to implement pixel-perfect UIs and integrated RESTful APIs.",
    tech: ["JavaScript", "HTML/CSS", "Vue.js", "Firebase"],
  },
];

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [iconCenters, setIconCenters] = useState<number[]>([]);
  const [activeItems, setActiveItems] = useState<boolean[]>(() => EXPERIENCES.map(() => false));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const measureIconCenters = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const nextCenters = iconRefs.current.map((iconRef) => {
      if (!iconRef) return Number.POSITIVE_INFINITY;
      const rect = iconRef.getBoundingClientRect();
      const topInsideContainer = rect.top + window.scrollY - containerTop;
      return topInsideContainer + rect.height / 2;
    });

    setIconCenters(nextCenters);
  }, []);

  useEffect(() => {
    measureIconCenters();
    const resizeHandler = () => measureIconCenters();
    window.addEventListener("resize", resizeHandler);

    const raf = requestAnimationFrame(() => {
      measureIconCenters();
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [measureIconCenters]);

  useEffect(() => {
    const stopWatching = scrollYProgress.on("change", (value) => {
      const container = containerRef.current;
      if (!container || iconCenters.length === 0) return;

      const lineProgressPx = value * container.offsetHeight;
      const nextActiveItems = iconCenters.map((centerY) => lineProgressPx >= centerY - 6);

      setActiveItems((previousItems) => {
        if (
          previousItems.length === nextActiveItems.length &&
          previousItems.every((item, index) => item === nextActiveItems[index])
        ) {
          return previousItems;
        }

        return nextActiveItems;
      });
    });

    return () => {
      stopWatching();
    };
  }, [iconCenters, scrollYProgress]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div ref={containerRef} className="relative">
        <div className="absolute left-[15px] md:left-[39px] top-2 bottom-2 w-[3px] bg-white/10" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-[15px] md:left-[39px] top-2 w-[3px] bg-gradient-to-b from-[#04103A] via-[#0F2E86] to-[#2E68EA] origin-top z-0 shadow-[0_0_22px_rgba(46,104,234,0.7)]"
        />

        <div className="flex flex-col gap-12">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative flex gap-6 md:gap-12 group"
            >
              <div
                ref={(element) => {
                  iconRefs.current[index] = element;
                }}
                className="relative z-10 flex flex-col items-center mt-1"
              >
                <div
                  className={`w-8 h-8 md:w-20 md:h-20 rounded-full border-2 flex items-center justify-center transition-all duration-500 shadow-lg ${
                    activeItems[index]
                      ? "bg-blue-500/10 border-blue-400 scale-110 shadow-[0_0_24px_rgba(56,112,255,0.55)]"
                      : "bg-black border-white/20"
                  }`}
                >
                  <Briefcase
                    className={`w-4 h-4 md:w-8 md:h-8 transition-colors ${
                      activeItems[index] ? "text-blue-200" : "text-neutral-400"
                    }`}
                  />
                </div>
              </div>

              <div className="flex-1">
                <div
                  className={`backdrop-blur-sm border rounded-2xl p-6 md:p-8 transition-all duration-500 relative overflow-hidden ${
                    activeItems[index]
                      ? "bg-blue-500/[0.07] border-blue-400/70 shadow-[0_0_35px_rgba(23,84,223,0.25)]"
                      : "bg-black/40 border-white/10"
                  }`}
                >

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight">{exp.role}</h3>
                      <div className="flex items-center gap-2 mt-2 text-neutral-400 font-mono text-sm">
                        <span className="text-white font-semibold">{exp.company}</span>
                      </div>
                    </div>

                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap h-fit transition-colors ${
                        activeItems[index]
                          ? "bg-blue-500/15 border border-blue-300/50 text-blue-100"
                          : "bg-white/5 border border-white/10 text-neutral-300"
                      }`}
                    >
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-neutral-400 leading-relaxed font-sans text-sm md:text-base mb-6">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-[10px] md:text-xs font-mono rounded-full border border-white/10 text-neutral-400 bg-black/50 group-hover:border-white/30 group-hover:text-neutral-200 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
