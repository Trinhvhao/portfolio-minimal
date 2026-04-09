import React from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

type BentoBoxProps = {
  children: React.ReactNode;
  className?: string;
  title: string;
  description: string;
};

export const BentoBox = React.memo(function BentoBox({
  children,
  className,
  title,
  description,
}: BentoBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "relative overflow-hidden border border-text-muted/20 bg-bg-dark p-6 md:p-8 group flex flex-col justify-between",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 flex-1 flex flex-col">{children}</div>
      <div className="relative z-10 mt-8">
        <h3 className="text-xl md:text-2xl font-heading font-bold text-text-light mb-2">{title}</h3>
        <p className="text-sm text-text-muted font-mono">{description}</p>
      </div>
    </motion.div>
  );
});
