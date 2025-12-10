// src/services/authService.js
import { API, setAuthToken } from "../api";

export const register = (data) => API.post("/api/auth/register", data);
export const login = async (data) => {
  const res = await API.post("/api/auth/login", data);
  // set token on login so subsequent calls are authorized
  if (res.data?.token) setAuthToken(res.data.token);
  return res;
};
export const logout = () => setAuthToken(null);
