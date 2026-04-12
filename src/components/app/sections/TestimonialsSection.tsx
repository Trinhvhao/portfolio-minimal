import React from "react";
import { motion } from "motion/react";
import { TestimonialsColumn } from "@/src/components/ui/testimonials-columns-1";
import { TextReveal } from "@/src/components/ui/text-reveal";

const testimonials = [
  {
    text: "Hao's implementation of the AI-powered search pipeline drastically reduced our query times. A brilliant full stack developer.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Product Manager",
  },
  {
    text: "The computer vision model he developed for our manufacturing defect detection was incredibly accurate and robust in real-time.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Engineering Lead",
  },
  {
    text: "Hao seamlessly bridged our complex AI backends with a beautiful React frontend. His ability to own the entire stack is remarkable.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "CTO",
  },
  {
    text: "He architected our RAG chatbot from scratch, deploying it securely on AWS. A rare talent who understands both infrastructure and ML.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Working with Hao was an absolute pleasure. He refactored our messy monolithic app into clean, scalable microservices.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Elena Rostova",
    role: "Software Architect",
  },
  {
    text: "Hao doesn't just write code; he solves deep business problems. The LLM integration he built automated countless hours of manual work.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Tariq Ali",
    role: "Head of Operations",
  },
  {
    text: "He delivered our enterprise dashboard ahead of schedule. Fast APIs, responsive UI, and incredibly clean code.",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    name: "Amelia Chen",
    role: "VP of Product",
  },
  {
    text: "The OCR system Hao developed is exactly what our platform needed. His deep learning skills are perfectly paired with his web development expertise.",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    name: "David Kim",
    role: "Director of Tech",
  },
  {
    text: "From Next.js to PyTorch, Hao’s versatility allowed us to launch our AI startup minimal technical overhead.",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "Sophie Clark",
    role: "Founder",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const TestimonialsSection = React.memo(function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-transparent my-20 relative px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-text-muted/10 pt-20">
      <div className="z-10 mx-auto w-full">
        <TextReveal text="CLIENT FEEDBACK" className="text-5xl md:text-7xl font-heading font-bold mb-2 md:mb-3 tracking-tighter" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="text-text-muted font-mono text-sm md:text-base max-w-none mb-10 md:mb-14 text-left w-full"
        >
          See what partners and clients have to say about collaborating.
        </motion.p>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
});
