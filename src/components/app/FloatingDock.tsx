import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, User, Briefcase, FolderGit2, FlaskConical, TerminalSquare, Code2, Mail } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "lab", label: "The Lab", icon: FlaskConical },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "terminal", label: "Terminal", icon: TerminalSquare },
  { id: "contact", label: "Contact", icon: Mail },
];

const SCROLL_TOP_OFFSET = 88;

export function FloatingDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.dispatchEvent(new CustomEvent('custom-scroll', { detail: { target: element } }));
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <motion.div
        className="flex items-center gap-1 md:gap-2 px-3 py-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] pointer-events-auto"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1 }}
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={item.id}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] md:text-xs font-bold rounded-md whitespace-nowrap pointer-events-none"
                  >
                    {item.label}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => scrollToSection(item.id)}
                className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors relative"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
