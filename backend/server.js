import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; // Import path for absolute path resolution

// --- Start Path and ENV Resolution Fix ---
// Get the absolute path to the project root
const __dirname = path.resolve();

// Load environment variables using the absolute path to the .env file
dotenv.config({ path: path.resolve(__dirname, 'backend', '.env') });
// --- End Path and ENV Resolution Fix ---


// --- Route Imports (assuming these files exist) ---
import flightRoutes from "./routes/flightRoutes.js";
import mlRoutes from "./routes/mlRoutes.js";
// You will need to create hotelRoutes, busRoutes, etc. later
// import hotelRoutes from "./routes/hotelRoutes.js";
// ----------------------------------------------------


const app = express();

// --- MongoDB connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// --- Middleware ---
// CORS (Allows your React frontend to communicate with this backend)
app.use(cors());
// Body parser for JSON data
app.use(express.json());

// --- API Routes ---
// Standard data retrieval routes
app.use("/api/flights", flightRoutes);
// app.use("/api/hotels", hotelRoutes); 

// AI/ML Prediction routes
app.use("/api/ai", mlRoutes);


// --- Default Route ---
app.get("/", (req, res) => {
  res.send("🚀 Rentara Backend API Running: Ready for Booking and AI Predictions.");
});


// --- Server Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running on http://localhost:${PORT}`));
