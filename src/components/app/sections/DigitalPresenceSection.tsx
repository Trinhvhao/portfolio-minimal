import React from "react";
import { motion } from "motion/react";
import { Github } from "lucide-react";
import { NetworkOrbit } from "../NetworkOrbit";

export const DigitalPresenceSection = React.memo(function DigitalPresenceSection() {
  return (
    <section className="py-16 md:py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-mono text-neutral-300 tracking-wider">COMMUNITY & REACH</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter">
            DIGITAL <br className="hidden md:block" /> PRESENCE
          </h2>

          <p className="text-lg md:text-xl text-neutral-400 font-sans leading-relaxed max-w-md">
            Building in public and sharing knowledge across multiple platforms. From open-source contributions to
            creative coding experiments, join a growing community of developers and creators.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <button className="px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-sm font-bold tracking-wide flex items-center gap-2">
              <Github className="w-4 h-4" />
              Follow on GitHub
            </button>
            <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm font-bold tracking-wide text-white">
              Let&apos;s Connect
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-end"
        >
          <NetworkOrbit />
        </motion.div>
      </div>
    </section>
  );
});
