// routes/services.js
import express from "express";
import Service from "../models/Service.js";

const router = express.Router();

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET single service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST a new service
router.post("/", async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;
    const service = new Service({ name, description, price, duration });
    await service.save();
    res.status(201).json({ message: "Service added", service });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT update service by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service updated", updatedService });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE service by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
