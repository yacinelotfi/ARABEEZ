import { API_ENDPOINTS, apiCall } from '../config/api-config.js';

class APIService {
  // Contact Form
  static async submitContactForm(data) {
    try {
      const response = await apiCall(API_ENDPOINTS.CONTACT, 'POST', data);
      return response;
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      throw error;
    }
  }

  // Save Progress
  static async saveProgress(userId, letterIndex, progress) {
    try {
      const response = await apiCall(
        API_ENDPOINTS.PROGRESS,
        'POST',
        { userId, letterIndex, progress }
      );
      return response;
    } catch (error) {
      console.error('Failed to save progress:', error);
      throw error;
    }
  }

  // Get User Statistics
  static async getUserStats(userId) {
    try {
      const response = await apiCall(`${API_ENDPOINTS.STATS}/${userId}`, 'GET');
      return response;
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
      throw error;
    }
  }

  // Get Privacy Policy
  static async getPrivacyPolicy(lang = 'ar') {
    try {
      const response = await apiCall(
        `${API_ENDPOINTS.PRIVACY_POLICY}?lang=${lang}`,
        'GET'
      );
      return response;
    } catch (error) {
      console.error('Failed to fetch privacy policy:', error);
      throw error;
    }
  }

  // Health Check
  static async healthCheck() {
    try {
      const response = await apiCall(API_ENDPOINTS.HEALTH, 'GET');
      return response;
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'offline' };
    }
  }
}

export default APIService;
