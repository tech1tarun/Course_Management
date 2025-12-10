// backend/routes/studentRoutes.js
import express from "express";
import {
  enrollInCourse,
  myCourses,
  getLecturesForStudentCourse,
} from "../controllers/enrollmentController.js";
import { protect } from "../middleware/auth.js";
import { studentOnly } from "../middleware/roles.js";

const router = express.Router();

// require authentication for these routes
router.post("/enroll/:courseId", protect, studentOnly, enrollInCourse);
router.get("/my-courses", protect, studentOnly, myCourses);

// allow students to fetch lectures for a course they are enrolled in
router.get(
  "/course/:courseId/lectures",
  protect,
  studentOnly,
  getLecturesForStudentCourse
);

export default router;
