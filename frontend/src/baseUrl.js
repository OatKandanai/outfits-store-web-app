import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}/api`;

// Public API requests (no auth required)
export const publicRequest = axios.create({
  baseURL: baseUrl,
});

// Authenticated API requests (with dynamic token)
export const userRequest = axios.create({
  baseURL: baseUrl,
});

// Add a request interceptor to set the token dynamically before each request
userRequest.interceptors.request.use(
  (config) => {
    const store = require("./redux/store").default; // Dynamically import store
    const state = store.getState();
    const token = state.user.token; // get token from userRedux

    if (token) {
      config.headers["token"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
