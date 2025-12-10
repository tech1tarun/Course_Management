// src/services/lectureService.js
import { API } from "../api";

// create lecture for a course (admin)
export const createLecture = (courseId, data) =>
  API.post(`/api/courses/${courseId}/lectures`, data);

// list lectures for a course (public)
export const getLecturesForCourse = (courseId) =>
  API.get(`/api/courses/${courseId}/lectures`);

// delete lecture (admin) — adjust path if your backend route differs
export const deleteLecture = (id) => API.delete(`/api/courses/lectures/${id}`);
