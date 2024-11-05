import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/pages/Home';
import DashboardPage from '../components/pages/DashboardPage';
import AuthPage from "../features/auth/AuthPage";
import RegisterForm from '../features/auth/components/RegisterForm';
import AboutPage from '../components/pages/AboutPage';
import ShowsPage from '../components/pages/ShowsPage';
import ScoresPage from '../components/pages/ScoresPage';
import ChoristsPage from '../components/pages/ChoristsPage';
import FeatureFlagsPage from '../features/admin/FeatureFlagsPage';

const AppRoutes = ({ isAuthenticated, isAdmin }) => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={!isAuthenticated ? <Home /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/dashboard" />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/shows" element={<ShowsPage />} />

      {/* Admin Route */}
      {isAuthenticated && isAdmin && (
        <Route path="/feature-flags" element={<FeatureFlagsPage />} />
      )}

      {/* Authenticated Routes */}
      {isAuthenticated && (
        <>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/scores" element={<ScoresPage />} />
          <Route path="/chorists" element={<ChoristsPage isAdmin={isAdmin} />} />
        </>
      )}

      {/* Redirect unknown paths to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
