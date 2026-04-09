import React from "react";
import { motion } from "motion/react";
import { BentoBox } from "../BentoBox";

export const TechArsenalSection = React.memo(function TechArsenalSection() {
  return (
    <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >
        TECH ARSENAL
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
        <BentoBox className="md:col-span-2 md:row-span-2" title="Core Frontend" description="React, Next.js, TypeScript">
          <div className="flex-1 flex flex-col justify-center gap-4">
            <div className="flex flex-wrap gap-4">
              <span className="text-7xl md:text-9xl font-heading font-bold text-white/5 group-hover:text-white/20 transition-colors duration-500">TS</span>
              <span className="text-7xl md:text-9xl font-heading font-bold text-white/5 group-hover:text-white/20 transition-colors duration-500 delay-75">RX</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <span className="text-7xl md:text-9xl font-heading font-bold text-white/5 group-hover:text-white/20 transition-colors duration-500 delay-150">NX</span>
            </div>
          </div>
        </BentoBox>

        <BentoBox className="md:col-span-1 md:row-span-1" title="Styling" description="Tailwind CSS, CSS Modules">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-20 group-hover:opacity-60 transition-opacity duration-500 blur-2xl" />
            <span className="absolute text-4xl font-heading font-bold text-white/30 group-hover:text-white/80 transition-colors duration-500">TW</span>
          </div>
        </BentoBox>

        <BentoBox className="md:col-span-1 md:row-span-2" title="Motion & Animation" description="Framer Motion, GSAP">
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border-4 border-dashed border-text-muted/20 rounded-full group-hover:border-white/40 transition-colors duration-500 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-text-muted/20 group-hover:border-white/40 transition-colors duration-500"
              />
            </motion.div>
          </div>
        </BentoBox>

        <BentoBox className="md:col-span-1 md:row-span-1" title="Creative Dev" description="WebGL, Three.js">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-5xl font-mono text-text-muted/30 group-hover:text-white/80 transition-colors duration-500">
              {"<canvas>"}
            </div>
          </div>
        </BentoBox>

        <BentoBox className="md:col-span-2 md:row-span-1" title="Backend & Infrastructure" description="Node.js, Postgres, Vercel">
          <div className="flex-1 flex flex-col justify-center gap-3 font-mono text-xs md:text-sm text-text-muted/50 group-hover:text-text-muted transition-colors duration-500">
            <p>{">"} npm run build</p>
            <p>{">"} compiling...</p>
            <p className="text-white/30 group-hover:text-green-400/80 transition-colors duration-500">
              {">"} build successful in 2.4s
            </p>
          </div>
        </BentoBox>

        <BentoBox className="md:col-span-2 md:row-span-1" title="Design & Prototyping" description="Figma, Adobe CC">
          <div className="flex-1 flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl border-2 border-text-muted/20 group-hover:border-white/50 transition-colors duration-500" />
            <div className="w-16 h-16 rounded-full border-2 border-text-muted/20 group-hover:border-white/50 transition-colors duration-500" />
            <div className="w-0 h-0 border-l-[32px] border-l-transparent border-b-[55px] border-b-text-muted/20 border-r-[32px] border-r-transparent group-hover:border-b-white/50 transition-colors duration-500" />
          </div>
        </BentoBox>
      </div>
    </section>
  );
});
