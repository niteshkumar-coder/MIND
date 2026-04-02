// Prevent libraries from attempting to overwrite window.fetch if it's read-only
// This MUST be at the very top of the file, before any imports.
if (typeof window !== 'undefined' && window.fetch) {
  const originalFetch = window.fetch;
  try {
    // Define a getter that returns the original fetch and a no-op setter
    // to prevent libraries from crashing when they try to assign to window.fetch
    Object.defineProperty(window, 'fetch', {
      get() { return originalFetch; },
      set() { 
        console.warn('Attempt to overwrite window.fetch was ignored to prevent a crash.');
      },
      configurable: true,
      enumerable: true
    });
  } catch (e) {
    console.warn('Could not lock window.fetch:', e);
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
