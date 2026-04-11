const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/app/sections/HeroSection.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The original line:
// <div className="text-xs font-mono tracking-widest text-text-muted absolute left-1/2 -translate-x-1/2 hidden md:block">
//   HELLO, I'M TRINH VAN HAO
// </div>

content = content.replace(
  '<div className="text-xs font-mono tracking-widest text-text-muted absolute left-1/2 -translate-x-1/2 hidden md:block">',
  '<div className="text-xs font-mono tracking-widest text-text-muted absolute top-28 md:top-32 left-1/2 -translate-x-1/2 hidden md:block">'
);

fs.writeFileSync(filePath, content);
console.log("Fixed Hero title overlap");
