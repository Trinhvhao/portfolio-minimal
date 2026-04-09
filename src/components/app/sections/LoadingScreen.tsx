import React from "react";
import { AnimatePresence, motion } from "motion/react";

type LoadingScreenProps = {
  isLoading: boolean;
};

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-bg-dark flex flex-col items-center justify-center font-mono text-text-muted text-sm md:text-base"
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-start gap-2">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              {"> SYSTEM BOOT..."}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              {"> LOADING ASSETS..."}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
              {"> INITIALIZING WORKSPACE..."}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="text-white">
              {"> READY."}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
