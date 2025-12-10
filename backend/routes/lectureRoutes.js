// backend/routes/lectureRoutes.js
import express from "express";
import {
  createLecture,
  listLecturesForCourse,
  deleteLecture,
} from "../controllers/lectureController.js";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/roles.js";

const router = express.Router();

// Public: list lectures for a course (if needed you can allow students only)
router.get("/courses/:courseId/lectures", listLecturesForCourse);

// Admin: create/delete lectures
router.post("/courses/:courseId/lectures", protect, adminOnly, createLecture);
router.delete("/lectures/:id", protect, adminOnly, deleteLecture);

export default router;
