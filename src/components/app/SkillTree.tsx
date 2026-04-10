import React, { useState } from "react";
import { motion } from "motion/react";
import { Code2, Layers, Server, Database, Brain, Cpu, Sparkles, RotateCcw, Cloud } from "lucide-react";

type Skill = {
  id: string;
  label: string;
  icon: React.ElementType;
  x: number;
  y: number;
  requires: string[];
  desc: string;
};

const SKILLS: Skill[] = [
  { id: "core", label: "Foundation", icon: Code2, x: 10, y: 50, requires: [], desc: "JS/TS, Logic" },
  { id: "fe", label: "Frontend", icon: Layers, x: 30, y: 25, requires: ["core"], desc: "React, DOM" },
  { id: "be", label: "Backend", icon: Server, x: 30, y: 75, requires: ["core"], desc: "Node.js, APIs" },
  { id: "ui", label: "Advanced UI", icon: Sparkles, x: 50, y: 25, requires: ["fe"], desc: "Three.js, Motion" },
  { id: "db", label: "Database", icon: Database, x: 50, y: 75, requires: ["be"], desc: "SQL, Redis" },
  { id: "fs", label: "Fullstack", icon: Cpu, x: 70, y: 50, requires: ["ui", "db"], desc: "Next.js, System" },
  { id: "cloud", label: "Cloud & Ops", icon: Cloud, x: 90, y: 25, requires: ["fs"], desc: "AWS, Docker" },
  { id: "ai", label: "AI Systems", icon: Brain, x: 90, y: 75, requires: ["fs"], desc: "LLMs, RAG" },
];

export function SkillTree() {
  const [unlocked, setUnlocked] = useState<string[]>(["core"]);

  const handleUnlock = (id: string) => {
    const skill = SKILLS.find((s) => s.id === id);
    if (!skill || unlocked.includes(id)) return;

    const canUnlock = skill.requires.every((req) => unlocked.includes(req));
    if (canUnlock) {
      setUnlocked((prev) => [...prev, id]);
    }
  };

  const resetTree = () => {
    setUnlocked(["core"]);
  };

  const edges = SKILLS.flatMap((skill) => skill.requires.map((reqId) => ({ from: reqId, to: skill.id })));

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <div className="w-full flex justify-between items-end mb-8 px-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono text-blue-400 tracking-wider">INTERACTIVE RPG</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter">THE SKILL TREE</h2>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <span className="text-3xl font-bold text-white">{unlocked.length}</span>
            <span className="text-neutral-500 font-mono text-sm ml-1">/ {SKILLS.length}</span>
            <p className="text-xs text-neutral-400 font-mono uppercase tracking-widest">Skills Unlocked</p>
          </div>
          <button
            onClick={resetTree}
            className="flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-white transition-colors mt-2"
          >
            <RotateCcw className="w-3 h-3" /> RESET
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-10 hide-scrollbar relative">
        <div className="absolute top-2 right-4 text-[10px] text-neutral-500 font-mono md:hidden animate-pulse">Swipe to explore -&gt;</div>

        <div className="relative w-[900px] md:w-full min-w-[900px] h-[400px] md:h-[450px] bg-black/40 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] mx-auto mt-4 md:mt-0">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {edges.map((edge, i) => {
              const parent = SKILLS.find((s) => s.id === edge.from);
              const child = SKILLS.find((s) => s.id === edge.to);
              if (!parent || !child) return null;

              const isActive = unlocked.includes(child.id);

              return (
                <g key={i}>
                  <line
                    x1={`${parent.x}%`}
                    y1={`${parent.y}%`}
                    x2={`${child.x}%`}
                    y2={`${child.y}%`}
                    stroke={isActive ? "rgba(0, 242, 254, 0.3)" : "rgba(255, 255, 255, 0.05)"}
                    strokeWidth={isActive ? 4 : 2}
                  />
                  {isActive && (
                    <motion.line
                      x1={`${parent.x}%`}
                      y1={`${parent.y}%`}
                      x2={`${child.x}%`}
                      y2={`${child.y}%`}
                      stroke="#00F2FE"
                      strokeWidth={2}
                      strokeDasharray="8 8"
                      animate={{ strokeDashoffset: [0, -16] }}
                      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {SKILLS.map((skill) => {
            const isUnlocked = unlocked.includes(skill.id);
            const canUnlock = !isUnlocked && skill.requires.every((req) => unlocked.includes(req));
            const isLocked = !isUnlocked && !canUnlock;

            return (
              <motion.div
                key={skill.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: skill.y / 200 }}
              >
                <button
                  onClick={() => handleUnlock(skill.id)}
                  disabled={isLocked}
                  className={`
                    relative group w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300
                    ${isUnlocked ? "bg-blue-500/20 border-2 border-blue-400 shadow-[0_0_30px_rgba(0,242,254,0.4)]" : ""}
                    ${canUnlock ? "bg-white/10 border-2 border-white/50 hover:border-white hover:scale-110 cursor-pointer animate-pulse" : ""}
                    ${isLocked ? "bg-black/50 border border-white/10 opacity-50 cursor-not-allowed grayscale" : ""}
                  `}
                >
                  <skill.icon className={`w-6 h-6 md:w-8 md:h-8 transition-colors ${isUnlocked ? "text-blue-400" : "text-neutral-400"}`} />

                  {canUnlock && <div className="absolute inset-[-8px] rounded-full border border-white/30 animate-ping opacity-50" />}
                </button>

                <div className="mt-3 text-center pointer-events-none">
                  <h4 className={`font-bold font-heading tracking-wide ${isUnlocked ? "text-white" : "text-neutral-400"}`}>{skill.label}</h4>
                  <p className="text-[10px] md:text-xs font-mono text-neutral-500 mt-1 max-w-[100px] leading-tight">{skill.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
