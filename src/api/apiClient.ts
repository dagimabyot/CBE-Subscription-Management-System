import axios, { AxiosError } from "axios";

// Determine API URL based on environment
const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) return envUrl;
  
  // Default to localhost in development
  if (import.meta.env.DEV) {
    return "http://localhost:3000/api";
  }
  
  // In production, use relative path
  return "/api";
};

// Create axios instance with defaults
const apiClient = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle specific error cases
    if (!error.response) {
      // Network error
      const networkError = new Error(
        `Network Error: Unable to connect to ${getApiUrl()}. Please check your internet connection.`
      );
      return Promise.reject(networkError);
    }

    if (error.response.status === 401) {
      console.warn("Unauthorized request. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    if (error.response.status === 400) {
      const errorData = error.response.data as any;
      const message = errorData?.message || "Invalid request";
      return Promise.reject(new Error(message));
    }

    if (error.response.status === 500) {
      return Promise.reject(new Error("Server error. Please try again later."));
    }

    const errorData = error.response.data as any;
    const message = errorData?.message || error.message || "An error occurred";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
