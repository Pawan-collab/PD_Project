/**
 * Admin Login Hook
 * Handles admin login form logic with validation and API integration
 */

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminLoginSchema, AdminLoginFormData } from '@/schemas/admin.schema';
import { adminService } from '@/services/admin.service';
import { ApiError } from '@/services/api.service';
import { useToast } from '@/hooks/use-toast';

export const useAdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      identifier: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: AdminLoginFormData) => {
    setIsLoading(true);

    try {
      // Determine if identifier is email or username
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.identifier);

      const credentials = {
        password: data.password,
        ...(isEmail ? { email: data.identifier } : { username: data.identifier }),
      };

      const response = await adminService.login(credentials, data.rememberMe || false);

      if (response.success && response.data) {
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${response.data.admin.username}!`,
          variant: 'default',
        });

        // Get the redirect path from location state or default to dashboard
        const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

        // Redirect to intended page or dashboard
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 500);
      }
    } catch (error) {
      console.error('Login error:', error);

      let errorMessage = 'An unexpected error occurred. Please try again.';
      let errorTitle = 'Login Failed';

      if (error instanceof ApiError) {
        if (error.statusCode === 401) {
          errorTitle = 'Authentication Failed';
          errorMessage = 'Invalid credentials. Please check your email/username and password.';
        } else if (error.statusCode === 422) {
          errorTitle = 'Validation Error';
          errorMessage = error.errors?.[0]?.msg || error.message;
        } else if (error.statusCode === 429) {
          errorTitle = 'Too Many Attempts';
          errorMessage = 'Too many login attempts. Please try again later.';
        } else if (error.statusCode === 0) {
          errorTitle = 'Network Error';
          errorMessage = 'Unable to connect to server. Please check your internet connection.';
        } else {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
