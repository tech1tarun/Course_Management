// backend/controllers/courseController.js
import Course from "../models/Course.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("createdBy", "name email");
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, instructor } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required." });

    const course = new Course({
      title,
      description,
      instructor,
      createdBy: req.user?.id || null,
    });

    await course.save();
    res.status(201).json({ message: "Course created.", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Course not found." });
    res.json({ message: "Course updated.", updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Course.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Course not found." });
    res.json({ message: "Course deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
