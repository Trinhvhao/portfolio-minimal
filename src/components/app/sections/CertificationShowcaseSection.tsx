import React, { useState } from "react";
import { motion } from "motion/react";
import { Maximize2 } from "lucide-react";

const CERTIFICATE_ITEMS = [
  {
    id: 1,
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "TensorFlow Developer",
    issuer: "Google",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Deep Learning Specialization",
    issuer: "Coursera",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Meta Front-End Developer",
    issuer: "Meta",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Machine Learning Engineer",
    issuer: "IBM",
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Docker Foundations",
    issuer: "Docker",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=1200&auto=format&fit=crop",
  },
];

export const CertificationShowcaseSection = React.memo(function CertificationShowcaseSection() {
  const [activeId, setActiveId] = useState<number>(3);

  return (
    <section id="certificates" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 md:mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-mono text-neutral-300 tracking-wider">CERTIFICATION ARCHIVE</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-tighter">
          Credentials Showcase
        </h2>
        <p className="text-text-muted font-mono mt-4 max-w-xl">
          // Verified certificates across cloud, AI, and full stack engineering.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row w-full h-[80vh] md:h-[70vh] gap-2 md:gap-4">
        {CERTIFICATE_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <motion.div
              key={item.id}
              className={`relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer border ${isActive ? "border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]" : "border-white/5"}`}
              animate={{
                flex: isActive ? 6 : 1,
              }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              onHoverStart={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
            >
              <motion.img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{
                  scale: isActive ? 1 : 1.15,
                  filter: isActive ? "grayscale(0%) brightness(100%)" : "grayscale(100%) brightness(30%)",
                }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              />

              <motion.div
                className="absolute top-4 md:top-6 left-4 md:left-1/2 md:-translate-x-1/2 z-10"
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-lg md:text-2xl font-heading font-bold text-white/50">0{item.id}</span>
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

              <motion.div
                className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col justify-end pointer-events-none"
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 20,
                }}
                transition={{ duration: 0.5, delay: isActive ? 0.2 : 0 }}
              >
                <div className="flex items-end justify-between w-full">
                  <div className="min-w-0 pr-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3 md:mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="text-[10px] md:text-xs font-mono text-white uppercase tracking-wider truncate">{item.issuer}</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tighter truncate">
                      {item.title}
                    </h3>
                  </div>

                  <div className="hidden md:flex shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
});