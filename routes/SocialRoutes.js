import express from "express";
import Social from "../models/Social.js";
import authenticateToken from "../middleware/AuthMiddleware.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

const router = express.Router();

// GET social (public)
router.get("/", async (req, res) => {
  try {
    const social = await Social.findOne();
    res.json(social);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE / UPDATE social (admin)
router.post(
  "/",
  authenticateToken,
  upload.fields([
    { name: "instagramImg", maxCount: 1 },
    { name: "facebookImg", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const data = {
        ...req.body,
        instagramImg: req.files.instagramImg ? req.files.instagramImg[0].path : undefined,
        facebookImg: req.files.facebookImg ? req.files.facebookImg[0].path : undefined,
      };

      const social = await Social.findOneAndUpdate({}, data, { new: true, upsert: true });
      res.json(social);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;