// src/api.js
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete API.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

// initialize from storage
const token = localStorage.getItem("token");
if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
