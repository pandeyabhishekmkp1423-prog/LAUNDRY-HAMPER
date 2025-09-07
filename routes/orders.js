// routes/orders.js
import express from "express";
import Order from "../models/Order.js"; // We'll create an Order model
const router = express.Router();

// Place new order
router.post("/", async (req, res) => {
  try {
    const { userId, items, total } = req.body;
    const order = new Order({ userId, items, total });
    await order.save();
    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all orders for a user
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
