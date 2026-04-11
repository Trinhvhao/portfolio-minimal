const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

appContent = appContent.replace(
  /    const handleCustomScroll = \(e: Event\) => \{\n      const customEvent = e as CustomEvent;\n      lenis\.scrollTo\(customEvent\.detail\.target, \{ offset: -88 \}\);\n    \};\n    window\.addEventListener\('custom-scroll', handleCustomScroll as EventListener\);\n\n    const handleCustomScroll = \(e: Event\) => \{\n      const customEvent = e as CustomEvent;\n      lenis\.scrollTo\(customEvent\.detail\.target, \{ offset: -88 \}\);\n    \};\n    window\.addEventListener\('custom-scroll', handleCustomScroll as EventListener\);/,
  `    const handleCustomScroll = (e: Event) => {
      const customEvent = e as CustomEvent;
      lenis.scrollTo(customEvent.detail.target, { offset: -88 });
    };
    window.addEventListener('custom-scroll', handleCustomScroll as EventListener);`
);

appContent = appContent.replace(
  /      window\.removeEventListener\('custom-scroll', handleCustomScroll as EventListener\);\n      window\.removeEventListener\('custom-scroll', handleCustomScroll as EventListener\);/,
  `      window.removeEventListener('custom-scroll', handleCustomScroll as EventListener);`
);

fs.writeFileSync(appPath, appContent, 'utf8');
console.log('Fixed double redeclaration.');
