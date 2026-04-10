import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type TerminalHistoryItem = {
  type: "input" | "output" | "error";
  text: React.ReactNode;
};

export const TerminalSection = React.memo(function TerminalSection() {
  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    { type: "output", text: "TVH-OS v1.0.0 (tty1)" },
    { type: "output", text: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newHistory: TerminalHistoryItem[] = [...history, { type: "input", text: cmd }];
    const lowerCmd = cmd.toLowerCase();

    let output: React.ReactNode = "";
    switch (lowerCmd) {
      case "help":
        output = "Available commands: whoami, skills, contact, clear, sudo";
        break;
      case "whoami":
        output = "Trinh Van Hao - Creative Engineer & Full Stack Developer.\nBuilding digital experiences with code and design.";
        break;
      case "skills":
        output = "Frontend: React, Next.js, WebGL, Tailwind, Framer Motion\nBackend: Node.js, Python, PostgreSQL, Firebase\nTools: Git, Docker, Figma";
        break;
      case "contact":
        output = "Email: haotrinh142@gmail.com\nLocation: Earth";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "sudo":
        output = "bash: sudo: permission denied. Nice try though.";
        break;
      default:
        output = `bash: ${cmd}: command not found`;
        break;
    }

    setHistory([...newHistory, { type: "output", text: output }]);
    setInput("");
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section id="terminal" className="py-16 md:py-20 px-6 max-w-5xl mx-auto">
      <div className="mb-12">
        <motion.h2
          initial={{ opacity: 0, filter: "brightness(2) contrast(1.5) blur(10px)" }}
          whileInView={{ opacity: 1, filter: "brightness(1) contrast(1) blur(0px)" }}
          transition={{ duration: 1, ease: "linear" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mb-4"
        >
          SYSTEM.TERMINAL
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="text-text-muted font-mono text-sm"
        >
          Interactive console. Execute commands to explore.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#050505] shadow-[0_0_50px_rgba(74,222,128,0.05)]"
      >
        <div className="h-10 bg-[#111] border-b border-white/10 flex items-center px-4 justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-xs font-mono text-white/40">guest@tvh-os:~</div>
          <div className="w-12" />
        </div>

        <div
          className="p-6 h-[400px] overflow-y-auto font-mono text-sm md:text-base text-green-400 cursor-text"
          onClick={() => inputRef.current?.focus()}
          ref={containerRef}
        >
          {history.map((item, i) => (
            <div key={i} className="mb-2 whitespace-pre-wrap">
              {item.type === "input" ? (
                <div className="flex gap-2">
                  <span className="text-blue-400">guest@tvh-os:~$</span>
                  <span className="text-white">{item.text}</span>
                </div>
              ) : (
                <div className={item.type === "error" ? "text-red-400" : "text-green-400/80"}>{item.text}</div>
              )}
            </div>
          ))}

          <form onSubmit={handleCommand} className="flex gap-2 mt-2">
            <span className="text-blue-400">guest@tvh-os:~$</span>
            <div className="relative flex-1 flex items-center">
              <span className="text-white whitespace-pre">{input}</span>
              <motion.div
                className="w-2.5 h-5 bg-green-400 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-text"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
});
