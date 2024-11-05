// src/components/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate("/about");  // Navigate to the "About" page
  };

  return (
    <div
      className="home-page"
      style={{ backgroundImage: `url('/assets/images/grand_choeur5.jpg')` }}  // Retaining background image here
    >
      <div className="left-section">
	  <h1 className="main-heading">
          <span className="line-1">Le Grand Choeur</span>
          <span className="line-2">du Centre-Sud</span>
        </h1>
        <h2 className="subtitle">Une chorale communautaire originale de Montréal</h2>

        <div className="action-buttons">
          <button className="about-button" onClick={handleAboutClick}>
            En savoir plus
          </button>

          <a href="mailto:cinqgrandescloches@gmail.com" className="email-link">
            cinqgrandescloches@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
