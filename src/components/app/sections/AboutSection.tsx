import React from "react";
import { motion } from "motion/react";
import { ScrollRevealText } from "../ScrollRevealText";
import { TickerItem } from "../TickerItem";

const tickerTech = ["HTML", "CSS", "React.js", "WebGL", "Tailwind_CSS", "Next.js", "Framer_Motion"];

export const AboutSection = React.memo(function AboutSection() {
  return (
    <section id="about" className="relative py-12 md:py-16 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none">
        <h2 className="text-[30vw] md:text-[25vw] font-heading font-bold text-white/[0.02] leading-none tracking-tighter">
          ABOUT
        </h2>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <ScrollRevealText />
      </div>

      <div className="w-full overflow-hidden mt-32 relative h-20 md:h-32 flex items-center">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-bg-dark to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-bg-dark to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-8 md:gap-16 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 md:gap-16 items-center shrink-0 pr-8 md:pr-16">
              {tickerTech.map((tech, j) => (
                <TickerItem key={`${i}-${j}`} text={tech} />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});
