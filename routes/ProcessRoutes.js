import express from "express";
import Process from "../models/Process.js";
import authenticateToken from "../middleware/AuthMiddleware.js";

const router = express.Router();

// GET process section (public)
router.get("/", async (req, res) => {
  try {
    const process = await Process.findOne();
    res.json(process);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE / UPDATE process section (admin)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const process = await Process.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(process);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
