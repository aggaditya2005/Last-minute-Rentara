import React, { useEffect, useState } from "react";
import "./HotelRecommend.css";

export default function HotelRecommend() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Full hotel data
  const allHotels = [
    {
      id: "DL001",
      name: "The Leela Palace",
      city: "Delhi",
      location: "Chanakyapuri",
      rating: 4.8,
      pricePerNight: 12500,
      propertyType: "Luxury Hotel",
      amenities: ["Free WiFi", "Spa", "Pool", "Gym", "Restaurant"],
      nearbyAttractions: [{ place: "India Gate", distanceKm: 3.2 }],
      mealPlan: "Breakfast Included",
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      reviews: [
        "Beautiful luxury hotel with exceptional service.",
        "Rooms are stunning and extremely comfortable.",
        "Breakfast variety and taste were excellent."
      ],
      address: "Chanakyapuri, New Delhi, Delhi"
    },
    {
      id: "DL002",
      name: "ITC Maurya",
      city: "Delhi",
      location: "Diplomatic Enclave",
      rating: 4.7,
      pricePerNight: 9000,
      propertyType: "Premium Hotel",
      amenities: ["Pool", "Restaurant", "Spa", "Bar"],
      nearbyAttractions: [{ place: "Rashtrapati Bhavan", distanceKm: 2.1 }],
      mealPlan: "Breakfast Included",
      image: "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg",
      reviews: [
        "Great hotel with amazing food options.",
        "Warm hospitality and well-maintained rooms.",
        "Very peaceful and secure location."
      ],
      address: "Diplomatic Enclave, New Delhi, Delhi"
    },
    {
      id: "DL003",
      name: "Radisson Blu Plaza",
      city: "Delhi",
      location: "Mahipalpur",
      rating: 4.4,
      pricePerNight: 5800,
      propertyType: "Business Hotel",
      amenities: ["Free WiFi", "Pool", "Airport Shuttle"],
      nearbyAttractions: [{ place: "Aerocity", distanceKm: 2.5 }],
      mealPlan: "Room Only",
      image: "https://images.pexels.com/photos/261187/pexels-photo-261187.jpeg",
      reviews: [
        "Convenient for airport travel, clean rooms.",
        "Buffet breakfast was very enjoyable.",
        "Perfect for business stays."
      ],
      address: "Mahipalpur, New Delhi, Delhi"
    },
    {
      id: "MB001",
      name: "Trident Nariman Point",
      city: "Mumbai",
      location: "Nariman Point",
      rating: 4.7,
      pricePerNight: 14000,
      propertyType: "Sea View Luxury Hotel",
      amenities: ["Sea View", "Pool", "Spa", "Restaurant"],
      nearbyAttractions: [{ place: "Marine Drive", distanceKm: 0.1 }],
      mealPlan: "Breakfast Included",
      image: "https://images.pexels.com/photos/261187/pexels-photo-261187.jpeg",
      reviews: [
        "Amazing sea views and peaceful environment.",
        "Best location in Mumbai for tourists.",
        "Rooms are elegant and well-designed."
      ],
      address: "Nariman Point, Mumbai, Maharashtra"
    },
    {
      id: "MB002",
      name: "The Taj Mahal Palace",
      city: "Mumbai",
      location: "Colaba",
      rating: 4.9,
      pricePerNight: 21000,
      propertyType: "Luxury Palace Hotel",
      amenities: ["Pool", "Historic Property", "Spa", "Fine Dining"],
      nearbyAttractions: [{ place: "Gateway of India", distanceKm: 0.2 }],
      mealPlan: "Breakfast Included",
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
      reviews: [
        "Iconic hotel with stunning architecture.",
        "Exceptional hospitality and ambience.",
        "Feels incredibly royal and luxurious."
      ],
      address: "Colaba, Mumbai, Maharashtra"
    },
    {
      id: "BN001",
      name: "Taj West End",
      city: "Bangalore",
      location: "Race Course Road",
      rating: 4.6,
      pricePerNight: 10500,
      propertyType: "Heritage Luxury Hotel",
      amenities: ["Garden", "Pool", "Spa", "Free WiFi"],
      nearbyAttractions: [{ place: "Cubbon Park", distanceKm: 1.4 }],
      mealPlan: "Breakfast Included",
      image: "https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg",
      reviews: [
        "Feels like a forest retreat inside the city.",
        "Exceptional hospitality and peaceful surroundings.",
        "Rooms are elegant and spacious."
      ],
      address: "Race Course Road, Bangalore, Karnataka"
    },
    {
      id: "BN002",
      name: "The Oberoi Bengaluru",
      city: "Bangalore",
      location: "MG Road",
      rating: 4.8,
      pricePerNight: 12500,
      propertyType: "Luxury Hotel",
      amenities: ["Pool", "Spa", "Restaurant", "Butler Service"],
      nearbyAttractions: [{ place: "UB City", distanceKm: 2.0 }],
      mealPlan: "Breakfast Included",
      image: "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/273576011.jpg?k=545ee24ebde7c32e071164b64ee8ff8e6327a78a3e375dd7f8d39afc427c8dc3&o=",
      reviews: [
        "Beautiful gardens and amazing ambience.",
        "Top quality service as expected from Oberoi.",
        "Perfect for a luxury getaway."
      ],
      address: "MG Road, Bangalore, Karnataka"
    },
    {
      id: "JP001",
      name: "Rambagh Palace",
      city: "Jaipur",
      location: "Bhawani Singh Road",
      rating: 4.9,
      pricePerNight: 20000,
      propertyType: "Palace Hotel",
      amenities: ["Garden Suites", "Spa", "Fine Dining"],
      nearbyAttractions: [{ place: "Hawa Mahal", distanceKm: 3.6 }],
      mealPlan: "Breakfast Included",
      image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
      reviews: [
        "Magnificent palace experience.",
        "Everything feels royal and grand.",
        "Perfect for honeymoon stays."
      ],
      address: "Bhawani Singh Road, Jaipur, Rajasthan"
    },
    {
      id: "GO001",
      name: "Taj Exotica Resort & Spa",
      city: "Goa",
      location: "Benaulim",
      rating: 4.8,
      pricePerNight: 18500,
      propertyType: "Beach Resort",
      amenities: ["Private Beach", "Pool", "Spa"],
      nearbyAttractions: [{ place: "Colva Beach", distanceKm: 3.5 }],
      mealPlan: "Breakfast Included",
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
      reviews: [
        "Fantastic beach access.",
        "Rooms are luxurious and spacious.",
        "Perfect place to relax."
      ],
      address: "Benaulim, Goa"
    },
    {
      id: "GO002",
      name: "W Goa",
      city: "Goa",
      location: "Vagator Beach",
      rating: 4.6,
      pricePerNight: 16000,
      propertyType: "Luxury Beach Hotel",
      amenities: ["Pool", "Spa", "Nightlife"],
      nearbyAttractions: [{ place: "Chapora Fort", distanceKm: 1.5 }],
      mealPlan: "Breakfast Included",
      image: "https://images.pexels.com/photos/537109/pexels-photo-537109.jpeg",
      reviews: [
        "Trendy vibe and great nightlife.",
        "Rooms are artistically designed.",
        "Super close to the beach."
      ],
      address: "Vagator Beach, Goa"
    },
    {
      id: "HY001",
      name: "Taj Falaknuma Palace",
      city: "Hyderabad",
      location: "Falaknuma",
      rating: 4.9,
      pricePerNight: 18000,
      propertyType: "Palace Hotel",
      amenities: ["Palace Tour", "Spa", "Fine Dining", "Heritage Property"],
      nearbyAttractions: [{ place: "Charminar", distanceKm: 4.2 }],
      mealPlan: "Breakfast Included",
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
      reviews: [
        "A truly royal experience, felt like a Nizam.",
        "Views and architecture are breathtaking.",
        "Staff is extremely courteous and warm."
      ],
      address: "Falaknuma, Hyderabad, Telangana"
    },
    {
      id: "UD001",
      name: "The Oberoi Udaivilas",
      city: "Udaipur",
      location: "Lake Pichola",
      rating: 4.9,
      pricePerNight: 26000,
      propertyType: "Luxury Lake Resort",
      amenities: ["Pool", "Lake View", "Spa", "Fine Dining"],
      nearbyAttractions: [{ place: "City Palace", distanceKm: 3.5 }],
      mealPlan: "Breakfast Included",
      image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
      reviews: [
        "One of the most beautiful hotels in India.",
        "Royal experience with top-notch service.",
        "Rooms and views are breathtaking."
      ],
      address: "Lake Pichola, Udaipur, Rajasthan"
    }
  ];

  const fetchRecommended = async (selectedCity = "") => {
    try {
      setLoading(true);
      // Simulating API call with actual data
      await new Promise(resolve => setTimeout(resolve, 800));

      const filteredHotels = selectedCity
        ? allHotels.filter(h => h.city.toLowerCase().includes(selectedCity.toLowerCase()))
        : allHotels;

      setHotels(filteredHotels);
      setError(null);
    } catch (err) {
      setError("Failed to load hotels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommended();
  }, []);

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
  };

  const closeModal = () => {
    setSelectedHotel(null);
  };

  return (
    <div className="hotel-recommend-container">
      <div className="hotel-recommend-wrapper">
        <h1 className="hotel-main-title">
          ✨ Recommended Hotels For You
        </h1>

        {/* City Filter */}
        <div className="hotel-filter-section">
          <input
            type="text"
            placeholder="Enter city (e.g., Delhi, Mumbai, Goa)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="hotel-search-input"
          />
          <button
            onClick={() => fetchRecommended(city)}
            className="hotel-search-btn"
          >
            Search
          </button>
          <button
            onClick={() => {
              setCity("");
              fetchRecommended();
            }}
            className="hotel-clear-btn"
          >
            Clear
          </button>
        </div>

        {loading && (
          <p className="hotel-loading">
            Loading recommendations...
          </p>
        )}

        {error && (
          <p className="hotel-error">
            {error}
          </p>
        )}

        {!loading && hotels.length === 0 && (
          <p className="hotel-no-results">
            No hotels found for "{city}". Try a different city!
          </p>
        )}

        {/* Hotel Grid */}
        <div className="hotel-grid">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              onClick={() => handleHotelClick(hotel)}
              className="hotel-card"
            >
              <div className="hotel-image-container">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="hotel-image"
                />
                <div className="hotel-rating-badge">
                  ⭐ {hotel.rating}
                </div>
              </div>

              <div className="hotel-card-content">
                <h2 className="hotel-card-title">
                  {hotel.name}
                </h2>
                <p className="hotel-card-city">
                  📍 {hotel.city} • {hotel.location}
                </p>
                <p className="hotel-card-price">
                  ₹{hotel.pricePerNight.toLocaleString()}
                  <span className="hotel-card-price-sub">/night</span>
                </p>

                <div className="hotel-amenities-container">
                  {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="hotel-amenity-badge"
                    >
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <span className="hotel-amenity-badge hotel-amenity-badge-more">
                      +{hotel.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <button className="hotel-view-details-btn">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Hotel Details */}
        {selectedHotel && (
          <div
            className="hotel-modal-overlay"
            onClick={closeModal}
          >
            <div
              className="hotel-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="hotel-modal-header-image">
                <img
                  src={selectedHotel.image}
                  alt={selectedHotel.name}
                />
                <button
                  onClick={closeModal}
                  className="hotel-modal-close-btn"
                >
                  ✕
                </button>
                <div className="hotel-modal-rating-badge">
                  ⭐ {selectedHotel.rating}
                </div>
              </div>

              {/* Content */}
              <div className="hotel-modal-body">
                <h2 className="hotel-modal-title">
                  {selectedHotel.name}
                </h2>
                <p className="hotel-modal-address">
                  📍 {selectedHotel.address}
                </p>

                {/* Property Type Badge */}
                <div style={{ marginBottom: "1rem" }}>
                  <span style={{
                    display: "inline-block",
                    backgroundColor: "#e0e7ff",
                    color: "#4338ca",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: "600"
                  }}>
                    {selectedHotel.propertyType}
                  </span>
                </div>

                {/* Price */}
                <div className="hotel-price-box">
                  <p className="hotel-price-large">
                    ₹{selectedHotel.pricePerNight.toLocaleString()}
                    <span className="hotel-price-large-sub">/night</span>
                  </p>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                    {selectedHotel.mealPlan}
                  </p>
                </div>

                {/* Nearby Attractions */}
                {selectedHotel.nearbyAttractions && selectedHotel.nearbyAttractions.length > 0 && (
                  <div className="hotel-modal-section">
                    <h3 className="hotel-section-title">Nearby Attractions</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                      {selectedHotel.nearbyAttractions.map((attraction, idx) => (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: "#f9fafb",
                            padding: "0.75rem 1rem",
                            borderRadius: "0.5rem",
                            fontSize: "0.875rem"
                          }}
                        >
                          <span style={{ fontWeight: "600", color: "#374151" }}>
                            {attraction.place}
                          </span>
                          <span style={{ color: "#6b7280", marginLeft: "0.5rem" }}>
                            ({attraction.distanceKm} km)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Amenities */}
                <div className="hotel-modal-section">
                  <h3 className="hotel-section-title">Amenities</h3>
                  <div className="hotel-modal-amenities-grid">
                    {selectedHotel.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="hotel-amenity-item"
                      >
                        <span className="hotel-amenity-check">✓</span>
                        <span className="hotel-amenity-text">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div className="hotel-modal-section">
                  <h3 className="hotel-section-title">
                    Guest Reviews
                  </h3>
                  <div className="hotel-reviews-list">
                    {selectedHotel.reviews.map((review, idx) => (
                      <div
                        key={idx}
                        className="hotel-review-item"
                      >
                        <p className="hotel-review-text">"{review}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="hotel-action-buttons">
                  <button className="hotel-book-btn">
                    Book Now
                  </button>
                  <button
                    onClick={closeModal}
                    className="hotel-close-modal-btn"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}