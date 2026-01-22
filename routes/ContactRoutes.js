import express from "express";
import Contact from "../models/Contact.js";
import authenticateToken from "../middleware/AuthMiddleware.js";
import multer from "multer";

const router = express.Router();

// Multer for optional image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// GET contact
router.get("/", async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});

// POST / UPDATE contact
router.post("/", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const { heading, description, name, subtitle, email, socials } = req.body;

    const updateData = {
      heading: heading || "",
      description: description || "",
      name: name || "",
      subtitle: subtitle || "",
      email: email || "",
      socials: socials ? JSON.parse(socials) : { instagram: "", youtube: "", linkedin: "" },
    };

    if (req.file) {
      updateData.image = req.file.path; // save image path
    }

    const contact = await Contact.findOneAndUpdate({}, updateData, { new: true, upsert: true });
    res.json(contact);
  } catch (err) {
    console.error("Failed to save contact:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;