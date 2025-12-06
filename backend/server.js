// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// routes
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// health/test route
app.get("/", (req, res) => res.send("API is running..."));

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
