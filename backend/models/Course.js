// backend/models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  instructor: { type: String, default: "" },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Course", courseSchema);
