import React from "react";
import { motion } from "motion/react";
import { experiences } from "../data";

export const ExperienceSection = React.memo(function ExperienceSection() {
  return (
    <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >
        EXPERIENCE
      </motion.h2>

      <div className="flex flex-col">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="py-10 md:py-12 border-t border-text-muted/20 group"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12">
              <div className="md:col-span-4 flex flex-col gap-1 md:gap-2">
                <h3 className="text-2xl font-bold text-text-light">{exp.company}</h3>
                <p className="text-[10px] md:text-xs font-mono text-text-muted uppercase tracking-widest">{exp.year}</p>
              </div>
              <div className="md:col-span-8">
                <p className="text-base md:text-lg text-text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.description }} />
              </div>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-text-muted/20 w-full" />
      </div>
    </section>
  );
});
