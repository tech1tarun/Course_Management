// backend/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI not set in .env");
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB connection error:", err.message || err);
    process.exit(1);
  }
};

export default connectDB;
