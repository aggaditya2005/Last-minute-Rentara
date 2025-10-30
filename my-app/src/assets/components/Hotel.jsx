import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hotel.css";

const Hotel = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedHotel, setExpandedHotel] = useState(null);
  const [viewType, setViewType] = useState("grid");
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: [0, 15000],
    starRating: [],
    amenities: [],
    propertyType: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedImageHotel, setSelectedImageHotel] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Special deals
  const specialDeals = [
    { id: 1, title: "Weekend Getaway - Flat 25% OFF", code: "WEEKEND25", color: "#d32f2f" },
    { id: 2, title: "Book 3 Nights, Pay for 2!", code: "STAY3PAY2", color: "#7b1fa2" },
    { id: 3, title: "Member Special - Extra 15% OFF", code: "MEMBER15", color: "#0288d1" }
  ];

  const [currentDeal, setCurrentDeal] = useState(0);

  // Popular destinations
  const popularDestinations = [
    { city: "Goa", hotels: 1250, image: "🏖️", startingPrice: "₹1,999", rating: 4.5 },
    { city: "Jaipur", hotels: 890, image: "🏰", startingPrice: "₹2,499", rating: 4.6 },
    { city: "Shimla", hotels: 650, image: "⛰️", startingPrice: "₹3,299", rating: 4.4 },
    { city: "Kerala", hotels: 920, image: "🌴", startingPrice: "₹2,799", rating: 4.7 }
  ];

  // Trending searches
  const trendingSearches = [
    { destination: "Goa Beach Resorts", searches: "2.3k" },
    { destination: "Delhi Hotels", searches: "1.8k" },
    { destination: "Mumbai Business Hotels", searches: "1.5k" },
    { destination: "Udaipur Heritage Hotels", searches: "1.2k" }
  ];

  // Mock hotel results
  const mockHotels = [
    {
      id: 1,
      name: "The Grand Palace Hotel",
      location: "Near City Center, Goa",
      rating: 4.5,
      reviews: 2340,
      price: 5999,
      originalPrice: 7999,
      discount: 25,
      images: ["🏨", "🛏️", "🏊", "🍽️"],
      amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Parking", "Gym"],
      propertyType: "5-Star Hotel",
      description: "Luxury beachfront property with world-class amenities",
      roomType: "Deluxe Room",
      breakfast: true,
      cancellation: "Free cancellation till 24 hrs before check-in",
      available: 3,
      popular: true
    },
    {
      id: 2,
      name: "Comfort Inn Suites",
      location: "Airport Road, Goa",
      rating: 4.2,
      reviews: 1890,
      price: 3499,
      originalPrice: 4999,
      discount: 30,
      images: ["🏨", "🛏️", "🍽️", "💼"],
      amenities: ["Free WiFi", "Restaurant", "Parking", "Airport Shuttle"],
      propertyType: "3-Star Hotel",
      description: "Comfortable stays with excellent connectivity",
      roomType: "Standard Room",
      breakfast: true,
      cancellation: "Non-refundable",
      available: 8,
      popular: false
    },
    {
      id: 3,
      name: "Beachside Resort & Spa",
      location: "Calangute Beach, Goa",
      rating: 4.7,
      reviews: 3120,
      price: 8999,
      originalPrice: 11999,
      discount: 25,
      images: ["🏖️", "🏊", "💆", "🍹"],
      amenities: ["Beach Access", "Pool", "Spa", "Restaurant", "Bar", "Water Sports"],
      propertyType: "Resort",
      description: "Premium beachfront resort with private beach access",
      roomType: "Sea View Suite",
      breakfast: true,
      cancellation: "Free cancellation till 48 hrs before check-in",
      available: 2,
      popular: true
    },
    {
      id: 4,
      name: "City Heights Business Hotel",
      location: "Business District, Goa",
      rating: 4.0,
      reviews: 1450,
      price: 2999,
      originalPrice: 3999,
      discount: 25,
      images: ["🏢", "💼", "🛏️", "☕"],
      amenities: ["Free WiFi", "Conference Room", "Parking", "24/7 Service"],
      propertyType: "Business Hotel",
      description: "Perfect for business travelers with modern facilities",
      roomType: "Executive Room",
      breakfast: false,
      cancellation: "Free cancellation till 24 hrs before check-in",
      available: 12,
      popular: false
    }
  ];

  // Rotate deals
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDeal((prev) => (prev + 1) % specialDeals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!destination || !checkIn || !checkOut) {
      alert("Please fill all required fields");
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      setSearchResults(mockHotels);
      setIsSearching(false);
    }, 2000);
  };

  const handleBookNow = (hotel) => {
    const nights = calculateNights();
    const totalPrice = hotel.price * rooms * nights;
    alert(`Booking ${hotel.name}\nLocation: ${hotel.location}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nRooms: ${rooms}\nGuests: ${guests}\nNights: ${nights}\nTotal: ₹${totalPrice.toLocaleString()}`);
  };

  const toggleHotelDetails = (hotelId) => {
    setExpandedHotel(expandedHotel === hotelId ? null : hotelId);
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const sortHotels = (hotels) => {
    switch (sortBy) {
      case "price-low":
        return [...hotels].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...hotels].sort((a, b) => b.price - a.price);
      case "rating":
        return [...hotels].sort((a, b) => b.rating - a.rating);
      case "popularity":
        return [...hotels].sort((a, b) => b.reviews - a.reviews);
      default:
        return hotels;
    }
  };

  const openImageGallery = (hotel, index) => {
    setSelectedImageHotel(hotel);
    setCurrentImageIndex(index);
  };

  const closeImageGallery = () => {
    setSelectedImageHotel(null);
    setCurrentImageIndex(0);
  };

  const sortedResults = sortHotels(searchResults);

  return (
    <div className="hotel-page">
      {/* Navbar */}
      <nav className="hotel-navbar">
        <div className="navbar-brand">
          <h2>Rentara</h2>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/train">Train</Link></li>
          <li><Link to="/flight">Flight</Link></li>
          <li><Link to="/hotel" className="active">Hotel</Link></li>
        </ul>
      </nav>

      {/* Special Deals Banner */}
      <div className="deals-banner" style={{ background: specialDeals[currentDeal].color }}>
        <span className="deal-icon">🎁</span>
        <div className="deal-content">
          <p className="deal-title">{specialDeals[currentDeal].title}</p>
          <p className="deal-code">Use Code: <strong>{specialDeals[currentDeal].code}</strong></p>
        </div>
        <div className="deal-indicators">
          {specialDeals.map((_, idx) => (
            <span key={idx} className={`indicator ${idx === currentDeal ? 'active' : ''}`}></span>
          ))}
        </div>
      </div>

      <div className="hotel-container">
        {/* Main Content */}
        <div className="hotel-main">
          {/* Hero Section */}
          <section className="hotel-hero">
            <div className="hero-content">
              <h1 className="hotel-title">DISCOVER YOUR PERFECT STAY</h1>
              <p className="hotel-subtitle">From luxury resorts to budget hotels - Find the best deals on accommodation</p>
            </div>
            <div className="hero-decoration">🏨</div>
          </section>

          {/* Search Form */}
          <section className="search-section">
            <form className="search-form" onSubmit={handleSearch}>
              <div className="form-grid-hotel">
                <div className="form-group">
                  <label htmlFor="destination">
                    <span className="icon">📍</span> Destination
                  </label>
                  <input
                    type="text"
                    id="destination"
                    placeholder="City, area or hotel name"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkIn">
                    <span className="icon">📅</span> Check-in
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkOut">
                    <span className="icon">📅</span> Check-out
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rooms">
                    <span className="icon">🛏️</span> Rooms
                  </label>
                  <select
                    id="rooms"
                    value={rooms}
                    onChange={(e) => setRooms(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="guests">
                    <span className="icon">👥</span> Guests
                  </label>
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="search-btn-hotel" disabled={isSearching}>
                {isSearching ? (
                  <>
                    <span className="spinner"></span> Searching Hotels...
                  </>
                ) : (
                  "Search Hotels"
                )}
              </button>
            </form>
          </section>

          {/* Trending Searches */}
          {searchResults.length === 0 && !isSearching && (
            <section className="trending-section">
              <h3>🔥 Trending Searches</h3>
              <div className="trending-grid">
                {trendingSearches.map((trend, idx) => (
                  <div key={idx} className="trending-card">
                    <span className="trending-destination">{trend.destination}</span>
                    <span className="trending-count">{trend.searches} searches</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && (
            <section className="results-section">
              <div className="results-header">
                <div>
                  <h2>Available Hotels</h2>
                  <p className="results-count">{sortedResults.length} properties found • {calculateNights()} {calculateNights() === 1 ? 'night' : 'nights'}</p>
                </div>
                <div className="controls-group">
                  <div className="view-toggle">
                    <button
                      className={viewType === "grid" ? "active" : ""}
                      onClick={() => setViewType("grid")}
                      title="Grid View"
                    >
                      ⊞
                    </button>
                    <button
                      className={viewType === "list" ? "active" : ""}
                      onClick={() => setViewType("list")}
                      title="List View"
                    >
                      ☰
                    </button>
                  </div>
                  <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
                    🔧 Filters {showFilters ? '▲' : '▼'}
                  </button>
                  <select className="sort-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Guest Rating</option>
                  </select>
                </div>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="filters-panel-hotel">
                  <div className="filter-group">
                    <h4>Star Rating</h4>
                    <label><input type="checkbox" /> 5 Star</label>
                    <label><input type="checkbox" /> 4 Star</label>
                    <label><input type="checkbox" /> 3 Star</label>
                    <label><input type="checkbox" /> 2 Star & Below</label>
                  </div>
                  <div className="filter-group">
                    <h4>Property Type</h4>
                    <label><input type="checkbox" /> Hotels</label>
                    <label><input type="checkbox" /> Resorts</label>
                    <label><input type="checkbox" /> Villas</label>
                    <label><input type="checkbox" /> Apartments</label>
                  </div>
                  <div className="filter-group">
                    <h4>Amenities</h4>
                    <label><input type="checkbox" /> Free WiFi</label>
                    <label><input type="checkbox" /> Swimming Pool</label>
                    <label><input type="checkbox" /> Spa</label>
                    <label><input type="checkbox" /> Parking</label>
                  </div>
                  <div className="filter-group">
                    <h4>Meal Options</h4>
                    <label><input type="checkbox" /> Breakfast Included</label>
                    <label><input type="checkbox" /> All Meals</label>
                  </div>
                </div>
              )}

              <div className={`hotel-cards ${viewType}`}>
                {sortedResults.map(hotel => (
                  <div key={hotel.id} className="hotel-card-enhanced">
                    {hotel.popular && <div className="popular-badge">⭐ Popular</div>}

                    <div className="hotel-images">
                      <div className="main-image" onClick={() => openImageGallery(hotel, 0)}>
                        <span className="image-icon">{hotel.images[0]}</span>
                        <div className="image-overlay">
                          <span className="view-photos">📷 View all {hotel.images.length} photos</span>
                        </div>
                      </div>
                      <div className="thumbnail-images">
                        {hotel.images.slice(1, 4).map((img, idx) => (
                          <div
                            key={idx}
                            className="thumbnail"
                            onClick={() => openImageGallery(hotel, idx + 1)}
                          >
                            <span>{img}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="hotel-info">
                      <div className="hotel-header">
                        <div>
                          <h3>{hotel.name}</h3>
                          <p className="location">📍 {hotel.location}</p>
                          <span className="property-type">{hotel.propertyType}</span>
                        </div>
                        <div className="rating-box">
                          <div className="rating-score">{hotel.rating}</div>
                          <div className="rating-details">
                            <span className="rating-label">Excellent</span>
                            <span className="rating-reviews">{hotel.reviews} reviews</span>
                          </div>
                        </div>
                      </div>

                      <p className="description">{hotel.description}</p>

                      <div className="amenities-row">
                        {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                          <span key={idx} className="amenity-chip">✓ {amenity}</span>
                        ))}
                        {hotel.amenities.length > 4 && (
                          <span className="amenity-more">+{hotel.amenities.length - 4} more</span>
                        )}
                      </div>

                      <div className="hotel-footer">
                        <div className="price-info">
                          {hotel.discount > 0 && (
                            <>
                              <span className="original-price">₹{hotel.originalPrice.toLocaleString()}</span>
                              <span className="discount-badge">{hotel.discount}% OFF</span>
                            </>
                          )}
                          <div className="current-price">
                            <span className="price">₹{hotel.price.toLocaleString()}</span>
                            <span className="per-night">per night</span>
                          </div>
                          {hotel.breakfast && <span className="breakfast-badge">🍳 Breakfast Included</span>}
                        </div>

                        <div className="action-buttons">
                          <button
                            className="details-btn-hotel"
                            onClick={() => toggleHotelDetails(hotel.id)}
                          >
                            {expandedHotel === hotel.id ? 'Hide Details ▲' : 'View Details ▼'}
                          </button>
                          <button
                            className="book-hotel-btn"
                            onClick={() => handleBookNow(hotel)}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>

                      <div className="availability-info">
                        <span className={`availability ${hotel.available <= 3 ? 'low' : ''}`}>
                          {hotel.available <= 3 ? `⚠️ Only ${hotel.available} rooms left!` : `✓ ${hotel.available} rooms available`}
                        </span>
                        <span className="cancellation">{hotel.cancellation}</span>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedHotel === hotel.id && (
                      <div className="hotel-details-expanded">
                        <div className="details-section">
                          <h4>🏨 About This Property</h4>
                          <p><strong>Room Type:</strong> {hotel.roomType}</p>
                          <p><strong>Check-in:</strong> 2:00 PM</p>
                          <p><strong>Check-out:</strong> 11:00 AM</p>
                          <p><strong>Property Type:</strong> {hotel.propertyType}</p>
                        </div>

                        <div className="details-section">
                          <h4>✨ All Amenities</h4>
                          <div className="all-amenities">
                            {hotel.amenities.map((amenity, idx) => (
                              <span key={idx} className="amenity-tag-detail">✓ {amenity}</span>
                            ))}
                          </div>
                        </div>

                        <div className="details-section">
                          <h4>📋 Policies</h4>
                          <p><strong>Cancellation:</strong> {hotel.cancellation}</p>
                          <p><strong>Children:</strong> Children of all ages are welcome</p>
                          <p><strong>Pets:</strong> Pets are not allowed</p>
                        </div>

                        <div className="details-section">
                          <h4>💳 Price Breakdown</h4>
                          <div className="price-breakdown">
                            <div className="breakdown-row">
                              <span>₹{hotel.price} x {calculateNights()} night(s)</span>
                              <span>₹{(hotel.price * calculateNights()).toLocaleString()}</span>
                            </div>
                            <div className="breakdown-row">
                              <span>Taxes & Fees</span>
                              <span>₹{Math.round(hotel.price * calculateNights() * 0.12).toLocaleString()}</span>
                            </div>
                            <div className="breakdown-row total">
                              <span><strong>Total Amount</strong></span>
                              <span><strong>₹{(hotel.price * calculateNights() * 1.12).toLocaleString()}</strong></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Loading State */}
          {isSearching && (
            <div className="loading-skeleton">
              <div className="skeleton-card-hotel"></div>
              <div className="skeleton-card-hotel"></div>
              <div className="skeleton-card-hotel"></div>
            </div>
          )}

          {/* Popular Destinations */}
          <section className="destinations-section-hotel">
            <h2>🌟 Popular Destinations</h2>
            <div className="destinations-grid-hotel">
              {popularDestinations.map((dest, idx) => (
                <div key={idx} className="destination-card-hotel">
                  <div className="dest-image">{dest.image}</div>
                  <div className="dest-details">
                    <h3>{dest.city}</h3>
                    <p className="hotels-count">{dest.hotels} hotels</p>
                    <div className="dest-rating">⭐ {dest.rating}</div>
                    <p className="dest-starting-price">Starting from {dest.startingPrice}</p>
                    <button className="explore-btn-hotel">Explore Hotels</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Book With Us */}
          <section className="features-section-hotel">
            <h2>Why Book Hotels with Rentara?</h2>
            <div className="features-grid-hotel">
              <div className="feature-card-hotel">
                <div className="feature-icon">💰</div>
                <h3>Best Price Guarantee</h3>
                <p>Find the lowest hotel rates or we'll refund the difference</p>
              </div>
              <div className="feature-card-hotel">
                <div className="feature-icon">🔒</div>
                <h3>Secure Booking</h3>
                <p>Your personal information is always protected</p>
              </div>
              <div className="feature-card-hotel">
                <div className="feature-icon">⚡</div>
                <h3>Instant Confirmation</h3>
                <p>Get booking confirmation immediately via email</p>
              </div>
              <div className="feature-card-hotel">
                <div className="feature-icon">🎯</div>
                <h3>Flexible Cancellation</h3>
                <p>Free cancellation on most properties</p>
              </div>
              <div className="feature-card-hotel">
                <div className="feature-icon">⭐</div>
                <h3>Verified Reviews</h3>
                <p>Read authentic reviews from real guests</p>
              </div>
              <div className="feature-card-hotel">
                <div className="feature-icon">🎁</div>
                <h3>Exclusive Deals</h3>
                <p>Access members-only discounts and offers</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {selectedImageHotel && (
        <div className="gallery-modal" onClick={closeImageGallery}>
          <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-gallery" onClick={closeImageGallery}>&times;</span>
            <h3>{selectedImageHotel.name}</h3>
            <div className="gallery-main-image">
              <span className="gallery-icon">{selectedImageHotel.images[currentImageIndex]}</span>
            </div>
            <div className="gallery-thumbnails">
              {selectedImageHotel.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`gallery-thumb ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <span>{img}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel;