// backend/routes/hotels.js
import express from "express";
import hotelData from "../data/Hoteldata.json" assert { type: "json" };

const router = express.Router();

// Get all hotels
router.get("/hotels", (req, res) => {
  res.json(hotelData.hotels);
});

export default router;
