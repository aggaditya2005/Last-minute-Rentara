import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();
const __dirname = path.resolve();

// Load Hoteldata.json using absolute path
const hotelDataPath = path.join(__dirname, "data", "Hoteldata.json");
const hotelData = JSON.parse(fs.readFileSync(hotelDataPath, "utf-8"));

// Get all hotels
router.get("/", (req, res) => {
  res.json(hotelData.hotels);
});

// Search hotels with filters
router.get("/search", (req, res) => {
  const { city, minRating, maxPrice } = req.query;

  let results = hotelData.hotels;

  if (city) {
    results = results.filter(
      (h) => h.city.toLowerCase() === city.toLowerCase()
    );
  }

  if (minRating) {
    results = results.filter((h) => h.rating >= Number(minRating));
  }

  if (maxPrice) {
    results = results.filter((h) => h.pricePerNight <= Number(maxPrice));
  }

  res.json(results);
});

// Recommended hotels (sorted)
router.get("/recommend", (req, res) => {
  const { city } = req.query;

  let hotels = hotelData.hotels;

  if (city) {
    hotels = hotels.filter(
      (h) => h.city.toLowerCase() === city.toLowerCase()
    );
  }

  const scored = hotels
    .map((h) => ({
      ...h,
      score: (h.rating * 0.6) + ((20000 - h.pricePerNight) / 20000 * 0.3) + 0.1,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  res.json(scored);
});

export default router;
