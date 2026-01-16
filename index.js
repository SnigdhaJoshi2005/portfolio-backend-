import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import heroRoutes from "./routes/HeroRoutes.js";
import aboutRoutes from "./routes/AboutRoutes.js";
import practiceRoutes from "./routes/PracticeRoutes.js";
import certificateRoutes from "./routes/CertificateRoutes.js";
import serveRoutes from "./routes/ServeRoutes.js";
import visionRoutes from "./routes/VisionRoutes.js";
import socialRoutes from "./routes/SocialRoutes.js";
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
app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/practices", practiceRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/serve", serveRoutes);
app.use("/api/vision", visionRoutes);
app.use("/api/social", socialRoutes);

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
