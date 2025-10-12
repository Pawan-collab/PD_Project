/**
 * Solution Service
 * Handles all solution-related API calls
 */

import { apiService, ApiError } from "./api.service";

export interface Solution {
  _id: string;
  icon:
    | "Brain"
    | "Zap"
    | "MessageSquare"
    | "Lightbulb"
    | "Cog"
    | "Shield"
    | "Globe"
    | "Users";
  title: string;
  description: string;
  features: string[];
  badge: "" | "Popular" | "Featured" | "New" | "Enterprise";
  color: "primary" | "secondary" | "accent";
  isActive: boolean;
  created_at: string;
  // optional front-end display-only field
  pricing?: string;
}

export interface SolutionFormData {
  icon: string;
  title: string;
  description: string;
  features?: string[];
  badge?: string;
  color?: string;
  isActive?: boolean;
}

class SolutionService {
  async getAllSolutions(): Promise<Solution[]> {
    try {
      const response = await apiService.get("/solutions");
      if (
        response.data &&
        typeof response.data === "object" &&
        "data" in response.data
      ) {
        const backendData = response.data as {
          success?: boolean;
          data?: Solution[];
        };
        return Array.isArray(backendData.data) ? backendData.data : [];
      }
      if (Array.isArray(response.data)) return response.data;
      return [];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Failed to fetch solutions");
    }
  }

  async getActiveSolutions(): Promise<Solution[]> {
    try {
      const response = await apiService.get("/solutions/active");
      if (
        response.data &&
        typeof response.data === "object" &&
        "data" in response.data
      ) {
        const backendData = response.data as {
          success?: boolean;
          data?: Solution[];
        };
        return Array.isArray(backendData.data) ? backendData.data : [];
      }
      if (Array.isArray(response.data)) return response.data;
      return [];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Failed to fetch active solutions");
    }
  }

  async createSolution(formData: SolutionFormData): Promise<Solution> {
    try {
      const response = await apiService.post("/solutions/create", formData);
      if (!response.data) throw new ApiError("No data received from server");
      return response.data as Solution;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Failed to create solution");
    }
  }

  async updateSolution(
    id: string,
    formData: Partial<SolutionFormData>
  ): Promise<Solution> {
    try {
      const response = await apiService.put(`/solutions/${id}`, formData);
      if (!response.data) throw new ApiError("No data received from server");
      return response.data as Solution;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Failed to update solution");
    }
  }

  async deleteSolution(id: string): Promise<void> {
    try {
      await apiService.delete(`/solutions/${id}`);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Failed to delete solution");
    }
  }

  async toggleSolutionVisibility(
    id: string,
    isActive: boolean
  ): Promise<Solution> {
    try {
      const response = await apiService.patch(`/solutions/${id}/visibility`, {
        isActive,
      });
      const backendData = response.data as {
        message?: string;
        updated?: Solution;
      } | null;
      if (backendData && backendData.updated) return backendData.updated;
      // fallback: check top-level response for updated
      const respUnknown = response as unknown as Record<string, unknown>;
      if (respUnknown && "updated" in respUnknown && respUnknown.updated) {
        return respUnknown.updated as Solution;
      }
      throw new ApiError("Failed to update visibility");
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Failed to toggle solution visibility");
    }
  }
}

export const solutionService = new SolutionService();
