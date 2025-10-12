# Admin Authentication System Documentation

## Overview

This document describes the complete admin authentication system implementation for the application. The system includes login, protected routes, session management, and token expiration handling.

## Architecture

### Core Components

1. **AdminLogin Page** - [frontend/src/pages/AdminLogin.tsx](src/pages/AdminLogin.tsx)
   - Beautiful, responsive login UI
   - Email or username support
   - Password visibility toggle
   - Remember me functionality
   - Real-time validation with error messages
   - Loading states and animations

2. **ProtectedRoute Component** - [frontend/src/components/ProtectedRoute.tsx](src/components/ProtectedRoute.tsx)
   - Protects admin routes from unauthorized access
   - Verifies token validity before allowing access
   - Redirects to login with return URL
   - Shows loading state during verification

3. **Admin Service** - [frontend/src/services/admin.service.ts](src/services/admin.service.ts)
   - Handles all authentication API calls
   - Token management (localStorage & sessionStorage)
   - Token expiry tracking
   - Admin profile caching

4. **Validation Schema** - [frontend/src/schemas/admin.schema.ts](src/schemas/admin.schema.ts)
   - Zod-based validation
   - Email and username format validation
   - Password strength requirements
   - Remember me option

5. **Custom Hooks**
   - `useAdminLogin` - [frontend/src/hooks/useAdminLogin.ts](src/hooks/useAdminLogin.ts) - Login form logic
   - `useAuth` - [frontend/src/hooks/useAuth.ts](src/hooks/useAuth.ts) - Global auth state management

6. **Auth Context** - [frontend/src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx)
   - Provides authentication state globally
   - Session timeout warnings
   - Automatic logout on token expiry

## Features

### 1. Login System

**Email or Username Login**
- Users can login with either email or username
- Automatic detection of input type
- Validation ensures proper format

**Password Security**
- Minimum 6 characters
- Maximum 100 characters
- Toggle visibility feature
- Protected from whitespace-only entries

**Remember Me**
- Session duration: 1 day (default)
- Remember me duration: 7 days
- Uses localStorage for persistent sessions
- Uses sessionStorage for temporary sessions

### 2. Token Management

**Token Storage**
```typescript
// Remember Me enabled: localStorage
// Remember Me disabled: sessionStorage + localStorage (for API access)
```

**Token Expiry**
- Automatic expiry checking
- Expires after 1 day (normal) or 7 days (remember me)
- Session timeout warnings 5 minutes before expiry
- Automatic logout on expiry

**Token Verification**
- Client-side expiry check
- Server-side verification on protected routes
- Automatic token cleanup on logout

### 3. Protected Routes

**Usage:**
```tsx
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

**Features:**
- Automatic authentication verification
- Beautiful loading state
- Redirect to login with return URL
- Re-verification on route changes

### 4. Error Handling

**Comprehensive Error Messages:**
- 401: Invalid credentials
- 422: Validation errors
- 429: Too many login attempts
- 0: Network errors
- Generic fallback for unknown errors

### 5. Session Management

**Automatic Session Monitoring:**
- Checks every minute for token expiry
- Warning 5 minutes before expiry
- Automatic logout on expiry
- Toast notifications for all session events

## API Integration

### Endpoints

```typescript
ADMIN: {
  LOGIN: '/admin/login',
  LOGOUT: '/admin/logout',
  PROFILE: '/admin/profile',
}
```

### Request/Response Format

**Login Request:**
```typescript
{
  email?: string;        // OR username
  username?: string;     // OR email
  password: string;
}
```

**Login Response:**
```typescript
{
  success: true,
  data: {
    token: string;
    admin: {
      _id: string;
      username: string;
      email: string;
      created_at: string;
    };
    message?: string;
  }
}
```

**Profile Response:**
```typescript
{
  success: true,
  data: {
    admin: {
      _id: string;
      username: string;
      email: string;
      created_at: string;
    }
  }
}
```

## Security Features

### 1. Input Validation
- Client-side validation with Zod
- Server-side validation expected
- Alphanumeric username enforcement
- Email format validation
- Password length constraints

### 2. Token Security
- Bearer token authentication
- HTTP-only cookies recommended (backend)
- Automatic token expiry
- Secure token storage

### 3. CSRF Protection
- Credentials: 'include' in all requests
- SameSite cookie policy recommended (backend)

### 4. Rate Limiting
- Frontend ready for 429 responses
- Error handling for too many attempts
- User-friendly error messages

## Usage Examples

### Basic Login Flow

```typescript
// 1. User visits /admin/dashboard
// 2. ProtectedRoute checks authentication
// 3. User redirected to /admin/login with return URL
// 4. User enters credentials and submits
// 5. Token stored based on "Remember Me"
// 6. User redirected back to /admin/dashboard
```

### Using Auth Context

```tsx
import { useAuthContext } from '@/contexts/AuthContext';

