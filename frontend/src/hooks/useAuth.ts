/**
 * Authentication Hook
 * Provides authentication state and methods throughout the app
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '@/services/admin.service';
import { Admin } from '@/types/admin.types';
import { useToast } from '@/hooks/use-toast';

interface UseAuthReturn {
  isAuthenticated: boolean;
  admin: Admin | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  getTimeUntilExpiry: () => number | null;
}

export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  /**
   * Check authentication status
   */
  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      // First check if token exists and is not expired
      if (!adminService.isAuthenticated()) {
        setIsAuthenticated(false);
        setAdmin(null);
        return false;
      }

      // Try to get cached admin data first
      const cachedAdmin = adminService.getCachedAdmin();
      if (cachedAdmin) {
        setAdmin(cachedAdmin);
        setIsAuthenticated(true);
        return true;
      }

      // Verify with backend if no cached data
      const response = await adminService.getProfile();
      if (response.success && response.data) {
        setAdmin(response.data.admin);
        setIsAuthenticated(true);
        return true;
      }

      setIsAuthenticated(false);
      setAdmin(null);
      return false;
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setAdmin(null);
      return false;
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    try {
      await adminService.logout();

      setIsAuthenticated(false);
      setAdmin(null);

      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });

      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);

      // Still clear local state even if API call fails
      setIsAuthenticated(false);
      setAdmin(null);
      navigate('/admin/login', { replace: true });
    }
  }, [navigate, toast]);

  /**
   * Get time until token expires
   */
  const getTimeUntilExpiry = useCallback((): number | null => {
    return adminService.getTimeUntilExpiry();
  }, []);

  /**
   * Initial auth check on mount
   */
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await checkAuth();
      setIsLoading(false);
    };

    initAuth();
  }, [checkAuth]);

  /**
   * Set up session expiry check
   */
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      const timeLeft = getTimeUntilExpiry();

      // If token expired, logout
      if (timeLeft !== null && timeLeft <= 0) {
        toast({
          title: 'Session Expired',
          description: 'Your session has expired. Please login again.',
          variant: 'destructive',
        });
        logout();
      }

      // Warn user 5 minutes before expiry
      if (timeLeft !== null && timeLeft <= 5 * 60 * 1000 && timeLeft > 4 * 60 * 1000) {
        toast({
          title: 'Session Expiring Soon',
          description: 'Your session will expire in 5 minutes. Please save your work.',
          variant: 'default',
        });
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isAuthenticated, getTimeUntilExpiry, logout, toast]);

  return {
    isAuthenticated,
    admin,
    isLoading,
    logout,
    checkAuth,
    getTimeUntilExpiry,
  };
};
