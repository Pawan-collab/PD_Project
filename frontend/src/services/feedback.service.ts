/**
 * Feedback Service
 * Handles all feedback-related API calls
 */

import { apiService, ApiError } from './api.service';
import { API_ENDPOINTS } from './api.config';

/**
 * Feedback interface matching backend model
 */
export interface Feedback {
  _id: string;
  name: string;
  company_name: string;
  job_title: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  submitted_at: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Feedback form data interface
 */
export interface FeedbackFormData {
  name: string;
  company_name: string;
  job_title: string;
  rating: number;
  comment: string;
}

/**
 * Feedback Service Class
 * Provides methods for feedback-related operations
 */
class FeedbackService {
  /**
   * Create a new feedback submission
   */
  async createFeedback(formData: FeedbackFormData): Promise<Feedback> {
    try {
      const response = await apiService.post<{ feedback: Feedback }>(
        API_ENDPOINTS.FEEDBACK.CREATE,
        formData
      );

      if (!response.data?.feedback) {
        throw new ApiError('No data received from server');
      }

      return response.data.feedback;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to submit feedback');
    }
  }

  /**
   * Get all feedbacks (Admin only)
   */
  async getAllFeedbacks(): Promise<Feedback[]> {
    try {
      const response = await apiService.get<{ feedbacks: Feedback[] }>(
        API_ENDPOINTS.FEEDBACK.GET_ALL
      );

      return response.data?.feedbacks || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch feedbacks');
    }
  }

  /**
   * Get approved feedbacks (Public)
   */
  async getApprovedFeedbacks(): Promise<Feedback[]> {
    try {
      const response = await apiService.get<{ feedbacks: Feedback[] }>(
        API_ENDPOINTS.FEEDBACK.GET_APPROVED
      );

      return response.data?.feedbacks || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch approved feedbacks');
    }
  }

  /**
   * Get recent feedbacks
   */
  async getRecentFeedbacks(limit?: number): Promise<Feedback[]> {
    try {
      const endpoint = limit
        ? `${API_ENDPOINTS.FEEDBACK.GET_RECENT}?limit=${limit}`
        : API_ENDPOINTS.FEEDBACK.GET_RECENT;

      const response = await apiService.get<{ feedbacks: Feedback[] }>(endpoint);

      return response.data?.feedbacks || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch recent feedbacks');
    }
  }

  /**
   * Get feedback by ID
   */
  async getFeedbackById(id: string): Promise<Feedback> {
    try {
      const response = await apiService.get<{ feedback: Feedback }>(
        API_ENDPOINTS.FEEDBACK.GET_BY_ID(id)
      );

      if (!response.data?.feedback) {
        throw new ApiError('Feedback not found');
      }

      return response.data.feedback;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch feedback');
    }
  }

  /**
   * Get feedbacks by name
   */
  async getFeedbacksByName(name: string): Promise<Feedback[]> {
    try {
      const response = await apiService.get<{ feedbacks: Feedback[] }>(
        API_ENDPOINTS.FEEDBACK.GET_BY_NAME(name)
      );

      return response.data?.feedbacks || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch feedbacks by name');
    }
  }

  /**
   * Get feedbacks by company
   */
  async getFeedbacksByCompany(company: string): Promise<Feedback[]> {
    try {
      const response = await apiService.get<{ feedbacks: Feedback[] }>(
        API_ENDPOINTS.FEEDBACK.GET_BY_COMPANY(company)
      );

      return response.data?.feedbacks || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch feedbacks by company');
    }
  }

  /**
   * Update feedback (Admin only)
   */
  async updateFeedback(id: string, data: Partial<FeedbackFormData>): Promise<Feedback> {
    try {
      const response = await apiService.put<{ feedback: Feedback }>(
        API_ENDPOINTS.FEEDBACK.UPDATE(id),
        data
      );

      if (!response.data?.feedback) {
        throw new ApiError('No data received from server');
      }

      return response.data.feedback;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to update feedback');
    }
  }

  /**
   * Delete feedback (Admin only)
   */
  async deleteFeedback(id: string): Promise<void> {
    try {
      await apiService.delete(API_ENDPOINTS.FEEDBACK.DELETE(id));
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to delete feedback');
    }
  }

  /**
   * Toggle feedback approval status (Admin only)
   */
  async toggleFeedbackApproval(id: string, isApproved: boolean): Promise<Feedback> {
    try {
      const response = await apiService.patch<{ updated: Feedback }>(
        API_ENDPOINTS.FEEDBACK.APPROVE(id),
        { is_approved: isApproved }
      );

      if (!response.data?.updated) {
        throw new ApiError('No data received from server');
      }

      return response.data.updated;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to update feedback approval status');
    }
  }
}

// Export singleton instance
export const feedbackService = new FeedbackService();

export default FeedbackService;
