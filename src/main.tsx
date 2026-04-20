import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Using static favicon from public/favicon.svg instead of dynamic favicon
// import { setAfordinFavicon } from './lib/setFavicon';
// setAfordinFavicon();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
