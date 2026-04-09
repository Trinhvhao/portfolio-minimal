import React from "react";
import { motion } from "motion/react";
import { LinkPreview } from "@/src/components/ui/link-preview";

export const InspirationSection = React.memo(function InspirationSection() {
  return (
    <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >
        INSPIRATION
      </motion.h2>

      <div className="flex flex-col gap-12 text-2xl md:text-4xl text-text-muted max-w-4xl font-sans leading-relaxed">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          I draw heavy inspiration from platforms like{" "}
          <LinkPreview
            url="https://awwwards.com"
            className="font-bold text-white border-b-2 border-white/30 hover:border-white transition-colors"
          >
            Awwwards
          </LinkPreview>{" "}
          and modern brutalist design trends.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          When I'm not coding, I'm usually exploring{" "}
          <LinkPreview
            url="https://unsplash.com"
            isStatic
            imageSrc="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=640&q=50"
            className="font-bold text-white border-b-2 border-white/30 hover:border-white transition-colors"
          >
            photography
          </LinkPreview>{" "}
          or studying{" "}
          <LinkPreview
            url="https://fonts.google.com"
            isStatic
            imageSrc="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=640&q=50"
            className="font-bold text-white border-b-2 border-white/30 hover:border-white transition-colors"
          >
            typography
          </LinkPreview>
          .
        </motion.p>
      </div>
    </section>
  );
});
