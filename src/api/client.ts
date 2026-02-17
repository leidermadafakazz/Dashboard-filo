import axios from "axios";

export const apiClient = axios.create({
  baseURL: 'https://dev-v1.onrender.com/api', // Replace with your API base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(config => {
 const token = localStorage.getItem('token');
 
 
 if (token) config.headers.Authorization = `Bearer ${token}`;
 

  return config;
});