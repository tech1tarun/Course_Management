// src/services/studentService.js
import { API } from "../api";

export const enrollCourse = (courseId) =>
  API.post(`/api/student/enroll/${courseId}`);
export const getMyCourses = () => API.get("/api/student/my-courses");
export const getLecturesForStudentCourse = (courseId) =>
  API.get(`/api/student/course/${courseId}/lectures`);
