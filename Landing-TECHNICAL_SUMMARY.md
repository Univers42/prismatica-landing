# 📊 **RESUMEN TÉCNICO EXHAUSTIVO: Prismatica Landing**

## 🎯 **Visión General del Proyecto**

**Prismatica Landing** es una landing page de clase empresarial construida con tecnologías modernas. Representa la plataforma Prismatica —un gestor de datos polimórficos con esquemas dinámicos— mediante una experiencia visual premium con animaciones sofisticadas, interactividad responsiva al mouse y scroll, y una arquitectura escalable basada en **Feature-Sliced Design (FSD)** + **Atomic Design**.

---

## 🏗️ **ARQUITECTURA DEL PROYECTO**

### **Estructura de Capas (FSD - Feature Sliced Design)**

```
src/
├── app/                          # ⚠️ En transición (debería estar en src/app/)
│   ├── App.tsx                  # Raíz de la aplicación con Router
│   ├── App.css                  # Estilos globales
│   └── index.css                # CSS variables y reset
│
├── pages/                        # ✅ Composiciones de páginas
│   └── landing/
│       ├── index.ts             # Public API (exports Landing)
│       └── ui/Landing.tsx       # Componente principal de página
│
├── widgets/                      # ✅ Secciones complejas + independientes
│   ├── hero-section/            # Sección héroe con prism interactivo
│   ├── navbar/                  # Navegación superior
│   ├── animated-prism/          # Canvas p/ rayes refractadas
│   ├── galaxy-section/          # Red de nodos interactivos
│   ├── prism-card/              # Tarjetas de features con dialogs
│   ├── refraction-section/      # Grid de caracte. (features)
│   └── synthesis-section/       # Sección contacto con form
│
├── shared/                       # ✅ Componentes reutilizables
│   └── ui/
│       ├── star-field/          # Fondo animado con estrellas
│       ├── light-cursor/        # Cursor personalizado
│       └── scroll-progress/     # Barra de progreso de scroll
│
├── components/                   # ⚠️ Componentes UI básicos (sin seguir FSD)
│   └── ui/
│       ├── button.tsx           # ComponentUI con variantes (CVA)
│       ├── dialog.tsx           # Dialog de Radix UI
│       ├── input.tsx            # Input form
│       └── textarea.tsx         # Textarea form
│
├── lib/
│   ├── utils.ts                 # Función cn() para merge de clases
│   └── libcss/                  # CSS library (subdependencia)
│
└── assets/                       # Imágenes y recursos estáticos
```

### **Jerarquía de Dependencias: Downward Imports**

```
Pages → Widgets → Shared → Components → Lib
```

**Regla clave**: Una capa `X` solo puede importar de capas `Y` donde `Y < X`.

**Ejemplo válido:**
```typescript
// HeroSection.tsx (widget) ✅
import { StarField } from '@/shared/ui/star-field';  // downward
import { Button } from '@/components/ui/button';      // downward
```

**Ejemplo inválido:**
```typescript
// Button.tsx (component) ❌
import { HeroSection } from '@/widgets/hero-section'; // upward -> PROHIBIDO
```

---


### **Configuración TypeScript Estricta**

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "target": "ES2023",
    "module": "ESNext"
  }
}
```

---

## 🎨 **FLUJO VISUAL Y COMPONENTES CLAVE**

### **Estructura de la Landing Page**

```
Landing.tsx (página)
│
├─ StarField (shared)              ← Fondo de estrellas animadas
├─ LightCursor (shared)            ← Cursor personalizado
├─ ScrollProgress (shared)         ← Indicador de scroll
│
└─ Navbar (widget)                 ← Navegación con logo + links
│
└─ HeroSection (widget)
   │
   ├─ OpticalGrid (CSS)            ← Grid óptico de fondo
   ├─ MousePos tracking            ← Obtiene pos. del mouse
   ├─ AnimatedPrism (canvas)       ← Prism con rayos refractados
   └─ GlowEffect (radial-gradient)  ← Responde al mouse
