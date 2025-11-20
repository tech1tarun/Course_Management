import Course from "../models/Course.js";

// GET all courses
export const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

// CREATE a course
export const createCourse = async (req, res) => {
  const { title, description, instructor } = req.body;

  const course = new Course({ title, description, instructor });
  await course.save();

  res.json({ message: "Course created!", course });
};

// UPDATE a course
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({ message: "Course updated!", updatedCourse });
};

// DELETE a course
export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  await Course.findByIdAndDelete(id);
  res.json({ message: "Course deleted!" });
};
