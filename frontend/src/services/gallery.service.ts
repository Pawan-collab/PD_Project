/**
 * Gallery Service
 * Handles all gallery-related API calls
 */

import { apiService, ApiError } from './api.service';
import { API_ENDPOINTS } from './api.config';

/**
 * Gallery category enum matching backend
 */
export enum GalleryCategory {
  CONFERENCE = 'Conference',
  CLIENT_VISIT = 'Client_Visit',
  INTERNAL_EVENT = 'Internal_Event',
  DEMO = 'Demo',
  RECOGNITION = 'Recognition',
  PARTNERSHIP = 'Partnership',
  KEYNOTE = 'Keynote',
  MILESTONE = 'Milestone',
  OFFICE_LAUNCH = 'Office_Launch',
}

/**
 * Gallery interface matching backend model
 */
export interface Gallery {
  _id: string;
  title: string;
  category: GalleryCategory | string;
  content: string;
  media_type?: 'image' | 'video';
  image_filename: string;
  image_path: string;
  image_mime?: string;
  image_size?: number;
  date: Date | string;
  location?: string;
  published: boolean;
  featured: boolean;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Gallery form data interface
 */
export interface GalleryFormData {
  title: string;
  category: GalleryCategory | string;
  content: string;
  date: Date | string;
  location?: string;
  published?: boolean;
  featured?: boolean;
  media_type?: 'image' | 'video';
  imageUrl?: string;
}

/**
 * Gallery Service Class
 * Provides methods for gallery-related operations
 */
class GalleryService {
  /**
   * Create a new gallery item with image upload
   */
  async createGallery(formData: GalleryFormData): Promise<Gallery> {
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('content', formData.content);
      data.append('date', typeof formData.date === 'string' ? formData.date : formData.date.toISOString());

      if (formData.location) {
        data.append('location', formData.location);
      }

      if (formData.published !== undefined) {
        data.append('published', String(formData.published));
      }

      if (formData.featured !== undefined) {
        data.append('featured', String(formData.featured));
      }

      if (formData.media_type) {
        data.append('media_type', formData.media_type);
      }

      if (formData.imageUrl) {
        data.append('imageUrl', formData.imageUrl);
      }

      const response = await apiService.postFormData<{ gallery: Gallery }>(
        API_ENDPOINTS.GALLERY.CREATE,
        data
      );

      if (!response.data?.gallery) {
        throw new ApiError('No data received from server');
      }

      return response.data.gallery;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to create gallery item');
    }
  }

  /**
   * Get all galleries
   */
  async getAllGalleries(): Promise<Gallery[]> {
    try {
      const response = await apiService.get<{ galleries: Gallery[] }>(
        API_ENDPOINTS.GALLERY.GET_ALL
      );

      return response.data?.galleries || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch galleries');
    }
  }

  /**
   * Get recent galleries
   */
  async getRecentGalleries(limit?: number): Promise<Gallery[]> {
    try {
      const endpoint = limit
        ? `${API_ENDPOINTS.GALLERY.GET_RECENT}?limit=${limit}`
        : API_ENDPOINTS.GALLERY.GET_RECENT;

      const response = await apiService.get<{ galleries: Gallery[] }>(endpoint);

      return response.data?.galleries || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch recent galleries');
    }
  }

  /**
   * Get gallery by ID
   */
  async getGalleryById(id: string): Promise<Gallery> {
    try {
      const response = await apiService.get<{ gallery: Gallery }>(
        API_ENDPOINTS.GALLERY.GET_BY_ID(id)
      );

      if (!response.data?.gallery) {
        throw new ApiError('Gallery not found');
      }

      return response.data.gallery;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch gallery');
    }
  }

  /**
   * Update gallery
   */
  async updateGallery(id: string, formData: Partial<GalleryFormData>): Promise<Gallery> {
    try {
      const data = new FormData();

      if (formData.title) data.append('title', formData.title);
      if (formData.category) data.append('category', formData.category);
      if (formData.content) data.append('content', formData.content);
      if (formData.date) {
        data.append('date', typeof formData.date === 'string' ? formData.date : formData.date.toISOString());
      }
      if (formData.location) data.append('location', formData.location);
      if (formData.published !== undefined) data.append('published', String(formData.published));
      if (formData.featured !== undefined) data.append('featured', String(formData.featured));
      if (formData.media_type) data.append('media_type', formData.media_type);
      if (formData.imageUrl) data.append('imageUrl', formData.imageUrl);

      const response = await apiService.putFormData<{ gallery: Gallery }>(
        API_ENDPOINTS.GALLERY.UPDATE(id),
        data
      );

      if (!response.data?.gallery) {
        throw new ApiError('No data received from server');
      }

      return response.data.gallery;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to update gallery');
    }
  }

  /**
   * Delete gallery
   */
  async deleteGallery(id: string): Promise<void> {
    try {
      await apiService.delete(API_ENDPOINTS.GALLERY.DELETE(id));
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to delete gallery');
    }
  }

  /**
   * Get image URL
   */
  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';

    // If it's already a full URL (http:// or https://), return as-is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    // Otherwise, treat as local file path
    // Remove 'public/' prefix if it exists
    const cleanPath = imagePath.replace(/^public\//, '');
    return `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/${cleanPath}`;
  }
}

// Export singleton instance
export const galleryService = new GalleryService();

export default GalleryService;
