# 💠 Prismatica Landing

> **Prismatica** es una plataforma de datos polimórficos diseñada para gestionar esquemas dinámicos, vistas adaptables y adaptadores universales. Esta es la landing page oficial del proyecto.

---

## 🚀 Visión Técnica

Prismatica Landing está construida con un enfoque en el rendimiento extremo, una estética "Premium" y una arquitectura escalable que refleja la robustez de la plataforma subyacente.

### Stack Tecnológico (Cutting-Edge)
- **Core**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) + [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling**: [Sass (SCSS)](https://sass-lang.com/) + [CSS Modules](https://github.com/css-modules/css-modules)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Client) + [TanStack Query 5](https://tanstack.com/query/latest) (Server)
- **Auth**: OAuth 2.0 (Google, GitHub, 42) + Multi-Factor Authentication (MFA)
- **Data Fetching**: [TanStack Query 5](https://tanstack.com/query/latest) (Server State Management)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🏗️ Arquitectura: FSD + Atomic Design

El proyecto sigue una fusión de **Feature-Sliced Design (FSD)** y **Atomic Design**, garantizando una separación clara de responsabilidades y una alta reusabilidad.

### Capas del Proyecto
1.  **App**: Configuración global, proveedores y estilos base (en proceso de migración a `src/app`).
2.  **Pages**: Composición de la página `landing`.
3.  **Widgets**: Secciones complejas e independientes (ej. `HeroSection`, `Navbar`, `AnimatedPrism`).
4.  **Features**: Lógica de interacción y autenticación (OAuth 2.0). 
5.  **Entities**: Modelos de usuario y esquemas de sesión.
6.  **Shared**: Componentes UI atómicos, utilidades y librerías externas.

### Reglas de Importación
- **Strict Downward Imports**: Una capa solo puede importar de capas inferiores.
- **Public API**: Cada slice debe exponer su funcionalidad a través de un `index.ts`.
- **Alias Path**: Todos los imports internos deben usar `@/`.

---

## 🗺️ Roadmap y Estado del Proyecto

Basado en la revisión general definida en [ROADMAP.md](./ROADMAP.md):

### 🛠️ Tareas de Arquitectura Completadas
- [x] Migración a **LazyMotion** (Framer Motion) para optimización de bundle inicial.
- [x] Migración total a arquitectura **FSD (Feature-Sliced Design)**.
- [x] Centralización de lógica en **Shared Hooks** (ej. `useMousePosition`).

---

## 🛠️ Guía de Desarrollo

### Requisitos
- Node.js (versión recomendada LTS)
- npm o pnpm

### Comandos
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview
```

---

## 📏 Estándares de Ingeniería

- **Zero Hardcoded Literals**: Uso estricto de tokens de diseño y variables CSS.
- **TypeScript Strict**: Prohibición del uso de `any`, interfaces para todos los objetos y APIs de solo lectura.
- **Zustand Hooks**: El estado de cada slice se gestiona mediante stores de Zustand accedidos exclusivamente vía hooks personalizados.
- **A11y**: Cumplimiento de las guías WCAG 2.1 AA.

---

Desarrollado con ❤️ por el equipo de **Prismatica**.
