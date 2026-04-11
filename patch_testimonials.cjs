const fs = require('fs');
const path = require('path');

const testPath = path.join(__dirname, 'src', 'components', 'app', 'sections', 'TestimonialsSection.tsx');
let testContent = fs.readFileSync(testPath, 'utf8');

testContent = testContent.replace(
  /const testimonials = \[[^]*?\];/s,
  `const testimonials = [
  {
    text: "Hao's implementation of the AI-powered search pipeline drastically reduced our query times. A brilliant full stack developer.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Product Manager",
  },
  {
    text: "The computer vision model he developed for our manufacturing defect detection was incredibly accurate and robust in real-time.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Engineering Lead",
  },
  {
    text: "Hao seamlessly bridged our complex AI backends with a beautiful React frontend. His ability to own the entire stack is remarkable.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "CTO",
  },
  {
    text: "He architected our RAG chatbot from scratch, deploying it securely on AWS. A rare talent who understands both infrastructure and ML.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Working with Hao was an absolute pleasure. He refactored our messy monolithic app into clean, scalable microservices.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Elena Rostova",
    role: "Software Architect",
  },
  {
    text: "Hao doesn't just write code; he solves deep business problems. The LLM integration he built automated countless hours of manual work.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Tariq Ali",
    role: "Head of Operations",
  },
  {
    text: "He delivered our enterprise dashboard ahead of schedule. Fast APIs, responsive UI, and incredibly clean code.",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    name: "Amelia Chen",
    role: "VP of Product",
  },
  {
    text: "The OCR system Hao developed is exactly what our platform needed. His deep learning skills are perfectly paired with his web development expertise.",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    name: "David Kim",
    role: "Director of Tech",
  },
  {
    text: "From Next.js to PyTorch, Hao’s versatility allowed us to launch our AI startup minimal technical overhead.",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "Sophie Clark",
    role: "Founder",
  },
];`
);

fs.writeFileSync(testPath, testContent, 'utf8');

console.log('Testimonials updated.');
