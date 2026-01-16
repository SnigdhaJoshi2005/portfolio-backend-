import express from "express";
import Certificate from "../models/Certificate.js";
import authenticateToken from "../middleware/AuthMiddleware.js";

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
router.post("/", authenticateToken, async (req, res) => {
  try {
    const certificate = new Certificate(req.body);
    await certificate.save();
    res.status(201).json(certificate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE certificate (admin)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(certificate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
