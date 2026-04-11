const fs = require('fs');
const path = require('path');

const techPath = path.join(__dirname, 'src/components/app/sections/TechArsenalSection.tsx');
let content = fs.readFileSync(techPath, 'utf8');

// Tăng tốc độ chạy của Tech Arsenal (giảm duration từ 25 xuống 15)
content = content.replace(/transition=\{\{ duration: 25,/g, 'transition={{ duration: 15,');

fs.writeFileSync(techPath, content);
console.log("Updated Tech Arsenal Speed");
