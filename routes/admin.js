// routes/admin.js
import express from "express";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Service from "../models/Service.js";

const router = express.Router();

// ----- Orders -----
// Get all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});

// Update order status
router.put("/orders/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
});

// ----- Users -----
// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
});

// ----- Services -----
// Get all services
router.get("/services", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services", error: err.message });
  }
});

// Add new service
router.post("/services", async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;
    const service = new Service({ name, description, price, duration });
    await service.save();
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "Failed to add service", error: err.message });
  }
});

// Update service
router.put("/services/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "Failed to update service", error: err.message });
  }
});

// Delete service
router.delete("/services/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete service", error: err.message });
  }
});

export default router;
