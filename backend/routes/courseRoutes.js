import { protect } from "../middleware/auth.js";

router.get("/", getCourses);
router.post("/", protect, createCourse); // only logged-in users
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse);
