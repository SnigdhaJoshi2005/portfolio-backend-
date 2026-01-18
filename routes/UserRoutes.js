import express from "express";
import authenticateToken from "../middleware/AuthMiddleware.js";

const router = express.Router();

// TEST ROUTE (VERY IMPORTANT)
router.get("/test", (req, res) => {
  res.send("Users route working ✅");
});

// PROFILE ROUTE (PROTECTED)
router.get("/profile", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
});

export default router;

