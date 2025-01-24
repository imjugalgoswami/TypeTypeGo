export const API_BASE_URL = 'http://localhost:8000';

export const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getAuthHeaders = () => ({
  ...apiConfig.headers,
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});