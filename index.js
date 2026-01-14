import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // e.g. http://localhost:5173
    credentials: true, // REQUIRED for cookies
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
