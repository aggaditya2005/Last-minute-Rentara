import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Train.css";

const Train = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [classType, setClassType] = useState("sleeper");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // City autocomplete states
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [filteredFromCities, setFilteredFromCities] = useState([]);
  const [filteredToCities, setFilteredToCities] = useState([]);

  // Major Indian railway stations
  const indianStations = [
    { name: "New Delhi", code: "NDLS", state: "Delhi" },
    { name: "Mumbai Central", code: "BCT", state: "Maharashtra" },
    { name: "Howrah Junction", code: "HWH", state: "West Bengal" },
    { name: "Chennai Central", code: "MAS", state: "Tamil Nadu" },
    { name: "Bangalore City", code: "SBC", state: "Karnataka" },
    { name: "Hyderabad Deccan", code: "HYB", state: "Telangana" },
    { name: "Pune Junction", code: "PUNE", state: "Maharashtra" },
    { name: "Ahmedabad Junction", code: "ADI", state: "Gujarat" },
    { name: "Jaipur Junction", code: "JP", state: "Rajasthan" },
    { name: "Lucknow", code: "LKO", state: "Uttar Pradesh" },
    { name: "Kolkata", code: "KOAA", state: "West Bengal" },
    { name: "Patna Junction", code: "PNBE", state: "Bihar" },
    { name: "Bhopal Junction", code: "BPL", state: "Madhya Pradesh" },
    { name: "Nagpur", code: "NGP", state: "Maharashtra" },
    { name: "Indore Junction", code: "INDB", state: "Madhya Pradesh" },
    { name: "Coimbatore Junction", code: "CBE", state: "Tamil Nadu" },
    { name: "Kochi", code: "ERS", state: "Kerala" },
    { name: "Thiruvananthapuram", code: "TVC", state: "Kerala" },
    { name: "Visakhapatnam", code: "VSKP", state: "Andhra Pradesh" },
    { name: "Bhubaneswar", code: "BBS", state: "Odisha" },
    { name: "Guwahati", code: "GHY", state: "Assam" },
    { name: "Chandigarh", code: "CDG", state: "Chandigarh" },
    { name: "Amritsar Junction", code: "ASR", state: "Punjab" },
    { name: "Varanasi Junction", code: "BSB", state: "Uttar Pradesh" },
    { name: "Agra Cantt", code: "AGC", state: "Uttar Pradesh" },
    { name: "Surat", code: "ST", state: "Gujarat" },
    { name: "Rajkot Junction", code: "RJT", state: "Gujarat" },
    { name: "Jodhpur Junction", code: "JU", state: "Rajasthan" },
    { name: "Madurai Junction", code: "MDU", state: "Tamil Nadu" },
    { name: "Vijayawada Junction", code: "BZA", state: "Andhra Pradesh" }
  ].sort((a, b) => a.name.localeCompare(b.name));

  // Handle FROM station input
  const handleFromChange = (e) => {
    const value = e.target.value;
    setFrom(value);

    if (value.length > 0) {
      const filtered = indianStations.filter(station =>
        station.name.toLowerCase().includes(value.toLowerCase()) ||
        station.code.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFromCities(filtered);
      setShowFromDropdown(true);
    } else {
      setShowFromDropdown(false);
    }
  };

  // Handle TO station input
  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);

    if (value.length > 0) {
      const filtered = indianStations.filter(station =>
        station.name.toLowerCase().includes(value.toLowerCase()) ||
        station.code.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredToCities(filtered);
      setShowToDropdown(true);
    } else {
      setShowToDropdown(false);
    }
  };

  // Select FROM station
  const selectFromStation = (station) => {
    setFrom(`${station.name} (${station.code})`);
    setShowFromDropdown(false);
  };

  // Select TO station
  const selectToStation = (station) => {
    setTo(`${station.name} (${station.code})`);
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

  // Live train updates
  const [trainUpdates, setTrainUpdates] = useState([
    { id: 1, trainNo: "12301", name: "Rajdhani Express", status: "On Time", delay: 0, platform: 3 },
    { id: 2, trainNo: "12951", name: "Mumbai Rajdhani", status: "Delayed", delay: 15, platform: 7 },
    { id: 3, trainNo: "12423", name: "Dibrugarh Rajdhani", status: "On Time", delay: 0, platform: 2 },
    { id: 4, trainNo: "12302", name: "Howrah Rajdhani", status: "Running", delay: 5, platform: 4 },
    { id: 5, trainNo: "22691", name: "Rajdhani SF", status: "On Time", delay: 0, platform: 1 }
  ]);

  // Simulated train search results
  const mockTrains = [
    { id: 1, trainNo: "12301", name: "Howrah Rajdhani", departure: "06:50", arrival: "10:00", duration: "16h 10m", price: 1450, available: 23, class: "3AC" },
    { id: 2, trainNo: "12302", name: "Kolkata Rajdhani", departure: "16:55", arrival: "09:55", duration: "17h 00m", price: 1520, available: 45, class: "2AC" },
    { id: 3, trainNo: "12305", name: "Poorva Express", departure: "15:50", arrival: "16:10", duration: "24h 20m", price: 850, available: 67, class: "SL" },
    { id: 4, trainNo: "12381", name: "Poorva SF", departure: "14:30", arrival: "14:00", duration: "23h 30m", price: 920, available: 12, class: "3AC" },
  ];

  // Update train status randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setTrainUpdates(prev => prev.map(train => ({
        ...train,
        delay: Math.floor(Math.random() * 20),
        status: Math.random() > 0.7 ? "Delayed" : "On Time"
      })));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from || !to || !date) {
      alert("Please fill all fields");
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      setSearchResults(mockTrains);
      setIsSearching(false);
    }, 1500);
  };

  const handleBookNow = (train) => {
    alert(`Booking ${train.name} (${train.trainNo})\nFrom: ${from}\nTo: ${to}\nDate: ${date}\nClass: ${classType.toUpperCase()}`);
  };

  return (
    <div className="train-page">
      {/* Navbar */}
      <nav className="train-navbar">
        <div className="navbar-brand">
          <h2>Rentara</h2>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/introduction">Introduction</Link></li>
          <li><Link to="/train" className="active">Train</Link></li>
          <li><Link to="/flight">Flight</Link></li>
          <li><Link to="/bus">Bus</Link></li>
        </ul>
      </nav>

      <div className="train-container">
        {/* Main Content */}
        <div className="train-main">
          {/* Header Section */}
          <header className="train-header">
            <h1 className="train-title">Indian Railways Booking</h1>
            <p className="train-subtitle">Book your journey with confidence and comfort</p>
          </header>

          {/* Search Form */}
          <section className="search-section">
            <form className="search-form" onSubmit={handleSearch}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="from">From Station</label>
                  <input
                    type="text"
                    id="from"
                    placeholder="e.g., New Delhi"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="to">To Station</label>
                  <input
                    type="text"
                    id="to"
                    placeholder="e.g., Mumbai"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Journey Date</label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="class">Class</label>
                  <select
                    id="class"
                    value={classType}
                    onChange={(e) => setClassType(e.target.value)}
                  >
                    <option value="sleeper">Sleeper (SL)</option>
                    <option value="3ac">Third AC (3AC)</option>
                    <option value="2ac">Second AC (2AC)</option>
                    <option value="1ac">First AC (1AC)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="search-btn" disabled={isSearching}>
                {isSearching ? "Searching..." : "Search Trains"}
              </button>
            </form>
          </section>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <section className="results-section">
              <h2 className="results-title">Available Trains</h2>
              <div className="train-cards">
                {searchResults.map(train => (
                  <div key={train.id} className="train-card">
                    <div className="train-card-header">
                      <div className="train-info">
                        <h3>{train.name}</h3>
                        <p className="train-number">#{train.trainNo}</p>
                      </div>
                      <div className="train-class-badge">{train.class}</div>
                    </div>

                    <div className="train-card-body">
                      <div className="time-info">
                        <div className="time-block">
                          <span className="time">{train.departure}</span>
                          <span className="label">{from || "From"}</span>
                        </div>
                        <div className="duration">
                          <div className="duration-line"></div>
                          <span>{train.duration}</span>
                        </div>
                        <div className="time-block">
                          <span className="time">{train.arrival}</span>
                          <span className="label">{to || "To"}</span>
                        </div>
                      </div>

                      <div className="train-card-footer">
                        <div className="price-info">
                          <span className="price">₹{train.price}</span>
                          <span className="available">{train.available} seats available</span>
                        </div>
                        <button
                          className="book-btn"
                          onClick={() => handleBookNow(train)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Features Section */}
          <section className="features-section">
            <h2>Why Book with Rentara?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎫</div>
                <h3>Easy Booking</h3>
                <p>Simple and quick train ticket booking process</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💳</div>
                <h3>Secure Payments</h3>
                <p>100% secure payment gateway with multiple options</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Instant Confirmation</h3>
                <p>Get your ticket instantly via email and SMS</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3>Easy Cancellation</h3>
                <p>Hassle-free cancellation and refund process</p>
              </div>
            </div>
          </section>
        </div>

        {/* Live Updates Sidebar */}
        <aside className="train-updates-sidebar">
          <div className="updates-header">
            <h3>🚂 Live Train Status</h3>
            <span className="live-indicator">● LIVE</span>
          </div>

          <div className="updates-list">
            {trainUpdates.map(train => (
              <div key={train.id} className="update-card">
                <div className="update-header">
                  <span className="update-train-no">{train.trainNo}</span>
                  <span className={`status-badge ${train.status.toLowerCase().replace(' ', '-')}`}>
                    {train.status}
                  </span>
                </div>
                <p className="update-train-name">{train.name}</p>
                <div className="update-details">
                  <div className="update-detail">
                    <span className="detail-label">Platform:</span>
                    <span className="detail-value">{train.platform}</span>
                  </div>
                  {train.delay > 0 && (
                    <div className="update-detail delay">
                      <span className="detail-label">Delay:</span>
                      <span className="detail-value">{train.delay} min</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="updates-footer">
            <p>Updates refresh automatically</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Train;