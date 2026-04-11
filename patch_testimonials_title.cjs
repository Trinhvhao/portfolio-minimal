const fs = require('fs');
const path = require('path');

const tsxPath = path.join(__dirname, 'src/components/app/sections/TestimonialsSection.tsx');
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

// The original section to replace:
/*
      <div className="z-10 mx-auto w-full">
        <motion.div
   ... 
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
*/

// Replacing the header block:
tsxContent = tsxContent.replace(
  /<motion\.div\s+initial=\{\{ opacity: 0, y: 20 \}\}[\s\S]*?<\/motion\.div>/,
  '<TextReveal text="CLIENT FEEDBACK" className="text-5xl md:text-7xl font-heading font-bold mb-8 md:mb-12 tracking-tighter" />'
);

fs.writeFileSync(tsxPath, tsxContent);
console.log("Updated Testimonials Title");
