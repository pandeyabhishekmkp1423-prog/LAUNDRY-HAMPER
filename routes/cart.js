// routes/cart.js
import express from "express";
import Cart from "../models/cart.js"; // We'll create a Cart model
const router = express.Router();

// Get cart by user
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Add or update cart item
router.post("/", async (req, res) => {
  try {
    const { userId, service, price, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existing = cart.items.find((item) => item.service === service);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ service, price, quantity });
    }

    await cart.save();
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Remove cart item
router.delete("/:userId/:service", async (req, res) => {
  try {
    const { userId, service } = req.params;
    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = cart.items.filter((item) => item.service !== service);
      await cart.save();
      return res.json(cart.items);
    }

    res.json([]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
