import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./HotelRecommend.css";

export default function HotelRecommend() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  const fetchRecommended = async (selectedCity = "") => {
    try {
      setLoading(true);
      const url = selectedCity
        ? `http://localhost:5000/api/hotels/recommend?city=${selectedCity}`
        : "http://localhost:5000/api/hotels/recommend";

      const res = await fetch(url);
      const data = await res.json();
      setHotels(data);
    } catch (err) {
      setError("Failed to load hotels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommended();
  }, []);

  return (
    <div className="hotel-container">
      <h1 className="hotel-title">🏨 Recommended Hotels For You</h1>

      {/* City Filter */}
      <div className="hotel-filter">
        <input
          type="text"
          placeholder="Enter city (e.g., Delhi, Goa)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchRecommended(city)}>Search</button>
      </div>

      {loading && <p className="loading">Loading recommendations...</p>}
      {error && <p className="error">{error}</p>}

      <div className="hotel-grid">
        {hotels.map((hotel) => (
          <div className="hotel-card" key={hotel.id}>
            <img src={hotel.image} alt={hotel.name} className="hotel-img" />
            <div className="hotel-info">
              <h2>{hotel.name}</h2>
              <p className="hotel-city">📍 {hotel.city}</p>
              <p className="hotel-price">💰 ₹{hotel.pricePerNight}/night</p>
              <p className="hotel-rating">⭐ {hotel.rating}</p>

              <h4>Reviews:</h4>
              <ul>
                {hotel.reviews.slice(0, 2).map((review, idx) => (
                  <li key={idx}>{review}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
