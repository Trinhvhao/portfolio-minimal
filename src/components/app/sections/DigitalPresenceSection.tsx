import React, { useState } from "react";
import { motion } from "motion/react";
import { Github, Facebook, Instagram, ArrowUpRight } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const ZaloIcon = ({ className }: { className?: string }) => (
  <div className={`font-bold font-sans flex items-center justify-center ${className}`}>
    Z
  </div>
);

const platforms = [
  { name: "TikTok", count: "3.6K", color: "hover:text-[#00F2FE]", border: "group-hover:border-[#00F2FE]/50", icon: TikTokIcon, link: "#" },
  { name: "Facebook", count: "2.2K", color: "hover:text-[#1877F2]", border: "group-hover:border-[#1877F2]/50", icon: Facebook, link: "#" },
  { name: "Instagram", count: "350", color: "hover:text-[#E4405F]", border: "group-hover:border-[#E4405F]/50", icon: Instagram, link: "#" },
  { name: "Zalo", count: "151", color: "hover:text-[#0068FF]", border: "group-hover:border-[#0068FF]/50", icon: ZaloIcon, link: "#" },
  { name: "GitHub", count: "20", color: "hover:text-white", border: "group-hover:border-white/50", icon: Github, link: "#" },
];

export const DigitalPresenceSection = React.memo(function DigitalPresenceSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="digital-presence" className="py-12 px-4 md:px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 py-8 px-6 md:px-10 bg-[#0a0a0a] border border-white/10 rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent pointer-events-none" />

        <div className="flex flex-col gap-2 z-10 w-full md:w-1/3">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase">Digital Footprint</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-white">
            6.3K+ <span className="text-neutral-500">Connections</span>
          </h2>
          <p className="text-sm text-neutral-400 font-sans mt-2">
            Building in public and connecting across multiple platforms.
          </p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-2/3 md:justify-end z-10">
          {platforms.map((platform, idx) => {
            const Icon = platform.icon;
            const isHovered = hovered === platform.name;

            return (
              <motion.a
                href={platform.link}
                key={platform.name}
                onHoverStart={() => setHovered(platform.name)}
                onHoverEnd={() => setHovered(null)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#111] border border-[#222] transition-all duration-300 ${platform.border}`}
              >
                <div className={`w-5 h-5 text-neutral-500 transition-colors duration-300 ${platform.color}`}>
                  <Icon className="w-full h-full" />
                </div>

                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: isHovered ? "auto" : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  className="overflow-hidden hidden md:block whitespace-nowrap"
                >
                  <div className="flex items-center gap-2 pr-2">
                    <span className="font-sans font-bold text-sm text-white">{platform.count}</span>
                    <span className="text-xs text-neutral-500 font-mono tracking-wider">{platform.name}</span>
                  </div>
                </motion.div>

                <div className="flex md:hidden items-center gap-2">
                  <span className="font-sans font-bold text-sm text-white">{platform.count}</span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
});
