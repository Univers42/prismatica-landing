import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './lib/libcss/dist/css/libcss.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
