import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { LabItem } from "./types";

type LabCardProps = {
  item: LabItem;
  index: number;
};

export const LabCard = React.memo(function LabCard({ item, index }: { item: LabItem; index: number }) {
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
});