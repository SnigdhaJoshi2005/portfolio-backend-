import express from "express";
import Contact from "../models/Contact.js";
import authenticateToken from "../middleware/AuthMiddleware.js";

const router = express.Router();

/* GET contact (public) */
router.get("/", async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* CREATE / UPDATE contact (admin) */
router.post("/", authenticateToken, async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
