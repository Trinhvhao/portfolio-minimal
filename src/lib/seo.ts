// SEO utilities and structured data helpers

export interface PersonSchema {
    "@context": "https://schema.org";
    "@type": "Person";
    name: string;
    jobTitle: string;
    url: string;
    image: string;
    sameAs: string[];
    description: string;
    knowsAbout: string[];
    skills?: string[];
    worksFor?: Array<{
        "@type": "Organization";
        name: string;
        url?: string;
        description?: string;
        startDate?: string;
    }>;
    hasCredential?: Array<{
        "@type": "EducationalOccupationalCredential";
        credentialCategory: string;
        name: string;
        issuedBy: { "@type": "Organization"; name: string };
        dateIssued?: string;
    }>;
    hasCreativeWork?: Array<{
        "@type": "CreativeWork";
        name: string;
        description: string;
        url: string;
        keywords?: string[];
    }>;
    alumniOf?: {
        "@type": "Organization";
        name: string;
        url?: string;
        description?: string;
    };
    nationality?: {
        "@type": "Country";
        name: string;
    };
    workLocation?: {
        "@type": "Place";
        name: string;
    };
}

export interface WebsiteSchema {
    "@context": "https://schema.org";
    "@type": "WebSite";
    name: string;
    url: string;
    description: string;
    author: {
        "@type": "Person";
        name: string;
    };
}

export interface ProjectSchema {
    "@context": "https://schema.org";
    "@type": "CreativeWork";
    name: string;
    description: string;
    image: string;
    author: {
        "@type": "Person";
        name: string;
    };
    keywords: string[];
}

const SITE_URL = "https://www.hayyie.click";

export const personSchema: PersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Trịnh Văn Hào",
    jobTitle: "Full Stack Developer",
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/images/og-cover-1200x630.jpg`,
    sameAs: [
        "https://github.com/Trinhvhao",
        "https://www.linkedin.com/in/trinhvanhao",
        "https://www.tiktok.com/@hayyie",
        "https://www.facebook.com/trinhvanhao",
        "https://www.instagram.com/hayyie",
    ],
    description: "I build beautiful and functional web experiences where design meets code. Full Stack Developer specializing in React, Next.js, TypeScript, and AI-powered applications. Building at the intersection of creative development and intelligent interfaces from Vietnam.",
    knowsAbout: [
        "React",
        "TypeScript",
        "Next.js",
        "Node.js",
        "Frontend Development",
        "Full Stack Development",
        "Web Performance",
        "UI/UX Design",
        "Motion Design",
        "GSAP",
        "Three.js",
        "Tailwind CSS",
        "WebGL",
        "JavaScript",
        "Web Development",
        "Artificial Intelligence",
        "Machine Learning",
        "RAG",
        "NLP",
        "Computer Vision",
        "Python",
        "Docker",
        "Creative Development",
    ],
    skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Python",
        "PostgreSQL",
        "Docker",
        "Vercel",
        "Framer Motion",
        "GSAP",
        "Three.js",
        "WebGL",
        "Firebase",
        "Prisma",
        "GraphQL",
        "Redis",
        "TensorFlow",
        "PyTorch",
        "Figma",
    ],
    nationality: {
        "@type": "Country",
        name: "Vietnam",
    },
    workLocation: {
        "@type": "Place",
        name: "Vietnam",
    },
    alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Dai Nam University",
        url: "https://dainam.edu.vn",
        description: "Studied AI/ML with focus on Computer Vision and NLP at AIoT Lab",
    },
    worksFor: [
        {
            "@type": "Organization",
            "name": "Zaka Edu",
            "url": "https://zaka.edu.vn",
            "description": "Website Manager (2023 - Present)",
            "startDate": "2023",
        },
        {
            "@type": "Organization",
            "name": "AIoT Lab - Dai Nam University",
            "url": "https://dainam.edu.vn",
            "description": "AI Intern (2025 - Present)",
            "startDate": "2025-07",
        },
        {
            "@type": "Organization",
            "name": "Independent Freelance",
            "description": "Freelance Developer (2022 - Present)",
            "startDate": "2022",
        },
    ],
    hasCredential: [
        {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "certificate",
            name: "AWS Cloud Practitioner",
            issuedBy: { "@type": "Organization", name: "Amazon Web Services" },
            dateIssued: "2025",
        },
        {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "certificate",
            name: "TensorFlow Developer Certificate",
            issuedBy: { "@type": "Organization", name: "Google" },
            dateIssued: "2025",
        },
        {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "certificate",
            name: "Deep Learning Specialization",
            issuedBy: { "@type": "Organization", name: "Coursera (DeepLearning.AI)" },
            dateIssued: "2025",
        },
        {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "certificate",
            name: "Meta Front-End Developer Certificate",
            issuedBy: { "@type": "Organization", name: "Meta" },
            dateIssued: "2025",
        },
        {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "certificate",
            name: "Machine Learning Engineer Certificate",
            issuedBy: { "@type": "Organization", name: "IBM" },
            dateIssued: "2025",
        },
        {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "certificate",
            name: "Docker Foundations Certificate",
            issuedBy: { "@type": "Organization", name: "Docker" },
            dateIssued: "2025",
        },
    ],
    hasCreativeWork: [
        {
            "@type": "CreativeWork",
            name: "E-Commerce Reimagined",
            description: "A high-performance headless e-commerce solution built for scale with Next.js and Stripe.",
            url: `${SITE_URL}/projects/e-commerce-reimagined`,
            keywords: ["Next.js", "Stripe", "E-Commerce"],
        },
        {
            "@type": "CreativeWork",
            name: "Fintech Dashboard",
            description: "Data-dense financial analytics dashboard with D3.js and real-time WebSocket feeds.",
            url: `${SITE_URL}/projects/fintech-dashboard`,
            keywords: ["React", "D3.js", "Financial Analytics"],
        },
        {
            "@type": "CreativeWork",
            name: "Web3 NFT Platform",
            description: "Immersive 3D gallery for digital assets with custom shaders and WebGL rendering.",
            url: `${SITE_URL}/projects/web3-nft-platform`,
            keywords: ["WebGL", "Three.js", "NFT"],
        },
        {
            "@type": "CreativeWork",
            name: "Creative Agency Portfolio",
            description: "Award-winning portfolio site with scroll-jacking, custom cursors, and complex GSAP timeline animations.",
            url: `${SITE_URL}/projects/creative-agency`,
            keywords: ["GSAP", "Tailwind CSS", "Animation"],
        },
    ],
};

export const websiteSchema: WebsiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Trịnh Văn Hào Portfolio",
    url: `${SITE_URL}/`,
    description: "Trịnh Văn Hào - Full Stack Developer Portfolio. Personal portfolio showcasing frontend projects, creative interfaces, and product development experience.",
    author: {
        "@type": "Person",
        name: "Trịnh Văn Hào"
    }
};

export function generateProjectSchema(project: {
    title: string;
    tags: string[];
    image: string;
}): ProjectSchema {
    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: `${project.title} - Built with ${project.tags.join(", ")}`,
        image: project.image,
        author: {
            "@type": "Person",
            name: "Trịnh Văn Hào"
        },
        keywords: project.tags.map(tag => tag.replace(/[</>]/g, "").trim())
    };
}

export function injectStructuredData(schema: object): void {
    if (typeof window === "undefined") return;

    const scriptId = `structured-data-${Date.now()}`;
    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
}
