// ... your existing imports and setup

// Default route
app.get("/", (req, res) => {
  res.send("✅ Welcome to Laundry Hamper Backend");
});

// Health check route
app.get("/health", async (req, res) => {
  let dbStatus = "❌ MongoDB not connected";
  if (mongoose.connection.readyState === 1) {
    dbStatus = "✅ MongoDB connected";
  }
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
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
