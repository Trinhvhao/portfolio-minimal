import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

type Project = {
  title: string;
  tags: string[];
  image: string;
  colSpan: string;
  description: string;
};

const projects: Project[] = [
  {
    title: "AI-Powered Enterprise RAG",
    tags: ["< React />", "< LangChain />", "< FastAPI />"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    colSpan: "md:col-span-8",
    description:
      "An intelligent chatbot platform designed for enterprise data. Allows secure document search and summarization with high accuracy via vector embeddings.",
  },
  {
    title: "Smart Talent Bridge",
    tags: ["< Next.js />", "< Python />"],
    image: "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-4",
    description:
      "A deep-learning enabled recruitment tool. Automatically parses CVs (OCR) and maps candidate skills to job requirements using NLP.",
  },
  {
    title: "Object Detection System",
    tags: ["< PyTorch />", "< YOLOv11 />"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-4",
    description:
      "High-speed computer vision pipeline integrating a custom YOLO training loop for real-time license plate detection and tracking.",
  },
  {
    title: "Real-time E-Commerce Analytics",
    tags: ["< Node.js />", "< PostgreSQL />"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    colSpan: "md:col-span-8",
    description:
      "A scalable full-stack dashboard for merchants. Processes thousands of live transactions, predicting inventory needs and tracking user behaviors.",
  },
];

const ProjectCard = React.memo(({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      className={`relative h-[400px] md:h-[500px] border border-text-muted/20 bg-bg-dark group overflow-hidden ${project.colSpan}`}
    >
      <div className="absolute inset-0 bg-black z-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-40 grayscale contrast-125 transition-all duration-700 group-hover:opacity-60 group-hover:grayscale-0 group-hover:scale-105"
        />
        <motion.div
          className="absolute inset-0 bg-bg-dark z-10"
          initial={{ x: "0%" }}
          whileInView={{ x: "100%" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: index * 0.15 + 0.2 }}
        />
      </div>

      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between z-20 transition-colors duration-500 group-hover:bg-black/40">
        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-xs text-text-muted group-hover:text-white transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col justify-end h-full overflow-hidden">
          <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-y-4">
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold uppercase leading-none tracking-tighter">
              {project.title}
            </h3>
          </div>

          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
            <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <p className="text-sm md:text-base text-white/80 font-sans max-w-md mt-4 mb-6 leading-relaxed">
                {project.description}
              </p>
              <button className="flex items-center gap-2 text-xs font-mono tracking-widest hover:text-green-400 transition-colors">
                VIEW CASE STUDY <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export const ProjectsSection = React.memo(function ProjectsSection() {
  return (
    <section id="projects" className="py-12 md:py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        className="text-5xl md:text-7xl font-heading font-bold mb-2 md:mb-3 tracking-tighter"
      >
        SELECTED WORKS
      </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="text-text-muted font-mono text-sm md:text-base max-w-none mb-10 md:mb-14 text-left w-full"
        >
          A selection of recent scalable web applications and AI integrated systems.
        </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
});
