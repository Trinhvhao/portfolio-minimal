import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export const ScrollRevealText = React.memo(function ScrollRevealText() {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const text = "I build beautiful and functional web experiences where design meets code.";
  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className="text-3xl md:text-5xl lg:text-6xl font-sans leading-tight tracking-tight flex flex-wrap justify-center gap-x-3 md:gap-x-4 gap-y-2 md:gap-y-4"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        const color = useTransform(scrollYProgress, [start, end], ["#444444", "#ffffff"]);
        const isBold = ["design", "meets", "code."].includes(word);

        return (
          <motion.span key={i} style={{ opacity, color }} className={isBold ? "font-medium" : ""}>
            {word}
          </motion.span>
        );
      })}
    </p>
  );
});
