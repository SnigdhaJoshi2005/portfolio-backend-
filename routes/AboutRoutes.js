import express from "express";
import About from "../models/About.js";
import authenticateToken from "../middleware/AuthMiddleware.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

// GET about (public)
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE / UPDATE about (admin)
router.put("/", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const { title, heading, description, linkedin, instagram, facebook } = req.body;

    const updateData = {
      title: title || "",
      heading: heading || "",
      description: description || "",
      socials: {
        linkedin: linkedin || "",
        instagram: instagram || "",
        facebook: facebook || "",
      },
    };

    if (req.file) updateData.image = req.file.path;

    const about = await About.findOneAndUpdate(
      {},
      { $set: updateData },  // <-- important fix to prevent $setOnInsert error
      { new: true, upsert: true }
    );

    res.json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
