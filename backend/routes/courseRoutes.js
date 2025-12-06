// backend/routes/courseRoutes.js
import express from "express";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCourses); // public
router.post("/", protect, createCourse); // protected (must be logged-in)
router.put("/:id", protect, updateCourse); // protected
router.delete("/:id", protect, deleteCourse); // protected

export default router;
