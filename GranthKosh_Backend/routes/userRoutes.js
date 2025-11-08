import express from "express";
import User from "../models/User.js";
import Order from "../models/Order.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all users (admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    // Optional: add order count for each user
    const usersWithOrderCount = await Promise.all(
      users.map(async (user) => {
        const count = await Order.countDocuments({ customer: user._id });
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          ordersCount: count,
        };
      })
    );

    res.json(usersWithOrderCount);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

export default router;
