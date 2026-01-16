import express from "express";
import About from "../models/About.js";
import authenticateToken from "../middleware/AuthMiddleware.js";

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

// UPDATE about (admin)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
