const fs = require('fs');
const path = require('path');

// 1. Create Film Grain and Custom Cursor
const uiPath = path.join(__dirname, 'src/components/ui');

fs.writeFileSync(path.join(uiPath, 'film-grain.tsx'), `import React from "react";
export function FilmGrain() {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[9998] mix-blend-overlay opacity-[0.06]"
      style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.75\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E")',
      }}
    />
  );
}`);

fs.writeFileSync(path.join(uiPath, 'custom-cursor.tsx'), `import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.group')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-white z-[9999] pointer-events-none mix-blend-difference hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: isHovered ? 2.5 : 1,
      }}
      transition={{ scale: { type: "spring", damping: 20, stiffness: 300 } }}
    />
  );
}`);

// 2. Inject into App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
if (!appContent.includes('CustomCursor')) {
  appContent = appContent.replace('import { FloatingDock } from "@/src/components/app/FloatingDock";', 'import { FloatingDock } from "@/src/components/app/FloatingDock";\nimport { CustomCursor } from "@/src/components/ui/custom-cursor";\nimport { FilmGrain } from "@/src/components/ui/film-grain";');
  appContent = appContent.replace('<div className="relative min-h-screen bg-bg-dark text-text-light selection:bg-white selection:text-black">', '<div className="relative min-h-screen bg-bg-dark text-text-light selection:bg-white selection:text-black">\n      <FilmGrain />\n      <CustomCursor />');
  fs.writeFileSync('src/App.tsx', appContent);
}

// 3. Update Custom Easing universally in TextReveal
let textRevealContent = fs.readFileSync('src/components/ui/text-reveal.tsx', 'utf8');
textRevealContent = textRevealContent.replace(/ease:\s*\[[\d\.\s,]+\]/g, 'ease: [0.76, 0, 0.24, 1]');
textRevealContent = textRevealContent.replace(/staggerChildren:\s*0\.05/g, 'staggerChildren: 0.08');
fs.writeFileSync('src/components/ui/text-reveal.tsx', textRevealContent);

console.log("God Tier setup ready.");
