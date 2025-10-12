/**
 * Contact Form Data Interface
 * Matches the frontend form structure
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  jobTitle: string;
  jobDetails: string;
}

/**
 * Contact API Payload Interface
 * Matches the backend API expectations
 */
export interface ContactApiPayload {
  name: string;
  email: string;
  phone: string;
  company_name: string;
  country: string;
  job_title: string;
  message: string;
}

/**
 * Contact Message Interface
 */
export interface ContactMessage {
  message: string;
  submitted_at: string;
  _id?: string;
}

/**
 * Contact Response Interface
 * Matches the backend response structure
 */
export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  country: string;
  job_title: string;
  messages: ContactMessage[];
  created_at: string;
  updatedAt?: string;
}

/**
 * Validation Error Interface
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * API Error Response Interface
 */
export interface ApiErrorResponse {
  error?: string;
  message?: string;
  errors?: ValidationError[];
}

/**
 * Contact Stats Interface
 */
export interface ContactStats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  byCountry?: Record<string, number>;
  byJobTitle?: Record<string, number>;
}

/**
 * Search Params Interface
 */
export interface ContactSearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}
