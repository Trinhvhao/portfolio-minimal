const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/app/sections/HeroSection.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const newText = `        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-28 md:top-32 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 px-6 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)] z-40 hidden md:flex hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-300 cursor-default"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
          <span className="text-sm font-mono tracking-widest text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">HELLO, I'M TRINH VAN HAO</span>
        </motion.div>`;

// Use regex to locate the div and replace it
content = content.replace(/<div className="text-xs font-mono tracking-widest text-text-muted absolute top-28 md:top-32 left-1\/2 -translate-x-1\/2 hidden md:block">[\s\S]*?<\/div>/m, newText);

fs.writeFileSync(filePath, content);
console.log("Updated Hero greeting to be prominent");
