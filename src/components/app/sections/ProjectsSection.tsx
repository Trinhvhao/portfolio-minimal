import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const projects = [
  {
    title: "E-Commerce Reimagined",
    tags: ["< Next.js />", "< Stripe />"],
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80",
    colSpan: "md:col-span-8",
    description: "A high-performance headless e-commerce solution built for scale. Features real-time inventory syncing and seamless checkout."
  },
  {
    title: "Fintech Dashboard",
    tags: ["< React />", "< D3.js />"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-4",
    description: "Data-dense financial analytics dashboard. Complex data visualization with D3.js and real-time WebSocket feeds."
  },
  {
    title: "Web3 NFT Platform",
    tags: ["< WebGL />", "< Three.js />"],
    image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-4",
    description: "Immersive 3D gallery for digital assets. Custom shaders and WebGL rendering for a premium browsing experience."
  },
  {
    title: "Creative Agency",
    tags: ["< GSAP />", "< Tailwind />"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    colSpan: "md:col-span-8",
    description: "Award-winning portfolio site with scroll-jacking, custom cursors, and complex GSAP timeline animations."
  }
];

const ProjectCard = React.memo(({ project, index }: { project: any, index: number }) => {
  return (
    <div 
      className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[70vh] shrink-0 border border-text-muted/20 bg-bg-dark group overflow-hidden"
      data-cursor="VIEW DETAIL"
    >
      {/* Background Image with Curtain Reveal */}
      <div className="absolute inset-0 bg-black z-0 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-40 grayscale contrast-125 transition-all duration-700 group-hover:opacity-60 group-hover:grayscale-0 group-hover:scale-105"
        />
        {/* Curtain Overlay */}
        <motion.div 
          className="absolute inset-0 bg-bg-dark z-10"
          initial={{ x: "0%" }}
          whileInView={{ x: "100%" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between z-20 transition-colors duration-500 group-hover:bg-black/40">
        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag: string) => (
            <span key={tag} className="font-mono text-xs text-text-muted group-hover:text-white transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex flex-col justify-end h-full overflow-hidden">
          <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-y-4">
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold uppercase leading-none tracking-tighter">
              {project.title}
            </h3>
          </div>
          
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
            <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <p className="text-sm md:text-base text-white/80 font-sans max-w-md mt-4 mb-6 leading-relaxed">
                {project.description}
              </p>
              <button className="flex items-center gap-2 text-xs font-mono tracking-widest hover:text-green-400 transition-colors">
                VIEW CASE STUDY <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const ProjectsSection = React.memo(() => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map scroll progress to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[300vh] bg-bg-dark">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-6 md:px-12 mb-8 md:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-5xl md:text-7xl font-heading font-bold tracking-tighter"
          >
            SELECTED WORKS
          </motion.h2>
        </div>

        <motion.div style={{ x }} className="flex gap-6 px-6 md:px-12 pb-12 w-max">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
          
          {/* End card / View all */}
          <div className="relative w-[40vw] md:w-[25vw] h-[60vh] md:h-[70vh] shrink-0 border border-text-muted/20 bg-bg-dark flex items-center justify-center group cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </div>
              <span className="font-mono text-sm tracking-widest">VIEW ALL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
