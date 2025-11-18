import React, { useEffect, useState } from "react";
import "./App.css";

const RentaraIntro = () => {
  const slogans = [
    "Rent Smarter. Live Better.",
    "Easy Rentals, Endless Possibilities.",
    "Your World, On Rent – Simplified.",
    "Where Convenience Meets Affordability.",
    "Rent Anything, Anytime, Anywhere."
  ];

  const facts = [
    "Did you know? The global car rental market is projected to reach $200B by 2030.",
    "In urban areas, renting can save up to 30% compared to ownership costs.",
    "Most millennials prefer renting over buying for flexibility.",
    "Short-term rentals reduce maintenance costs by nearly 40%.",
    "Peer-to-peer rentals are the fastest-growing segment of the rental economy."
  ];

  const [sloganIndex, setSloganIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Slogan rotation
  useEffect(() => {
    const sloganInterval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSloganIndex((prev) => (prev + 1) % slogans.length);
        setFade(true);
      }, 1000);
    }, 3000);

    return () => clearInterval(sloganInterval);
  }, []);

  // Fact rotation
  useEffect(() => {
    const factInterval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setFactIndex((prev) => (prev + 1) % facts.length);
        setFade(true);
      }, 1000);
    }, 4000);

    return () => clearInterval(factInterval);
  }, []);

  // Auto redirect after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.style.opacity = "0";
      setTimeout(() => {
        window.location.href = "/register"; 
      }, 1500);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rentara-intro-container">
      <h1 className="rentara-title">Rentara</h1>

      <h2 className={`rentara-slogan ${fade ? "fade-in" : "fade-out"}`}>
        {slogans[sloganIndex]}
      </h2>

      <div className={`rentara-facts ${fade ? "fade-in" : "fade-out"}`}>
        {facts[factIndex]}
      </div>
    </div>
  );
};

export default RentaraIntro;
