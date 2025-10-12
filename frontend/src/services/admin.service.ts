/**
 * Admin Service
 * Handles all admin authentication-related API calls
 */

import { apiService, ApiResponse } from './api.service';
import { API_ENDPOINTS } from './api.config';
import { LoginCredentials, LoginResponse, AdminProfileResponse } from '@/types/admin.types';

const TOKEN_KEY = 'authToken';
const TOKEN_EXPIRY_KEY = 'authTokenExpiry';
const REMEMBER_ME_KEY = 'rememberMe';

class AdminService {
  /**
   * Login admin user
   */
  async login(
    credentials: LoginCredentials,
    rememberMe: boolean = false
  ): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await apiService.post<LoginResponse>(
        API_ENDPOINTS.ADMIN.LOGIN,
        credentials
      );

      // Store token and related data if login successful
      if (response.data?.token) {
        this.setToken(response.data.token, rememberMe);

        // Store admin data for quick access
        if (response.data.admin) {
          localStorage.setItem('adminData', JSON.stringify(response.data.admin));
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout admin user
   */
  async logout(): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiService.get<{ message: string }>(
        API_ENDPOINTS.ADMIN.LOGOUT
      );

      // Clear all auth data
      this.clearAuthData();

      return response;
    } catch (error) {
      // Clear auth data even if API call fails
      this.clearAuthData();
      throw error;
    }
  }

  /**
   * Get admin profile
   */
  async getProfile(): Promise<ApiResponse<AdminProfileResponse>> {
    try {
      const response = await apiService.get<AdminProfileResponse>(
        API_ENDPOINTS.ADMIN.PROFILE
      );

      // Update cached admin data
      if (response.data?.admin) {
        localStorage.setItem('adminData', JSON.stringify(response.data.admin));
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Set authentication token with expiry
   */
  private setToken(token: string, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;

    // Store token
    storage.setItem(TOKEN_KEY, token);

    // Set expiry time (7 days for remember me, 1 day for regular)
    const expiryTime = Date.now() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000);
    storage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());

    // Store remember me preference
    localStorage.setItem(REMEMBER_ME_KEY, rememberMe.toString());

    // Also store in localStorage for API service access
    if (!rememberMe) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  /**
   * Check if user is authenticated and token is valid
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Check token expiry
    const expiry = this.getTokenExpiry();
    if (expiry && Date.now() > expiry) {
      this.clearAuthData();
      return false;
    }

    return true;
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    // Check both localStorage and sessionStorage
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  }

  /**
   * Get token expiry time
   */
  getTokenExpiry(): number | null {
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY) || sessionStorage.getItem(TOKEN_EXPIRY_KEY);
    return expiry ? parseInt(expiry, 10) : null;
  }

  /**
   * Get cached admin data
   */
  getCachedAdmin(): any {
    const data = localStorage.getItem('adminData');
    return data ? JSON.parse(data) : null;
  }

  /**
   * Check if remember me is enabled
   */
  isRememberMeEnabled(): boolean {
    return localStorage.getItem(REMEMBER_ME_KEY) === 'true';
  }

  /**
   * Get time until token expires (in milliseconds)
   */
  getTimeUntilExpiry(): number | null {
    const expiry = this.getTokenExpiry();
    if (!expiry) return null;
    return Math.max(0, expiry - Date.now());
  }

  /**
   * Clear all authentication data
   */
  private clearAuthData(): void {
    // Clear from both localStorage and sessionStorage
    [localStorage, sessionStorage].forEach(storage => {
      storage.removeItem(TOKEN_KEY);
      storage.removeItem(TOKEN_EXPIRY_KEY);
    });

    // Clear other auth-related data
    localStorage.removeItem('adminData');
    localStorage.removeItem(REMEMBER_ME_KEY);
  }
}

// Export singleton instance
export const adminService = new AdminService();
export default adminService;
