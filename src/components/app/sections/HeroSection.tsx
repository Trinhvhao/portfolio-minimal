import React from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import trinhhaoImage from "@/src/assets/images/trinhhao2.jpg";

export const HeroSection = React.memo(function HeroSection() {
  const { scrollY } = useScroll();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const bgTextX = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const bgTextY = useTransform(smoothMouseY, [-1, 1], [-30, 30]);
  const imgX = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const imgY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);
  const fgTextX = useTransform(smoothMouseX, [-1, 1], [40, -40]);
  const fgTextY = useTransform(smoothMouseY, [-1, 1], [40, -40]);
  const tagsX = useTransform(smoothMouseX, [-1, 1], [20, -20]);
  const tagsY = useTransform(smoothMouseY, [-1, 1], [20, -20]);

  const heroBgY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroFgY = useTransform(scrollY, [0, 1000], [0, -150]);
  const heroImgY = useTransform(scrollY, [0, 1000], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden" onMouseMove={handleMouseMove}>
      <header className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50">
        <div className="text-2xl font-heading font-bold tracking-tighter">TVH</div>
        <div className="text-xs font-mono tracking-widest text-text-muted absolute left-1/2 -translate-x-1/2 hidden md:block">
          HELLO, I'M TRINH VAN HAO
        </div>
        <button className="px-6 py-2 rounded-full border border-text-muted/30 hover:bg-white hover:text-black transition-colors text-xs font-mono tracking-widest">
          CONNECT
        </button>
      </header>

      <motion.div
        className="absolute top-[35%] md:top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 3.2 }}
        style={{ y: heroBgY, opacity: heroOpacity }}
      >
        <motion.h1
          style={{
            x: bgTextX,
            y: bgTextY,
            WebkitTextStroke: "2px rgba(255,255,255,0.4)",
            textShadow: "0 0 30px rgba(255,255,255,0.1)",
          }}
          className="text-[22vw] md:text-[18vw] font-heading font-bold text-transparent leading-none tracking-tighter whitespace-nowrap"
        >
          FULL STACK
        </motion.h1>
      </motion.div>

      <motion.div
        className="relative z-10 w-64 h-80 md:w-80 md:h-[32rem] mt-20 md:mt-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 3.0 }}
        style={{ y: heroImgY, opacity: heroOpacity }}
      >
        <motion.div style={{ x: imgX, y: imgY }} className="w-full h-full">
          <img
            src={trinhhaoImage}
            alt="Trinh Van Hao"
            fetchPriority="high"
            className="w-full h-full object-cover rounded-t-full grayscale contrast-125 brightness-75 transition-all duration-700 hover:grayscale-0 hover:contrast-100 hover:brightness-100 cursor-pointer"
            style={{
              maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
            }}
          />
        </motion.div>

        <motion.div style={{ x: tagsX, y: tagsY }} className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 -left-10 md:-left-20 font-mono text-[10px] md:text-xs text-text-muted bg-bg-dark/80 px-3 py-1 border border-text-muted/20 rounded-md backdrop-blur-sm whitespace-nowrap pointer-events-auto"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {"< UI/UX Design />"}
          </motion.div>
          <motion.div
            className="absolute top-1/2 -right-12 md:-right-24 font-mono text-[10px] md:text-xs text-text-muted bg-bg-dark/80 px-3 py-1 border border-text-muted/20 rounded-md backdrop-blur-sm whitespace-nowrap pointer-events-auto"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            {"< Motion Design />"}
          </motion.div>
          <motion.div
            className="absolute bottom-24 -left-8 md:-left-16 font-mono text-[10px] md:text-xs text-text-muted bg-bg-dark/80 px-3 py-1 border border-text-muted/20 rounded-md backdrop-blur-sm whitespace-nowrap pointer-events-auto"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            {"< SEO />"}
          </motion.div>
          <motion.div
            className="absolute top-20 -right-16 md:-right-32 font-mono text-[10px] md:text-xs text-text-muted bg-bg-dark/80 px-3 py-1 border border-text-muted/20 rounded-md backdrop-blur-sm whitespace-nowrap pointer-events-auto"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            {"< API Design />"}
          </motion.div>
          <motion.div
            className="absolute bottom-10 -right-10 md:-right-20 font-mono text-[10px] md:text-xs text-text-muted bg-bg-dark/80 px-3 py-1 border border-text-muted/20 rounded-md backdrop-blur-sm whitespace-nowrap pointer-events-auto"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            {"< Database Management />"}
          </motion.div>
          <motion.div
            className="absolute top-1/3 -left-16 md:-left-32 font-mono text-[10px] md:text-xs text-text-muted bg-bg-dark/80 px-3 py-1 border border-text-muted/20 rounded-md backdrop-blur-sm whitespace-nowrap z-20 pointer-events-auto"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          >
            {"< Performance Optimization />"}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-[65%] md:top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-20 pointer-events-none"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 3.4 }}
        style={{ y: heroFgY, opacity: heroOpacity }}
      >
        <motion.h1
          style={{ x: fgTextX, y: fgTextY }}
          className="text-[22vw] md:text-[18vw] font-heading font-bold bg-gradient-to-b from-white via-gray-400 to-gray-700 bg-clip-text text-transparent leading-none tracking-tighter whitespace-nowrap drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
        >
          DEVELOPER
        </motion.h1>
      </motion.div>
    </section>
  );
});
