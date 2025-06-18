import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://vkr2025-backend.vercel.app/api",
 // withCredentials: true,
});
export default axiosInstance;
