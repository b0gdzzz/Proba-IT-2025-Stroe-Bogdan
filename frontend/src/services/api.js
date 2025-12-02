import axios from 'axios';

// Base URL for API
const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// API methods for grills/notes
export const grillsAPI = {
  // Get all grills
  getAll: async () => {
    try {
      const response = await api.get('/notes');
      return response.data;
    } catch (error) {
      console.error('Error fetching grills:', error);
      throw error;
    }
  },

  // Get single grill by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching grill:', error);
      throw error;
    }
  },

  // Create new grill
  create: async (grillData) => {
    try {
      const response = await api.post('/notes', grillData);
      return response.data;
    } catch (error) {
      console.error('Error creating grill:', error);
      throw error;
    }
  },

  // Update grill
  update: async (id, grillData) => {
    try {
      const response = await api.put(`/notes/${id}`, grillData);
      return response.data;
    } catch (error) {
      console.error('Error updating grill:', error);
      throw error;
    }
  },

  // Delete grill
  delete: async (id) => {
    try {
      const response = await api.delete(`/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting grill:', error);
      throw error;
    }
  },
};

export default api;
