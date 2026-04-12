const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// Remove imports
appContent = appContent.replace(/import \{ SkillsSection \} from "@\/src\/components\/app\/sections\/SkillsSection";\n/, '');
appContent = appContent.replace(/import \{ TerminalSection \} from "@\/src\/components\/app\/sections\/TerminalSection";\n/, '');

// Add new import
appContent = appContent.replace(
  /import \{ TechArsenalSection \} from "@\/src\/components\/app\/sections\/TechArsenalSection";/,
  `import { TechArsenalSection } from "@/src/components/app/sections/TechArsenalSection";\nimport { MarqueeBannerSection } from "@/src/components/app/sections/MarqueeBannerSection";`
);

// Replace tags
appContent = appContent.replace(
  /      <SkillsSection \/>\n      <TerminalSection \/>/,
  '      <MarqueeBannerSection />'
);

fs.writeFileSync(appPath, appContent, 'utf8');

const dockPath = path.join(__dirname, 'src', 'components', 'app', 'FloatingDock.tsx');
let dockContent = fs.readFileSync(dockPath, 'utf8');

dockContent = dockContent.replace(/  \{ id: "skills", label: "Skills", icon: Code2 \},\n/, '');
dockContent = dockContent.replace(/  \{ id: "terminal", label: "Terminal", icon: TerminalSquare \},\n/, '');

fs.writeFileSync(dockPath, dockContent, 'utf8');

console.log('App and Dock patched.');
