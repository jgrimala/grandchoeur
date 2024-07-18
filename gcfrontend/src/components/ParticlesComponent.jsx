// src/components/ParticlesComponent.jsx
import React, { useEffect } from 'react';

const ParticlesComponent = () => {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS.load('particles-js', '/assets/particles.json', function() {
        console.log('callback - particles.js config loaded');
      });
    } else {
      console.error('particlesJS is not defined');
    }
  }, []);

  return <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%' }} />;
};

export default ParticlesComponent;
