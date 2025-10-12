/**
 * Admin Type Definitions
 */

export interface Admin {
  _id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at?: string;
}

export interface LoginCredentials {
  email?: string;
  username?: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  admin: Admin;
  message?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  admin: Admin | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface AdminProfileResponse {
  admin: Admin;
}
