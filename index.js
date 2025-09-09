// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import servicesRoutes from "./routes/services.js";
import cartRoutes from "./routes/cart.js";
import ordersRoutes from "./routes/orders.js";
import loginRoutes from "./routes/login.js";
import registerRoutes from "./routes/register.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "https://laundry-frontend.vercel.app", // replace with your frontend URL
  credentials: true
}));
app.use(express.json()); // Parse JSON requests

// API Routes
app.use("/api/services", servicesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("✅ Welcome to Laundry Hamper Backend");
});

// Health check route
app.get("/health", async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1
    ? "✅ MongoDB connected"
    : "❌ MongoDB not connected";
  res.send(`Backend is alive! | ${dbStatus}`);
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
