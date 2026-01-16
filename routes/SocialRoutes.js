// routes/SocialRoutes.js
import express from "express";
import Social from "../models/Social.js";
import authenticateToken from "../middleware/AuthMiddleware.js";

const router = express.Router();

// GET social section (public)
router.get("/", async (req, res) => {
  try {
    const social = await Social.findOne();
    res.json(social);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE / UPDATE social section (admin)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const social = await Social.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(social);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
