import React from "react";
import { motion } from "motion/react";
import type { Project } from "./types";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export const ProjectCard = React.memo(function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative h-[400px] md:h-[500px] border border-text-muted/20 bg-bg-dark group overflow-hidden ${project.colSpan}`}
    >
      <div className="absolute inset-0 bg-black z-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-40 grayscale contrast-125 transition-all duration-500 group-hover:opacity-60 group-hover:grayscale-0"
        />
        <motion.div
          className="absolute inset-0 bg-bg-dark z-10"
          initial={{ x: "0%" }}
          whileInView={{ x: "100%" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: index * 0.15 + 0.2 }}
        />
      </div>

      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between z-20 transition-colors duration-150 group-hover:bg-white/5">
        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-text-muted group-hover:text-text-light transition-colors duration-150"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold uppercase leading-none tracking-tighter transition-all duration-150 group-hover:translate-x-3 group-hover:-translate-y-2 group-hover:skew-x-[-2deg]">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
});
