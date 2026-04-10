const fs = require('fs');
const path = require('path');

const capabilitiesPath = path.join(__dirname, 'src/components/app/sections/CapabilitiesSection.tsx');
let capabilitiesContent = fs.readFileSync(capabilitiesPath, 'utf8');

capabilitiesContent = capabilitiesContent.replace(
  /<div className="flex flex-col border-b border-text-muted\/20">([\s\S]*?)<\/div>\n    <\/section>/,
  `<motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
          }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col relative"
      >
        <motion.div 
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-0 left-0 h-[1px] bg-text-muted/20"
        />
        {capabilitiesData.map((cap, i) => {
          const isExpanded = expanded === i;
          return (
            <motion.div 
              key={cap.title}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
              }}
              className="relative overflow-hidden"
            >
              <motion.div 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut", delay: i * 0.1 }}
                className="absolute top-0 left-0 h-[1px] bg-text-muted/20"
              />
              <button
                onClick={() => setExpanded(isExpanded ? null : i)}
                className="w-full py-8 md:py-12 flex items-center justify-between text-left group cursor-pointer"
              >
                <h3
                  className={cn(
                    "text-3xl md:text-5xl lg:text-6xl font-heading font-bold transition-colors duration-300",
                    isExpanded ? "text-text-light" : "text-text-muted group-hover:text-text-light",
                  )}
                >
                  {cap.title}
                </h3>
                <div className="relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full border border-text-muted/20 group-hover:border-white/50 transition-colors duration-300 shrink-0 ml-4">
                  <motion.div animate={{ rotate: isExpanded ? 45 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                    <Plus
                      className={cn(
                        "w-6 h-6 md:w-8 md:h-8 transition-colors duration-300",
                        isExpanded ? "text-text-light" : "text-text-muted group-hover:text-text-light",
                      )}
                    />
                  </motion.div>
                </div>
              </button>
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-12 md:pb-16 grid grid-cols-1 md:grid-cols-12 gap-8">
                      <div className="md:col-span-8 md:col-start-1">
                        <p className="text-xl md:text-3xl text-text-muted leading-relaxed font-sans">{cap.description}</p>
                      </div>
                      <div className="md:col-span-4 flex flex-wrap gap-3 items-start md:justify-end">
                        {cap.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-2 rounded-full border border-text-muted/20 text-sm font-mono text-text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>`
);

fs.writeFileSync(capabilitiesPath, capabilitiesContent);
console.log("Updated Capabilities");

const timelinePath = path.join(__dirname, 'src/components/app/ExperienceTimeline.tsx');
let timelineContent = fs.readFileSync(timelinePath, 'utf8');

if (!timelineContent.includes('useScroll')) {
  timelineContent = timelineContent.replace('import { motion } from "motion/react";', 'import { motion, useScroll, useTransform } from "motion/react";\nimport { useRef } from "react";');
}

timelineContent = timelineContent.replace('export function ExperienceTimeline() {', `export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);`);

timelineContent = timelineContent.replace('<div className="relative">', '<div ref={containerRef} className="relative">');

timelineContent = timelineContent.replace(
  '<div className="absolute left-[15px] md:left-[39px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-white/20 via-white/10 to-transparent" />',
  `<div className="absolute left-[15px] md:left-[39px] top-2 bottom-2 w-[2px] bg-white/5" />
        <motion.div 
          style={{ height: lineHeight }} 
          className="absolute left-[15px] md:left-[39px] top-2 w-[2px] bg-gradient-to-b from-[#00F2FE] via-[#A855F7] to-transparent origin-top z-0"
        />`
);

fs.writeFileSync(timelinePath, timelineContent);
console.log("Updated Timeline");

