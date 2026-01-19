import express from "express";
import Practice from "../models/Practice.js";
import authenticateToken from "../middleware/AuthMiddleware.js";

const router = express.Router();

// GET all practices (public)
router.get("/", async (req, res) => {
  try {
    const practices = await Practice.find();
    res.json(practices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE practice (admin)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const practice = new Practice(req.body);
    await practice.save();
    res.status(201).json(practice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE practice (admin)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const practice = await Practice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(practice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE practice (admin)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await Practice.findByIdAndDelete(req.params.id);
    res.json({ message: "Practice deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single practice by ID (public)
router.get("/:id", async (req, res) => {
  try {
    const practice = await Practice.findById(req.params.id);
    if (!practice) return res.status(404).json({ error: "Practice not found" });
    res.json(practice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
