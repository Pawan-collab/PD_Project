/**
 * Contact Service
 * Handles all contact-related API calls
 */

import { apiService, ApiError } from './api.service';
import { API_ENDPOINTS } from './api.config';
import type {
  ContactFormData,
  ContactApiPayload,
  Contact,
  ContactStats,
  ContactSearchParams,
} from '../types/contact.types';

/**
 * Transform form data to API payload
 * Maps frontend field names to backend field names
 */
export const transformFormToApiPayload = (formData: ContactFormData): ContactApiPayload => {
  return {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company_name: formData.company,
    country: formData.country,
    job_title: formData.jobTitle,
    message: formData.jobDetails,
  };
};

/**
 * Transform API response to frontend format
 * Maps backend field names to frontend field names
 */
export const transformApiToFormData = (contact: Contact): ContactFormData => {
  return {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    company: contact.company_name,
    country: contact.country,
    jobTitle: contact.job_title,
    jobDetails: contact.message,
  };
};

/**
 * Contact Service Class
 * Provides methods for contact-related operations
 */
class ContactService {
  /**
   * Create a new contact submission
   */
  async createContact(formData: ContactFormData): Promise<Contact> {
    try {
      const payload = transformFormToApiPayload(formData);
      const response = await apiService.post<Contact>(
        API_ENDPOINTS.CONTACT.CREATE,
        payload
      );

      if (!response.data) {
        throw new ApiError('No data received from server');
      }

      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to submit contact form');
    }
  }

  /**
   * Get all contacts (Admin only)
   */
  async getAllContacts(): Promise<Contact[]> {
    try {
      const response = await apiService.get<Contact[]>(
        API_ENDPOINTS.CONTACT.GET_ALL
      );

      return response.data || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch contacts');
    }
  }

  /**
   * Get contact by ID
   */
  async getContactById(id: string): Promise<Contact> {
    try {
      const response = await apiService.get<Contact>(
        API_ENDPOINTS.CONTACT.GET_BY_ID(id)
      );

      if (!response.data) {
        throw new ApiError('Contact not found');
      }

      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch contact');
    }
  }

  /**
   * Get contact by email
   */
  async getContactByEmail(email: string): Promise<Contact[]> {
    try {
      const response = await apiService.get<Contact[]>(
        API_ENDPOINTS.CONTACT.GET_BY_EMAIL(email)
      );

      return response.data || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch contact by email');
    }
  }

  /**
   * Get contacts by name
   */
  async getContactsByName(name: string): Promise<Contact[]> {
    try {
      const response = await apiService.get<Contact[]>(
        API_ENDPOINTS.CONTACT.GET_BY_NAME(name)
      );

      return response.data || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch contacts by name');
    }
  }

  /**
   * Get contacts by phone
   */
  async getContactsByPhone(phone: string): Promise<Contact[]> {
    try {
      const response = await apiService.get<Contact[]>(
        API_ENDPOINTS.CONTACT.GET_BY_PHONE(phone)
      );

      return response.data || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch contacts by phone');
    }
  }

  /**
   * Get contacts by company
   */
  async getContactsByCompany(company: string): Promise<Contact[]> {
    try {
      const response = await apiService.get<Contact[]>(
        API_ENDPOINTS.CONTACT.GET_BY_COMPANY(company)
      );

      return response.data || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch contacts by company');
    }
  }

  /**
   * Get contacts by job title
   */
  async getContactsByJobTitle(jobTitle: string): Promise<Contact[]> {
    try {
      const response = await apiService.get<Contact[]>(
        API_ENDPOINTS.CONTACT.GET_BY_JOB_TITLE(jobTitle)
      );

      return response.data || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch contacts by job title');
    }
  }

  /**
   * Get contacts by country
   */
  async getContactsByCountry(country: string): Promise<Contact[]> {
    try {
      const response = await apiService.get<Contact[]>(
        API_ENDPOINTS.CONTACT.GET_BY_COUNTRY(country)
      );

      return response.data || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch contacts by country');
    }
  }

  /**
   * Get recent contacts
   */
  async getRecentContacts(): Promise<Contact[]> {
    try {
      const response = await apiService.get<Contact[]>(
        API_ENDPOINTS.CONTACT.GET_RECENT
      );

      return response.data || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch recent contacts');
    }
  }

  /**
   * Get contact count
   */
  async getContactCount(): Promise<number> {
    try {
      const response = await apiService.get<{ count: number }>(
        API_ENDPOINTS.CONTACT.GET_COUNT
      );

      return response.data?.count || 0;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch contact count');
    }
  }

  /**
   * Get contact statistics
   */
  async getContactStats(): Promise<ContactStats> {
    try {
      const response = await apiService.get<ContactStats>(
        API_ENDPOINTS.CONTACT.GET_STATS
      );

      return response.data || { total: 0, today: 0, thisWeek: 0, thisMonth: 0 };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch contact statistics');
    }
  }

  /**
   * Search contacts
   */
  async searchContacts(params: ContactSearchParams): Promise<Contact[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params.query) queryParams.append('query', params.query);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.order) queryParams.append('order', params.order);

      const endpoint = `${API_ENDPOINTS.CONTACT.SEARCH}?${queryParams.toString()}`;
      const response = await apiService.get<Contact[]>(endpoint);

      return response.data || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to search contacts');
    }
  }

  /**
   * Update contact (Admin only)
   */
  async updateContact(id: string, formData: Partial<ContactFormData>): Promise<Contact> {
    try {
      const payload = formData ? {
        ...(formData.name && { name: formData.name }),
        ...(formData.email && { email: formData.email }),
        ...(formData.phone && { phone: formData.phone }),
        ...(formData.company && { company_name: formData.company }),
        ...(formData.country && { country: formData.country }),
        ...(formData.jobTitle && { job_title: formData.jobTitle }),
        ...(formData.jobDetails && { message: formData.jobDetails }),
      } : {};

      const response = await apiService.put<Contact>(
        API_ENDPOINTS.CONTACT.UPDATE(id),
        payload
      );

      if (!response.data) {
        throw new ApiError('No data received from server');
      }

      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to update contact');
    }
  }

  /**
   * Delete contact (Admin only)
   */
  async deleteContact(id: string): Promise<void> {
    try {
      await apiService.delete(API_ENDPOINTS.CONTACT.DELETE(id));
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to delete contact');
    }
  }
}

// Export singleton instance
export const contactService = new ContactService();

export default ContactService;
