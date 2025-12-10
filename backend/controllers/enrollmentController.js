// backend/controllers/enrollmentController.js
import User from "../models/User.js";
import Course from "../models/Course.js";
import Lecture from "../models/Lecture.js";

export const enrollInCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const myCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "enrolledCourses",
      populate: { path: "lectures", select: "title createdAt" },
    });
    res.json(user.enrolledCourses || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLecturesForStudentCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const user = await User.findById(userId);
    if (!user.enrolledCourses.includes(courseId) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not enrolled in this course" });
    }

    const lectures = await Lecture.find({ course: courseId }).sort({
      createdAt: 1,
    });
    res.json(lectures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
