const fs = require('fs');
const path = require('path');

const applyPatch = (filePath, oldStr, newStr) => {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes(oldStr)) {
    fs.writeFileSync(fullPath, content.replace(oldStr, newStr));
    console.log(`Patched ${filePath}`);
  } else {
    console.log(`Could not find target string in ${filePath}`);
  }
};

applyPatch('src/components/app/sections/CapabilitiesSection.tsx',
`      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >`,
`      <motion.h2
        initial={{ opacity: 0, y: 50, rotateX: -20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        style={{ perspective: 1000 }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >`);

applyPatch('src/components/app/sections/ProcessSection.tsx',
`      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >`,
`      <motion.h2
        initial={{ opacity: 0, x: -50, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >`);

applyPatch('src/components/app/sections/ExperienceSection.tsx',
`      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl md:text-7xl font-heading font-bold tracking-tighter text-center mb-16"
      >`,
`      <motion.h2
        initial={{ opacity: 0, y: -40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-heading font-bold tracking-tighter text-center mb-16"
      >`);

applyPatch('src/components/app/sections/TechArsenalSection.tsx',
`        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-7xl font-heading font-bold mb-16 md:mb-20 tracking-tighter"
        >`,
`        <motion.h2
          initial={{ opacity: 0, scale: 1.1, rotateY: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          style={{ perspective: 1000 }}
          className="text-5xl md:text-7xl font-heading font-bold mb-16 md:mb-20 tracking-tighter"
        >`);

