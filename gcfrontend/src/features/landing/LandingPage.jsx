// src/features/landing/LandingPage.jsx
import React from 'react';
import ParticlesComponent from '../../components/ParticlesComponent';
import './LandingPage.scss';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <ParticlesComponent />
      <div className="content">
        <h1>Welcome to Grand Choeur</h1>
        <p>Your journey starts here.</p>
      </div>
    </div>
  );
};

export default LandingPage;
