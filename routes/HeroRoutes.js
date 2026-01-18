import express from "express";
import Hero from "../models/Hero.js";
import authenticateToken from "../middleware/AuthMiddleware.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

/* ---------------- MULTER CONFIG ---------------- */

// Ensure uploads directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir + "/");
  },
  filename: (req, file, cb) => {
    // Sanitize filename: remove spaces and special characters
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, name + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

/* ---------------- ROUTES ---------------- */

// GET hero (public)
router.get("/", async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE / UPDATE hero (admin)
router.post(
  "/",
  authenticateToken,
  upload.array("files"), // <-- THIS is what enables images
  async (req, res) => {
    try {
      let images = [];

      // existing images from frontend
      if (req.body.images) {
        try {
          images = JSON.parse(req.body.images);
          if (!Array.isArray(images)) images = [];
        } catch (parseErr) {
          console.error("Error parsing images:", parseErr);
          images = [];
        }
      }

      // new uploaded images
      if (req.files) {
        req.files.forEach(file => {
          // Normalize path to use forward slashes for URLs
          const normalizedPath = file.path.replace(/\\/g, "/");
          images.push(normalizedPath);
        });
      }

      const hero = await Hero.findOneAndUpdate(
        {},
        {
          title: req.body.title,
          name: req.body.name,
          subtitle: req.body.subtitle,
          images,
        },
        { new: true, upsert: true }
      );

      res.json(hero);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
