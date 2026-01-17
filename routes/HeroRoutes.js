import express from "express";
import Hero from "../models/Hero.js";
import authenticateToken from "../middleware/AuthMiddleware.js";
import multer from "multer";

const router = express.Router();

/* ---------------- MULTER CONFIG ---------------- */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
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
        images = JSON.parse(req.body.images);
      }

      // new uploaded images
      if (req.files) {
        req.files.forEach(file => images.push(file.path));
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
