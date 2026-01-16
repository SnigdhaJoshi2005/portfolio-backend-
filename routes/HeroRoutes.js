import express from "express";
import Hero from "../models/Hero.js";
import authenticateToken from "../middleware/AuthMiddleware.js";

const router = express.Router();

// GET hero (public)
router.get("/", async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE / UPDATE hero (admin)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const hero = await Hero.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
