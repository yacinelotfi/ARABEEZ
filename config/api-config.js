const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://arabeez-api.herokuapp.com/api'
  : 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/health`,
  CONTACT: `${API_BASE_URL}/contact`,
  PROGRESS: `${API_BASE_URL}/progress`,
  STATS: `${API_BASE_URL}/stats`,
  PRIVACY_POLICY: `${API_BASE_URL}/policies/privacy`,
  TERMS: `${API_BASE_URL}/policies/terms`,
};

export const apiCall = async (endpoint, method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
