import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
const refreshAccessToken = async () => {
  try {
    const refresh = localStorage.getItem("refresh");

    const response = await axios.post(
      "http://127.0.0.1:8000/api/token/refresh/",
      {
        refresh,
      }
    );

    localStorage.setItem("access", response.data.access);

    return response.data.access;
  } catch (error) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    window.location.href = "/login";

    return null;
  }
};

// Automatically attach access token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;