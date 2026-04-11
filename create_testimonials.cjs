const fs = require('fs');
const path = require('path');

const uiDir = path.join(__dirname, 'src/components/ui');
const sectionsDir = path.join(__dirname, 'src/components/app/sections');

const colPath = path.join(uiDir, 'testimonials-columns-1.tsx');
const colContent = `"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: { text: string; image: string; name: string; role: string }[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg max-w-xs w-full hover:bg-white/10 transition-colors" key={i}>
                  <div className="text-text-light/80 leading-relaxed">{text}</div>
                  <div className="flex items-center gap-3 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full border border-white/20"
                    />
                    <div className="flex flex-col">
                      <div className="font-heading font-medium tracking-tight text-white">{name}</div>
                      <div className="text-sm text-text-light/50 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
`;
fs.writeFileSync(colPath, colContent);

const sectionPath = path.join(sectionsDir, 'TestimonialsSection.tsx');
const sectionContent = `import React from "react";
import { motion } from "motion/react";
import { TestimonialsColumn } from "@/src/components/ui/testimonials-columns-1";
import { TextReveal } from "@/src/components/ui/text-reveal";

const testimonials = [
  {
    text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our business functions improved with a user-friendly design and positive customer feedback.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const TestimonialsSection = React.memo(function TestimonialsSection() {
  return (
    <section className="bg-transparent my-20 relative px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-text-muted/10 pt-20">
      <div className="z-10 mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center justify-center max-w-[700px] mx-auto"
        >
          <div className="flex justify-center mb-4">
            <span className="border border-white/20 py-1 px-4 rounded-full text-xs font-mono uppercase tracking-widest text-text-muted">
              Testimonials
            </span>
          </div>

          <TextReveal text="CLIENT FEEDBACK" className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tighter text-center" />
          
          <p className="text-center mt-6 text-text-muted font-sans text-xl">
            See what partners and clients have to say about collaborating.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
});
`;
fs.writeFileSync(sectionPath, sectionContent);

let appPath = path.join(__dirname, 'src/App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

if (!appContent.includes('TestimonialsSection')) {
  appContent = appContent.replace('import { SkillsSection } from "@/src/components/app/sections/SkillsSection";', 'import { SkillsSection } from "@/src/components/app/sections/SkillsSection";\nimport { TestimonialsSection } from "@/src/components/app/sections/TestimonialsSection";');
  appContent = appContent.replace('<ProjectsSection />', '<ProjectsSection />\n      <TestimonialsSection />');
  fs.writeFileSync(appPath, appContent);
}

console.log("Testimonials component created & inserted.");
