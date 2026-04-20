import { useEffect } from 'react';
import { updateMetadata, defaultMetadata, getSectionMetadata } from '@/src/lib/metadata';

/**
 * Component to manage dynamic metadata based on scroll position
 * Automatically updates meta tags when user scrolls to different sections
 */
export function DynamicMetadata() {
    useEffect(() => {
        // Set default metadata on mount
        updateMetadata(defaultMetadata);

        // Track which section is currently in view
        const sections = [
            { id: 'hero', selector: '[data-section="hero"]' },
            { id: 'about', selector: '[data-section="about"]' },
            { id: 'projects', selector: '[data-section="projects"]' },
            { id: 'experience', selector: '[data-section="experience"]' },
            { id: 'skills', selector: '[data-section="skills"]' },
            { id: 'contact', selector: '[data-section="contact"]' }
        ];

        const observers: IntersectionObserver[] = [];

        sections.forEach(({ id, selector }) => {
            const element = document.querySelector(selector);
            if (!element) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            // Update URL hash without scrolling
                            if (id !== 'hero') {
                                window.history.replaceState(null, '', `#${id}`);
                            } else {
                                window.history.replaceState(null, '', window.location.pathname);
                            }

                            // Update metadata based on section
                            const metadata = getSectionMetadata(id);
                            updateMetadata(metadata);
                        }
                    });
                },
                {
                    threshold: 0.5,
                    rootMargin: '-100px 0px -100px 0px'
                }
            );

            observer.observe(element);
            observers.push(observer);
        });

        // Cleanup
        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

    return null; // This component doesn't render anything
}
