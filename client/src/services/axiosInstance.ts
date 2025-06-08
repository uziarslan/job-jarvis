import axios from 'axios';

const API_BASE_URL = typeof process !== 'undefined' && process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'http://localhost:4000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 120000, // 10 seconds timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await new Promise<string | null>((resolve) => {
        chrome.storage.local.get(["token"], (result) => {
          resolve(result.token || null);
        });
      });

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear token on unauthorized access
      await new Promise<void>((resolve) => {
        chrome.storage.local.remove(["jwt"], resolve);
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;