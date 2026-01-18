import express from "express";
import multer from "multer";
import path from "path";
import Vision from "../models/Vision.js";
import authenticateToken from "../middleware/AuthMiddleware.js";

const router = express.Router();

/* ---------- MULTER SETUP ---------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ---------- GET VISION (PUBLIC) ---------- */
router.get("/", async (req, res) => {
  try {
    const vision = await Vision.findOne();
    res.json(vision);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------- CREATE / UPDATE VISION ---------- */
router.put("/", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    const updateData = {
      title: title || "",
      description: description || "",
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const vision = await Vision.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.json(vision);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
