// src/services/authService.js
import { API, setAuthToken } from "../api";

export const register = (data) => API.post("/api/auth/register", data);
export const login = (data) => API.post("/api/auth/login", data);

// call to set token after manual login flow
export const saveToken = (token) => {
  setAuthToken(token);
};