function AdminDashboard() {
  const { admin, logout, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div>
      <h1>Welcome, {admin?.username}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Using Admin Service Directly

```typescript
import { adminService } from '@/services/admin.service';

// Check authentication
const isAuth = adminService.isAuthenticated();

// Get cached admin data
const admin = adminService.getCachedAdmin();

// Get time until expiry
const timeLeft = adminService.getTimeUntilExpiry();

// Logout
await adminService.logout();
```

## Testing Checklist

- [ ] Login with valid email
- [ ] Login with valid username
- [ ] Login with invalid credentials
- [ ] Password visibility toggle
- [ ] Remember me checkbox
- [ ] Form validation errors
- [ ] Protected route access without auth
- [ ] Protected route access with auth
- [ ] Token expiry handling
- [ ] Logout functionality
- [ ] Return URL after login
- [ ] Session timeout warning
- [ ] Network error handling
- [ ] Loading states

## Environment Configuration

```env
# .env file
VITE_API_BASE_URL=http://localhost:5000
```

## Future Enhancements

1. **Two-Factor Authentication (2FA)**
   - TOTP support
   - SMS verification
   - Backup codes

2. **Password Reset**
   - Forgot password flow
   - Email verification
   - Secure token generation

3. **Session Management**
   - Multiple device login tracking
   - Active session list
   - Remote logout capability

4. **Audit Logging**
   - Login attempt tracking
   - Failed login notifications
   - Suspicious activity alerts

5. **OAuth Integration**
   - Google OAuth
   - GitHub OAuth
   - Azure AD integration

## Troubleshooting

### Common Issues

**Issue: Token not persisting**
- Check if "Remember Me" is checked
- Verify localStorage/sessionStorage in DevTools
- Check for browser privacy settings

**Issue: Redirected to login immediately**
- Token may be expired
- Check token expiry in localStorage
- Verify backend is returning valid tokens

**Issue: Protected routes not working**
- Ensure ProtectedRoute wrapper is used
- Check route configuration in App.tsx
- Verify token in Authorization header

**Issue: Session timeout not working**
- Check if useAuth hook is mounted
- Verify interval is running (DevTools)
- Check token expiry calculation

## Best Practices

1. **Never store sensitive data in localStorage**
   - Only store token and non-sensitive user data
   - Use httpOnly cookies for maximum security (backend)

2. **Always validate on both client and server**
   - Client validation for UX
   - Server validation for security

3. **Use HTTPS in production**
   - Prevents token interception
   - Protects user credentials

4. **Implement rate limiting**
   - Prevent brute force attacks
   - Use exponential backoff

5. **Monitor failed login attempts**
   - Alert on suspicious activity
   - Temporary account lockout

## Support

For issues or questions about the authentication system:
1. Check this documentation
2. Review the source code comments
3. Check browser console for errors
4. Verify API responses in Network tab
5. Contact the development team
