import { Afordin } from '@thesvg/react';
import { renderToStaticMarkup } from 'react-dom/server';

export function setAfordinFavicon(): void {
  const svg = renderToStaticMarkup(<Afordin className="h-6 w-6" />);
  const faviconHref = `data:image/svg+xml,${encodeURIComponent(svg)}`;

  let iconLink = document.querySelector<HTMLLinkElement>('link[rel="icon"]');

  if (!iconLink) {
    iconLink = document.createElement('link');
    iconLink.rel = 'icon';
    document.head.appendChild(iconLink);
  }

  iconLink.type = 'image/svg+xml';
  iconLink.href = faviconHref;
}