│
├─ RefractionSection (widget)
│   │
│   ├─ Header (animado)
│   └─ PrismCard[] (grid)
│       │
│       └─ Dialog (Radix)           ← Det specshows specs en modal
│
├─ GalaxySection (widget)
│   │
│   └─ Canvas                       ← 80 nodos conectados dinám.
│
└─ SynthesisSection (widget)
    │
    ├─ Background image (convergencia)
    ├─ Form (name, email, message)
    └─ Social links footer
```

### **Ejemplo: Flujo de Datos en HeroSection**

```typescript
// Landing.tsx - rastreador global de mouse
const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

useEffect(() => {
  const handle = (e: MouseEvent) => {
    rawMouseRef.current = { x: e.clientX, y: e.clientY };
  };
  window.addEventListener('mousemove', handle);
  
  // LERP suave cada frame para perf
  const tick = () => {
    const nx = lerp(smooth.x, raw.x, 0.1);  // t=0.1 = suavidad
    const ny = lerp(smooth.y, raw.y, 0.1);
    setMousePos({ x: nx, y: ny });
    rafRef.current = requestAnimationFrame(tick);
  };
}, []);

// Pasar mousePos a HeroSection
<HeroSection mousePos={mousePos} onEnter={() => {}} />
```

```typescript
// HeroSection.tsx - usa mousePos para cálculo de glow
export function HeroSection({ mousePos }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [prismGlow, setPrismGlow] = useState(0);

  useEffect(() => {
    const rect = sectionRef.current?.getBoundingClientRect();
    // Distancia del mouse al centro del prism
    const dist = Math.hypot(
      mousePos.x - (rect.left + rect.width / 2),
      mousePos.y - (rect.top + rect.height / 2)
    );
    
    // Glow decay exponencial
    const maxDist = 400;
    setPrismGlow(prev => Math.max(prev * 0.96, Math.max(0, 1 - dist / maxDist)));
  }, [mousePos]);

  return (
    <section>
      {/* Glow radial responde a proximidad */}
      <div style={{
        background: `radial-gradient(ellipse at ${mousePos.x}px ${mousePos.y}px,
          rgba(0,229,255,${0.04 + glowIntensity * 0.08})...)`
      }} />
      
      <AnimatedPrism mousePos={mousePos} glowIntensity={glowIntensity} />
    </section>
  );
}
```

---

## ✨ **COMPONENTES ESPECIALIZADOS**

### **1. AnimatedPrism (Canvas Renderizado)**

**Ubicación**: `widgets/animated-prism/ui/AnimatedPrism.tsx`

```typescript
// Canvas 320x320 dibuja un prisma triangular con rayos refractados
export function AnimatedPrism({ mousePos, glowIntensity }: AnimatedPrismProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Prisma equilátero
    const apex = { x: cx, y: cy - H * 0.6 };
    const bl = { x: cx - W/2, y: cy + H * 0.4 };
    const br = { x: cx + W/2, y: cy + H * 0.4 };

    const draw = () => {
      frameRef.current++;
      const t = frameRef.current * 0.012;
      const gi = glowIntensity || 0;

      // 5 rayos refractados cada uno con:
      // - Color (cyan → magenta)
      // - Ángulo = base + sinusoidal(frame * velocidad)
      // - Alfa aumenta con glowIntensity del mouse
      const rays = [
        { color: '#00E5FF', angle: 0.38 + Math.sin(t * 0.7) * 0.04, 
          alpha: 0.55 + gi * 0.3 },
        // ...más rayos
      ];

      // Raya de entrada desde izq → prism
      // Rayas de salida: se refractan en bordes del prism
      // Cada raya dibujada con líneas y gradientes
      
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
  }, [glowIntensity]);

  return <canvas ref={canvasRef} />;
}
```

**Propiedades técnicas**:
- Frame rate: ~60fps con `requestAnimationFrame`
- Interpolación: `Math.sin()` periódica para ondulación natural
- Alpha transparency: reactivo al `glowIntensity`
- Entrada de luz: proyectada desde fuera del prism

---

### **2. GalaxySection (Gráficos de Red Dinámica)**

**Ubicación**: `widgets/galaxy-section/ui/GalaxySection.tsx`

```typescript
export function GalaxySection({ mousePos, scrollProgress }: GalaxySectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<GalaxyNode[]>([]);

  // Init: 80 nodos con posiciones aleatorias
  useEffect(() => {
    const nodes: GalaxyNode[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * w,
      y: Math.random() * h,
      baseX: x,  // Orbita alrededor de baseX/baseY
      baseY: y,
      vx: 0, vy: 0,
      r: Math.random() * 3 + 1.5,  // Radio 1.5-4.5px
      color: COLORS[i % COLORS.length],  // Ciclo de colores
      alpha: Math.random() * 0.5 + 0.3,
      glowLevel: 0,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.003,
      connections: []  // IDs de nodos conectados
    }));

    // Build graph: conecta si distancia < 160px
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].baseX - nodes[j].baseX, 
                             nodes[i].baseY - nodes[j].baseY);
        if (d < 160) nodes[i].connections.push(j);
      }
    }
  }, []);

  // Dibujo cada frame:
  // 1. Nodos orbitan suavemente
  // 2. Nodos atraídos al mouse (fuerza radial)
  // 3. Líneas conectoras con alpha reducido
  // 4. Glow / particles opcionales
}
```

**Características técnicas**:
- **Topología**: Grafo dinámico de 80 nodos
- **Física simplificada**: Orbita armónica + atracción mouse
- **Rendering**: Canvas 2D con composición de capas (nodos primer, líneas, glow)
- **Interactividad**: Responde a mousePos en tiempo real

---

### **3. PrismCard (Componente UI con Dialog)**

**Ubicación**: `widgets/prism-card/ui/PrismCard.tsx`

```typescript
export interface PrismCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;  // key en COLOR_VALUES
  specs: readonly FeatureSpec[];
  index: number;
}

