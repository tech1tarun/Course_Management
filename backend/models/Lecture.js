// backend/models/Lecture.js
import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: { type: String, required: true },
    videoUrl: { type: String, default: "" }, // could be YouTube / S3 / etc.
    content: { type: String, default: "" }, // text/notes/description
  },
  { timestamps: true }
);

export default mongoose.model("Lecture", lectureSchema);
