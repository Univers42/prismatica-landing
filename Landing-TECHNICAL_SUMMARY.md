# 📊 **RESUMEN TÉCNICO EXHAUSTIVO: Prismatica Landing**

## 🎯 **Visión General del Proyecto**

**Prismatica Landing** es una landing page de clase empresarial construida con tecnologías modernas. Representa la plataforma Prismatica —un gestor de datos polimórficos con esquemas dinámicos— mediante una experiencia visual premium con animaciones sofisticadas, interactividad responsiva al mouse y scroll, y una arquitectura escalable basada en **Feature-Sliced Design (FSD)** + **Atomic Design**.

---

## 🏗️ **ARQUITECTURA DEL PROYECTO**

### **Estructura de Capas (FSD - Feature Sliced Design)**

```
src/
├── app/                          # 🏗️ App Layer (Global settings, providers)
│
├── pages/                        # ✅ Layer: Pages (landing, login)
│
├── widgets/                      # ✅ Layer: Widgets (Complex UI sections)
│
├── features/                     # ✅ Layer: Features (Auth flow, user interactions)
│   └── auth/                    # OAuth 2.0 & MFA Authentication
│
├── entities/                     # ✅ Layer: Entities (Business models, schemas)
│
├── shared/                       # ✅ Layer: Shared (Infra, UI particles, services)
│   ├── api/                     # API Clients & Mocks
│   ├── ui/                      # Base atoms (StarField, GlassCard)
│   └── lib/                     # Global utils
```

---

## 🔄 **ESTADO Y GESTIÓN DE DATOS (State Management)**

Prismatica utiliza una estrategia de **Doble Capa de Estado** para garantizar coherencia y rendimiento.

### **1. Estado de Servidor (TanStack Query)**
- **Uso**: Toda la data persistente (Usuarios, Sesiones, Esquemas Polimórficos).
- **Implementación**: Hooks personalizados en la capa de `Features` o `Entities` (ej. `useUser()`, `useLogin()`).
- **Beneficio**: Caching automático, revalidación en foco y manejo nativo de estados de carga/error.

### **2. Estado de Cliente (Zustand)**
- **Uso**: UI Dinámica, preferencias, estados de formularios complejos y navegación.
- **Regla de Oro**: Un store por cada "slice" de FSD.
- **Acceso**: Nunca se importa el store directamente en componentes; se accede exclusivamente mediante hooks selectores.

### **3. Contexto de Aplicación (AuthContext)**
- **Uso**: Orquestación de estados críticos que afectan a todo el árbol de componentes (ej. Transición de Layout para `AWAITING_MFA`).
- **Flujo**: TanStack Query actualiza el Contexto, y el Contexto dispara cambios reactivos en el Layout global.

---

## 🚀 **OPTIMIZACIÓN Y RENDIMIENTO (Web Vitals)**

El Core Web Vitals y el Time to Interactive (TTI) se garantizan a través de tres pilares técnicos:
1. **LazyMotion (Framer Motion)**: Carga diferida del motor de animaciones usando el subset estricto `domAnimation`.
2. **Code-Splitting y Component Lazy Loading**: Separación a nivel de rutas (`React.lazy()` en el `Router`) y widgets, difiriendo la carga de Canvas y layouts "Below the Fold" para agilizar el First Contentful Paint (FCP).
3. **Pipeline Automático de Assets**: Compresión severa de recursos visuales y vectoriales en fase de build con `vite-plugin-image-optimizer`, obteniendo reducciones comprobadas del ~66% sin merma en el acabado visual "Premium".

---

Este es un proyecto **production-ready** en términos de arquitectura, con énfasis en rendimiento visual, experiencia premium y mantenibilidad a largo plazo.
