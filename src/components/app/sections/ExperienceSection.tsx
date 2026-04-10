import React from "react";
import { motion } from "motion/react";
import { ExperienceTimeline } from "../ExperienceTimeline";

export const ExperienceSection = React.memo(function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-20 px-6 w-full relative">
      <motion.h2
        initial={{ opacity: 0, y: -40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-heading font-bold tracking-tighter text-center mb-16"
      >
        MISSION LOGS
      </motion.h2>
      <p className="text-neutral-400 mt-4 font-mono text-sm tracking-widest uppercase text-center mb-8">Professional Experience</p>

      <ExperienceTimeline />
    </section>
  );
});
