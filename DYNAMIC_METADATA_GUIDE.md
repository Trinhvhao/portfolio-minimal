# Dynamic Metadata Guide

## Tổng quan

Dynamic metadata cho phép update meta tags (title, description, OG tags) khi user scroll qua các sections khác nhau trong portfolio.

## Files đã tạo

1. **src/lib/metadata.ts** - Core functions để update metadata
2. **src/hooks/useMetadata.ts** - React hooks để dùng trong components
3. **src/components/app/DynamicMetadata.tsx** - Component tự động update metadata khi scroll

## Cách sử dụng

### Option 1: Tự động (Recommended)

Thêm component `DynamicMetadata` vào App.tsx:

```tsx
import { DynamicMetadata } from '@/src/components/app/DynamicMetadata';

export default function App() {
  return (
    <div>
      <DynamicMetadata />
      {/* Rest of your app */}
    </div>
  );
}
```

Component này sẽ:
- ✅ Tự động detect section nào đang visible
- ✅ Update metadata tương ứng
- ✅ Update URL hash (#about, #projects, etc.)
- ✅ Không cần thêm code gì nữa

**Yêu cầu:** Các sections cần có attribute `data-section`:

```tsx
<section data-section="about">
  <AboutSection />
</section>

<section data-section="projects">
  <ProjectsSection />
</section>
```

### Option 2: Manual với Hook

Dùng trong từng component section:

```tsx
import { useMetadata } from '@/src/hooks/useMetadata';

export function AboutSection() {
  useMetadata({
    title: "About - Trịnh Văn Hào",
    description: "Learn more about Trịnh Văn Hào...",
    ogTitle: "About - Trịnh Văn Hào",
    canonical: "https://portfolio-minimal-gilt.vercel.app/#about"
  });

  return <div>About content...</div>;
}
```

### Option 3: Manual với Functions

Dùng trực tiếp trong event handlers:

```tsx
import { updateMetadata } from '@/src/lib/metadata';

function handleNavigate() {
  updateMetadata({
    title: "Projects - Trịnh Văn Hào",
    description: "View my projects..."
  });
}
```

## Metadata được hỗ trợ

```typescript
interface MetadataConfig {
  title?: string;              // Document title
  description?: string;        // Meta description
  keywords?: string;           // Meta keywords
  ogTitle?: string;           // Open Graph title
  ogDescription?: string;     // Open Graph description
  ogImage?: string;           // Open Graph image URL
  twitterTitle?: string;      // Twitter Card title
  twitterDescription?: string; // Twitter Card description
  twitterImage?: string;      // Twitter Card image URL
  canonical?: string;         // Canonical URL
}
```

## Sections được định nghĩa sẵn

Trong `src/lib/metadata.ts`, đã có metadata cho các sections:

- **about** - About section
- **projects** - Projects showcase
- **experience** - Work experience
- **skills** - Technical skills
- **contact** - Contact information

Mỗi section có:
- Custom title với format: "Section - Trịnh Văn Hào | Context"
- Relevant description
- Canonical URL với hash (#section)

## Customize Metadata

### Thêm section mới

Edit `src/lib/metadata.ts`:

```typescript
export function getSectionMetadata(section: string): MetadataConfig {
  const sectionMetadata: Record<string, MetadataConfig> = {
    // ... existing sections
    blog: {
      title: "Blog - Trịnh Văn Hào | Articles",
      description: "Read articles by Trịnh Văn Hào about web development...",
      canonical: `${baseUrl}/#blog`
    }
  };
  
  return sectionMetadata[section] || defaultMetadata;
}
```

### Update default metadata

Edit `defaultMetadata` trong `src/lib/metadata.ts`:

```typescript
export const defaultMetadata: MetadataConfig = {
  title: "Your Custom Title",
  description: "Your custom description",
  // ... other fields
};
```

## SEO Benefits

Dynamic metadata giúp:

1. **Better Social Sharing** - Mỗi section có OG tags riêng
2. **Improved UX** - Browser title thay đổi theo context
3. **Analytics** - Track section views qua title changes
4. **Accessibility** - Screen readers announce title changes

## Performance

- ✅ Lightweight - Chỉ update DOM khi cần
- ✅ No re-renders - Không trigger React re-renders
- ✅ Debounced - IntersectionObserver tự động debounce
- ✅ Cleanup - Tự động cleanup observers

## Browser Support

- ✅ Chrome/Edge (modern)
- ✅ Firefox (modern)
- ✅ Safari (modern)
- ✅ Mobile browsers
- ⚠️ IE11 - Cần polyfill cho IntersectionObserver

## Testing

### Test locally:

1. Run dev server: `npm run dev`
2. Open browser DevTools
3. Scroll qua các sections
4. Check:
   - Document title changes
   - Meta tags update (Elements tab)
   - URL hash changes

### Test metadata:

```bash
# View current meta tags
document.querySelector('meta[name="description"]').content
document.querySelector('meta[property="og:title"]').content
```

## Troubleshooting

### Metadata không update

1. Check console for errors
2. Verify sections có `data-section` attribute
3. Check IntersectionObserver threshold (default: 0.5)

### URL hash không update

1. Check browser history API support
2. Verify section IDs match trong `DynamicMetadata.tsx`

### Performance issues

1. Reduce number of observed sections
2. Increase threshold value (0.5 → 0.7)
3. Add debounce to update function

## Next Steps

1. ✅ Add `data-section` attributes to sections
2. ✅ Import `DynamicMetadata` in App.tsx
3. ✅ Test scrolling behavior
4. ✅ Customize section metadata
5. ✅ Deploy and test on production

## Example Implementation

```tsx
// App.tsx
import { DynamicMetadata } from '@/src/components/app/DynamicMetadata';

export default function App() {
  return (
    <div>
      <DynamicMetadata />
      
      <section data-section="hero">
        <HeroSection />
      </section>
      
      <section data-section="about">
        <AboutSection />
      </section>
      
      <section data-section="projects">
        <ProjectsSection />
      </section>
      
      <section data-section="experience">
        <ExperienceSection />
      </section>
      
      <section data-section="skills">
        <SkillsSection />
      </section>
      
      <section data-section="contact">
        <ContactSection />
      </section>
    </div>
  );
}
```

## Advanced: Custom Intersection Observer

Nếu cần custom behavior:

```tsx
import { useSectionMetadata } from '@/src/hooks/useMetadata';

export function CustomSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Custom threshold
  useSectionMetadata('custom', sectionRef, 0.8);
  
  return <section ref={sectionRef}>...</section>;
}
```
