import React from "react";
import { motion } from "motion/react";
import { VibeStation } from "../VibeStation";

export const VibeStationSection = React.memo(function VibeStationSection() {
  return (
    <section className="py-16 md:py-20 px-6 w-full relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col items-center mb-16"
      >
        <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter text-center">THE VIBE STATION</h2>
        <p className="text-neutral-400 mt-4 font-mono text-sm tracking-widest uppercase">Audio Experience</p>
      </motion.div>

      <VibeStation />
    </section>
  );
});
