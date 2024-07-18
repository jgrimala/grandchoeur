// src/App.js
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Import the useAuth hook
import Header from "./components/layout/header/Header";
import Sidebar from "./components/layout/sidebar/Sidebar"; // Make sure to create this component as described
import AppRoutes from "./routes/AppRoutes";
import "./styles/global.scss"; // Import global styles
import './features/landing/LandingPage.scss'; // Landing page styles
import './components/ParticlesComponent.scss'; // Particles component styles


const AppLayout = () => {
  const { user } = useAuth(); // Get user details from AuthContext
  const isAuthenticated = !!user; // Boolean to check if user is authenticated
  const isAdmin = user?.is_admin; // Check if the user is an admin

  const location = useLocation();
  const showSidebar = location.pathname !== "/login" && location.pathname !== "/register"; // Only show sidebar if not on login or register page

  return (
    <div className="app-body">
      {showSidebar && (
        <Sidebar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
      )}
      <main className="main-content">
        <AppRoutes isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Header />
      <AppLayout />
    </ThemeProvider>
  );
}

export default App;
