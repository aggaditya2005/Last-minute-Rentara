import React, { useState } from 'react';
import './Create.css';
import { cityDatabase, getCityData } from './cityDatabase';

const Create = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    travelMode: '',
    airline: '',
    trainType: '',
    sourceCity: '',
    destinationCity: '',
    departureDate: '',
    returnDate: '',
    hotelName: '',
    tripDuration: ''
  });
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  const airlines = ['Air Asia', 'Air India', 'Go First', 'IndiGo', 'SpiceJet', 'Vistara', 'Qatar Airways', 'Emirates', 'Singapore Airlines'];
  const trainTypes = ['Shatabdi', 'Rajdhani', 'Duronto', 'Garib Rath', 'AC Express', 'Jan Shatabdi'];
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa', 'Kochi', 'Chandigarh', 'Lucknow', 'Indore', 'Bhopal'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.travelMode) {
      alert('Please select a mode of travel');
      return;
    }
    if (step === 2) {
      if (formData.travelMode === 'flight' && (!formData.airline || !formData.sourceCity || !formData.destinationCity || !formData.departureDate || !formData.returnDate)) {
        alert('Please fill all flight details');
        return;
      }
      if (formData.travelMode === 'train' && (!formData.trainType || !formData.sourceCity || !formData.destinationCity || !formData.departureDate || !formData.returnDate)) {
        alert('Please fill all train details');
        return;
      }
    }
    if (step === 3 && (!formData.hotelName || !formData.tripDuration)) {
      alert('Please fill hotel name and trip duration');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const generateItinerary = () => {
    setLoading(true);
    setTimeout(() => {
      const cityData = getCityData(formData.destinationCity);
      const days = parseInt(formData.tripDuration);
      const dailyPlan = [];

      for (let i = 1; i <= days; i++) {
        const dayAttractions = [];
        const attractionsPerDay = Math.min(3, cityData.attractions.length);

        for (let j = 0; j < attractionsPerDay; j++) {
          const index = ((i - 1) * attractionsPerDay + j) % cityData.attractions.length;
          dayAttractions.push(cityData.attractions[index]);
        }

        dailyPlan.push({
          day: i,
          attractions: dayAttractions
        });
      }

      setItinerary({
        destination: formData.destinationCity,
        duration: days,
        dailyPlan,
        cityData
      });
      setLoading(false);
      setStep(4);
    }, 2000);
  };

  return (
    <div className="itinerary-container">
      {/* Header */}
      <div className="itinerary-header">
        <h1 className="header-title">Create Your Perfect Itinerary</h1>
        <p className="header-subtitle">Plan your dream vacation with personalized recommendations</p>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        {[
          { num: 1, label: 'Travel Mode' },
          { num: 2, label: 'Journey Details' },
          { num: 3, label: 'Accommodation' },
          { num: 4, label: 'Your Itinerary' }
        ].map((item, idx) => (
          <React.Fragment key={item.num}>
            <div className="progress-step">
              <div className={`step-circle ${step >= item.num ? 'active' : 'inactive'}`}>
                {item.num}
              </div>
              <span className="progress-label">{item.label}</span>
            </div>
            {idx < 3 && (
              <div className={`progress-line ${step > item.num ? 'active' : 'inactive'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Container */}
      <div className="form-container">
        {/* Step 1: Travel Mode */}
        {step === 1 && (
          <div>
            <h2 className="step-title">Select Your Mode of Travel</h2>
            <div className="travel-mode-options">
              <div
                className={`mode-card ${formData.travelMode === 'flight' ? 'selected' : 'unselected'}`}
                onClick={() => setFormData(prev => ({ ...prev, travelMode: 'flight' }))}
              >
                <div className="mode-icon">✈️</div>
                <h3>Flight</h3>
                <p>Fast and convenient air travel</p>
              </div>
              <div
                className={`mode-card ${formData.travelMode === 'train' ? 'selected' : 'unselected'}`}
                onClick={() => setFormData(prev => ({ ...prev, travelMode: 'train' }))}
              >
                <div className="mode-icon">🚂</div>
                <h3>Train</h3>
                <p>Scenic and comfortable journey</p>
              </div>
            </div>
            <div className="button-group">
              <button className="btn btn-primary" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {/* Step 2: Flight Details */}
        {step === 2 && formData.travelMode === 'flight' && (
          <div>
            <h2 className="step-title">Flight Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Select Airline</label>
                <select name="airline" value={formData.airline} onChange={handleInputChange} className="form-input">
                  <option value="">Choose airline</option>
                  {airlines.map(airline => (
                    <option key={airline} value={airline}>{airline}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Source City</label>
                <select name="sourceCity" value={formData.sourceCity} onChange={handleInputChange} className="form-input">
                  <option value="">Choose source</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Destination City</label>
                <select name="destinationCity" value={formData.destinationCity} onChange={handleInputChange} className="form-input">
                  <option value="">Choose destination</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Departure Date</label>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
            <div className="button-group">
              <button className="btn btn-secondary" onClick={handleBack}>Back</button>
              <button className="btn btn-primary" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {/* Step 2: Train Details */}
        {step === 2 && formData.travelMode === 'train' && (
          <div>
            <h2 className="step-title">Train Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Select Train Type</label>
                <select name="trainType" value={formData.trainType} onChange={handleInputChange} className="form-input">
                  <option value="">Choose train type</option>
                  {trainTypes.map(train => (
                    <option key={train} value={train}>{train}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Source City</label>
                <select name="sourceCity" value={formData.sourceCity} onChange={handleInputChange} className="form-input">
                  <option value="">Choose source</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Destination City</label>
                <select name="destinationCity" value={formData.destinationCity} onChange={handleInputChange} className="form-input">
                  <option value="">Choose destination</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Departure Date</label>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
            <div className="button-group">
              <button className="btn btn-secondary" onClick={handleBack}>Back</button>
              <button className="btn btn-primary" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {/* Step 3: Accommodation */}
        {step === 3 && (
          <div>
            <h2 className="step-title">Accommodation Details</h2>
            <div className="form-grid">
              <div className="form-group-full">
                <label className="form-label">Hotel Name</label>
                <input
                  type="text"
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleInputChange}
                  placeholder="Enter your hotel name"
                  className="form-input"
                />
              </div>

              <div className="form-group-full">
                <label className="form-label">Trip Duration (in days)</label>
                <input
                  type="number"
                  name="tripDuration"
                  value={formData.tripDuration}
                  onChange={handleInputChange}
                  placeholder="Enter number of days"
                  min="1"
                  max="30"
                  className="form-input"
                />
              </div>
            </div>
            <div className="button-group">
              <button className="btn btn-secondary" onClick={handleBack}>Back</button>
              <button className="btn btn-primary" onClick={generateItinerary}>Generate Itinerary</button>
            </div>
          </div>
        )}

        {/* Step 4: Generated Itinerary */}
        {step === 4 && !loading && itinerary && (
          <div>
            <h2 className="step-title">Your Personalized Itinerary for {itinerary.destination}</h2>

            {/* Summary Cards */}
            <div className="itinerary-summary">
              <div className="summary-card">
                <div className="summary-icon">🗓️</div>
                <span className="summary-label">Duration</span>
                <strong className="summary-value">{itinerary.duration} Days</strong>
              </div>
              <div className="summary-card">
                <div className="summary-icon">🏨</div>
                <span className="summary-label">Hotel</span>
                <strong className="summary-value">{formData.hotelName}</strong>
              </div>
              <div className="summary-card">
                <div className="summary-icon">🚀</div>
                <span className="summary-label">Travel</span>
                <strong className="summary-value">{formData.travelMode === 'flight' ? formData.airline : formData.trainType}</strong>
              </div>
            </div>

            {/* City Information */}
            <div className="city-info-section">
              <h3 className="city-info-title">📍 About {itinerary.destination}</h3>
              <div className="info-grid">
                <div className="info-card">
                  <div className="info-label">🍽️ Must Try Cuisine</div>
                  <div className="info-value">{itinerary.cityData.cuisine.join(', ')}</div>
                </div>
                <div className="info-card">
                  <div className="info-label">🌤️ Best Season</div>
                  <div className="info-value">{itinerary.cityData.bestSeason}</div>
                </div>
                <div className="info-card">
                  <div className="info-label">🚌 Local Transport</div>
                  <div className="info-value">{itinerary.cityData.localTransport}</div>
                </div>
              </div>
            </div>

            {/* Daily Itinerary */}
            <div className="daily-itinerary">
              {itinerary.dailyPlan.map(day => (
                <div key={day.day} className="day-card">
                  <div className="day-header">
                    <h3>Day {day.day} - Explore {itinerary.destination}</h3>
                  </div>

                  <div className="attraction-grid">
                    {day.attractions.map((attraction, idx) => (
                      <div key={idx} className="attraction-card">
                        <img
                          src={attraction.image}
                          alt={attraction.name}
                          className="attraction-image"
                        />
                        <div className="attraction-content">
                          <div className="attraction-header">
                            <h4 className="attraction-name">{attraction.name}</h4>
                            <span className={`category-badge badge-${attraction.category.toLowerCase()}`}>
                              {attraction.category}
                            </span>
                          </div>
                          <p className="attraction-description">{attraction.description}</p>
                          <div className="attraction-meta">
                            <div className="meta-item">
                              <span className="meta-icon">⏰</span>
                              <span>{attraction.time}</span>
                            </div>
                            <div className="meta-item">
                              <span className="meta-icon">🌅</span>
                              <span>Best: {attraction.bestTime}</span>
                            </div>
                          </div>
                          {attraction.tips && (
                            <div className="attraction-tips">
                              <div className="tips-label">💡 Travel Tip:</div>
                              <p className="tips-text">{attraction.tips}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="button-group">
              <button className="btn btn-secondary" onClick={() => { setStep(1); setItinerary(null); }}>Create New</button>
              <button className="btn btn-primary" onClick={() => window.print()}>Print Itinerary</button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="loader"></div>
            <p className="loading-text">Generating your personalized itinerary...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;