import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/shared/lib/libcss/dist/css/libcss.css';
import '@/shared/styles/landing.scss';
import App from '@/app/App';

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
