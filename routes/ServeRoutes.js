import express from "express";
import multer from "multer";
import path from "path";
import Serve from "../models/Serve.js";
import authenticateToken from "../middleware/AuthMiddleware.js";

const router = express.Router();

/* ---------- MULTER ---------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

/* ---------- GET ---------- */
router.get("/", async (req, res) => {
  try {
    const serve = await Serve.findOne();
    res.json(serve);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------- UPDATE ---------- */
router.put(
  "/",
  authenticateToken,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const updateData = {
        title1: req.body.title1 || "",
        description1: req.body.description1 || "",
        title2: req.body.title2 || "",
        description2: req.body.description2 || "",
        quote: req.body.quote || "",
        list: req.body.list ? JSON.parse(req.body.list) : [],
      };

      if (req.files?.image1) updateData.image1 = req.files.image1[0].path;
      if (req.files?.image2) updateData.image2 = req.files.image2[0].path;

      const serve = await Serve.findOneAndUpdate(
        {},
        { $set: updateData },
        { new: true, upsert: true }
      );

      res.json(serve);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
