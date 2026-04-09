import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { LabItem } from "./types";

type LabCardProps = {
  item: LabItem;
  index: number;
};

export const LabCard = React.memo(function LabCard({ item, index }: LabCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative aspect-square border border-text-muted/20 bg-bg-dark overflow-hidden group cursor-crosshair"
    >
      <div className="absolute inset-0 z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
        <item.Visual />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

      <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
        <div className="flex justify-between items-start">
          <span className="font-mono text-xs text-text-muted group-hover:text-white transition-colors duration-300">
            LAB_{item.id}
          </span>
          <ArrowRight className="w-5 h-5 text-text-muted opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </div>
        <div>
          <h3 className="text-2xl font-heading font-bold text-text-light mb-1 group-hover:translate-x-2 transition-transform duration-300">
            {item.title}
          </h3>
          <p className="font-mono text-xs text-text-muted group-hover:text-white/70 transition-colors duration-300">
            {item.category}
          </p>
        </div>
      </div>
    </motion.div>
  );
});
