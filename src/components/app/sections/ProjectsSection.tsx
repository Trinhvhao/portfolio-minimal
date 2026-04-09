import React from "react";
import { motion } from "motion/react";
import { ProjectCard } from "../ProjectCard";
import { projects } from "../data";

export const ProjectsSection = React.memo(function ProjectsSection() {
  return (
    <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >
        SELECTED WORKS
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
});
