import axios from "axios";

// Base URL for API
const API_BASE_URL = "http://localhost:3000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// API methods for grills
export const grillsAPI = {
  // Get all grills
  getAll: async () => {
    try {
      const response = await api.get("/grills");
      return response.data;
    } catch (error) {
      console.error("Error fetching grills:", error);
      throw error;
    }
  },

  // Get single grill by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/grills/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching grill:", error);
      throw error;
    }
  },

  // Create new grill
  create: async (grillData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/grills", grillData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating grill:", error);
      throw error;
    }
  },

  // Update grill
  update: async (id, grillData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(`/grills/${id}`, grillData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating grill:", error);
      throw error;
    }
  },

  // Delete grill
  delete: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(`/grills/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting grill:", error);
      throw error;
    }
  },

  // Get leaderboard
  getLeaderboard: async () => {
    try {
      const response = await api.get("/grills/leaderboard");
      return response.data;
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      throw error;
    }
  },

  // Like/unlike a grill
  toggleLike: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        `/grills/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  },
};

// API methods for authentication
export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },
};

// API methods for users
export const usersAPI = {
  // Get user's grills
  getUserGrills: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/grills`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user grills:", error);
      throw error;
    }
  },
};

export default api;
