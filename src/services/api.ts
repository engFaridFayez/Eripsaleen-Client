import { sessionExpired } from "@/lib/globalState";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response?.status === 401) {
      const hadToken = !!localStorage.getItem("access");

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      if (hadToken) {
        sessionExpired.value = true;
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;