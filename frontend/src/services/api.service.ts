/**
 * Base API Service
 * Reusable service for making HTTP requests
 */

import { API_BASE_URL, HttpMethod, RequestConfig, ApiResponse } from './api.config';

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errors?: any[]
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Base API Service Class
 * Provides reusable methods for making API calls
 */
class BaseApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Build full URL from endpoint
   */
  private buildUrl(endpoint: string): string {
    return `${this.baseURL}${endpoint}`;
  }

  /**
   * Build request headers
   */
  private buildHeaders(customHeaders?: HeadersInit): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    // Add auth token if available (for future use)
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    let data;
    if (isJson) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMessage = data?.error || data?.message || `HTTP ${response.status}: ${response.statusText}`;
      const errors = data?.errors || [];

      // Handle 401 Unauthorized - clear auth and redirect to login
      if (response.status === 401) {
        // Clear authentication data
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTokenExpiry');
        localStorage.removeItem('adminData');
        localStorage.removeItem('rememberMe');
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('authTokenExpiry');

        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/admin/login')) {
          window.location.href = '/admin/login';
        }
      }

      throw new ApiError(errorMessage, response.status, errors);
    }

    return {
      data,
      success: true,
      message: data?.message,
    };
  }

  /**
   * Make HTTP request
   */
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = HttpMethod.GET,
      headers: customHeaders,
      body,
      credentials = 'include',
    } = config;

    try {
      const url = this.buildUrl(endpoint);
      const headers = this.buildHeaders(customHeaders);

      const requestOptions: RequestInit = {
        method,
        headers,
        credentials,
      };

      if (body && method !== HttpMethod.GET) {
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url, requestOptions);
      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle network errors
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error occurred',
        0
      );
    }
  }

  /**
   * GET request
   */
  public async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: HttpMethod.GET });
  }

  /**
   * POST request
   */
  public async post<T>(endpoint: string, body?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: HttpMethod.POST, body });
  }

  /**
   * PUT request
   */
  public async put<T>(endpoint: string, body?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: HttpMethod.PUT, body });
  }

  /**
   * DELETE request
   */
  public async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: HttpMethod.DELETE });
  }

  /**
   * PATCH request
   */
  public async patch<T>(endpoint: string, body?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: HttpMethod.PATCH, body });
  }

  /**
   * POST request with FormData (for file uploads)
   */
  public async postFormData<T>(endpoint: string, formData: FormData, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint);
      const headers: HeadersInit = {};

      // Add auth token if available
      const token = localStorage.getItem('authToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Don't set Content-Type header - browser will set it with boundary for multipart/form-data

      const requestOptions: RequestInit = {
        method: HttpMethod.POST,
        headers,
        credentials: 'include',
        body: formData,
      };

      const response = await fetch(url, requestOptions);
      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error occurred',
        0
      );
    }
  }

  /**
   * PUT request with FormData (for file uploads)
   */
  public async putFormData<T>(endpoint: string, formData: FormData, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint);
      const headers: HeadersInit = {};

      // Add auth token if available
      const token = localStorage.getItem('authToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Don't set Content-Type header - browser will set it with boundary for multipart/form-data

      const requestOptions: RequestInit = {
        method: HttpMethod.PUT,
        headers,
        credentials: 'include',
        body: formData,
      };

      const response = await fetch(url, requestOptions);
      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error occurred',
        0
      );
    }
  }
}

// Export singleton instance
export const apiService = new BaseApiService();

export default BaseApiService;
