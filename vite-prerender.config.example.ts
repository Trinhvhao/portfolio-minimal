// Example configuration for vite-plugin-prerender
// Install: npm install vite-plugin-prerender --save-dev

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
// import prerender from 'vite-plugin-prerender';

export default defineConfig({
    base: '/',
    plugins: [
        react(),
        tailwindcss(),
        // Uncomment after installing vite-plugin-prerender
        // prerender({
        //   routes: ['/'],
        //   postProcess(renderedRoute) {
        //     // Clean up the HTML
        //     renderedRoute.html = renderedRoute.html
        //       .replace(/<script (.*?)>/gi, '<script $1 defer>')
        //       .replace('id="app"', 'id="app" data-server-rendered="true"');
        //     return renderedRoute;
        //   },
        // }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
        },
    },
});
