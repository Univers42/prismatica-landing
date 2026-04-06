# Prismatica Landing Roadmap

Este documento resume la arquitectura actual de **Prismatica Landing** y define los pasos para alcanzar la visión técnica del proyecto, incluyendo mejoras críticas de rendimiento.

## 🏗️ Resumen de Arquitectura Actual

El proyecto está en una fase de transición hacia una estructura **FSD (Feature-Sliced Design)** estricta combinada con **Atomic Design**.

### Estado de Capas (FSD)
- ✅ **App**: Raíz de la aplicación organizada en `src/app`.
- ✅ **Pages**: Configuración de `landing` y `login` completas.
- ✅ **Widgets**: Secciones complejas (`hero`, `galaxy`, `navbar`, etc.) refactorizadas.
- ✅ **Features / Entities**: Lógica de autenticación centralizada en Zustand.
- ✅ **Shared**: UI atómica, hooks globales y utilidades consolidadas.

### Stack Tecnológico
- **Core**: React 19 + Vite 8 + TypeScript 5.9.
- **Styling**: SCSS + CSS Modules (Zero Tailwind).
- **State**: Zustand (Global) + TanStack Query (Server).
- **Animations**: Framer Motion 12.

---

## ⚡ 3 Mejoras de Rendimiento Sugeridas

Para mantener la experiencia "Premium" y "State of the Art" de Prismatica, se proponen las siguientes optimizaciones técnicas:

### ✅ 1. Implementación de `LazyMotion` (Framer Motion)
Migración exitosa a `LazyMotion` y el componente `m`, cargando solo `domAnimation`.
- **Resultado**: Reducción del bundle inicial de JS en ~46kB y optimización del Time to Interactive (TTI).

### 2. Code-Splitting a Nivel de Ruta y Componentes Pesados
`App.tsx` importa la página `Landing` de forma estática. 
- **Acción**: Utilizar `React.lazy()` para la carga de páginas y widgets pesados (especialmente aquellos con efectos visuales complejos como `AnimatedPrism`).
- **Impacto**: Menor First Contentful Paint (FCP) al cargar solo el esqueleto inicial y el Hero.

### 3. Pipeline de Optimización de Assets Automático
El proyecto maneja efectos visuales "Premium" que dependen de assets.
- **Acción**: Integrar `vite-plugin-image-optimizer` para asegurar que todas las imágenes se sirvan en formatos modernos (WebP/AVIF) y con compresión sin pérdida durante el build.
- **Impacto**: Reducción drástica del peso de la página y consumo de ancho de banda.

---

## 🗺️ Próximas Metas (Arquitectura & UX)

1. **Optimización de Assets**: Configurar pipeline para formatos modernos (WebP/AVIF).
2. **Interactividad Avanzada**: Refinar comportamientos de `StarField` y `GalaxySection` ante eventos de scroll profundos.
3. **Integración de Backend Real**: Sustituir mocks por endpoints productivos.
