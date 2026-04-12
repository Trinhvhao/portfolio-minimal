import React, { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { TextReveal } from "@/src/components/ui/text-reveal";
import type { ArchiveItem } from "../types";

const archiveData: ArchiveItem[] = [
  {
    year: "2024",
    title: "Nexus Design System",
    role: "Architecture",
    tech: "React, Storybook",
    link: "github.com",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=400&q=80",
  },
  {
    year: "2023",
    title: "Aura WebGL Experience",
    role: "Creative Dev",
    tech: "Three.js, GLSL",
    link: "live site",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
  },
  {
    year: "2023",
    title: "Fintech Mobile App",
    role: "Frontend",
    tech: "React Native",
    link: "app store",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80",
  },
  {
    year: "2022",
    title: "E-Commerce Headless",
    role: "Fullstack",
    tech: "Next.js, Shopify",
    link: "live site",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&q=80",
  },
  {
    year: "2022",
    title: "Onyx Dark Theme",
    role: "Design",
    tech: "Figma, CSS",
    link: "figma.com",
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=400&q=80",
  },
  {
    year: "2021",
    title: "Legacy Dashboard",
    role: "Frontend",
    tech: "Vue.js, Vuex",
    link: "offline",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
  },
];


const ArchiveItemCard = ({ item, index }: { item: ArchiveItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Parallax based on individual card scroll position
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
      className="group relative border-b border-text-muted/20 py-8 md:py-12 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 relative z-10 mix-blend-difference w-full">
        <span className="text-xl md:text-2xl font-mono text-text-muted group-hover:text-text-light transition-colors duration-500">
          {item.year}
        </span>
        <h3 className="text-3xl md:text-5xl font-heading font-bold text-text-light group-hover:pl-4 transition-all duration-500 will-change-transform flex-1">
          {item.title}
        </h3>
        
        <div className="flex flex-col gap-1 md:w-32">
          <span className="text-sm font-mono text-text-light/50 uppercase tracking-widest">Role</span>
          <span className="text-base text-text-light">{item.role}</span>
        </div>

        <div className="flex flex-col gap-1 md:w-48 hidden md:flex">
          <span className="text-sm font-mono text-text-light/50 uppercase tracking-widest">Tech</span>
          <span className="text-base text-text-light">{item.tech}</span>
        </div>

        <motion.div 
          animate={{ rotate: isHovered ? 45 : 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="w-12 h-12 rounded-full border border-text-light/20 flex items-center justify-center group-hover:border-text-light group-hover:bg-text-light group-hover:text-bg-dark transition-colors duration-500"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none md:hidden lg:block hidden rounded-2xl"
          >
            <motion.div className="w-full h-full" style={{ scale: imgScale, y: imgY }}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const ArchiveSection = React.memo(function ArchiveSection() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section id="archive" className="py-12 md:py-16 px-6 max-w-7xl mx-auto relative" onMouseMove={handleMouseMove}>
      <TextReveal text="THE ARCHIVE" className="text-5xl md:text-7xl font-heading font-bold mb-2 md:mb-3 tracking-tighter" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="text-text-muted font-mono text-sm md:text-base max-w-none mb-10 md:mb-14 text-left w-full"
        >
          A history of past projects, commercial work, and ongoing experiments.
        </motion.p>

      <div className="w-full overflow-x-auto pb-8">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-text-muted/20 text-text-muted font-mono text-xs uppercase tracking-widest">
              <th className="py-4 px-4 font-normal">Year</th>
              <th className="py-4 px-4 font-normal">Project</th>
              <th className="py-4 px-4 font-normal">Role</th>
              <th className="py-4 px-4 font-normal">Built with</th>
              <th className="py-4 px-4 font-normal text-right">Link</th>
            </tr>
          </thead>
          <tbody>
            {archiveData.map((item, i) => (
              <motion.tr
                key={`${item.title}-${item.year}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onMouseEnter={() => setHoveredImage(item.image)}
                onMouseLeave={() => setHoveredImage(null)}
                className="border-b border-text-muted/10 group hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
              >
                <td className="py-6 px-4 font-mono text-sm text-text-muted group-hover:text-black/60 transition-colors">{item.year}</td>
                <td className="py-6 px-4 font-heading font-bold text-xl md:text-2xl">{item.title}</td>
                <td className="py-6 px-4 font-sans text-sm text-text-muted group-hover:text-black/80 transition-colors">{item.role}</td>
                <td className="py-6 px-4 font-mono text-xs text-text-muted group-hover:text-black/80 transition-colors">{item.tech}</td>
                <td className="py-6 px-4 text-right font-mono text-sm">
                  <a href="#" className="inline-flex items-center gap-2 hover:underline underline-offset-4">
                    {item.link} <ArrowRight className="w-4 h-4" />
                  </a>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 w-64 h-48 pointer-events-none z-50 overflow-hidden rounded-lg shadow-2xl hidden md:block"
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <img src={hoveredImage} alt="Project preview" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});
