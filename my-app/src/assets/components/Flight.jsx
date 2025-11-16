import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Flight.css";

const Flight = () => {
  const [tripType, setTripType] = useState("one-way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState("economy");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedFlight, setExpandedFlight] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    airlines: [],
    stops: [],
    priceRange: [0, 20000],
    departureTime: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("price");

  // City autocomplete states
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [filteredFromCities, setFilteredFromCities] = useState([]);
  const [filteredToCities, setFilteredToCities] = useState([]);

  // Indian cities database with airport codes
  const indianCities = [
    { name: "Mumbai", code: "BOM", state: "Maharashtra" },
    { name: "Delhi", code: "DEL", state: "Delhi" },
    { name: "Bangalore", code: "BLR", state: "Karnataka" },
    { name: "Hyderabad", code: "HYD", state: "Telangana" },
    { name: "Chennai", code: "MAA", state: "Tamil Nadu" },
    { name: "Kolkata", code: "CCU", state: "West Bengal" },
    { name: "Pune", code: "PNQ", state: "Maharashtra" },
    { name: "Ahmedabad", code: "AMD", state: "Gujarat" },
    { name: "Jaipur", code: "JAI", state: "Rajasthan" },
    { name: "Lucknow", code: "LKO", state: "Uttar Pradesh" },
    { name: "Goa", code: "GOI", state: "Goa" },
    { name: "Chandigarh", code: "IXC", state: "Chandigarh" },
    { name: "Kochi", code: "COK", state: "Kerala" },
    { name: "Coimbatore", code: "CJB", state: "Tamil Nadu" },
    { name: "Varanasi", code: "VNS", state: "Uttar Pradesh" },
    { name: "Indore", code: "IDR", state: "Madhya Pradesh" },
    { name: "Bhopal", code: "BHO", state: "Madhya Pradesh" },
    { name: "Nagpur", code: "NAG", state: "Maharashtra" },
    { name: "Surat", code: "STV", state: "Gujarat" },
    { name: "Patna", code: "PAT", state: "Bihar" },
    { name: "Bhubaneswar", code: "BBI", state: "Odisha" },
    { name: "Ranchi", code: "IXR", state: "Jharkhand" },
    { name: "Amritsar", code: "ATQ", state: "Punjab" },
    { name: "Visakhapatnam", code: "VTZ", state: "Andhra Pradesh" },
    { name: "Guwahati", code: "GAU", state: "Assam" },
    { name: "Thiruvananthapuram", code: "TRV", state: "Kerala" },
    { name: "Udaipur", code: "UDR", state: "Rajasthan" },
    { name: "Jammu", code: "IXJ", state: "Jammu & Kashmir" },
    { name: "Srinagar", code: "SXR", state: "Jammu & Kashmir" },
    { name: "Agra", code: "AGR", state: "Uttar Pradesh" }
  ].sort((a, b) => a.name.localeCompare(b.name));

  // Handle FROM city input
  const handleFromChange = (e) => {
    const value = e.target.value;
    setFrom(value);

    if (value.length > 0) {
      const filtered = indianCities.filter(city =>
        city.name.toLowerCase().startsWith(value.toLowerCase()) ||
        city.code.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredFromCities(filtered);
      setShowFromDropdown(true);
    } else {
      setShowFromDropdown(false);
    }
  };

  // Handle TO city input
  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);

    if (value.length > 0) {
      const filtered = indianCities.filter(city =>
        city.name.toLowerCase().startsWith(value.toLowerCase()) ||
        city.code.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredToCities(filtered);
      setShowToDropdown(true);
    } else {
      setShowToDropdown(false);
    }
  };

  // Select FROM city
  const selectFromCity = (city) => {
    setFrom(`${city.name} (${city.code})`);
    setShowFromDropdown(false);
  };

  // Select TO city
  const selectToCity = (city) => {
    setTo(`${city.name} (${city.code})`);
    setShowToDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.city-input-wrapper')) {
        setShowFromDropdown(false);
        setShowToDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live flight updates
  const [flightUpdates, setFlightUpdates] = useState([
    { id: 1, flightNo: "AI 101", airline: "Air India", from: "DEL", to: "BOM", status: "On Time", gate: "A12", time: "14:30" },
    { id: 2, flightNo: "6E 2134", airline: "IndiGo", from: "BLR", to: "DEL", status: "Boarding", gate: "B7", time: "15:45" },
    { id: 3, flightNo: "SG 8156", airline: "SpiceJet", from: "CCU", to: "BOM", status: "Delayed", gate: "C3", time: "16:20" },
    { id: 4, flightNo: "UK 829", airline: "Vistara", from: "DEL", to: "BLR", status: "Departed", gate: "D9", time: "13:15" },
    { id: 5, flightNo: "G8 319", airline: "GoAir", from: "HYD", to: "DEL", status: "On Time", gate: "E5", time: "17:00" }
  ]);

  // Special offers
  const specialOffers = [
    { id: 1, title: "Flat 15% OFF on Domestic Flights", code: "DOM15", color: "#ff6f00" },
    { id: 2, title: "Get ₹1000 Cashback on First Booking", code: "FIRST1000", color: "#2e7d32" },
    { id: 3, title: "International Flights - Up to 20% OFF", code: "INTL20", color: "#1976d2" }
  ];

  const [currentOffer, setCurrentOffer] = useState(0);

  // Popular destinations
  const popularDestinations = [
    { city: "Mumbai", code: "BOM", image: "🏙️", price: "₹3,499", discount: "15%" },
    { city: "Bangalore", code: "BLR", image: "🌆", price: "₹4,299", discount: "10%" },
    { city: "Goa", code: "GOI", image: "🏖️", price: "₹5,199", discount: "20%" },
    { city: "Kolkata", code: "CCU", image: "🏛️", price: "₹3,899", discount: "12%" }
  ];

  // Mock flight results with more details
  const mockFlights = [
    {
      id: 1, airline: "Air India", flightNo: "AI 101", from: "DEL", to: "BOM",
      departure: "06:00", arrival: "08:15", duration: "2h 15m", price: 4850,
      stops: "Non-stop", class: "Economy", rating: 4.2, reviews: 1240,
      baggage: { checkin: "15 kg", cabin: "7 kg" },
      amenities: ["Meal", "WiFi", "Entertainment"],
      refundable: true, seatsLeft: 12
    },
    {
      id: 2, airline: "IndiGo", flightNo: "6E 2134", from: "DEL", to: "BOM",
      departure: "09:30", arrival: "11:50", duration: "2h 20m", price: 3999,
      stops: "Non-stop", class: "Economy", rating: 4.5, reviews: 2890,
      baggage: { checkin: "15 kg", cabin: "7 kg" },
      amenities: ["Meal", "USB Charging"],
      refundable: false, seatsLeft: 23
    },
    {
      id: 3, airline: "Vistara", flightNo: "UK 829", from: "DEL", to: "BOM",
      departure: "14:15", arrival: "16:35", duration: "2h 20m", price: 5250,
      stops: "Non-stop", class: "Business", rating: 4.7, reviews: 890,
      baggage: { checkin: "30 kg", cabin: "10 kg" },
      amenities: ["Meal", "WiFi", "Entertainment", "Priority Boarding"],
      refundable: true, seatsLeft: 8
    },
    {
      id: 4, airline: "SpiceJet", flightNo: "SG 8156", from: "DEL", to: "BOM",
      departure: "18:45", arrival: "21:10", duration: "2h 25m", price: 3499,
      stops: "Non-stop", class: "Economy", rating: 4.0, reviews: 1560,
      baggage: { checkin: "15 kg", cabin: "7 kg" },
      amenities: ["Meal"],
      refundable: false, seatsLeft: 34
    },
  ];

  // Fare calendar data
  const fareCalendar = [
    { date: "Mon 6", price: 3499 },
    { date: "Tue 7", price: 3899 },
    { date: "Wed 8", price: 3299 },
    { date: "Thu 9", price: 3999 },
    { date: "Fri 10", price: 4299 },
    { date: "Sat 11", price: 4999 },
    { date: "Sun 12", price: 4799 }
  ];

  // Update flight status
  useEffect(() => {
    const interval = setInterval(() => {
      setFlightUpdates(prev => prev.map(flight => {
        const statuses = ["On Time", "Boarding", "Delayed", "Departed"];
        return {
          ...flight,
          status: statuses[Math.floor(Math.random() * statuses.length)]
        };
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Rotate special offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % specialOffers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from || !to || !departDate) {
      alert("Please fill all required fields");
      return;
    }
    if (tripType === "round-trip" && !returnDate) {
      alert("Please select return date");
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      setSearchResults(mockFlights);
      setIsSearching(false);
    }, 2000);
  };

  const handleBookNow = (flight) => {
    alert(`Booking ${flight.airline} (${flight.flightNo})\nFrom: ${from || flight.from}\nTo: ${to || flight.to}\nDate: ${departDate}\nPassengers: ${passengers}\nClass: ${classType}\nTotal: ₹${flight.price * passengers}`);
  };

  const toggleFlightDetails = (flightId) => {
    setExpandedFlight(expandedFlight === flightId ? null : flightId);
  };

  const sortFlights = (flights) => {
    switch (sortBy) {
      case "price":
        return [...flights].sort((a, b) => a.price - b.price);
      case "duration":
        return [...flights].sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
      case "rating":
        return [...flights].sort((a, b) => b.rating - a.rating);
      default:
        return flights;
    }
  };

  const sortedResults = sortFlights(searchResults);

  return (
    <div className="flight-page">
      {/* Navbar */}
      <nav className="flight-navbar">
        <div className="navbar-brand">
          <h2>Rentara</h2>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/train">Train</Link></li>
          <li><Link to="/flight" className="active">Flight</Link></li>
          <li><Link to="/flightSearch">Best Prices</Link></li>
          <li><Link to="/hotel">Hotel</Link></li>
          <li><Link to="/create">Create</Link></li>
          <li><Link to="/aIChatBot">Chatbot</Link></li>
          <li><Link to="/hotelRecommend">Hotel Plan</Link></li>

        </ul>
      </nav>

      {/* Special Offers Banner */}
      <div className="offers-banner" style={{ background: specialOffers[currentOffer].color }}>
        <span className="offer-icon">🎉</span>
        <div className="offer-content">
          <p className="offer-title">{specialOffers[currentOffer].title}</p>
          <p className="offer-code">Use Code: <strong>{specialOffers[currentOffer].code}</strong></p>
        </div>
        <div className="offer-indicators">
          {specialOffers.map((_, idx) => (
            <span key={idx} className={`indicator ${idx === currentOffer ? 'active' : ''}`}></span>
          ))}
        </div>
      </div>

      <div className="flight-container">
        {/* Main Content */}
        <div className="flight-main">
          {/* Hero Section */}
          <section className="flight-hero">
            <div className="hero-content">
              <h1 className="flight-title">INTERNATIONAL & DOMESTIC FLIGHTS</h1>
              <p className="flight-subtitle">Discover your next adventure with the best flight deals</p>
            </div>
            <div className="hero-decoration">✈️</div>
          </section>

          {/* Search Form */}
          <section className="search-section">
            <div className="trip-type-selector">
              <button
                className={tripType === "one-way" ? "active" : ""}
                onClick={() => setTripType("one-way")}
              >
                One Way
              </button>
              <button
                className={tripType === "round-trip" ? "active" : ""}
                onClick={() => setTripType("round-trip")}
              >
                Round Trip
              </button>
              <button
                className={tripType === "multi-city" ? "active" : ""}
                onClick={() => setTripType("multi-city")}
              >
                Multi City
              </button>
            </div>

            <form className="search-form" onSubmit={handleSearch}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="from">
                    <span className="icon">🛫</span> From
                  </label>
                  <input
                    type="text"
                    id="from"
                    placeholder="e.g., New Delhi (DEL)"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="to">
                    <span className="icon">🛬</span> To
                  </label>
                  <input
                    type="text"
                    id="to"
                    placeholder="e.g., Mumbai (BOM)"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="departDate">
                    <span className="icon">📅</span> Departure
                  </label>
                  <input
                    type="date"
                    id="departDate"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                {tripType === "round-trip" && (
                  <div className="form-group">
                    <label htmlFor="returnDate">
                      <span className="icon">📅</span> Return
                    </label>
                    <input
                      type="date"
                      id="returnDate"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={departDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="passengers">
                    <span className="icon">👥</span> Passengers
                  </label>
                  <select
                    id="passengers"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="class">
                    <span className="icon">💺</span> Class
                  </label>
                  <select
                    id="class"
                    value={classType}
                    onChange={(e) => setClassType(e.target.value)}
                  >
                    <option value="economy">Economy</option>
                    <option value="premium-economy">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="search-btn" disabled={isSearching}>
                {isSearching ? (
                  <>
                    <span className="spinner"></span> Searching Flights...
                  </>
                ) : (
                  "Search Flights"
                )}
              </button>
            </form>
          </section>

          {/* Fare Calendar */}
          {searchResults.length > 0 && (
            <section className="fare-calendar-section">
              <h3>💰 Cheapest Fares This Week</h3>
              <div className="fare-calendar">
                {fareCalendar.map((day, idx) => (
                  <div key={idx} className={`calendar-day ${idx === 2 ? 'cheapest' : ''}`}>
                    <span className="calendar-date">{day.date}</span>
                    <span className="calendar-price">₹{day.price}</span>
                    {idx === 2 && <span className="best-deal-badge">Best Deal!</span>}
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
                  <h2>Available Flights</h2>
                  <p className="results-count">{sortedResults.length} flights found</p>
                </div>
                <div className="sort-filter-controls">
                  <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
                    🔧 Filters {showFilters ? '▲' : '▼'}
                  </button>
                  <select className="sort-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="price">Sort by: Price (Low to High)</option>
                    <option value="duration">Sort by: Duration</option>
                    <option value="rating">Sort by: Rating</option>
                  </select>
                </div>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="filters-panel">
                  <div className="filter-group">
                    <h4>Airlines</h4>
                    <label><input type="checkbox" /> Air India</label>
                    <label><input type="checkbox" /> IndiGo</label>
                    <label><input type="checkbox" /> Vistara</label>
                    <label><input type="checkbox" /> SpiceJet</label>
                  </div>
                  <div className="filter-group">
                    <h4>Stops</h4>
                    <label><input type="checkbox" /> Non-stop</label>
                    <label><input type="checkbox" /> 1 Stop</label>
                    <label><input type="checkbox" /> 2+ Stops</label>
                  </div>
                  <div className="filter-group">
                    <h4>Departure Time</h4>
                    <label><input type="checkbox" /> Morning (6AM - 12PM)</label>
                    <label><input type="checkbox" /> Afternoon (12PM - 6PM)</label>
                    <label><input type="checkbox" /> Evening (6PM - 12AM)</label>
                  </div>
                </div>
              )}

              <div className="flight-cards">
                {sortedResults.map(flight => (
                  <div key={flight.id} className="flight-card-enhanced">
                    <div className="flight-card-main">
                      <div className="flight-card-left">
                        <div className="airline-info">
                          <div className="airline-logo">{flight.airline.charAt(0)}</div>
                          <div>
                            <h3>{flight.airline}</h3>
                            <p className="flight-number">{flight.flightNo}</p>
                            <div className="rating">
                              <span className="stars">⭐ {flight.rating}</span>
                              <span className="reviews">({flight.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flight-card-center">
                        <div className="flight-time-info">
                          <div className="time-block">
                            <span className="time">{flight.departure}</span>
                            <span className="airport">{flight.from}</span>
                          </div>

                          <div className="flight-duration">
                            <span className="duration-text">{flight.duration}</span>
                            <div className="flight-path">
                              <div className="path-line"></div>
                              <div className="plane-icon">✈️</div>
                            </div>
                            <span className="stops">{flight.stops}</span>
                          </div>

                          <div className="time-block">
                            <span className="time">{flight.arrival}</span>
                            <span className="airport">{flight.to}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flight-card-right">
                        <div className="price-section">
                          <span className="price">₹{flight.price.toLocaleString()}</span>
                          <span className="per-person">per person</span>
                          {flight.refundable && <span className="refundable-badge">✓ Refundable</span>}
                        </div>
                        <button
                          className="book-flight-btn"
                          onClick={() => handleBookNow(flight)}
                        >
                          Book Now
                        </button>
                        <p className="seats-left">{flight.seatsLeft} seats left</p>
                        <button
                          className="details-btn"
                          onClick={() => toggleFlightDetails(flight.id)}
                        >
                          {expandedFlight === flight.id ? 'Hide Details ▲' : 'View Details ▼'}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedFlight === flight.id && (
                      <div className="flight-details-expanded">
                        <div className="details-section">
                          <h4>✈️ Flight Information</h4>
                          <p><strong>Aircraft:</strong> Boeing 737-800</p>
                          <p><strong>Flight Duration:</strong> {flight.duration}</p>
                        </div>
                        <div className="details-section">
                          <h4>🧳 Baggage</h4>
                          <p><strong>Check-in:</strong> {flight.baggage.checkin}</p>
                          <p><strong>Cabin:</strong> {flight.baggage.cabin}</p>
                        </div>
                        <div className="details-section">
                          <h4>🎯 Amenities</h4>
                          <div className="amenities-list">
                            {flight.amenities.map((amenity, idx) => (
                              <span key={idx} className="amenity-tag">{amenity}</span>
                            ))}
                          </div>
                        </div>
                        <div className="details-section">
                          <h4>📋 Fare Rules</h4>
                          <p className="fare-rule">
                            {flight.refundable
                              ? "✓ Cancellation allowed with charges"
                              : "✗ Non-refundable ticket"}
                          </p>
                          <button className="fare-details-btn">View Full Fare Breakdown</button>
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
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
            </div>
          )}

          {/* Popular Destinations */}
          <section className="destinations-section">
            <h2>✈️ Popular Destinations</h2>
            <div className="destinations-grid">
              {popularDestinations.map((dest, idx) => (
                <div key={idx} className="destination-card">
                  <div className="discount-badge">{dest.discount} OFF</div>
                  <div className="dest-icon">{dest.image}</div>
                  <h3>{dest.city}</h3>
                  <p className="dest-code">{dest.code}</p>
                  <p className="dest-price">Starting from {dest.price}</p>
                  <button className="explore-btn">Explore Flights</button>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="features-section">
            <h2>Why Book with Rentara?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h3>Best Price Guarantee</h3>
                <p>We ensure you get the lowest fares available</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure Booking</h3>
                <p>SSL encrypted transactions for your safety</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Instant Confirmation</h3>
                <p>Get your ticket instantly via email & SMS</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎫</div>
                <h3>Easy Cancellation</h3>
                <p>Flexible cancellation & refund policy</p>
              </div>
            </div>
          </section>
        </div>

        {/* Live Updates Sidebar */}
        <aside className="flight-updates-sidebar">
          <div className="updates-header">
            <h3>✈️ Live Flight Status</h3>
            <span className="live-indicator">● LIVE</span>
          </div>

          <div className="updates-list">
            {flightUpdates.map(flight => (
              <div key={flight.id} className="update-card">
                <div className="update-main">
                  <div className="update-flight-info">
                    <span className="update-flight-no">{flight.flightNo}</span>
                    <span className={`status-badge ${flight.status.toLowerCase().replace(' ', '-')}`}>
                      {flight.status}
                    </span>
                  </div>
                  <p className="update-airline">{flight.airline}</p>
                </div>

                <div className="update-route">
                  <span className="route-airport">{flight.from}</span>
                  <span className="route-arrow">→</span>
                  <span className="route-airport">{flight.to}</span>
                </div>

                <div className="update-details">
                  <div className="update-detail">
                    <span className="detail-label">Gate:</span>
                    <span className="detail-value">{flight.gate}</span>
                  </div>
                  <div className="update-detail">
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">{flight.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="updates-footer">
            <p>Updates refresh every 10 seconds</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Flight;