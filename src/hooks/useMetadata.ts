import { useEffect } from 'react';
import { updateMetadata, resetMetadata, type MetadataConfig } from '@/src/lib/metadata';

/**
 * React hook to manage dynamic metadata
 * 
 * @example
 * // In a component
 * useMetadata({
 *   title: "About - Trịnh Văn Hào",
 *   description: "Learn more about me..."
 * });
 */
export function useMetadata(config: MetadataConfig): void {
    useEffect(() => {
        // Update metadata when component mounts or config changes
        updateMetadata(config);

        // Reset to defaults when component unmounts
        return () => {
            resetMetadata();
        };
    }, [config.title, config.description, config.ogTitle, config.ogDescription]);
}

/**
 * Hook to update metadata based on section visibility
 * Useful for single-page applications with scroll-based sections
 * 
 * @example
 * // In a section component
 * const sectionRef = useRef<HTMLElement>(null);
 * useSectionMetadata('about', sectionRef);
 */
export function useSectionMetadata(
    section: string,
    ref: React.RefObject<HTMLElement>,
    threshold: number = 0.5
): void {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Import dynamically to avoid circular dependency
                        import('@/src/lib/metadata').then(({ getSectionMetadata }) => {
                            const metadata = getSectionMetadata(section);
                            updateMetadata(metadata);
                        });
                    }
                });
            },
            { threshold }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [section, ref, threshold]);
}
