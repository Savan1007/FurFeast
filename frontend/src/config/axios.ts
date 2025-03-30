import axios from 'axios';

// Axios instance for APIs that require authorization
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', //'http://192.168.0.34:5000', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include authorization info if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage or other storage
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Authorization header if token exists
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

