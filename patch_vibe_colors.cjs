const fs = require('fs');
const path = require('path');

const vibePath = path.join(__dirname, 'src', 'components', 'app', 'FloatingVibeStation.tsx');
let content = fs.readFileSync(vibePath, 'utf8');

// The disc background
content = content.replace(
  /bg-gradient-to-br from-blue-500 to-purple-600/,
  'bg-white'
);

// The wave bars
content = content.replace(
  /bg-gradient-to-t from-green-400 to-green-600/,
  'bg-white'
);

// Progress bar
content = content.replace(
  /bg-green-500 group-hover:bg-green-400/,
  'bg-white group-hover:bg-white/80'
);

// "Now Playing" text
content = content.replace(
  /isPlaying \? "text-green-500" : "text-neutral-500"/,
  'isPlaying ? "text-white" : "text-neutral-500"'
);

// Music icon active color
content = content.replace(
  /isPlaying \? 'text-green-400' : 'text-white'/,
  'isPlaying ? "text-white" : "text-white"'
);

// Optional: Change the blinking green dot on the music icon to white
content = content.replace(
  /bg-green-500 rounded-full animate-pulse/,
  'bg-white rounded-full animate-pulse'
);

fs.writeFileSync(vibePath, content, 'utf8');
console.log('Colors patched to white.');
