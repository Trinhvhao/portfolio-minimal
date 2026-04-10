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

applyPatch('src/components/app/sections/LabSection.tsx',
`        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-7xl font-heading font-bold mb-12 md:mb-16 tracking-tighter"
        >`,
`        <motion.h2
          initial={{ opacity: 0, y: -20, rotateX: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring", stiffness: 120, damping: 20 }}
          style={{ perspective: 1200 }}
          className="text-5xl md:text-7xl font-heading font-bold mb-12 md:mb-16 tracking-tighter"
        >`);

applyPatch('src/components/app/sections/ArchiveSection.tsx',
`      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-12 md:mb-16 tracking-tighter text-center"
      >`,
`      <motion.h2
        initial={{ opacity: 0, y: 30, letterSpacing: "15px", filter: "blur(5px)" }}
        whileInView={{ opacity: 1, y: 0, letterSpacing: "-0.05em", filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "backOut" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-12 md:mb-16 text-center"
      >`);

applyPatch('src/components/app/sections/InspirationSection.tsx',
`      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >`,
`      <motion.h2
        initial={{ opacity: 0, x: 100, rotate: 5 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter"
      >`);

applyPatch('src/components/app/sections/TerminalSection.tsx',
`        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading font-bold tracking-tighter mb-4 text-center md:text-left"
        >`,
`        <motion.h2
          initial={{ opacity: 0, filter: "brightness(2) contrast(1.5)" }}
          whileInView={{ opacity: 1, filter: "brightness(1) contrast(1)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "linear" }}
          className="text-4xl md:text-6xl font-heading font-bold tracking-tighter mb-4 text-center md:text-left"
        >`);

