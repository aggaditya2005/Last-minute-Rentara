import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./FlightSearch.css"; // Imports dedicated CSS

const FlightSearch = () => {
  // State to hold user inputs (must match ML model features)
  const [formData, setFormData] = useState({
    airline: 'Air Asia', // Default values for testing
    source: 'Delhi',
    destination: 'Mumbai',
    departure_time: 'Morning',
    stops: 'zero',
    class: 'Economy',
  });

  // State for UI feedback
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // List of values based on the dataset's features (for dropdowns)
  const options = {
    airline: ['Air Asia', 'Air India', 'Go First', 'IndiGo', 'SpiceJet', 'Vistara'],
    source: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad'],
    destination: ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad'],
    departure_time: ['Morning', 'Evening', 'Night', 'Early_Morning', 'Afternoon', 'Late_Night'],
    stops: ['zero', 'one', 'two_or_more'],
    class: ['Economy', 'Business'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPredictedPrice(null);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/ai/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Sending all fields
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Handle API errors
        throw new Error(data.message || data.error_details || "Failed to get prediction from AI model.");
      }

      setPredictedPrice(data.predicted_price);

    } catch (err) {
      console.error("Prediction Error:", err);
      setError("Prediction failed. Ensure your backend and Python ML environment are running.");

    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ label, name, options }) => (
    <div className="form-group ai-field">
      <label htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="ai-select"
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="ai-predictor-page">
      <nav className="ai-navbar">
        <div className="navbar-brand">
          <h2>Rentara AI Predictor</h2>
        </div>
        <div className="navbar-menu">
          <Link to="/flight" className="back-link">← Back to Search</Link>
        </div>
      </nav>

      <div className="ai-predictor-container">
        <div className="predictor-card">
          <h1 className="predictor-title">
            <span className="ai-icon">🧠</span> AI Price Prediction
          </h1>
          <p className="predictor-subtitle">
            Get an estimated fare based on historical data analysis.
          </p>

          <form onSubmit={handlePredict} className="ai-form-grid">
            <InputField label="Airline" name="airline" options={options.airline} />
            <InputField label="Source City" name="source" options={options.source} />
            <InputField label="Destination City" name="destination" options={options.destination} />
            <InputField label="Departure Time" name="departure_time" options={options.departure_time} />
            <InputField label="Total Stops" name="stops" options={options.stops} />
            <InputField label="Seat Class" name="class" options={options.class} />

            <button
              type="submit"
              className="predict-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Calculating Price...' : 'Predict AI Price'}
            </button>
          </form>

          {/* Result Display Area */}
          <div className="prediction-result-box">
            {error && (
              <p className="result-error">❌ {error}</p>
            )}

            {predictedPrice !== null && !isLoading && !error && (
              <div className="prediction-success">
                <p className="result-label">Estimated Fare:</p>
                <span className="result-price">
                  ₹{predictedPrice.toFixed(2)}
                </span>
                <p className="result-note">
                  This estimate is based on current market trends and historical flight data.
                </p>
              </div>
            )}

            {predictedPrice === null && !isLoading && !error && (
              <p className="result-placeholder">Select your criteria above to get a fare estimate.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;