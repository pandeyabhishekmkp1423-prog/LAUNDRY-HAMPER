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
import adminRoutes from "./routes/admin.js"; // ✅ new admin routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman) or any localhost port
    if (!origin || origin.startsWith("http://localhost")) return callback(null, true);
    // Allow deployed frontend
    if (origin === "https://my-frontend-eight.vercel.app") return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  }
}));

app.use(express.json()); // Parse JSON requests

// API Routes
app.use("/api/services", servicesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/admin", adminRoutes); // ✅ admin panel routes

// Default route
app.get("/", (req, res) => res.send("✅ Welcome to Laundry Hamper Backend"));

// Health check
app.get("/health", async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1
    ? "✅ MongoDB connected"
    : "❌ MongoDB not connected";
  res.send(`Backend is alive! | ${dbStatus}`);
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => console.error("❌ MongoDB connection error:", err));
