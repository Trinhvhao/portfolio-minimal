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

applyPatch('src/components/app/sections/ArchiveSection.tsx',
`      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >`,
`      <motion.h2
        initial={{ opacity: 0, x: -100, rotate: -5, transformOrigin: "left bottom" }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 80, damping: 20 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >`);

applyPatch('src/components/app/sections/LabSection.tsx',
`        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-7xl font-heading font-bold tracking-tighter"
        >`,
`        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-7xl font-heading font-bold tracking-tighter"
        >`);

applyPatch('src/components/app/sections/InspirationSection.tsx',
`      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >`,
`      <motion.h2
        initial={{ opacity: 0, y: -20, rotateX: 60 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.5, type: "spring", stiffness: 60 }}
        style={{ perspective: 1200 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >`);

applyPatch('src/components/app/sections/TerminalSection.tsx',
`        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mb-4"
        >`,
`        <motion.h2
          initial={{ opacity: 0, filter: "brightness(2) contrast(1.5) blur(10px)" }}
          whileInView={{ opacity: 1, filter: "brightness(1) contrast(1) blur(0px)" }}
          transition={{ duration: 1, ease: "linear" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mb-4"
        >`);
