import axios, { AxiosResponse } from "axios";

const APIClient = axios.create({
  baseURL: "http://localhost:3000/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

APIClient.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  } else {
    delete config.headers.Authorization; // Remove if no token
  }

  return config;
});

export default APIClient;
