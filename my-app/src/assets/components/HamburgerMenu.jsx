import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HamburgerMenu.css';

const HamburgerMenu = ({ onLoginClick, onSignupClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Guest');

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('userName');
    if (token && user) {
      setIsLoggedIn(true);
      setUserName(user);
    }
  }, []);

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking a link
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('Guest');
    closeMenu();
    window.location.reload();
  };

  // Handle login click
  const handleLoginClick = () => {
    closeMenu();
    onLoginClick();
  };

  // Handle signup click
  const handleSignupClick = () => {
    closeMenu();
    onSignupClick();
  };

  return (
    <>
      {/* Hamburger Icon */}
      <div
        className={`hamburger-icon ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Overlay */}
      {isOpen && <div className="menu-overlay" onClick={closeMenu}></div>}

      {/* Slide Menu */}
      <div className={`slide-menu ${isOpen ? 'open' : ''}`}>
        {/* Menu Header */}
        <div className="menu-header">
          <div className="user-info">
            <div className="user-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <h3>{userName}</h3>
              <p>{isLoggedIn ? 'Member' : 'Guest User'}</p>
            </div>
          </div>
          <button className="close-btn" onClick={closeMenu}>
            ✕
          </button>
        </div>

        {/* Menu Body */}
        <div className="menu-body">
          {/* Auth Section */}
          {!isLoggedIn && (
            <div className="menu-section auth-section">
              <button className="menu-auth-btn login" onClick={handleLoginClick}>
                <span className="btn-icon">🔐</span>
                Login
              </button>
              <button className="menu-auth-btn signup" onClick={handleSignupClick}>
                <span className="btn-icon">✨</span>
                Sign Up
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <div className="menu-section">
            <h4 className="section-title">Navigation</h4>
            <Link to="/" className="menu-link" onClick={closeMenu}>
              <span className="link-icon">🏠</span>
              <span>Home</span>
            </Link>
            <Link to="/introduction" className="menu-link" onClick={closeMenu}>
              <span className="link-icon">ℹ️</span>
              <span>Introduction</span>
            </Link>
            <Link to="/services" className="menu-link" onClick={closeMenu}>
              <span className="link-icon">🛠️</span>
              <span>Services</span>
            </Link>
          </div>

          {/* Booking Options */}
          <div className="menu-section">
            <h4 className="section-title">Bookings</h4>
            <Link to="/train" className="menu-link" onClick={closeMenu}>
              <span className="link-icon">🚆</span>
              <span>Train Booking</span>
            </Link>
            <Link to="/flight" className="menu-link" onClick={closeMenu}>
              <span className="link-icon">✈️</span>
              <span>Flight Booking</span>
            </Link>
            <Link to="/hotel" className="menu-link" onClick={closeMenu}>
              <span className="link-icon">🏨</span>
              <span>Hotel Booking</span>
            </Link>
            <Link to="/bus" className="menu-link" onClick={closeMenu}>
              <span className="link-icon">🚌</span>
              <span>Bus Booking</span>
            </Link>
          </div>

          {/* My Account Section (if logged in) */}
          {isLoggedIn && (
            <div className="menu-section">
              <h4 className="section-title">My Account</h4>
              <Link to="/bookings" className="menu-link" onClick={closeMenu}>
                <span className="link-icon">📋</span>
                <span>My Bookings</span>
              </Link>
              <Link to="/profile" className="menu-link" onClick={closeMenu}>
                <span className="link-icon">👤</span>
                <span>Profile</span>
              </Link>
              <Link to="/settings" className="menu-link" onClick={closeMenu}>
                <span className="link-icon">⚙️</span>
                <span>Settings</span>
              </Link>
            </div>
          )}

          {/* Help & Support */}
          <div className="menu-section">
            <h4 className="section-title">Help & Support</h4>
            <Link to="/help" className="menu-link" onClick={closeMenu}>
              <span className="link-icon">❓</span>
              <span>Help Center</span>
            </Link>
            <Link to="/contact" className="menu-link" onClick={closeMenu}>
              <span className="link-icon">📞</span>
              <span>Contact Us</span>
            </Link>
            <Link to="/about" className="menu-link" onClick={closeMenu}>
              <span className="link-icon">📄</span>
              <span>About Rentara</span>
            </Link>
          </div>

          {/* Logout Button (if logged in) */}
          {isLoggedIn && (
            <div className="menu-section">
              <button className="menu-link logout-btn" onClick={handleLogout}>
                <span className="link-icon">🚪</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Menu Footer */}
        <div className="menu-footer">
          <p>© 2024 Rentara. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;