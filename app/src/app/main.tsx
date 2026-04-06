import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * 🎨 CSS Injection Hierarchy
 * 1. Base Framework Styles (Normalize, variables, primitive components)
 * 2. Theme Overrides (Landing specific overrides overriding the base framework)
 */
import '@/shared/lib/libcss/dist/css/libcss.css';
import '@/shared/styles/landing.scss';

// The Master Orchestrator (Root React component)
import App from '@/app/App';

/**
 * 🚀 Application Bootstrap (DOM Entry Point)
 * 
 * This file mounts the React virtual DOM onto the physical HTML 'root' node.
 * It is completely devoid of logic, serving only as the bridge between the 
 * browser environment and the React framework.
 */
const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    /* 
      StrictMode intentionally double-invokes certain lifecycle methods and 
      effects in Development mode to surface side-effect bugs and ensure 
      components are resilient. It does not affect Production builds.
    */
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
