const fs = require('fs');
const path = require('path');

const capPath = path.join(__dirname, 'src', 'components', 'app', 'sections', 'CapabilitiesSection.tsx');
let capContent = fs.readFileSync(capPath, 'utf8');

capContent = capContent.replace(
  /const capabilitiesData: Capability\[\] = \[[\s\S]*?\];/,
  `const capabilitiesData: Capability[] = [
  {
    title: "FULL STACK DEVELOPMENT",
    description:
      "Building seamless web applications from scalable backends to interactive frontends. Specializing in standard MERN/PERN stacks and modern meta-frameworks.",
    tags: ["< Next.js />", "< Node.js />", "< PostgreSQL />"],
  },
  {
    title: "AI & ML INTEGRATION",
    description:
      "Empowering software with modern AI. Building Retrieval-Augmented Generation (RAG) pipelines, automating workflows, and integrating LLM APIs.",
    tags: ["< LangChain />", "< OpenAI />", "< FastAPI />"],
  },
  {
    title: "COMPUTER VISION & OCR",
    description:
      "Deploying deep learning models for advanced object detection, plate recognition, and text extraction using state-of-the-art vision architectures.",
    tags: ["< PyTorch />", "< YOLO />", "< OpenCV />"],
  },
  {
    title: "SYSTEM ARCHITECTURE",
    description:
      "Designing robust, secure, and easily deployable services. Managing containerized applications, scalable cloud databases, and continuous integration.",
    tags: ["< Docker />", "< AWS />", "< CI/CD />"],
  },
];`
);

fs.writeFileSync(capPath, capContent, 'utf8');


const projPath = path.join(__dirname, 'src', 'components', 'app', 'sections', 'ProjectsSection.tsx');
let projContent = fs.readFileSync(projPath, 'utf8');

projContent = projContent.replace(
  /const projects: Project\[\] = \[[\s\S]*?\];/,
  `const projects: Project[] = [
  {
    title: "AI-Powered Enterprise RAG",
    tags: ["< React />", "< LangChain />", "< FastAPI />"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    colSpan: "md:col-span-8",
    description:
      "An intelligent chatbot platform designed for enterprise data. Allows secure document search and summarization with high accuracy via vector embeddings.",
  },
  {
    title: "Smart Talent Bridge",
    tags: ["< Next.js />", "< Python />"],
    image: "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-4",
    description:
      "A deep-learning enabled recruitment tool. Automatically parses CVs (OCR) and maps candidate skills to job requirements using NLP.",
  },
  {
    title: "Object Detection System",
    tags: ["< PyTorch />", "< YOLOv11 />"],
    image: "https://images.unsplash.com/photo-1620288863675-5f992f9d85b5?auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-4",
    description:
      "High-speed computer vision pipeline integrating a custom YOLO training loop for real-time license plate detection and tracking.",
  },
  {
    title: "Real-time E-Commerce Analytics",
    tags: ["< Node.js />", "< PostgreSQL />"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    colSpan: "md:col-span-8",
    description:
      "A scalable full-stack dashboard for merchants. Processes thousands of live transactions, predicting inventory needs and tracking user behaviors.",
  },
];`
);

fs.writeFileSync(projPath, projContent, 'utf8');

console.log('Capabilities and Projects updated.');
