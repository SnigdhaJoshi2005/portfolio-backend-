import express from "express";
import Certificate from "../models/Certificate.js";
import authenticateToken from "../middleware/AuthMiddleware.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = express.Router();

// GET certificates (public)
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE certificate (admin)
router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    const certificate = new Certificate({
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.path : "",
    });

    await certificate.save();
    res.status(201).json(certificate);
  }
);

// UPDATE certificate (admin)
router.put(
  "/:id",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
    };

    if (req.file) updateData.image = req.file.path;

    const cert = await Certificate.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(cert);
  }
);
// DELETE certificate (admin)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: "Certificate deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
