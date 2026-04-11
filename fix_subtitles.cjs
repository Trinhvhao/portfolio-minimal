const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'src/components/app/sections');

const sectionsToFix = [
  'TestimonialsSection.tsx',
  'ProjectsSection.tsx',
  'TechArsenalSection.tsx',
  'ArchiveSection.tsx',
  'CapabilitiesSection.tsx'
];

sectionsToFix.forEach(fileName => {
  const filePath = path.join(sectionsDir, fileName);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix header margins to be very small, so the subtitle is close to it.
  content = content.replace(/(class|className)="([^"]*?text-5xl[^"]*?)(\bmb-\d+\s+md:mb-\d+\b)([^"]*?)"/g, (match, p1, p2, p3, p4) => {
    return `${p1}="${p2}mb-2 md:mb-3${p4}"`;
  });

  // Specifically target TechArsenalSection which has "mb-16 md:mb-20"
  content = content.replace(/(class|className)="([^"]*?TECH ARSENAL[^"]*?)"/i, (match) => { return match; }); // Not inline, it's inside the h2. We will just use regex on the h2 block
  
  if (fileName === 'TechArsenalSection.tsx') {
    content = content.replace(/mb-16 md:mb-20/g, 'mb-2 md:mb-3');
    content = content.replace(/mb-8 md:mb-12/g, 'mb-2 md:mb-3'); // If it was altered.
  }
  
  if (fileName === 'ProjectsSection.tsx') {
    content = content.replace(/mb-12 md:mb-16/g, 'mb-2 md:mb-3');
    content = content.replace(/mb-4 md:mb-6/g, 'mb-2 md:mb-3');
  }
  
  if (fileName === 'CapabilitiesSection.tsx') {
    content = content.replace(/mb-8 md:mb-12/g, 'mb-2 md:mb-3');
    content = content.replace(/mb-4 md:mb-6/g, 'mb-2 md:mb-3');
  }

  // Now fix the <motion.p>
  // We want to remove "max-w-2xl", "mx-auto", "w-full", "px-6 md:px-0" and add "max-w-none", "text-left"
  // And change its margin bottom to restore the spacing before the section content
  content = content.replace(/(<motion\.p[\s\S]*?className=")([^"]*?)("[\s\S]*?>)/g, (match, prefix, classNames, suffix) => {
    let newClasses = classNames
      .replace(/\bmax-w-2xl\b/g, '')
      .replace(/\bmx-auto\b/g, '')
      .replace(/\bpx-6 md:px-0\b/g, '')
      .replace(/\bw-full\b/g, '')
      .replace(/\btext-center\b/g, '')
      .replace(/\b-mt-8\b/g, '')
      .trim();
      
    // ensure text-left and no wrap if requested, but let's just make it max-w-none so it doesn't wrap unnecessarily.
    // and margin-bottom should be mb-10 md:mb-14 to restore the gap to the next block
    
    // Replace existing mb-* md:mb-* on the paragraph
    newClasses = newClasses.replace(/\bmb-\d+\s*(?:md:)?mb-\d*\b/g, '').trim();
    
    newClasses = newClasses + " max-w-none mb-10 md:mb-14 text-left w-full"; // text-left handles alignment, w-full ensures it takes full width without centering logic collapsing it
    
    return prefix + newClasses.replace(/\s+/g, ' ') + suffix;
  });
  
  // TestimonialsSection TextReveal centered issue
  if (fileName === 'TestimonialsSection.tsx') {
    content = content.replace(/TextReveal text="CLIENT FEEDBACK" className="([^"]*?)text-center([^"]*?)"/g, (m, p1, p2) => {
      return `TextReveal text="CLIENT FEEDBACK" className="${p1}${p2}"`;
    });
  }

  fs.writeFileSync(filePath, content);
  console.log(`Fixed formatting for ${fileName}`);
});
