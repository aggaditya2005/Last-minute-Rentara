import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import RentaraIntro from "./assets/components/RentaraIntro";
import Introduction from "./assets/components/Introduction";

import Login from "./assets/components/Login";
import Register from "./assets/components/Register";

import Services from "./assets/components/Services";
import Train from "./assets/components/Train";
import Flight from "./assets/components/Flight";
import Hotel from "./assets/components/Hotel";
import FlightSearch from "./assets/components/FlightSearch";
import Create from "./assets/components/Create";
import HotelRecommend from "./assets/components/HotelRecommend";
import ChatBot from "./assets/components/ChatBot";

import "./assets/components/App.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* Default entry → redirect to Introduction */}
        <Route path="/" element={<Navigate to="/introduction" replace />} />

        {/* First page user sees */}
        <Route path="/introduction" element={<Introduction />} />

        {/* Authentication */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Main App Pages */}
        <Route path="/services" element={<Services />} />
        <Route path="/train" element={<Train />} />
        <Route path="/flight" element={<Flight />} />
        <Route path="/flightSearch" element={<FlightSearch />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/create" element={<Create />} />
        <Route path="/hotelRecommend" element={<HotelRecommend />} />
        <Route path="/chatBot" element={<ChatBot />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/introduction" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
