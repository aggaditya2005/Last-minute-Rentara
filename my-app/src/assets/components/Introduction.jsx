import React, { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import "./Introduction.css";

const Introduction = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openModal = (modalType) => {
    if (modalType === "login") {
      setShowLoginModal(true);
      setShowSignupModal(false);
    } else {
      setShowSignupModal(true);
      setShowLoginModal(false);
    }
  };

  const closeModal = (modalType) => {
    if (modalType === "login") {
      setShowLoginModal(false);
    } else {
      setShowSignupModal(false);
    }
  };

  const switchModal = (from, to) => {
    closeModal(from);
    openModal(to);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Get form data
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Store in localStorage (in production, you'd validate with backend)
    localStorage.setItem('token', 'dummy_token_' + Date.now());
    localStorage.setItem('userName', email.split('@')[0]);

    console.log("Login submitted");
    closeModal("login");
    alert("Login successful!");
    window.location.reload(); // Refresh to update hamburger menu
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Get form data
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Store in localStorage
    localStorage.setItem('token', 'dummy_token_' + Date.now());
    localStorage.setItem('userName', name);

    console.log("Signup submitted");
    closeModal("signup");
    alert("Signup successful!");
    window.location.reload(); // Refresh to update hamburger menu
  };

  return (
    <div className="introduction-page">
      {/* Navbar with Hamburger Menu */}
      <nav className="navbar">
        <div className="logo">Rentara</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/train">Train</a></li>
          <li><a href="/flight">Flight</a></li>
          <li><a href="/hotel">Hotel</a></li>
          <li><a href="/bus">Bus</a></li>
        </ul>
        <div className="auth-buttons">
          <button className="login-btn" onClick={() => openModal("login")}>
            Login
          </button>
          <button className="signup-btn" onClick={() => openModal("signup")}>
            Sign Up
          </button>
          {/* Hamburger Menu Component */}
          <HamburgerMenu
            onLoginClick={() => openModal("login")}
            onSignupClick={() => openModal("signup")}
          />
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <h1 className="logo">Rentara</h1>
        <p className="tagline">Rent Smarter. Live Better.</p>
      </header>

      {/* Introduction */}
      <section className="intro">
        <h2>🌟 Welcome to Rentara</h2>
        <p>
          At <b>Rentara</b>, we believe renting and booking should be{" "}
          <span className="highlight">simple, secure, and stress-free</span>.
          Our platform connects you with the best travel and rental services — all in one place.
        </p>
        <ul className="features">
          <li>✔ <b>Easy to Use</b> – intuitive and user-friendly design.</li>
          <li>✔ <b>Trusted & Secure</b> – your data and bookings are always safe.</li>
          <li>✔ <b>Smart Connections</b> – quick access to trains, flights, and buses.</li>
        </ul>
        <p className="closing">
          With Rentara, travel and rentals become an <b>experience of convenience</b>. 🚀
        </p>
      </section>

      {/* Booking Section */}
      <section className="booking-section">
        <h2>🚆✈️🚌 Book Your Journey</h2>
        <div className="booking-options">
          <div className="booking-card">
            <h3>🚆 Train Booking</h3>
            <p>Fast and easy train ticket reservations at your fingertips.</p>
            <button onClick={() => (window.location.href = "/train")}>
              Book Train
            </button>
          </div>
          <div className="booking-card">
            <h3>✈️ Flight Booking</h3>
            <p>Find affordable flights and travel across the world with ease.</p>
            <button onClick={() => (window.location.href = "/flight")}>
              Book Flight
            </button>
          </div>
          <div className="booking-card">
            <h3>🏨 Hotel Booking</h3>
            <p>Comfortable stays at the best prices.</p>
            <button onClick={() => (window.location.href = "/hotel")}>
              Book Hotel
            </button>
          </div>
          <div className="booking-card">
            <h3>🚌 Bus Booking</h3>
            <p>Comfortable and reliable bus travel for short and long routes.</p>
            <button onClick={() => (window.location.href = "/bus")}>
              Book Bus
            </button>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="image-block">
        <img src="/rentara.png" alt="Rentara Concept" className="intro-img" />
      </section>

      {/* Footer */}
      <footer>
        <h3>🔍 Browse & Discover</h3>
        <ul className="browse">
          <li>🏠 Properties, Vehicles, Services, and more — all in one place.</li>
          <li>📂 Smart filters for quick results.</li>
          <li>🤝 Connect with trusted providers instantly.</li>
        </ul>
        <p className="footer-note">✨ Rentara – Where travel meets simplicity ✨</p>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal" onClick={() => closeModal("login")}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => closeModal("login")}>
              &times;
            </span>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
            <div className="extra">
              Don't have an account?{" "}
              <a onClick={() => switchModal("login", "signup")}>Sign Up</a>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="modal" onClick={() => closeModal("signup")}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => closeModal("signup")}>
              &times;
            </span>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input type="text" name="name" placeholder="Full Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit">Sign Up</button>
            </form>
            <div className="extra">
              Already have an account?{" "}
              <a onClick={() => switchModal("signup", "login")}>Login</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Introduction;