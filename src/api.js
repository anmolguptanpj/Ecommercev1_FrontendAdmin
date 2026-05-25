import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      return Promise.reject({
        statusCode: 0,
        message: "Network error. Please check your internet connection.",
      });
    }

    const { status, data } = error.response;
    const originalRequest = error.config;

    const normalizedError = {
      statusCode: status,
      message: data?.message || "Something went wrong",
      errors: data?.errors || [],
    };

    const isAuthRoute =
      originalRequest.url?.includes("/login") ||
      originalRequest.url?.includes("/register") ||
      originalRequest.url?.includes("/refresh");

    if (status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;

      try {
        await api.post("/refresh", {}, { withCredentials: true });
        return api(originalRequest);
      } catch {
        return Promise.reject({
          statusCode: 401,
          message: "Session expired. Please login again.",
        });
      }
    }

    return Promise.reject(normalizedError);
  }
);

export default api;
