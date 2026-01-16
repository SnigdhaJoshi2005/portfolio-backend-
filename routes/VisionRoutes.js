// routes/VisionRoutes.js
import express from "express";
import Vision from "../models/Vision.js";
import authenticateToken from "../middleware/AuthMiddleware.js";

const router = express.Router();

// GET vision section (public)
router.get("/", async (req, res) => {
  try {
    const vision = await Vision.findOne();
    res.json(vision);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE / UPDATE vision section (admin)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const vision = await Vision.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(vision);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
