import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";

const Services = () => {
  return (
    <div className="services-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Rentara</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services" className="active">Services</Link></li>
          <li><Link to="/train">Train</Link></li>
          <li><Link to="/flight">Flight</Link></li>
          <li><Link to="/hotel">Hotel</Link></li>

        </ul>
      </nav>

      {/* Services Section */}
      <section className="services-section">
        <h2>💎 Our Membership Plans</h2>
        <p>Choose the perfect plan that matches your travel and rental needs.</p>

        <div className="plans-container">
          {/* Free */}
          <div className="plan-card">
            <h3 className="valueable">🥇 Valueable</h3>
            <p>Perfect for occasional travelers and renters.</p>
            <ul>
              <li>✔ Basic Discounts on Bookings</li>
              <li>✔ Priority Customer Support</li>
              <li>✔ Access to Exclusive Deals</li>
            </ul>
            <p className="price">₹00/ month</p>
            <button>Free</button>
          </div>

          {/* Platinum */}
          <div className="plan-card">
            <h3 className="platinum">🏆 Platinum Membership</h3>
            <p>Ideal for frequent travelers looking for value.</p>
            <ul>
              <li>✔ Higher Discounts on Trains, Flights, and Buses</li>
              <li>✔ Free Cancellations (Limited)</li>
              <li>✔ Dedicated 24/7 Assistance</li>
            </ul>
            <p className="price">₹1999 / month</p>
            <button>Choose Platinum</button>
          </div>

          {/* Diamond */}
          <div className="plan-card">
            <h3 className="diamond">💠 Diamond Membership</h3>
            <p>The ultimate package for premium experiences.</p>
            <ul>
              <li>✔ Maximum Discounts + Cashback</li>
              <li>✔ Unlimited Free Cancellations</li>
              <li>✔ VIP Travel Lounge Access</li>
              <li>✔ Personal Travel Assistant</li>
            </ul>
            <p className="price">₹2999 / month</p>
            <button>Choose Diamond</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h3>🔍 Browse & Discover</h3>
        <ul>
          <li>🏠 Properties, Vehicles, Services, and more — all in one place.</li>
          <li>📂 Smart filters for quick results.</li>
          <li>🤝 Connect with trusted providers instantly.</li>
        </ul>
        <p>✨ Rentara – Where travel meets simplicity ✨</p>
      </footer>
    </div>
  );
};

export default Services;