export function PrismCard({ title, subtitle, description, icon: Icon, 
                          color, specs, index }: PrismCardProps) {
  const [showSpecs, setShowSpecs] = useState(false);
  const [glowLevel, setGlowLevel] = useState(0);

  // Colores predefinidos con valores RGB
  const c = COLOR_VALUES[color] || COLOR_VALUES.cyan;  // r,g,b,hex
  
  // Glow: sube rápido en hover, decae lento after
  const handleMouseEnter = () => {
    glowRef.current = Math.min(1, glowRef.current + 0.35);
    setGlowLevel(glowRef.current);
  };

  const startDecay = () => {
    if (decayRef.current) clearInterval(decayRef.current);
    decayRef.current = setInterval(() => {
      glowRef.current = Math.max(0, glowRef.current - 0.008);
      setGlowLevel(glowRef.current);
    }, 30);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={startDecay}
      style={{
        boxShadow: `0 0 ${20 + glowLevel * 30}px 
                   rgba(${r},${g},${b},${0.2 + glowLevel * 0.3})`
      }}
    >
      <div className={styles.header}>
        <Icon size={32} color={c.hex} />
        <h3>{title}</h3>
      </div>
      <p className={styles.description}>{description}</p>
      
      <Dialog open={showSpecs} onOpenChange={setShowSpecs}>
        <DialogTrigger asChild>
          <Button variant="prism">View Specs</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {specs.map(spec => (
            <div key={spec.label}>
              <strong>{spec.label}:</strong> {spec.detail}
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
```

**Características**:
- **Glow effect**: Estado local con decay exponencial
- **Dialog modal**: Radix UI primitivo no-estilado
- **Animación**: Fade-in al scroll (Framer whileInView)
- **Responsividad**: Box-shadow dinámico basado en hover state

---

### **4. SynthesisSection (Formulario + CTA)**

```typescript
export function SynthesisSection({ scrollProgress }: SynthesisSectionProps) {
  const [formData, setFormData] = useState({ 
    name: '', email: '', message: '' 
  });
  const [sending, setSending] = useState(false);

  // Brightness aumenta en el último 25% del scroll
  const brightness = Math.min(1, Math.max(0, (scrollProgress - 0.75) * 4));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));  // Simula envío
    toast.success("Message sent. We'll be in touch.");
    setFormData({ name: '', email: '', message: '' });
    setSending(false);
  };

  return (
    <section className={styles.sectionContainer}>
      {/* Background convergencia */}
      <img 
        src={CONVERGENCE_IMG} 
        style={{ opacity: 0.08 + brightness * 0.25 }}
      />
      
      {/* Glow rings revelan al scroll */}
      {brightness > 0.1 && (
        <div
          className={styles.spectralGlowRings}
          style={{
            background: `radial-gradient(ellipse at 50% 50%,
              rgba(0,229,255,${brightness * 0.06}) 0%,
              rgba(112,0,255,${brightness * 0.04}) 35%,
              transparent 80%)`
          }}
        />
      )}
      
      <form onSubmit={handleSubmit}>
        <Input 
          placeholder="Name"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
        <Input 
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
        <Textarea
          placeholder="Message"
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
        />
        <Button disabled={sending}>
          {sending ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </section>
  );
}
```

---

## 📦 **SISTEMA DE ESTILOS**

### **Arquitectura de Estilos**

```
CSS Variables (index.css)
    ↓
Tailwind CSS (configuración automática)
    ↓
CSS Modules (scoping por componente)
    ↓
Utility Classes + Framer Motion (estilos inline dinámicos)
```

### **Variables CSS Globales**

```css
:root {
  /* Colores */
  --text: #6b6375;              /* Texto normal */
  --text-h: #08060d;            /* Headings */
  --bg: #fff;                   /* Fondo */
  --border: #e5e4e7;            /* Bordes */
  --accent: #aa3bff;            /* Color principal (violeta) */
  --accent-bg: rgba(170, 59, 255, 0.1);

  /* Tipografía */
  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;

  /* Shadows */
  --shadow: rgba(0,0,0,0.1) 0 10px 15px -3px, 
            rgba(0,0,0,0.05) 0 4px 6px -2px;

  /* Base */
  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #16171d;
    --text: #9ca3af;
    --accent: #c084fc;
    /* ... más overrides */
  }
}
```

### **CSS Modules Ejemplo (Landing.module.css)**

```css
.landingContainer {
  background-color: var(--bg);
  min-height: 100vh;
  overflow: hidden;
  cursor: none;  /* Reemplazado por LightCursor */
}

.scrollContainer {
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;  /* Firefox */
}

.scrollContainer::-webkit-scrollbar {
  display: none;  /* Webkit browsers */
}
```

---

## 🔄 **FLUJO DE DATOS Y STATE MANAGEMENT**

### **Patrón: Props Drilling**

Actualmente el proyecto usa props drilling para comunicación padre → hijo:

```
Landing (gestiona mousePos + scrollProgress)
  ↓
  ├─ HeroSection (mousePos + scrollProgress)
  ├─ RefractionSection (scrollProgress)
  ├─ GalaxySection (mousePos + scrollProgress)
  └─ SynthesisSection (scrollProgress)
```

### **Scroll Progress Tracking**

```typescript
// Landing.tsx
const [scrollProgress, setScrollProgress] = useState(0);

useEffect(() => {
  const container = scrollRef.current;
  const onClick = () => {
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const prog = Math.max(0, Math.min(1, scrollTop / scrollHeight));
    setScrollProgress(prog);
  };
  
  container.addEventListener('scroll', onClick, { passive: true });
  return () => container.removeEventListener('scroll', onClick);
}, []);
```

---

## 🚀 **CONFIGURACIÓN DE BUILD Y DEPLOYMENT**

### **Vite Config**

```typescript
export default defineConfig({
  plugins: [react()],  // Fast Refresh para HMR
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Path alias
    },
  },
})
```

### **Scripts NPM**

```json
{
  "dev": "vite",                    // localhost:5173 con HMR
  "build": "tsc -b && vite build",  // TypeScript check + minify
  "lint": "eslint .",               // Análisis estático
  "preview": "vite preview"         // Servir build local
}
```

### **Output Build Típico**

```
dist/
├── index.html                    # Entry point
├── assets/
│   ├── index-HASH.js            # Bundle principal (~150-200kb minif)
│   ├── index-HASH.css           # Tailwind + module styles
│   └── [otros chunks si lazy-load]
```

---

## ⚙️ **COMPONENTES UI COMPARTIDOS (Shared)**

### **Shared - Star Field**

Fondo de estrellas animadas en parallax:

```typescript
// Genera 100+ estrellas con diferentes velocidades
// SVG o Canvas renderer
// Estados: parallax scroll + mouse drift
```

### **Shared - Light Cursor**

Cursor personalizado glow:

```typescript
// Rastrea mousePos
// Dibuja círculo luminoso en canvas pequeño
// Reemplaza cursor del sistema
```

### **Shared - Scroll Progress**

Barra de progreso visual:

```typescript
// Barra horizontal que crece con scroll
// Altura dinámica basada en scrollProgress
// Gradient color transitions
```

---

## 📐 **CONVENCIONES Y ESTÁNDARES**

| **Estándar** | **Implementación** |
|---|---|
| **Nomenclatura** | camelCase vars, PascalCase componentes, kebab-case clases CSS |
| **Imports** | Siempre con `@/` alias, nunca paths absolutos |
| **Components** | React.FC or JSX.Element, readonly props |
| **Types** | Interfaces separadas, no tipos inline |
| **State** | useState para local, prep para Zustand global |
| **Animations** | Framer Motion declarativo, no CSS keyframes |
| **Accesibilidad** | Radix UI primitivos para aria labels |
| **Performance** | requestAnimationFrame en canvas, useCallback en listeners |

---

## 🚨 **LIMITACIONES Y DEUDA TÉCNICA**

| **Problema** | **Ubicación** | **Impacto** | **Sugerencia** |
|---|---|---|---|
| `app/src/App.tsx` en raíz | `src/` | FSD inconsistente | Mover a `src/app/` |
| Components huérfanos | `src/components/` | Duplicación potencial | Consolidar en shared/ui |
| Props drilling profundo | Landing → Sections | Escalabilidad | Implementar Zustand store |
| Bundle Framer Motion | `package.json` | +25kb gzipped | Usar LazyMotion + domAnimation |
| Sin code-splitting | vite.config | TTI alto | React.lazy para páginas |
| Form sin backend | SynthesisSection | Demo solamente | Integrar API endpoint |

---

## 🎯 **ROADMAP TÉCNICO PRÓXIMO**

1. **Refactorización estructural**: Mover `app/src/App.tsx` → src/app/
2. **Optimización bundle**: LazyMotion + code-splitting dinámico
3. **Asset pipeline**: vite-plugin-image-optimizer para WebP/AVIF
4. **State global**: Zustand store por feature
5. **API integration**: TanStack Query + endpoints reales

---

## 📝 **EJEMPLOS DE USO TÍPICOS**

### **Importar Componente Compartido**

```typescript
import { StarField } from '@/shared/ui/star-field';

export function MyPage() {
  return (
    <>
      <StarField />
      {/* resto del contenido */}
    </>
  );
}
```

### **Crear Nuevo Widget**

```typescript
// widgets/my-widget/index.ts
export * from './ui/MyWidget';

// widgets/my-widget/ui/MyWidget.tsx
import { motion } from 'framer-motion';
import styles from './MyWidget.module.css';

export function MyWidget({ prop }: MyWidgetProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      {/* contenido */}
    </motion.div>
  );
}
```

### **Usar Dialog de Radix**

```typescript
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';

export function MyComponent() {
  return (
    <Dialog>
      <DialogTrigger>Ver detalles</DialogTrigger>
      <DialogContent>
        <p>Contenido del modal</p>
      </DialogContent>
    </Dialog>
  );
}
```

---

Este es un proyecto **production-ready** en términos de arquitectura, con énfasis en rendimiento visual, experiencia premium y mantenibilidad a largo plazo.
