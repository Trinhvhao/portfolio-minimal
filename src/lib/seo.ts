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
    alumniOf?: {
        "@type": "Organization";
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
    image: `${SITE_URL}/images/trinhhao3.jpg`,
    sameAs: [
        // Add your social media profiles here for better branded search
        // "https://github.com/yourusername",
        // "https://linkedin.com/in/yourusername",
        // "https://twitter.com/yourusername"
    ],
    description: "Trịnh Văn Hào - Full Stack Developer specializing in React, TypeScript, and modern web technologies. Creating innovative digital experiences with focus on performance and user experience.",
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
        "Tailwind CSS"
    ]
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
