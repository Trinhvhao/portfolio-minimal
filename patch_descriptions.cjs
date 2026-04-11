const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'src/components/app/sections');

function applyDescription(fileName, targetRegex, descText, classNameOverride = '') {
  const filePath = path.join(sectionsDir, fileName);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Add motion import if not present
  if (!content.includes('import { motion } from "motion/react";') && !content.includes('import { AnimatePresence, motion')) {
    content = content.replace('import React from "react";', 'import React from "react";\nimport { motion } from "motion/react";');
    content = content.replace('import React, { useState } from "react";', 'import React, { useState } from "react";\nimport { motion } from "motion/react";');
  }
  
  const descMarkup = `\n        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="text-text-muted font-mono text-sm md:text-base max-w-2xl mb-12 md:mb-16 ${classNameOverride}"
        >
          ${descText}
        </motion.p>`;

  // Look for our standard header injection point, removing any old spacing issues
  if (content.match(targetRegex)) {
    // Only apply if it doesn't already have a motion.p right after
    if (!content.includes(descText)) {
      // Clean up margin bottom on the H2 if we just injected a subtitle that handles the margin
      content = content.replace(targetRegex, match => match.replace(/(mb-8 md:mb-12|mb-12 md:mb-16)/, 'mb-4 md:mb-6') + descMarkup);
      fs.writeFileSync(filePath, content);
      console.log(`Patched ${fileName}`);
    }
  }
}

// 1. Testimonials
applyDescription(
  'TestimonialsSection.tsx', 
  /<TextReveal text="CLIENT FEEDBACK" className="text-5xl md:text-7xl font-heading font-bold .*?tracking-tighter" \/>/, 
  'See what partners and clients have to say about collaborating.'
);

// 2. Projects
applyDescription(
  'ProjectsSection.tsx', 
  /SELECTED WORKS\s*<\/motion\.h2>/, 
  'A selection of recent development projects and creative case studies.'
);

// 3. Tech Arsenal
applyDescription(
  'TechArsenalSection.tsx', 
  /TECH ARSENAL\s*<\/motion\.h2>/, 
  'The tools, frameworks, and technologies I use to build robust applications.',
  'px-6 md:px-0 mx-auto w-full'
);

// 4. Archive
applyDescription(
  'ArchiveSection.tsx',
  /<TextReveal text="THE ARCHIVE" className="text-5xl md:text-7xl font-heading font-bold .*?tracking-tighter" \/>/,
  'A history of past projects, commercial work, and ongoing experiments.'
);

// 5. Capabilities
applyDescription(
  'CapabilitiesSection.tsx',
  /CAPABILITIES\s*<\/motion\.h2>/,
  'Core competencies and specialized skills across design and engineering.'
);

