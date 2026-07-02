import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle expired or invalid tokens globally
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");

      toast.error(
        "Your session has expired. Please log in again."
      );

      // Prevent redirect loop if already on login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;