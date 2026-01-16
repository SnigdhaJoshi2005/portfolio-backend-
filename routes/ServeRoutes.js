// routes/ServeRoutes.js
import express from "express";
import Serve from "../models/Serve.js";
import authenticateToken from "../middleware/AuthMiddleware.js";

const router = express.Router();

// GET serve section (public)
router.get("/", async (req, res) => {
  try {
    const serve = await Serve.findOne();
    res.json(serve);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE / UPDATE serve section (admin)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const serve = await Serve.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(serve);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
