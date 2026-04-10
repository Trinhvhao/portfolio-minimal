import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
  color: string;
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
    color: "#00F2FE",
  },
  {
    id: "exp2",
    role: "Frontend Developer",
    company: "CreativeSpace Agency",
    period: "2021 - 2023",
    description:
      "Built interactive, award-winning marketing websites and landing pages. Specialized in creative coding, WebGL, and complex CSS animations to deliver highly engaging user experiences.",
    tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    color: "#A855F7",
  },
  {
    id: "exp3",
    role: "Web Developer",
    company: "StartUp Inc",
    period: "2019 - 2021",
    description:
      "Developed and maintained multiple client-facing dashboards. Collaborated closely with designers to implement pixel-perfect UIs and integrated RESTful APIs.",
    tech: ["JavaScript", "HTML/CSS", "Vue.js", "Firebase"],
    color: "#F59E0B",
  },
];

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div ref={containerRef} className="relative">
        <div className="absolute left-[15px] md:left-[39px] top-2 bottom-2 w-[2px] bg-white/5" />
        <motion.div 
          style={{ height: lineHeight }} 
          className="absolute left-[15px] md:left-[39px] top-2 w-[2px] bg-gradient-to-b from-[#00F2FE] via-[#A855F7] to-transparent origin-top z-0"
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
              <div className="relative z-10 flex flex-col items-center mt-1">
                <div
                  className="w-8 h-8 md:w-20 md:h-20 rounded-full bg-black border-2 flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg"
                  style={{
                    borderColor: "rgba(255,255,255,0.2)",
                    boxShadow: "0 0 0 rgba(0,0,0,0)",
                  }}
                >
                  <Briefcase className="w-4 h-4 md:w-8 md:h-8 text-neutral-400 group-hover:text-white transition-colors" />

                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                    style={{ backgroundColor: exp.color, opacity: 0.2 }}
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-500 group-hover:bg-white/5 group-hover:border-white/20 relative overflow-hidden">
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: exp.color }}
                  />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight">{exp.role}</h3>
                      <div className="flex items-center gap-2 mt-2 text-neutral-400 font-mono text-sm">
                        <span className="text-white font-semibold">{exp.company}</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 whitespace-nowrap h-fit">
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
