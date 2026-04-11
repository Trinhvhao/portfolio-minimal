import React from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.h2
      className={cn("flex flex-wrap m-0", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "150%", rotateZ: 5 },
              visible: {
                y: "0%",
                rotateZ: 0,
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
