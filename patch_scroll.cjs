const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

appContent = appContent.replace(
  /const lenis = new Lenis\(\{[\s\S]*?\}\);/,
  `const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    const handleCustomScroll = (e: Event) => {
      const customEvent = e as CustomEvent;
      lenis.scrollTo(customEvent.detail.target, { offset: -88 });
    };
    window.addEventListener('custom-scroll', handleCustomScroll as EventListener);`
);

appContent = appContent.replace(
  /lenis\.destroy\(\);/,
  `window.removeEventListener('custom-scroll', handleCustomScroll as EventListener);
      lenis.destroy();`
);

fs.writeFileSync(appPath, appContent, 'utf8');

const dockPath = path.join(__dirname, 'src', 'components', 'app', 'FloatingDock.tsx');
let dockContent = fs.readFileSync(dockPath, 'utf8');

dockContent = dockContent.replace(
  /const targetY = Math\.max\(.*?;\n\s*window\.scrollTo\(\{ top: targetY, behavior: "smooth" \}\);/,
  `window.dispatchEvent(new CustomEvent('custom-scroll', { detail: { target: element } }));`
);

fs.writeFileSync(dockPath, dockContent, 'utf8');

console.log('Scroll patched.');
