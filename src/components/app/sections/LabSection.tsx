import React from "react";
import { motion } from "motion/react";
import { LabCard } from "../LabCard";
import { TextReveal } from "@/src/components/ui/text-reveal";
import type { LabItem } from "../types";

const labItems: LabItem[] = [
  {
    id: "001",
    title: "Fluid Sim v2",
    category: "WebGL / Shaders",
    Visual: () => (
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-purple-600 to-orange-500 opacity-50 blur-2xl"
        animate={{ rotate: 360, scale: [1, 1.5, 1] }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      />
    ),
  },
  {
    id: "002",
    title: "Kinetic Type",
    category: "CSS / Motion",
    Visual: () => (
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden -rotate-12">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="whitespace-nowrap text-4xl font-heading font-bold text-white/10 uppercase"
            animate={{ x: i % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          >
            KINETIC TYPOGRAPHY KINETIC TYPOGRAPHY KINETIC TYPOGRAPHY
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: "003",
    title: "Optical Grid",
    category: "Generative",
    Visual: () => (
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-1 p-4">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-white/10 rounded-full"
            animate={{ scale: [1, 0.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    ),
  },
  {
    id: "004",
    title: "Wireframe",
    category: "Three.js Concept",
    Visual: () => (
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1000px" }}>
        <motion.div
          className="w-32 h-32 border border-white/30"
          animate={{ rotateX: 360, rotateY: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div className="w-full h-full border border-white/30" style={{ transform: "translateZ(32px)" }} />
        </motion.div>
      </div>
    ),
  },
];

export const LabSection = React.memo(function LabSection() {
  return (
    <section id="lab" className="py-12 md:py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
        <TextReveal text="THE LAB" className="text-5xl md:text-7xl font-heading font-bold tracking-tighter" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="text-text-muted font-mono text-sm max-w-xs"
        >
          Experiments, concepts, and creative coding playgrounds.
        </motion.p>
      </div>

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {labItems.map((item, index) => (
          <LabCard key={item.id} item={item} index={index} />
        ))}
      </motion.div>
    </section>
  );
});
