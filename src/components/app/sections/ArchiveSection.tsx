import React, { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
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
    <section className="py-12 md:py-16 px-6 max-w-7xl mx-auto relative" onMouseMove={handleMouseMove}>
      <motion.h2
        initial={{ opacity: 0, x: -100, rotate: -5, transformOrigin: "left bottom" }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 80, damping: 20 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >
        THE ARCHIVE
      </motion.h2>

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
