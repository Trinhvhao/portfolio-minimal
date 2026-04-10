import React from "react";
import { motion } from "motion/react";
import { Github, Facebook, Instagram } from "lucide-react";

const TikTokIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const ZaloIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={`font-bold font-sans flex items-center justify-center ${className}`} style={style}>
    Z
  </div>
);

const platforms = [
  { name: "TikTok", count: 3600, label: "3.6K", size: 70, color: "#00F2FE", icon: TikTokIcon, ring: 3, initialAngle: 0 },
  { name: "Facebook", count: 2200, label: "2.2K", size: 60, color: "#1877F2", icon: Facebook, ring: 2, initialAngle: 120 },
  { name: "Instagram", count: 350, label: "350", size: 50, color: "#E4405F", icon: Instagram, ring: 2, initialAngle: 300 },
  { name: "Zalo", count: 151, label: "151", size: 40, color: "#0068FF", icon: ZaloIcon, ring: 1, initialAngle: 45 },
  { name: "GitHub", count: 20, label: "20", size: 35, color: "#ffffff", icon: Github, ring: 1, initialAngle: 225 },
];

const rings = [
  { id: 1, size: 220, duration: 25, reverse: false },
  { id: 2, size: 360, duration: 35, reverse: true },
  { id: 3, size: 500, duration: 45, reverse: false },
];

export function NetworkOrbit() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 md:py-20 overflow-hidden">
      <div className="relative flex items-center justify-center scale-[0.6] sm:scale-[0.8] md:scale-100">
        <div className="relative flex items-center justify-center w-[500px] h-[500px]">
          {rings.map((ring) => (
            <div
              key={`ring-${ring.id}`}
              className="absolute rounded-full border border-white/10"
              style={{
                width: ring.size,
                height: ring.size,
                borderStyle: ring.id % 2 === 0 ? "dashed" : "solid",
                boxShadow: "inset 0 0 20px rgba(255,255,255,0.02)",
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="absolute z-20 flex flex-col items-center justify-center w-32 h-32 rounded-full bg-black border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] backdrop-blur-md"
          >
            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">6,321</span>
            <span className="text-xs text-text-muted font-mono mt-1 tracking-widest">FOLLOWERS</span>
            <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse" />
          </motion.div>

          {platforms.map((p) => {
            const ring = rings.find((r) => r.id === p.ring);
            if (!ring) return null;
            const radius = ring.size / 2;

            return (
              <motion.div
                key={p.name}
                className="absolute top-1/2 left-1/2"
                style={{ width: 0, height: 0 }}
                animate={{ rotate: ring.reverse ? [p.initialAngle, p.initialAngle - 360] : [p.initialAngle, p.initialAngle + 360] }}
                transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute" style={{ transform: `translateX(${radius}px)` }}>
                  <motion.div
                    animate={{ rotate: ring.reverse ? [-p.initialAngle, -p.initialAngle + 360] : [-p.initialAngle, -p.initialAngle - 360] }}
                    transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
                  >
                    <div
                      className="group relative flex items-center justify-center rounded-full bg-black border border-white/10 hover:border-white/50 transition-all duration-300 cursor-pointer hover:scale-110 shadow-xl"
                      style={{
                        width: p.size,
                        height: p.size,
                        marginLeft: -p.size / 2,
                        marginTop: -p.size / 2,
                        boxShadow: `0 0 30px ${p.color}30`,
                      }}
                    >
                      <p.icon className="w-1/2 h-1/2 opacity-70 group-hover:opacity-100 transition-opacity" style={{ color: p.color }} />

                      <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none flex flex-col items-center z-50">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap shadow-2xl">
                          <span style={{ color: p.color }}>{p.name}</span> <span className="text-white/50 mx-1">|</span> {p.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
