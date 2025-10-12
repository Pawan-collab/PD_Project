/**
 * Project Service
 * Handles all project-related API calls
 */

import { apiService, ApiError } from "./api.service";

export interface Project {
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
  company_name: string;
  title: string;
  description: string;
  duration: string;
  team_size: string;
  key_results: string[];
  technologies_used: string[];
  badge: "" | "Popular" | "Featured" | "New" | "Enterprise";
  color: "primary" | "secondary" | "accent";
  process: "Completed" | "Ongoing";
  date: string[];
  isActive: boolean;
  created_at: string;
}

export interface ProjectFormData {
  icon: string;
  company_name: string;
  title: string;
  description: string;
  duration: string;
  team_size: string;
  key_results: string[];
  technologies_used: string[];
  badge?: string;
  color: string;
  process: string;
  date?: string[];
  isActive?: boolean;
}

class ProjectService {
  /**
   * Get all projects
   */
  async getAllProjects(): Promise<Project[]> {
    try {
      const response = await apiService.get("/projects");

      // Backend returns { sucess: true, data: [] } (note the typo "sucess")
      // apiService.get wraps it as { data: { sucess: true, data: [] } }
      if (response.data && typeof response.data === 'object' && 'data' in response.data) {
        const backendData = response.data as { sucess?: boolean; data?: Project[] };
        return Array.isArray(backendData.data) ? backendData.data : [];
      }

      // Fallback to direct array if response.data is already an array
      if (Array.isArray(response.data)) {
        return response.data;
      }

      return [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Failed to fetch projects");
    }
  }

  /**
   * Get active projects only
   */
  async getActiveProjects(): Promise<Project[]> {
    try {
      const response = await apiService.get("/projects/active");

      // Backend returns { sucess: true, data: [] } (note the typo "sucess")
      // apiService.get wraps it as { data: { sucess: true, data: [] } }
      if (response.data && typeof response.data === 'object' && 'data' in response.data) {
        const backendData = response.data as { sucess?: boolean; data?: Project[] };
        return Array.isArray(backendData.data) ? backendData.data : [];
      }

      // Fallback to direct array if response.data is already an array
      if (Array.isArray(response.data)) {
        return response.data;
      }

      return [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Failed to fetch active projects");
    }
  }

  /**
   * Get project by ID
   */
  async getProjectById(id: string): Promise<Project> {
    try {
      const response = await apiService.get<{
        success: boolean;
        data: Project;
      }>(`/projects/${id}`);
      if (!response.data) {
        throw new ApiError("Project not found");
      }
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Failed to fetch project");
    }
  }

  /**
   * Create a new project
   */
  async createProject(formData: ProjectFormData): Promise<Project> {
    try {
      const response = await apiService.post<{
        success: boolean;
        data: Project;
      }>("/projects/create", formData);

      if (!response.data) {
        throw new ApiError("No data received from server");
      }

      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Failed to create project");
    }
  }

  /**
   * Update an existing project
   */
  async updateProject(
    id: string,
    formData: Partial<ProjectFormData>
  ): Promise<Project> {
    try {
      const response = await apiService.put<{
        success: boolean;
        data: Project;
      }>(`/projects/${id}`, formData);

      if (!response.data) {
        throw new ApiError("No data received from server");
      }

      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Failed to update project");
    }
  }

  /**
   * Delete a project
   */
  async deleteProject(id: string): Promise<void> {
    try {
      await apiService.delete(`/projects/${id}`);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Failed to delete project");
    }
  }

  /**
   * Toggle project visibility
   */
  async toggleProjectVisibility(
    id: string,
    isActive: boolean
  ): Promise<Project> {
    try {
      const response = await apiService.patch<{ message: string; updated: Project }>(
        `/projects/${id}/visibility`,
        { isActive }
      );

      // Backend returns { message: "...", updated: {...} }
      // apiService.patch wraps it as { data: { message: "...", updated: {...} } }
      const backendData = response.data as { message?: string; updated?: Project };

      if (backendData && backendData.updated) {
        return backendData.updated;
      }

      // Fallback if response structure is different
      if (response.updated) {
        return response.updated;
      }

      throw new ApiError("Failed to update visibility");
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Failed to toggle project visibility");
    }
  }
}

export const projectService = new ProjectService();
