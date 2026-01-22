import express from "express";
import Practice from "../models/Practice.js";
import authenticateToken from "../middleware/AuthMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

/* ================= MULTER (SAME AS ABOUT) ================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= ROUTES ================= */

// GET all practices (public)
router.get("/", async (req, res) => {
  try {
    const practices = await Practice.find();
    res.json(practices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single practice (public)
router.get("/:id", async (req, res) => {
  try {
    const practice = await Practice.findById(req.params.id);
    if (!practice) return res.status(404).json({ error: "Not found" });
    res.json(practice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE practice (admin)
router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const practice = new Practice({
        title: req.body.title,
        description: req.body.description,
        image: req.file ? req.file.path : "",
      });

      await practice.save();
      res.status(201).json(practice);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// UPDATE practice (admin)
router.put(
  "/:id",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const updateData = {
        title: req.body.title,
        description: req.body.description,
      };

      if (req.file) {
        updateData.image = req.file.path;
      }

      const practice = await Practice.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json(practice);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// DELETE practice (admin)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await Practice.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
