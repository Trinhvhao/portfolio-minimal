import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { ProcessVisual } from "../ProcessVisual";
import type { ProcessStep } from "../types";

const processData: ProcessStep[] = [
  {
    id: "01",
    title: "DISCOVERY & STRATEGY",
    description:
      "Deconstructing the problem. We analyze the core requirements, technical constraints, and brand identity to establish a solid architectural foundation.",
  },
  {
    id: "02",
    title: "PROTOTYPING & DESIGN",
    description:
      "Translating concepts into brutalist, high-contrast interfaces. Focusing on typography, grid systems, and unconventional layouts.",
  },
  {
    id: "03",
    title: "CREATIVE ENGINEERING",
    description:
      "Bringing static designs to life with React, WebGL, and Framer Motion. Ensuring 60fps animations and robust, scalable code.",
  },
  {
    id: "04",
    title: "OPTIMIZATION & LAUNCH",
    description:
      "Rigorous performance auditing, accessibility checks, and SEO tuning. Deploying a flawless, lightning-fast digital experience.",
  },
];

export const ProcessSection = React.memo(function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ratios = useRef<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = stepRefs.current.findIndex((ref) => ref === entry.target);
          if (index !== -1) {
            ratios.current[index] = entry.intersectionRatio;
          }
        });

        let maxRatio = 0;
        let maxIndex = -1;

        ratios.current.forEach((ratio, index) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxIndex = index;
          }
        });

        if (maxIndex !== -1 && maxRatio > 0) {
          setActiveStep(maxIndex);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "-25% 0px -25% 0px",
      },
    );

    const currentRefs = stepRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <section id="process" className="py-12 md:py-16 px-6 max-w-7xl mx-auto relative">
      <motion.h2
        initial={{ opacity: 0, x: -50, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >
        PROCESS
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-12 md:gap-16 relative">
        <div className="w-full md:w-5/12 hidden md:block">
          <div className="sticky top-28 w-full max-w-[420px] mx-auto xl:ml-auto xl:mr-0 aspect-square rounded-xl overflow-hidden shadow-2xl">
            <ProcessVisual activeStep={activeStep} />
          </div>
        </div>

        <div className="w-full md:w-7/12 flex flex-col pb-32">
          {processData.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <div
                key={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={cn(
                  "min-h-[60vh] flex flex-col justify-center py-12 transition-all duration-300 ease-out",
                  isActive ? "opacity-100 scale-100" : "opacity-20 scale-95",
                )}
              >
                <div className="md:hidden w-full max-w-[360px] aspect-square mb-8 rounded-xl overflow-hidden shadow-2xl mx-auto">
                  <ProcessVisual activeStep={index} />
                </div>

                <span className="text-6xl md:text-8xl font-heading font-bold text-white/10 mb-4 block">{step.id}</span>
                <h3 className="text-3xl md:text-5xl font-heading font-bold text-text-light mb-6">{step.title}</h3>
                <p className="text-lg md:text-xl text-text-muted leading-relaxed font-sans">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
