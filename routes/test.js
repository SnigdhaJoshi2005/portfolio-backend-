import express from "express";
const router = express.Router();

router.get("/bye", (req, res) => {
  res.json({ message: "Goodbye from API" });
});

export default router;
