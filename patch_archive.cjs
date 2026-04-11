const fs = require('fs');
const path = require('path');

const archivePath = path.join(__dirname, 'src/components/app/sections/ArchiveSection.tsx');
let content = fs.readFileSync(archivePath, 'utf8');

// Advanced scroll-driven mask reveal + parallax image scaling for ArchiveSection
if (!content.includes('useScroll')) {
  content = content.replace('import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";', 'import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";\nimport { useRef } from "react";');

  const newListItem = `
const ArchiveItemCard = ({ item, index }: { item: ArchiveItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Parallax based on individual card scroll position
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
      className="group relative border-b border-text-muted/20 py-8 md:py-12 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 relative z-10 mix-blend-difference w-full">
        <span className="text-xl md:text-2xl font-mono text-text-muted group-hover:text-text-light transition-colors duration-500">
          {item.year}
        </span>
        <h3 className="text-3xl md:text-5xl font-heading font-bold text-text-light group-hover:pl-4 transition-all duration-500 will-change-transform flex-1">
          {item.title}
        </h3>
        
        <div className="flex flex-col gap-1 md:w-32">
          <span className="text-sm font-mono text-text-light/50 uppercase tracking-widest">Role</span>
          <span className="text-base text-text-light">{item.role}</span>
        </div>

        <div className="flex flex-col gap-1 md:w-48 hidden md:flex">
          <span className="text-sm font-mono text-text-light/50 uppercase tracking-widest">Tech</span>
          <span className="text-base text-text-light">{item.tech}</span>
        </div>

        <motion.div 
          animate={{ rotate: isHovered ? 45 : 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="w-12 h-12 rounded-full border border-text-light/20 flex items-center justify-center group-hover:border-text-light group-hover:bg-text-light group-hover:text-bg-dark transition-colors duration-500"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none md:hidden lg:block hidden rounded-2xl"
          >
            <motion.div className="w-full h-full" style={{ scale: imgScale, y: imgY }}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
`;

  // Add the new component
  content = content.replace(/export const ArchiveSection = React\.memo\(function ArchiveSection\(\) \{/, newListItem + '\nexport const ArchiveSection = React.memo(function ArchiveSection() {');
  
  // Replace the loop using item
  content = content.replace(/<motion\.div[\s\S]*?key=\{item\.title\}[\s\S]*?onMouseEnter=[\s\S]*?onMouseLeave=[\s\S]*?className="group relative border-b border-text-muted\/20[\s\S]*?<\/motion\.div>\s*/gm, '');

  content = content.replace(/<div className="flex flex-col border-t border-text-muted\/20">/g, '<div className="flex flex-col border-t border-text-muted/20">\n        {archiveData.map((item, index) => (\n          <ArchiveItemCard key={item.title} item={item} index={index} />\n        ))}');
  
  // Need to add pointer-events-none mix-blend-difference to global body if possible, or just keep it scoped.

  fs.writeFileSync(archivePath, content);
  console.log("Archive fluid mask + parallax updated.");
}
