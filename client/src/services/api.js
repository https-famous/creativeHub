import axios from "axios";
 
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ||"http://localhost:5000/api"       /*Why import.meta.env.VITE_API_URL — Vite (your React build tool) uses import.meta.env to read environment variables, unlike Node which uses process.env. Any variable that starts with VITE_ gets automatically exposed to your React app at build time.
Why keep the fallback || "http://localhost:5000/api" — so your app still works locally without any extra setup. If VITE_API_URL isn't set, it falls back to localhost automatically*/

});
 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 
export default api;