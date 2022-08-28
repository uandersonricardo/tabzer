import axios, { AxiosError, AxiosRequestConfig } from "axios";

import API from "../config/api";

const api = axios.create({
  baseURL: API.baseUrl
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem("access-token");

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  async error => {
    return await Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  async function (error: AxiosError) {
    if (error.response?.status !== 401) {
      return await Promise.reject(error);
    }

    localStorage.removeItem("access-token");

    return await Promise.reject(error);
  }
);

export default api;
