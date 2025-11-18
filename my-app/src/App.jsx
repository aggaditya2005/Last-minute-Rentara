import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RentaraIntro from "./assets/components/RentaraIntro";
import Introduction from "./assets/components/Introduction";
import Services from "./assets/components/Services";
import Train from "./assets/components/Train";
import Flight from "./assets/components/Flight"; // Original Listing Page
import Hotel from "./assets/components/Hotel";
import FlightSearch from "./assets/components/FlightSearch"; // AI Predictor Component
import Create from "./assets/components/Create";
import HotelRecommend from "./assets/components/HotelRecommend";
import ChatBot from "./assets/components/ChatBot";
import "./assets/components/App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing/Splash Page - Shows first */}
        <Route path="/" element={<RentaraIntro />} />

        {/* Main Introduction Page - After 10 seconds */}
        <Route path="/introduction" element={<Introduction />} />

        {/* Booking Pages */}
        <Route path="/services" element={<Services />} />

        <Route path="/train" element={<Train />} />

        {/* Original Flight Listing Page */}
        <Route path="/flight" element={<Flight />} />

        {/* NEW: Dedicated AI Price Prediction Page */}
        <Route path="/flightSearch" element={<FlightSearch />} />

        <Route path="/hotel" element={<Hotel />} />
        <Route path="/create" element={<Create />} />

        <Route path="/hotelRecommend" element={<HotelRecommend />} />
        <Route path="/chatBot" element={<ChatBot />} />

      </Routes>
    </Router>
  );
}

export default App;