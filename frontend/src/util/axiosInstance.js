import axios from "axios";

// Try to get the saved API endpoint that worked during login
const getSavedApiBase = () => {
  const saved = localStorage.getItem("apiEndpoint");
  if (saved) return saved;

  // Fall back to environment variables or default
  return (
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
    process.env.REACT_APP_API_BASE_URL ||
    "http://localhost:5000"
  );
};

const API_BASE = getSavedApiBase();
console.log("API Base URL:", API_BASE);

const axiosInstance = axios.create({
  baseURL: API_BASE.replace(/\/+$/, ""),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log(
      `${config.method?.toUpperCase()} Request:`,
      `${config.baseURL}${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    } else if (error.message.includes("Network Error")) {
      console.error(
        "Network error. Please check if the backend server is running."
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
