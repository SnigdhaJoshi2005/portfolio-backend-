// routes/UserRoutes.js
import express from "express";
import authenticateToken from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Example protected route
router.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "This is your profile", user: req.user });
});

export default router;
