// backend/controllers/lectureController.js
import Lecture from "../models/Lecture.js";
import Course from "../models/Course.js";

export const createLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, videoUrl, content } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const lecture = await Lecture.create({
      course: courseId,
      title,
      videoUrl,
      content,
    });
    course.lectures.push(lecture._id);
    await course.save();

    res.status(201).json(lecture);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listLecturesForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lectures = await Lecture.find({ course: courseId }).sort({
      createdAt: 1,
    });
    res.json(lectures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteLecture = async (req, res) => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findByIdAndDelete(id);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });

    // remove from course.lectures
    await Course.findByIdAndUpdate(lecture.course, {
      $pull: { lectures: lecture._id },
    });
    res.json({ message: "Lecture deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
