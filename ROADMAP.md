# Prismatica Landing Roadmap

Este documento resume la arquitectura actual de **Prismatica Landing** y define los pasos para alcanzar la visión técnica del proyecto, incluyendo mejoras críticas de rendimiento.

## 🏗️ Resumen de Arquitectura Actual

El proyecto está en una fase de transición hacia una estructura **FSD (Feature-Sliced Design)** estricta combinada con **Atomic Design**.

### Estado de Capas (FSD)
- ✅ **Pages**: Implementada la página `landing`.
- ✅ **Widgets**: Secciones complejas como `hero-section`, `navbar`, y `animated-prism`.
- ✅ **Features / Entities**: Implementada lógica de autenticación (OAuth 2.0 / MFA) y esquema de usuario.
- ⚠️ **Shared**: Contiene `ui`, pero existen componentes fuera en `src/components`.
- ❌ **App**: `App.tsx` y `main.tsx` se encuentran incorrectamente en la raíz de `src/`.

### Stack Tecnológico
- **Core**: React 19 + Vite 8 + TypeScript 5.9.
- **Styling**: Tailwind CSS 4 + CSS Modules.
- **Animations**: Framer Motion 12.
- **Data**: TanStack Query (preparado para fetch de esquemas polimórficos).

---

## ⚡ 3 Mejoras de Rendimiento Sugeridas

Para mantener la experiencia "Premium" y "State of the Art" de Prismatica, se proponen las siguientes optimizaciones técnicas:

### 1. Implementación de `LazyMotion` (Framer Motion)
Actualmente se importa `motion` de forma estándar, lo que incluye todo el motor de animaciones en el bundle principal (~25kb gzipped).
- **Acción**: Migrar a `LazyMotion` y `m` cargando solo las constantes `domAnimation` o `domMax`.
- **Impacto**: Reducción inmediata del Time to Interactive (TTI).

### 2. Code-Splitting a Nivel de Ruta y Componentes Pesados
`App.tsx` importa la página `Landing` de forma estática. 
- **Acción**: Utilizar `React.lazy()` para la carga de páginas y widgets pesados (especialmente aquellos con efectos visuales complejos como `AnimatedPrism`).
- **Impacto**: Menor First Contentful Paint (FCP) al cargar solo el esqueleto inicial y el Hero.

### 3. Pipeline de Optimización de Assets Automático
El proyecto maneja efectos visuales "Premium" que dependen de assets.
- **Acción**: Integrar `vite-plugin-image-optimizer` para asegurar que todas las imágenes se sirvan en formatos modernos (WebP/AVIF) y con compresión sin pérdida durante el build.
- **Impacto**: Reducción drástica del peso de la página y consumo de ancho de banda.

---

## 🗺️ Próximos Pasos (Arquitectura)

1. **Refactorización de Raíz**: Mover `App.tsx`, `main.tsx` y estilos globales a `src/app/`.
2. **Centralización de Shared**: Migrar `src/components/*` y `src/lib/*` a `src/shared/ui/` y `src/shared/lib/` respectivamente.
3. **Zustand Store**: Inicializar el store global siguiendo el patrón de un store por slice para la gestión de estados polimórficos.
