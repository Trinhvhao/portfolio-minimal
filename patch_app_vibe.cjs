const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// Replace the import
appContent = appContent.replace(
  /import \{ VibeStationSection \} from "@\/src\/components\/app\/sections\/VibeStationSection";/,
  'import { FloatingVibeStation } from "@/src/components/app/FloatingVibeStation";'
);

// Remove the section and add the floating widget
appContent = appContent.replace(
  /<VibeStationSection \/>/,
  ''
);

// We need to make sure FloatingVibeStation is placed somewhere like before <FloatingDock />
appContent = appContent.replace(
  /<FloatingDock \/>/,
  '<FloatingVibeStation />\n      <FloatingDock />'
);

fs.writeFileSync(appPath, appContent, 'utf8');
console.log('App patched.');
