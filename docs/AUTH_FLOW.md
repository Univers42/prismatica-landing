# Authentication & Authorization (Auth) Flow

## ⚡ Supabase Sandbox Integration

Prismatica utilizes **Supabase Auth** as its core identity provider in the development sandbox. This provides a production-grade session management system while maintaining full FSD (Feature-Sliced Design) architectural integrity.

### 1. Supported Providers
Currently, the platform supports the following authentication methods:
- **OAuth 2.0**: GitHub and Google.
- **Email/Password**: Manual credentials for internal testing (e.g., `prisma@dev.com`).
- **Coming Soon**: Intra 42 and MFA (Multi-Factor Authentication).

### 2. Session Architecture (The "Single Source of Truth")

Unlike traditional approaches that poll for session state, Prismatica uses a **Reactive State Pattern**:
- **Zustand (`authStore.ts`)**: Acts as the global state orchestrator.
- **Supabase Listener**: During app initialization (`App.tsx`), we mount a listener (`onAuthStateChange`).
- **Automatic Sync**: Any change in the Supabase session (login, logout, token expiry) is instantly mapped and propagated to the UI through the Zustand store.

---

## 🏗️ Architectural Pattern: Service Mapping

To prevent "Vendor Lock-in", we follow a **Mapping Pattern** in `features/auth/api/supabaseAuthService.ts`:

1.  **Request**: UI calls our service.
2.  **Execution**: `supabaseAuthService` delegates to `supabase-js` client.
3.  **Mapping**: The raw `Supabase.User` object is mapped to our internal **`User` interface** before reaching the store.
4.  **UI Consumption**: Components only ever see the Prismatica `User` type, never raw Supabase types.

```typescript
// Internal User Interface (Shared across App)
export interface User {
  id: string;
  email: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  is_active: boolean;
  status: 'online' | 'offline' | 'busy' | 'away';
}
```

---

## 🔒 Security & Route Protection

All private areas (starting with `/dashboard`) are guarded by the **`ProtectedRoute.tsx`** gate.

1.  **State Check**: The gate checks the `Authenticated` status from the store.
2.  **Loading State**: While Supabase is verifying the session on boot, the app enters a `CHECKING` state to prevent UI flickers.
3.  **Redirect**: If no session is found, the user is redirected to `/login` via `Navigate replace`.

---

## 🔌 Environment Configuration

To run the Auth system locally, ensure your `.env.local` contains the following:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key
```

> [!IMPORTANT]
> **OAuth Setup**: Ensure that the Callback URL in your Supabase Dashboard is set to `http://localhost:5173/dashboard` to enable successful redirection after login.
