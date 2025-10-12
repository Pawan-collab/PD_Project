/**
 * Article Service
 * Handles all article-related API calls
 */

import { apiService, ApiError } from './api.service';
import { API_ENDPOINTS } from './api.config';

/**
 * Article category enum matching backend
 */
export enum ArticleCategory {
  INDUSTRY_INSIGHTS = 'Industry Insights',
  TECHNICAL_GUIDE = 'Technical Guide',
  BUSINESS_STRATEGY = 'Business Strategy',
  AI_ETHICS = 'AI Ethics',
  WORKPLACE_INNOVATION = 'Workplace Innovation',
  HEALTHCARE_AI = 'Healthcare AI',
  LEADERSHIP = 'Leadership',
}

/**
 * Article status enum
 */
export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

/**
 * Article interface matching backend model
 */
export interface Article {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: ArticleCategory;
  tags: string[];
  author_name: string;
  author_id?: string;
  status: ArticleStatus;
  is_featured: boolean;
  featured_badge_text: string;
  published_at?: Date;
  read_time_minutes: number;
  word_count: number;
  views: number;
  likes: number;
  time_spent_seconds: number;
  engaged_sessions: number;
  last_engaged_at?: Date;
  seo_title?: string;
  seo_description?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Article form data interface
 */
export interface ArticleFormData {
  title: string;
  summary: string;
  content: string;
  category: ArticleCategory | string;
  tags?: string[];
  author_name: string;
  status?: ArticleStatus;
  is_featured?: boolean;
  featured_badge_text?: string;
  seo_title?: string;
  seo_description?: string;
}

/**
 * Article Service Class
 * Provides methods for article-related operations
 */
class ArticleService {
  /**
   * Create a new article
   */
  async createArticle(formData: ArticleFormData): Promise<Article> {
    try {
      const response = await apiService.post<{ article: Article }>(
        API_ENDPOINTS.ARTICLES.CREATE,
        formData
      );

      if (!response.data?.article) {
        throw new ApiError('No data received from server');
      }

      return response.data.article;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to create article');
    }
  }

  /**
   * Get all articles (admin)
   */
  async getAllArticles(): Promise<Article[]> {
    try {
      const response = await apiService.get<{ articles: Article[] }>(
        API_ENDPOINTS.ARTICLES.GET_ALL
      );

      return response.data?.articles || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch articles');
    }
  }

  /**
   * Get published articles (public)
   */
  async getPublishedArticles(): Promise<Article[]> {
    try {
      const response = await apiService.get<{ articles: Article[] }>(
        API_ENDPOINTS.ARTICLES.GET_PUBLISHED
      );

      return response.data?.articles || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch published articles');
    }
  }

  /**
   * Get featured articles
   */
  async getFeaturedArticles(): Promise<Article[]> {
    try {
      const response = await apiService.get<{ articles: Article[] }>(
        API_ENDPOINTS.ARTICLES.GET_FEATURED
      );

      return response.data?.articles || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch featured articles');
    }
  }

  /**
   * Get recent articles
   */
  async getRecentArticles(limit?: number): Promise<Article[]> {
    try {
      const endpoint = limit
        ? `${API_ENDPOINTS.ARTICLES.GET_RECENT}?limit=${limit}`
        : API_ENDPOINTS.ARTICLES.GET_RECENT;

      const response = await apiService.get<{ articles: Article[] }>(endpoint);

      return response.data?.articles || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch recent articles');
    }
  }

  /**
   * Get articles by category
   */
  async getArticlesByCategory(category: string): Promise<Article[]> {
    try {
      const response = await apiService.get<{ articles: Article[] }>(
        API_ENDPOINTS.ARTICLES.GET_BY_CATEGORY(category)
      );

      return response.data?.articles || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch articles by category');
    }
  }

  /**
   * Get article by ID
   */
  async getArticleById(id: string): Promise<Article> {
    try {
      const response = await apiService.get<{ article: Article }>(
        API_ENDPOINTS.ARTICLES.GET_BY_ID(id)
      );

      if (!response.data?.article) {
        throw new ApiError('Article not found');
      }

      return response.data.article;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch article');
    }
  }

  /**
   * Get article by slug
   */
  async getArticleBySlug(slug: string): Promise<Article> {
    try {
      const response = await apiService.get<{ article: Article }>(
        API_ENDPOINTS.ARTICLES.GET_BY_SLUG(slug)
      );

      if (!response.data?.article) {
        throw new ApiError('Article not found');
      }

      return response.data.article;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch article');
    }
  }

  /**
   * Update article
   */
  async updateArticle(id: string, data: Partial<ArticleFormData>): Promise<Article> {
    try {
      const response = await apiService.put<{ article: Article }>(
        API_ENDPOINTS.ARTICLES.UPDATE(id),
        data
      );

      if (!response.data?.article) {
        throw new ApiError('No data received from server');
      }

      return response.data.article;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to update article');
    }
  }

  /**
   * Delete article
   */
  async deleteArticle(id: string): Promise<void> {
    try {
      await apiService.delete(API_ENDPOINTS.ARTICLES.DELETE(id));
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to delete article');
    }
  }

  /**
   * Increment article views
   */
  async incrementView(id: string): Promise<Article> {
    try {
      const response = await apiService.post<{ article: Article }>(
        API_ENDPOINTS.ARTICLES.INCREMENT_VIEW(id)
      );

      if (!response.data?.article) {
        throw new ApiError('No data received from server');
      }

      return response.data.article;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to increment view');
    }
  }

  /**
   * Like article
   */
  async likeArticle(id: string): Promise<Article> {
    try {
      const response = await apiService.post<{ article: Article }>(
        API_ENDPOINTS.ARTICLES.LIKE(id)
      );

      if (!response.data?.article) {
        throw new ApiError('No data received from server');
      }

      return response.data.article;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to like article');
    }
  }

  /**
   * Unlike article
   */
  async unlikeArticle(id: string): Promise<Article> {
    try {
      const response = await apiService.post<{ article: Article }>(
        API_ENDPOINTS.ARTICLES.UNLIKE(id)
      );

      if (!response.data?.article) {
        throw new ApiError('No data received from server');
      }

      return response.data.article;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to unlike article');
    }
  }

  /**
   * Search articles
   */
  async searchArticles(query: string): Promise<Article[]> {
    try {
      const response = await apiService.get<{ articles: Article[] }>(
        `${API_ENDPOINTS.ARTICLES.SEARCH}?q=${encodeURIComponent(query)}`
      );

      return response.data?.articles || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to search articles');
    }
  }
}

// Export singleton instance
export const articleService = new ArticleService();

export default ArticleService;
