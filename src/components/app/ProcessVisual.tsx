import React from "react";
import { AnimatePresence, motion } from "motion/react";

type ProcessVisualProps = {
  activeStep: number;
};

export const ProcessVisual = React.memo(function ProcessVisual({ activeStep }: ProcessVisualProps) {
  return (
    <div className="w-full h-full relative bg-bg-dark border border-text-muted/20 overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          {activeStep === 0 && (
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div className="absolute w-[120%] md:w-[150%] aspect-square border-[1px] border-white/10 rounded-full" animate={{ rotate: 360, scale: [1, 1.05, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
              <motion.div className="absolute w-[80%] md:w-[100%] aspect-square border-[1px] border-white/20 rounded-full border-dashed" animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
              <motion.div className="absolute w-[40%] md:w-[50%] aspect-square border-[2px] border-white/40 rounded-full" animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
              <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_30px_15px_rgba(255,255,255,0.6)]" />
            </div>
          )}
          {activeStep === 1 && (
            <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
              <motion.div
                className="absolute w-3/4 h-1/2 bg-gradient-to-br from-purple-600/30 to-blue-600/30 backdrop-blur-xl border border-white/30 rounded-2xl shadow-[0_0_50px_rgba(147,51,234,0.2)]"
                animate={{ rotateY: [0, 15, 0], rotateX: [0, -10, 0], z: [0, 50, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-2/3 h-2/3 bg-gradient-to-tr from-pink-600/20 to-orange-500/20 backdrop-blur-lg border border-white/20 rounded-full shadow-[0_0_50px_rgba(236,72,153,0.2)] mix-blend-screen"
                animate={{ rotateZ: [0, 180, 360], scale: [1, 1.05, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}
          {activeStep === 2 && (
            <div className="w-full max-w-[90%] bg-[#0a0a0a] border border-white/20 rounded-lg overflow-hidden shadow-[0_0_40px_rgba(74,222,128,0.15)]">
              <div className="h-8 bg-white/10 flex items-center px-4 gap-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="p-6 font-mono text-sm md:text-base text-green-400 flex flex-col gap-2">
                <p className="text-white/50">root@nexus:~# ./build.sh</p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>[+] Compiling shaders...</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>[+] Optimizing AST...</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>[+] Bundling assets...</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="text-white font-bold">✨ Build successful in 1.2s</motion.p>
                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-3 h-5 bg-green-400 mt-2" />
              </div>
            </div>
          )}
          {activeStep === 3 && (
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                className="absolute w-32 md:w-48 h-32 md:h-48 rounded-full bg-white"
                animate={{
                  boxShadow: [
                    "0 0 60px 20px rgba(255,255,255,0.3), 0 0 100px 40px rgba(56,189,248,0.3)",
                    "0 0 100px 40px rgba(255,255,255,0.8), 0 0 200px 80px rgba(56,189,248,0.6)",
                    "0 0 60px 20px rgba(255,255,255,0.3), 0 0 100px 40px rgba(56,189,248,0.3)",
                  ],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,transparent_10%,#050505_60%)] pointer-events-none" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});
