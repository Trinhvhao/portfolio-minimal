const fs = require('fs');
const path = require('path');

// --- 1. Tạo Component TextReveal ---
const uiPath = path.join(__dirname, 'src/components/ui');
if (!fs.existsSync(uiPath)) fs.mkdirSync(uiPath, { recursive: true });

const textRevealPath = path.join(uiPath, 'text-reveal.tsx');
const textRevealContent = `import React from "react";
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
            staggerChildren: 0.05,
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
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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
`;
fs.writeFileSync(textRevealPath, textRevealContent);
console.log("Created TextReveal component");

// --- 2. Patch LabSection ---
const labSectionPath = path.join(__dirname, 'src/components/app/sections/LabSection.tsx');
let labContent = fs.readFileSync(labSectionPath, 'utf8');

// Replace standard H2 with TextReveal
if (!labContent.includes('TextReveal')) {
  labContent = labContent.replace('import { LabCard } from "../LabCard";', 'import { LabCard } from "../LabCard";\nimport { TextReveal } from "@/src/components/ui/text-reveal";');
  
  labContent = labContent.replace(
    /<motion\.h2[\s\S]*?THE LAB\s*<\/motion\.h2>/m,
    `<TextReveal text="THE LAB" className="text-5xl md:text-7xl font-heading font-bold tracking-tighter" />`
  );

  // Wrap items in stagger and add magnetic to cards. Wait, cards are LabCard. So we will pass it there, or just stagger the grid.
  labContent = labContent.replace(
    '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">',
    `<motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >`
  ).replace('</div>\n    </section>', '</motion.div>\n    </section>');

  fs.writeFileSync(labSectionPath, labContent);
  console.log("Updated LabSection");
}

// --- 3. Patch InspirationSection ---
const inspPath = path.join(__dirname, 'src/components/app/sections/InspirationSection.tsx');
let inspContent = fs.readFileSync(inspPath, 'utf8');

if (!inspContent.includes('TextReveal')) {
  inspContent = inspContent.replace('import { LinkPreview } from "@/src/components/ui/link-preview";', 'import { LinkPreview } from "@/src/components/ui/link-preview";\nimport { TextReveal } from "@/src/components/ui/text-reveal";');
  
  inspContent = inspContent.replace(
    /<motion\.h2[\s\S]*?INSPIRATION\s*<\/motion\.h2>/,
    `<TextReveal text="INSPIRATION" className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter" />`
  );
  
  fs.writeFileSync(inspPath, inspContent);
  console.log("Updated InspirationSection");
}

// --- 4. Patch ArchiveSection ---
const archivePath = path.join(__dirname, 'src/components/app/sections/ArchiveSection.tsx');
let archiveContent = fs.readFileSync(archivePath, 'utf8');

if (!archiveContent.includes('TextReveal')) {
  archiveContent = archiveContent.replace('import { ArrowUpRight } from "lucide-react";', 'import { ArrowUpRight } from "lucide-react";\nimport { TextReveal } from "@/src/components/ui/text-reveal";');
  
  archiveContent = archiveContent.replace(
    /<motion\.h2[\s\S]*?THE ARCHIVE\s*<\/motion\.h2>/,
    `<TextReveal text="THE ARCHIVE" className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter" />`
  );
  
  fs.writeFileSync(archivePath, archiveContent);
  console.log("Updated ArchiveSection typography");
}

// --- 5. Add Magnetic Tilt to LabCard ---
const labCardPath = path.join(__dirname, 'src/components/app/LabCard.tsx');
let labCardContent = fs.readFileSync(labCardPath, 'utf8');

if (!labCardContent.includes('useMotionValue')) {
  // Let's modify the imports to include useMotionValue, useTransform
  labCardContent = labCardContent.replace('import { motion } from "motion/react";', 'import { motion, useMotionValue, useSpring, useTransform } from "motion/react";');
  
  let newLabCard = `export const LabCard = React.memo(function LabCard({ item, index }: { item: LabItem; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      }}
      className="group"
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-square bg-white/5 border border-white/10 rounded-2xl cursor-pointer p-6 flex flex-col justify-end transition-colors duration-500 hover:bg-white/10 hover:border-white/20"
      >
        {/* Visual mask reveal */}
        <motion.div 
          className="absolute inset-x-0 bottom-0 bg-transparent z-10 overflow-hidden"
          initial={{ top: "100%" }}
          whileHover={{ top: "0%" }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        >
           <div className="w-full h-full bg-black/60 backdrop-blur-sm pointer-events-none" />
        </motion.div>
        
        {/* Core item visual */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none">
           <item.Visual />
        </div>
        
        <div className="relative z-20 flex justify-between items-end w-full" style={{ transform: "translateZ(30px)" }}>
          <div>
            <div className="text-xs font-mono text-neutral-400 mb-2 truncate max-w-[120px]">{item.category}</div>
            <h3 className="text-xl font-heading tracking-tight truncate max-w-[150px]">{item.title}</h3>
          </div>
          <div className="text-neutral-500 font-mono text-sm group-hover:text-white transition-colors">{item.id}</div>
        </div>
      </motion.div>
    </motion.div>
  );
});`;
  
  // Replace the whole component definition
  labCardContent = labCardContent.replace(/export const LabCard = [\s\S]*\}\);\n?$/, newLabCard);
  fs.writeFileSync(labCardPath, labCardContent);
  console.log("Updated LabCard with Magnetic 3D tilt and image mask hover");
}

