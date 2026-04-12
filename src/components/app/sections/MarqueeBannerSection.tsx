import React from "react";
import { motion } from "motion/react";

const words = ["SCALABLE", "SEARCH OPTIMIZED", "ACCESSIBLE", "RESPONSIVE", "DYNAMIC"];

export const MarqueeBannerSection = React.memo(() => {
  const rowContent = [...words, ...words, ...words, ...words].map((w, i) => (
    <React.Fragment key={i}>
      <span className="mx-4 md:mx-8">✦</span>
      <span>{w}</span>
    </React.Fragment>
  ));

  const repeatedContent = [...rowContent, ...rowContent];

  return (
    <section className="relative w-full h-48 md:h-64 flex items-center justify-center overflow-hidden bg-bg-dark my-10 md:my-20 select-none">
      
      {/* Background/Back Ribbon */}
      <div className="absolute w-[150vw] left-1/2 -translate-x-1/2 rotate-[4deg] md:rotate-[3deg] bg-[#2563eb] z-0 flex whitespace-nowrap overflow-hidden border-y border-white/20 opacity-80 backdrop-blur-sm">
        <motion.div
          className="flex items-center text-white/70 font-bold font-serif text-xl md:text-3xl uppercase tracking-widest py-3 md:py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {repeatedContent}
        </motion.div>
      </div>

      {/* Foreground/Front Ribbon */}
      <div className="absolute w-[150vw] left-1/2 -translate-x-1/2 -rotate-[4deg] md:-rotate-[3deg] bg-[#3b82f6] shadow-[0_0_30px_rgba(59,130,246,0.3)] z-10 flex whitespace-nowrap overflow-hidden border-y border-white/30">
        <motion.div
          className="flex items-center text-white font-bold font-serif text-xl md:text-3xl uppercase tracking-widest py-3 md:py-4"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {repeatedContent}
        </motion.div>
      </div>
      
    </section>
  );
});
