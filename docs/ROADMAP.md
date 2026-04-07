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

### ✅ 2. Code-Splitting a Nivel de Ruta y Componentes Pesados
Implementación exitosa de `React.lazy()` y `<Suspense>` tanto a nivel de rutas como de secciones visuales pesadas.
- **Resultado**: Separación del código en 'chunks' independientes, priorizando el contenido "Above the Fold" (Hero y Navbar), lo que reduce drásticamente el First Contentful Paint (FCP).

### ✅ 3. Pipeline de Optimización de Assets Automático
Integración de `vite-plugin-image-optimizer` y migración de assets externos (CDN) al sistema de archivos local para su compresión durante el pipeline de build.
- **Resultado**: Reducción drástica del peso de los assets visuales clave (hasta un 66% de ahorro, ~771KB), minimizando el consumo de ancho de banda sin pérdida de calidad percibida.

---

## 🗺️ Próximas Metas (Arquitectura & UX)

1. **[En Progreso] Refactorización FSD Estricta**:
    - ✅ **Capa App**: Fragmentación completada (Proveedores, UI Global, Router).
    - ✅ **Capa Pages**: Extracción completada (Modelos, Lógica, CSS Modules).
    - ⏳ **Capa Widgets**: (Siguiente paso). Resolver advertencias de linter (ej: `HeroSection` useEffect states) y asegurar que cumplen la estricta encapsulación FSD (ui/model/lib).
2. **Interactividad Avanzada**: Refinar comportamientos de `StarField` y `GalaxySection` ante eventos de scroll profundos una vez limpios.
3. **Integración de Backend Real**: Sustituir mocks (`mockAuthService`) por enrutamiento final al backend en la capa Features.
