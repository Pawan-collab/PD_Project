/**
 * API Configuration
 * Central configuration for all API calls
 */

// Get API base URL from environment or use default
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  // Contact endpoints
  CONTACT: {
    CREATE: '/contact/create',
    GET_ALL: '/contact',
    GET_BY_ID: (id: string) => `/contact/${id}`,
    GET_BY_EMAIL: (email: string) => `/contact/email/${email}`,
    GET_BY_NAME: (name: string) => `/contact/name/${name}`,
    GET_BY_PHONE: (phone: string) => `/contact/phone/${phone}`,
    GET_BY_COMPANY: (company: string) => `/contact/company/${company}`,
    GET_BY_JOB_TITLE: (jobTitle: string) => `/contact/job/${jobTitle}`,
    GET_BY_COUNTRY: (country: string) => `/contact/country/${country}`,
    GET_RECENT: '/contact/recent',
    GET_COUNT: '/contact/count',
    GET_STATS: '/contact/stats',
    SEARCH: '/contact/search',
    UPDATE: (id: string) => `/contact/${id}`,
    DELETE: (id: string) => `/contact/${id}`,
  },

  // Admin endpoints
  ADMIN: {
    LOGIN: '/admin/login',
    LOGOUT: '/admin/logout',
    PROFILE: '/admin/profile',
  },

  // Feedback endpoints
  FEEDBACK: {
    CREATE: '/feedback/create',
    GET_ALL: '/feedback',
    GET_RECENT: '/feedback/recent',
    GET_BY_ID: (id: string) => `/feedback/${id}`,
    GET_BY_NAME: (name: string) => `/feedback/name/${name}`,
    GET_BY_COMPANY: (company: string) => `/feedback/company/${company}`,
    GET_APPROVED: '/feedback/approved',
    UPDATE: (id: string) => `/feedback/${id}`,
    DELETE: (id: string) => `/feedback/${id}`,
    APPROVE: (id: string) => `/feedback/${id}/approve`,
  },
} as const;

/**
 * HTTP Methods
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

/**
 * Request configuration interface
 */
export interface RequestConfig {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: any;
  credentials?: RequestCredentials;
}

/**
 * API Response interface
 */
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  success?: boolean;
}
