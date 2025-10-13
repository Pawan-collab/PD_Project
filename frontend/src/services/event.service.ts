/**
 * Event Service
 * Handles all event-related API calls
 */

import { apiService, ApiError } from "./api.service";

export interface EventModel {
  _id: string;
  kind: "upcoming" | "past";
  title: string;
  type: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  audience?: string;
  status: "confirmed" | "hosting" | "tentative";
  topics: string[];
  outcome?: string;
  published: boolean;
  featured: boolean;
  isActive: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string; // Legacy support
}

export interface EventFormData {
  kind?: string;
  title: string;
  type: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  audience?: string;
  status?: string;
  topics?: string[];
  outcome?: string;
  published?: boolean;
  featured?: boolean;
  isActive?: boolean;
  order?: number;
}

class EventService {
  async getAllEvents(): Promise<EventModel[]> {
    try {
      const response = await apiService.get("/events");
      // Backend returns { message: "Events fetched", events: [...] }
      if (
        response.data &&
        typeof response.data === "object" &&
        "events" in response.data
      ) {
        const backendData = response.data as {
          message?: string;
          events?: EventModel[];
        };
        return Array.isArray(backendData.events) ? backendData.events : [];
      }
      // Fallback: check for 'data' field (other endpoints)
      if (
        response.data &&
        typeof response.data === "object" &&
        "data" in response.data
      ) {
        const backendData = response.data as {
          success?: boolean;
          data?: EventModel[];
        };
        return Array.isArray(backendData.data) ? backendData.data : [];
      }
      // Fallback: direct array
      if (Array.isArray(response.data)) return response.data;
      return [];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Failed to fetch events");
    }
  }

  async getEventById(id: string): Promise<EventModel> {
    try {
      const response = await apiService.get(`/events/${id}`);
      if (!response.data) throw new ApiError("Event not found");
      // Backend returns { message: "Event fetched", event: {...} }
      if (
        response.data &&
        typeof response.data === "object" &&
        "event" in response.data
      ) {
        const backendData = response.data as {
          message?: string;
          event?: EventModel;
        };
        if (backendData.event) return backendData.event;
      }
      return response.data as EventModel;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Failed to fetch event");
    }
  }

  async createEvent(formData: EventFormData): Promise<EventModel> {
    try {
      const response = await apiService.post("/events/create", formData);
      if (!response.data) throw new ApiError("No data received from server");
      // Backend returns { message: "Event successfully created", event: {...} }
      if (
        response.data &&
        typeof response.data === "object" &&
        "event" in response.data
      ) {
        const backendData = response.data as {
          message?: string;
          event?: EventModel;
        };
        if (backendData.event) return backendData.event;
      }
      return response.data as EventModel;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Failed to create event");
    }
  }

  async updateEvent(
    id: string,
    formData: Partial<EventFormData>
  ): Promise<EventModel> {
    try {
      const response = await apiService.put(`/events/${id}`, formData);
      if (!response.data) throw new ApiError("No data received from server");
      // Backend returns { message: "Event successfully updated", event: {...} }
      if (
        response.data &&
        typeof response.data === "object" &&
        "event" in response.data
      ) {
        const backendData = response.data as {
          message?: string;
          event?: EventModel;
        };
        if (backendData.event) return backendData.event;
      }
      return response.data as EventModel;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Failed to update event");
    }
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      await apiService.delete(`/events/${id}`);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Failed to delete event");
    }
  }

  async toggleEventVisibility(
    id: string,
    isActive: boolean
  ): Promise<EventModel> {
    try {
      // Use the existing update endpoint to toggle visibility
      const response = await apiService.put(`/events/${id}`, {
        isActive,
      });
      if (!response.data) throw new ApiError("No data received from server");
      // Backend returns { message: "Event successfully updated", event: {...} }
      if (
        response.data &&
        typeof response.data === "object" &&
        "event" in response.data
      ) {
        const backendData = response.data as {
          message?: string;
          event?: EventModel;
        };
        if (backendData.event) return backendData.event;
      }
      return response.data as EventModel;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Failed to toggle event visibility");
    }
  }

  // Public methods (no auth required)
  async getRecentUpcomingEvents(limit: number = 4): Promise<EventModel[]> {
    try {
      const response = await apiService.get(`/events/recent/upcoming?limit=${limit}`);
      // Backend returns { data: [...] }
      if (
        response.data &&
        typeof response.data === "object" &&
        "data" in response.data
      ) {
        const backendData = response.data as {
          data?: EventModel[];
        };
        return Array.isArray(backendData.data) ? backendData.data : [];
      }
      if (Array.isArray(response.data)) return response.data;
      return [];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Failed to fetch upcoming events");
    }
  }

  async getRecentPastEvents(limit: number = 4): Promise<EventModel[]> {
    try {
      const response = await apiService.get(`/events/recent/past?limit=${limit}`);
      // Backend returns { data: [...] }
      if (
        response.data &&
        typeof response.data === "object" &&
        "data" in response.data
      ) {
        const backendData = response.data as {
          data?: EventModel[];
        };
        return Array.isArray(backendData.data) ? backendData.data : [];
      }
      if (Array.isArray(response.data)) return response.data;
      return [];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Failed to fetch past events");
    }
  }
}

export const eventService = new EventService();
