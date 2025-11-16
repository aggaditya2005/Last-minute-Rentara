import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// --- Path Fix (for ES Modules) ---
const __dirname = path.resolve();

// Load .env correctly
dotenv.config({ path: path.resolve(__dirname, ".env") });

// --- Route Imports ---
import flightRoutes from "./routes/flightRoutes.js";
import mlRoutes from "./routes/mlRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js"; // <-- added

// Create Express App
const app = express();

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use("/api/flights", flightRoutes);
app.use("/api/hotels", hotelRoutes); // <-- Added usable route
app.use("/api/ai", mlRoutes);

// Default Testing Route
app.get("/", (req, res) => {
  res.send("🚀 Rentara Backend API Running: Ready for Booking and AI Predictions.");
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🌍 Server running on http://localhost:${PORT}`)
);
