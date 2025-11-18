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

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("userLoggedIn") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>

        {/* Step 1 — Splash / Landing */}
        <Route path="/" element={<RentaraIntro />} />

        {/* Step 2 — Introduction */}
        <Route path="/introduction" element={<Introduction />} />

        {/* Step 3 — Authentication */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Step 4 — Main App (Protected) */}
        <Route
          path="/services"
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          }
        />

        <Route
          path="/train"
          element={
            <PrivateRoute>
              <Train />
            </PrivateRoute>
          }
        />

        <Route
          path="/flight"
          element={
            <PrivateRoute>
              <Flight />
            </PrivateRoute>
          }
        />

        <Route
          path="/flightSearch"
          element={
            <PrivateRoute>
              <FlightSearch />
            </PrivateRoute>
          }
        />

        <Route
          path="/hotel"
          element={
            <PrivateRoute>
              <Hotel />
            </PrivateRoute>
          }
        />

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />

        <Route
          path="/hotelRecommend"
          element={
            <PrivateRoute>
              <HotelRecommend />
            </PrivateRoute>
          }
        />

        <Route
          path="/chatBot"
          element={
            <PrivateRoute>
              <ChatBot />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
