import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() ?? "https://localhost:5000";
const API_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS ?? "10000");
const timeout = Number.isFinite(API_TIMEOUT_MS) ? API_TIMEOUT_MS : 10000;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});
