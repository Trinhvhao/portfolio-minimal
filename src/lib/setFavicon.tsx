import { renderToStaticMarkup } from 'react-dom/server';

// Custom favicon component for Trịnh Văn Hào
function HaoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="#222" stroke="#fff" strokeWidth="4" />
      <text x="50" y="60" fontSize="40" textAnchor="middle" fill="#fff" fontFamily="Arial, sans-serif">H</text>
    </svg>
  );
}

export function setCustomFavicon(): void {
  const svg = renderToStaticMarkup(<HaoIcon />);
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

// Legacy function name for backwards compatibility
export const setAfordinFavicon = setCustomFavicon;