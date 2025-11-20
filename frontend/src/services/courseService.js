import { API } from "../api";

export const getCourses = () => API.get("/api/courses");
export const createCourse = (data) => API.post("/api/courses", data);
export const updateCourse = (id, data) => API.put(`/api/courses/${id}`, data);
export const deleteCourse = (id) => API.delete(`/api/courses/${id}`);
