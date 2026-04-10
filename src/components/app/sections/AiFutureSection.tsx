import React from "react";
import { motion } from "motion/react";
import { SplineScene } from "../SplineScene";
import { Card } from "@/src/components/ui/card";
import { Spotlight } from "@/src/components/ui/spotlight";

export const AiFutureSection = React.memo(function AiFutureSection() {
  return (
    <section className="py-16 md:py-20 px-6 max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Card className="w-full h-[500px] md:h-[600px] bg-black/[0.96] relative overflow-hidden border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

          <div className="flex flex-col lg:flex-row h-full">
            <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 tracking-tighter">
                AI & FUTURE
              </h1>
              <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-lg font-sans leading-relaxed">
                Exploring the intersection of artificial intelligence, creative coding, and human-computer interaction.
                Building intelligent interfaces that adapt and learn.
              </p>
              <div className="mt-8">
                <button className="px-6 py-3 rounded-full border border-text-muted/30 hover:bg-white hover:text-black transition-colors text-xs font-mono tracking-widest text-white">
                  EXPLORE AI LAB
                </button>
              </div>
            </div>

            <div className="flex-1 relative min-h-[300px] lg:min-h-full">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
});
