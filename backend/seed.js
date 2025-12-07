// backend/seed.js
// Usage: from backend folder run: node seed.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Course from "./models/Course.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/course_management";

async function seed() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB.");

    // ---------- USERS ----------
    const usersToCreate = [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
      },
      {
        name: "John Instructor",
        email: "instructor@example.com",
        password: "pass123",
        role: "instructor",
      },
      {
        name: "Student One",
        email: "student@example.com",
        password: "pass123",
        role: "student",
      },
    ];

    const createdUsers = {};
    for (const u of usersToCreate) {
      const exists = await User.findOne({ email: u.email });
      if (exists) {
        console.log(`User exists: ${u.email} (skipping)`);
        createdUsers[u.email] = exists;
        continue;
      }
      const hashed = await bcrypt.hash(u.password, 10);
      const newUser = await User.create({
        name: u.name,
        email: u.email,
        password: hashed,
        role: u.role,
      });
      console.log(`Created user: ${u.email}`);
      createdUsers[u.email] = newUser;
    }

    // ---------- COURSES ----------
    // We'll create courses only if a course with same title doesn't already exist.
    const coursesToCreate = [
      {
        title: "MERN Stack Masterclass",
        description: "Complete MERN stack from basics to advanced.",
        instructor: "John Instructor",
        createdByEmail: "admin@example.com",
      },
      {
        title: "React Beginner to Pro",
        description: "Learn React from scratch with real-world projects.",
        instructor: "Admin User",
        createdByEmail: "admin@example.com",
      },
      {
        title: "Node.js & Express Bootcamp",
        description: "Deep dive into backend API development.",
        instructor: "Admin User",
        createdByEmail: "instructor@example.com",
      },
    ];

    for (const c of coursesToCreate) {
      const exists = await Course.findOne({ title: c.title });
      if (exists) {
        console.log(`Course exists: "${c.title}" (skipping)`);
        continue;
      }

      // try to resolve createdBy user id
      const creator =
        createdUsers[c.createdByEmail] ||
        (await User.findOne({ email: c.createdByEmail }));
      const createdById = creator ? creator._id : null;

      const newCourse = await Course.create({
        title: c.title,
        description: c.description,
        instructor: c.instructor,
        createdBy: createdById,
      });

      console.log(`Created course: "${newCourse.title}"`);
    }

    console.log("Seeding complete.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    try {
      await mongoose.disconnect();
    } catch (e) {}
    process.exit(1);
  }
}

seed();
