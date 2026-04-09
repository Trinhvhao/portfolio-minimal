import type { Experience, Project } from "./types";

export const projects: Project[] = [
  {
    title: "E-Commerce Reimagined",
    tags: ["< Next.js />", "< Stripe />"],
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80",
    colSpan: "md:col-span-8",
  },
  {
    title: "Fintech Dashboard",
    tags: ["< React />", "< D3.js />"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-4",
  },
  {
    title: "Web3 NFT Platform",
    tags: ["< WebGL />", "< Three.js />"],
    image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-4",
  },
  {
    title: "Creative Agency",
    tags: ["< GSAP />", "< Tailwind />"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    colSpan: "md:col-span-8",
  },
];

export const experiences: Experience[] = [
  {
    company: "Acme Corp",
    year: "2023 - PRESENT | NEW YORK",
    description:
      "Led the frontend team to rebuild the core product. Implemented robust <span class='text-white font-medium'>user authentication</span> and established <span class='text-white font-medium'>deployment pipelines</span> to <span class='text-white font-medium'>streamline business workflows</span>.",
  },
  {
    company: "Global Tech",
    year: "2020 - 2023 | SAN FRANCISCO",
    description:
      "Developed scalable web applications using React and Next.js. Focused on high-performance rendering and <span class='text-white font-medium'>SEO optimization</span> to increase organic traffic by 150%.",
  },
  {
    company: "Creative Agency",
    year: "2018 - 2020 | LONDON",
    description:
      "Designed and built award-winning marketing sites. Bridged the gap between design and engineering, ensuring <span class='text-white font-medium'>pixel-perfect implementation</span> and smooth <span class='text-white font-medium'>motion design</span>.",
  },
];
