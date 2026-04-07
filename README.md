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
- **Auth**: Real-time Authentication via [Supabase](https://supabase.com/) (Google, GitHub, Email/Password)
- **Data Fetching**: [TanStack Query 5](https://tanstack.com/query/latest) (Server State Management) 
- **Icons**: [Lucide React](https://lucide.dev/)
- **Infrastructure**: [Zustand](https://zustand-demo.pmnd.rs/) (Reactive Session Hub)

---

## 🏗️ Arquitectura: FSD + Atomic Design

El proyecto sigue una fusión de **Feature-Sliced Design (FSD)** y **Atomic Design**, garantizando una separación clara de responsabilidades y una alta reusabilidad.

### Capas del Proyecto
1.  **App**: Configuración global, proveedores y estilos base.
2.  **Pages**: Landing interactiva y el nuevo **Dashboard Workspace**.
3.  **Widgets**: Secciones complejas e independientes (ej. `HeroSection`, `Sidebar`, `WidgetGrid`).
4.  **Features**: Lógica de interacción, autenticación de Supabase y navegación móvil. 
5.  **Entities**: Modelos de usuario y esquemas de sesión protegidos.
6.  **Shared**: Componentes UI atómicos, utilidades (ej. `GlassCard`) y librerías externas.

### Reglas de Importación
- **Strict Downward Imports**: Una capa solo puede importar de capas inferiores.
- **Public API**: Cada slice debe exponer su funcionalidad a través de un `index.ts`.
- **Alias Path**: Todos los imports internos deben usar `@/`.

---

## 🗺️ Roadmap y Estado del Proyecto

Basado en la revisión general definida en [ROADMAP.md](./docs/ROADMAP.md):

### 🛠️ Tareas de Arquitectura Completadas
- [x] Optimización total de Assets: Pipeline local con **vite-plugin-image-optimizer**.
- [x] **Code-Splitting** y Lazy Loading estructural de componentes pesados.
- [x] Migración total a arquitectura **FSD (Feature-Sliced Design)**.
- [x] **Dashboard Workspace Infrastructure**: Separación visual y lógica del área de usuario.
- [x] **Real-time Auth Integration**: Conexión con Supabase y manejo reactivo de sesiones.
- [x] **Mobile Navigation Hub**: Sistema de sidebar deslizante y menú hamburger responsivo.
- [x] **Zero-Error Build Strategy**: Confirmación de build local limpia sin avisos de TypeScript.

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
