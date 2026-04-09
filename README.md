# portfolio-minimal

Portfolio website built with React + TypeScript + Vite, focused on motion-rich sections and a clean modular component architecture.

## Tech Stack
- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- Motion (Framer Motion runtime)
- Lucide Icons

## Project Structure
- src/components/app: reusable app-level components
- src/components/app/sections: page sections split by feature
- src/assets/images: local images imported from source code
- src/assets/icons: local icons imported from source code
- src/assets/videos: local videos imported from source code
- src/assets/fonts: local fonts imported from source code
- public/images: static images served directly by URL
- public/icons: static icons served directly by URL
- public/videos: static videos served directly by URL
- public/fonts: static fonts served directly by URL

## Local Development
Prerequisites:
- Node.js 20+
- npm 10+

Install dependencies:
- npm install

Run development server:
- npm run dev

Build production bundle:
- npm run build

Preview production bundle:
- npm run preview

Type check:
- npm run lint

## Notes On Image Usage
Use src/assets when you want bundling and hashed output:
- import heroImage from "@/src/assets/images/trinhhao.webp"

Use public for direct URL access:
- /images/your-file.webp

## Available Scripts
- dev: start Vite dev server on port 3000
- build: build for production
- preview: preview production build
- clean: remove dist folder
- lint: TypeScript type check (noEmit)

## License
Private project.
