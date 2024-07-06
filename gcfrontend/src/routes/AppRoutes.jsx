// src/routes/AppRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../features/auth/AuthPage";
import FeatureFlagsPage from "../features/admin/FeatureFlagsPage";
import LandingPage from "../features/landing/LandingPage";

/**
 * AppRoutes.jsx
 * routes\AppRoutes.jsx
 */

// This component defines the routes for the application.
const AppRoutes = () => {
	return (
		// The Routes component is a wrapper for all Route components.
		// <Routes> is like <Switch> in react-router-dom v5.
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/login" element={<AuthPage />} />
			<Route path="/admin" element={<FeatureFlagsPage />} />
			<Route path="/featureflags" element={<FeatureFlagsPage />} />
		</Routes>
	);
};

export default AppRoutes;
