import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    // Usamos el contenedor de la librería para centrar y dar margen
    <div className="prisma-container prisma-py-12">
      
      {/* SECCIÓN HERO */}
      <section className="prisma-text-center prisma-mb-16">
        <div className="prisma-flex-center prisma-gap-6 prisma-mb-8">
          <img src={viteLogo} className="prisma-icon--xl" alt="Vite logo" />
          <img src={reactLogo} className="prisma-icon--xl" alt="React logo" />
        </div>
        
        <h1 className="prisma-heading prisma-heading--1">
          Prismatica <span className="prisma-text-accent">Landing</span>
        </h1>
        
        <p className="prisma-paragraph prisma-paragraph--lg prisma-mx-auto" style={{ maxWidth: '600px' }}>
          Instalación completada con éxito. Estás usando el submódulo de estilos en una arquitectura monolítica dinámica.
        </p>

        <div className="prisma-mt-8">
          <button
            className="prisma-btn prisma-btn--primary prisma-btn--lg"
            onClick={() => setCount((count) => count + 1)}
          >
            Contador: {count}
          </button>
        </div>
      </section>

      {/* SECCIÓN DE PASOS / CARDS */}
      <section className="prisma-grid prisma-grid-2 prisma-gap-8">
        
        {/* Card de Documentación */}
        <div className="prisma-callout prisma-callout--info">
          <div className="prisma-callout__content">
            <h2 className="prisma-heading prisma-heading--4">Documentación</h2>
            <p className="prisma-paragraph">Explora las guías oficiales de Vite y React.</p>
            <div className="prisma-flex prisma-gap-4">
              <a href="https://vite.dev/" target="_blank" className="prisma-btn prisma-btn--outline prisma-btn--sm">Vite Docs</a>
              <a href="https://react.dev/" target="_blank" className="prisma-btn prisma-btn--outline prisma-btn--sm">React Docs</a>
            </div>
          </div>
        </div>

        {/* Card de Comunidad */}
        <div className="prisma-callout prisma-callout--success">
          <div className="prisma-callout__content">
            <h2 className="prisma-heading prisma-heading--4">Comunidad</h2>
            <p className="prisma-paragraph">Únete al desarrollo de la era monolítica.</p>
            <button className="prisma-btn prisma-btn--secondary prisma-btn--sm">
              GitHub Repository
            </button>
          </div>
        </div>

      </section>

      <footer className="prisma-mt-16 prisma-pt-8 prisma-border-t prisma-text-center prisma-text-secondary">
        <small className="prisma-paragraph--sm">2026 © Univers42 - LibCSS Enterprise System</small>
      </footer>
    </div>
  )
}

export default App