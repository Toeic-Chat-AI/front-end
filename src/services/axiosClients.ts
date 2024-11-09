import axios from "axios";
import { getCookie } from "../helpers";

// const baseURL = process.env.REACT_APP_API_URL;
const baseURL = "http://localhost:8080/api";

// Create an Axios instance
const axiosClient = axios.create({
  baseURL,
  timeout: 90000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": baseURL
  }
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
