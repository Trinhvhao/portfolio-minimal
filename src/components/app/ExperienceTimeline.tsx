import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Briefcase, Calendar } from "lucide-react";

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  overview: string;
  bullets: string[];
  highlights: string[];
};

const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "Website Manager",
    company: "Zaka Edu",
    period: "2023 - Present",
    overview: "Owned the end-to-end digital presence of the education center, balancing platform reliability with growth-oriented communication.",
    bullets: [
      "Developed and operated the center website with a strong focus on usability and stability.",
      "Designed and optimized user-facing features to improve engagement and learning journey flow.",
      "Created and deployed media assets for campaigns to strengthen brand recognition and interaction.",
    ],
    highlights: ["Website Operations", "Feature Optimization", "Media Production", "Brand Growth"],
  },
  {
    id: "exp2",
    role: "AI Intern",
    company: "AIoT Lab - Dai Nam University",
    period: "07/2025 - Present",
    overview: "Contributed to applied AI projects from data preparation to model development in real-world business contexts.",
    bullets: [
      "Built and refined a text emotion recognition model for Ngoc Dung Aesthetic Clinic.",
      "Contributed to a tea-harvest recognition model for Van Thang Cooperative.",
      "Collected, cleaned, and labeled datasets to support robust model training and evaluation.",
    ],
    highlights: ["NLP", "Computer Vision", "Data Labeling", "Model Development"],
  },
  {
    id: "exp3",
    role: "Freelance Developer",
    company: "Independent",
    period: "Project-based",
    overview: "Delivered custom software solutions for clients, from concept validation to production-ready releases.",
    bullets: [
      "Developed AI-assisted HR management systems tailored to client operational workflows.",
      "Built event management platforms with streamlined registration and coordination features.",
      "Implemented a mini social network project in Java, including core social interaction modules.",
    ],
    highlights: ["AI-enabled HRM", "Event Platforms", "Java Systems", "Client Delivery"],
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

                  <p className="text-neutral-400 leading-relaxed font-sans text-sm md:text-base mb-4">{exp.overview}</p>

                  <ul className="list-disc pl-5 space-y-2 text-neutral-300 leading-relaxed font-sans text-sm md:text-base mb-6 marker:text-blue-300">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-[10px] md:text-xs font-mono rounded-full border border-white/10 text-neutral-400 bg-black/50 group-hover:border-white/30 group-hover:text-neutral-200 transition-colors"
                      >
                        {item}
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
