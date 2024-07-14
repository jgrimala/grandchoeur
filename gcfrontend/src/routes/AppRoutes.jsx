import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../features/landing/LandingPage';
import DashboardPage from '../features/user/DashboardPage';
import AuthPage from "../features/auth/AuthPage";
import RegisterForm from '../features/auth/components/RegisterForm'; // Ensure the correct path
import AboutPage from '../features/regular/AboutPage';
import ShowsPage from '../features/regular/ShowsPage';
import ScoresPage from '../features/user/ScoresPage';
import ChoristsPage from '../features/user/ChoristsPage';
import FeatureFlagsPage from '../features/admin/FeatureFlagsPage';

const AppRoutes = ({ isAuthenticated, isAdmin }) => {
  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/dashboard" />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/shows" element={<ShowsPage />} />


      {isAuthenticated && (
        <>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/scores" element={<ScoresPage />} />
          <Route path="/chorists" element={<ChoristsPage isAdmin={isAdmin} />} />
          {isAdmin && <Route path="/feature-flags" element={<FeatureFlagsPage />} />}
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
