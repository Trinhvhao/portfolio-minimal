import React from "react";
import { motion } from "motion/react";

type TechItem = {
  name: string;
  icon: string;
};

const techStack: TechItem[] = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Framer Motion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg" },
  { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
  { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
];

const TechMarquee = React.memo(() => {
  return (
    <div className="relative w-full overflow-hidden bg-bg-dark py-10 flex flex-col gap-8 md:gap-12">
      <motion.div
        className="flex whitespace-nowrap gap-8 md:gap-16 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity }}
      >
        {[...techStack, ...techStack].map((tech, i) => (
          <div key={`${tech.name}-${i}`} className="flex items-center gap-4 md:gap-6 group shrink-0">
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-12 h-12 md:w-20 md:h-20 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 shrink-0"
            />
            <span
              className="text-5xl md:text-8xl font-heading font-bold text-transparent transition-all duration-300 group-hover:text-white shrink-0"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
            >
              {tech.name.toUpperCase()}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="flex whitespace-nowrap gap-8 md:gap-16 items-center"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...techStack, ...techStack].reverse().map((tech, i) => (
          <div key={`${tech.name}-reverse-${i}`} className="flex items-center gap-4 md:gap-6 group shrink-0">
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-12 h-12 md:w-20 md:h-20 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 shrink-0"
            />
            <span
              className="text-5xl md:text-8xl font-heading font-bold text-transparent transition-all duration-300 group-hover:text-white shrink-0"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
            >
              {tech.name.toUpperCase()}
            </span>
          </div>
        ))}
      </motion.div>

      <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />
    </div>
  );
});

export const TechArsenalSection = React.memo(() => {
  return (
    <section className="py-16 md:py-20 overflow-hidden">
      <div className="px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 1.1, rotateY: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          style={{ perspective: 1000 }}
          className="text-5xl md:text-7xl font-heading font-bold mb-2 md:mb-3 tracking-tighter"
        >
          TECH ARSENAL
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="text-text-muted font-mono text-sm md:text-base max-w-none mb-10 md:mb-14 text-left w-full"
        >
          The tools, frameworks, and technologies I use to build robust applications.
        </motion.p>
      </div>
      <TechMarquee />
    </section>
  );
});
