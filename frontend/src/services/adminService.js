// src/services/adminService.js
import { API } from "../api";

export const adminGetCourses = () => API.get("/api/admin/courses");
export const adminCreateCourse = (data) => API.post("/api/admin/courses", data);
export const adminUpdateCourse = (id, data) =>
  API.put(`/api/admin/courses/${id}`, data);
export const adminDeleteCourse = (id) => API.delete(`/api/admin/courses/${id}`);
