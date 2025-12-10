// backend/routes/adminRoutes.js
import express from "express";
import {
  listCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/adminCourseController.js";

import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/roles.js";

const router = express.Router();

router.use(protect, adminOnly); // all admin routes require admin

router.get("/courses", listCourses);
router.post("/courses", createCourse);
router.get("/courses/:id", getCourse);
router.put("/courses/:id", updateCourse);
router.delete("/courses/:id", deleteCourse);

export default router;
