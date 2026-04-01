# Authentication & Authorization (Auth) Flow

## 🧪 How to Demonstrate the Auth Flow (Mock)

The current implementation includes a `mockAuthService` that replicates the database schema and security behaviors. You can demonstrate the following flows to the team directly on the `/login` page:

### 1. Standard OAuth Login (GitHub / 42)
- **Action**: Click the **GitHub** or **Intra 42** button.
- **Expected Result**: 
    - Buttons are disabled for ~1s (simulating network latency).
    - A **Success Toast** appears at the bottom-right.
    - The UI transitions to the **Welcome Back** view showing the user's email.
- **Backend Tech**: Simulates a direct match in `oauth_accounts` without MFA.

### 2. Multi-Factor Authentication (Google)
- **Action**: Click the **Google** button.
- **Expected Result**: 
    - An **Info Toast** appears stating "2-Factor Authentication Required".
    - The UI transitions to the **Verify Identity** (OTP) screen.
- **Backend Tech**: Simulates a user with `mfa_enabled: true`, putting the session in the `AWAITING_MFA` state.

### 3. MFA Verification
- **Action**: On the MFA screen, enter any 6 digits (e.g., `123456`) and click **Verify & Access**.
- **Expected Result**: 
    - The UI transitions to the final **Authenticated (Welcome)** view.
- **Backend Tech**: Simulates the backend validating the TOTP code and issuing the final session token.

### 4. Session Termination
- **Action**: Click **Sign Out** from the Welcome view.
- **Expected Result**: The app clears the local tokens and returns to the initial Login form.


## Architectural Overview

Prismatica utilizes a strict Single Source of Truth for identity and authentication, guided by the 5NF-compliant PostgreSQL schema (`schema.user.sql`). 

All authentication states are managed via TanStack Query on the frontend, reacting to token changes and caching session states for instant UI updates.

### Data Mapping: `oauth_accounts` → `users`

A user can authenticate via multiple providers (GitHub, Google, 42). The system supports this seamlessly through the `oauth_accounts` junction table.

1. **OAuth Verification**: The user successfully logs in via an external provider. The provider returns a `provider_id` (e.g., GitHub ID) and an `email`.
2. **Account Linking**:
   - The backend checks `oauth_accounts` for `provider = 'github'` AND `provider_id = '12345'`.
   - **If found**: Retrieves the linked `user_id` and generates a new session token in `user_sessions`.
   - **If NOT found**:
     - *Email Strategy*: The backend checks the `users` table for the returned email. If the email exists, it links the new provider to the existing account by inserting into `oauth_accounts`.
     - *Creation Strategy*: If the email doesn't exist, it creates a new row in `users` (with `password_hash = NULL` since auth is handled by the provider), and then creates the relationship in `oauth_accounts`.
3. **Session Genesis**: A new row is inserted into `user_sessions` with a hashed `token_hash`. The plain token is sent as an HttpOnly cookie or secure JSON payload to the frontend.

## 2FA (MFA) Integration Strategy

The `schema.user.sql` anticipates Multi-Factor Authentication through the `mfa_enabled` and `mfa_secret` columns in the `users` table.

### Current Implementation (Frontend)
The frontend `AuthContext` now supports an `AWAITING_MFA` state. 
- When an OAuth login succeeds, if the returned mock user has `mfa_enabled: true` (e.g., Google mock profile), the UI Context state changes to `AWAITING_MFA` rather than `AUTHENTICATED`.

### Future Implementation (Backend & Activation)

To fully implement 2FA, the following roadmap will be executed:

#### Step 1: Activation Flow
1. **User Request**: User navigates to Settings -> Security and requests to enable 2FA.
2. **Secret Generation**: Backend generates a TOTP secret and returns a `otpauth://` URI and QR Code image.
3. **Verification**: User scans the QR code and inputs the 6-digit code.
4. **Persist**: Backend validates the 6-digit code against the TOTP secret. If successful, it updates the `users` table:
   ```sql
   UPDATE users SET mfa_enabled = TRUE, mfa_secret = 'encrypted_secret' WHERE id = 'user_id';
   ```

#### Step 2: Login Interception (The AWAITING_MFA State)
When a user logs in (via Password or OAuth):
1. Backend authenticates the primary factor (Password check or OAuth provider).
2. Backend queries `users.mfa_enabled`.
3. **If TRUE**: 
   - Backend *does not* create the final `user_sessions` row yet.
   - It generates a short-lived, restricted JWT (e.g., `role: mfa_pending`) or securely caches the attempt in Redis.
   - It responds with HTTP 206 (Partial Content) or a specific JSON flag: `{ requiresMfa: true, mfaToken: 'temp_token' }`.
4. Frontend intercepts this response, sets the `AuthContext` status to `AWAITING_MFA`, and renders the OTP form.

#### Step 3: MFA Resolution
1. User enters the 6-digit TOTP code.
2. Frontend sends `POST /auth/mfa/verify` carrying the `mfaToken` and the `otp_code`.
3. Backend validates the code against the decrypted `mfa_secret` for the user.
4. On success, Backend invalidates the temp token and issues the final session token (inserted into `user_sessions`).
5. Frontend transitions to `AUTHENTICATED` state and routes to the dashboard.

---

## 🔌 Backend Integration Contract (Production)

To replace the `mockAuthService` with actual network calls, the backend must implement the following REST API structure and data formats.

### 📍 Production Endpoints

| Method | Endpoint | Description | Expected Payload |
|---|---|---|---|
| **GET** | `/auth/login/:provider` | Redirects the user to the OAuth provider (Google, GitHub, 42). | - |
| **GET** | `/auth/callback/:provider` | Handles the OAuth code/state. Sets `user_sessions` and returns token/user. | `code`, `state` (query params) |
| **GET** | `/auth/me` | Validates session token and returns current user info. | `Authorization: Bearer <token>` |
| **POST** | `/auth/mfa/verify` | Completes authentication if MFA is enabled. | `{ mfaToken: string, otp_code: string }` |
| **POST** | `/auth/logout` | Revokes the session in the `user_sessions` table. | - |

### 📄 Data Interfaces (Shared)

The backend responses MUST match the following interface (already implemented in the frontend):

```typescript
export interface User {
  id: string; // UUID
  email: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  is_active: boolean;
  mfa_enabled: boolean;
  status: 'online' | 'offline' | 'busy' | 'away';
}

export interface AuthResponse {
  token: string;
  user: User;
  requiresMfa: boolean;
}
```

### 🔐 2FA Protocol (Security Handshake)

When a primary authentication factor (Password/OAuth) succeeds but the user has `mfa_enabled = true`:

1.  **Backend Response**: `202 Accepted` or `206 Partial Content` with a partial payload:
    ```json
    {
      "requiresMfa": true,
      "mfaToken": "short_lived_temp_jwt_token",
      "user": { ...partial user info... }
    }
    ```
2.  **Frontend State**: The `AuthContext` will switch to `AWAITING_MFA` and show the OTP form.
3.  **Completion**: Upon receiving the 6-digit code, the frontend calls `POST /auth/mfa/verify`. If valid, the backend issues the permanent session token and updates `last_login_at` in the `users` table.

### 🛡️ Session Management
- **Persistence**: Store session hashes in the `user_sessions` table.
- **Expiry**: Tokens should respect the `expires_at` column.
- **Client Storage**: The frontend currently uses `localStorage` for the token, but it is ready to handle `HttpOnly` cookies if preferred by the backend team (ensure `withCredentials: true` is set in CORS if using cookies).
