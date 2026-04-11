import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { Capability } from "../types";

const capabilitiesData: Capability[] = [
  {
    title: "FULL STACK DEVELOPMENT",
    description:
      "Building seamless web applications from scalable backends to interactive frontends. Specializing in standard MERN/PERN stacks and modern meta-frameworks.",
    tags: ["< Next.js />", "< Node.js />", "< PostgreSQL />"],
  },
  {
    title: "AI & ML INTEGRATION",
    description:
      "Empowering software with modern AI. Building Retrieval-Augmented Generation (RAG) pipelines, automating workflows, and integrating LLM APIs.",
    tags: ["< LangChain />", "< OpenAI />", "< FastAPI />"],
  },
  {
    title: "COMPUTER VISION & OCR",
    description:
      "Deploying deep learning models for advanced object detection, plate recognition, and text extraction using state-of-the-art vision architectures.",
    tags: ["< PyTorch />", "< YOLO />", "< OpenCV />"],
  },
  {
    title: "SYSTEM ARCHITECTURE",
    description:
      "Designing robust, secure, and easily deployable services. Managing containerized applications, scalable cloud databases, and continuous integration.",
    tags: ["< Docker />", "< AWS />", "< CI/CD />"],
  },
];

export const CapabilitiesSection = React.memo(function CapabilitiesSection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section className="py-12 md:py-16 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 50, rotateX: -20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        style={{ perspective: 1000 }}
        className="text-5xl md:text-7xl font-heading font-bold mb-2 md:mb-3 tracking-tighter"
      >
        CAPABILITIES
      </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="text-text-muted font-mono text-sm md:text-base max-w-none mb-10 md:mb-14 text-left w-full"
        >
          Core competencies and specialized skills across design and engineering.
        </motion.p>

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
          }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col relative"
      >
        <motion.div 
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-0 left-0 h-[1px] bg-text-muted/20"
        />
        {capabilitiesData.map((cap, i) => {
          const isExpanded = expanded === i;
          return (
            <motion.div 
              key={cap.title}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
              }}
              className="relative overflow-hidden"
            >
              <motion.div 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut", delay: i * 0.1 }}
                className="absolute top-0 left-0 h-[1px] bg-text-muted/20"
              />
              <button
                onClick={() => setExpanded(isExpanded ? null : i)}
                className="w-full py-8 md:py-12 flex items-center justify-between text-left group cursor-pointer"
              >
                <h3
                  className={cn(
                    "text-3xl md:text-5xl lg:text-6xl font-heading font-bold transition-colors duration-300",
                    isExpanded ? "text-text-light" : "text-text-muted group-hover:text-text-light",
                  )}
                >
                  {cap.title}
                </h3>
                <div className="relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full border border-text-muted/20 group-hover:border-white/50 transition-colors duration-300 shrink-0 ml-4">
                  <motion.div animate={{ rotate: isExpanded ? 45 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                    <Plus
                      className={cn(
                        "w-6 h-6 md:w-8 md:h-8 transition-colors duration-300",
                        isExpanded ? "text-text-light" : "text-text-muted group-hover:text-text-light",
                      )}
                    />
                  </motion.div>
                </div>
              </button>
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-12 md:pb-16 grid grid-cols-1 md:grid-cols-12 gap-8">
                      <div className="md:col-span-8 md:col-start-1">
                        <p className="text-xl md:text-3xl text-text-muted leading-relaxed font-sans">{cap.description}</p>
                      </div>
                      <div className="md:col-span-4 flex flex-wrap gap-3 items-start md:justify-end">
                        {cap.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-2 rounded-full border border-text-muted/20 text-sm font-mono text-text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
});
