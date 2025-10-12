/**
 * API Configuration
 * Central configuration for all API calls
 */

// Get API base URL from environment or use default
// Default to backend's port 3001 if no environment variable is provided
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  // Contact endpoints
  CONTACT: {
    CREATE: "/contact/create",
    GET_ALL: "/contact",
    GET_BY_ID: (id: string) => `/contact/${id}`,
    GET_BY_EMAIL: (email: string) => `/contact/email/${email}`,
    GET_BY_NAME: (name: string) => `/contact/name/${name}`,
    GET_BY_PHONE: (phone: string) => `/contact/phone/${phone}`,
    GET_BY_COMPANY: (company: string) => `/contact/company/${company}`,
    GET_BY_JOB_TITLE: (jobTitle: string) => `/contact/job/${jobTitle}`,
    GET_BY_COUNTRY: (country: string) => `/contact/country/${country}`,
    GET_RECENT: "/contact/recent",
    GET_COUNT: "/contact/count",
    GET_STATS: "/contact/stats",
    SEARCH: "/contact/search",
    UPDATE: (id: string) => `/contact/${id}`,
    DELETE: (id: string) => `/contact/${id}`,
  },

  // Admin endpoints
  ADMIN: {
    LOGIN: "/admin/login",
    LOGOUT: "/admin/logout",
    PROFILE: "/admin/profile",
  },

  // Feedback endpoints
  FEEDBACK: {
    CREATE: "/feedback/create",
    GET_ALL: "/feedback",
    GET_RECENT: "/feedback/recent",
    GET_BY_ID: (id: string) => `/feedback/${id}`,
    GET_BY_NAME: (name: string) => `/feedback/name/${name}`,
    GET_BY_COMPANY: (company: string) => `/feedback/company/${company}`,
    GET_APPROVED: "/feedback/approved",
    UPDATE: (id: string) => `/feedback/${id}`,
    DELETE: (id: string) => `/feedback/${id}`,
    APPROVE: (id: string) => `/feedback/${id}/approve`,
  },

  // Post endpoints (legacy)
  POSTS: {
    CREATE: "/posts/create",
    GET_ALL: "/posts",
    GET_RECENT: "/posts/recent",
    GET_BY_ID: (id: string) => `/posts/${id}`,
    UPDATE: (id: string) => `/posts/${id}`,
    DELETE: (id: string) => `/posts/${id}`,
  },

  // Article endpoints (new)
  ARTICLES: {
    CREATE: "/articles/create",
    GET_ALL: "/articles",
    GET_PUBLISHED: "/articles/published",
    GET_FEATURED: "/articles/featured",
    GET_RECENT: "/articles/recent",
    GET_BY_ID: (id: string) => `/articles/${id}`,
    GET_BY_SLUG: (slug: string) => `/articles/slug/${slug}`,
    GET_BY_CATEGORY: (category: string) => `/articles/category/${category}`,
    UPDATE: (id: string) => `/articles/${id}`,
    DELETE: (id: string) => `/articles/${id}`,
    INCREMENT_VIEW: (id: string) => `/articles/${id}/view`,
    LIKE: (id: string) => `/articles/${id}/like`,
    UNLIKE: (id: string) => `/articles/${id}/unlike`,
    SEARCH: "/articles/search",
  },

  // Gallery endpoints
  GALLERY: {
    CREATE: "/gallery/create",
    GET_ALL: "/gallery",
    GET_RECENT: "/gallery/recent",
    GET_BY_ID: (id: string) => `/gallery/${id}`,
    UPDATE: (id: string) => `/gallery/${id}`,
    DELETE: (id: string) => `/gallery/${id}`,
  },
} as const;

/**
 * HTTP Methods
 */
export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
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
