const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Base Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to AuraScent API",
    status: "healthy",
    timestamp: new Date(),
  });
});

// Database Connection & Server Startup
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/aurascent";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("SUCCESS: Connected to MongoDB database");
    app.listen(PORT, () => {
      console.log(`SUCCESS: Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("ERROR: Failed to connect to MongoDB database:", err.message);
    process.exit(1);
  });
