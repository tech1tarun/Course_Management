// src/api.js
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000",
});

// helper to apply token to axios defaults
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete API.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

// initialize from storage (so page reload keeps auth)
const token = localStorage.getItem("token");
if (token) {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
