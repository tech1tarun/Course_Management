import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  instructor: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
