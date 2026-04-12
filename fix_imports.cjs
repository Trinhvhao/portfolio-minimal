const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// Remove duplicate import and just add one at the end of the imports
appContent = appContent.replace(/import \{ MarqueeBannerSection \} from "@\/src\/components\/app\/sections\/MarqueeBannerSection";\n?/g, '');
appContent = appContent.replace(
  /import \{ TechArsenalSection \} from "@\/src\/components\/app\/sections\/TechArsenalSection";/,
  `import { TechArsenalSection } from "@/src/components/app/sections/TechArsenalSection";\nimport { MarqueeBannerSection } from "@/src/components/app/sections/MarqueeBannerSection";`
);

fs.writeFileSync(appPath, appContent, 'utf8');
