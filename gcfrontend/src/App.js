// src/App.js
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/layout/header/Header";
import AppRoutes from "./routes/AppRoutes";
import "./App.scss";

import "./styles/main.scss";

const AppLayout = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const isAdmin = user?.is_admin;

  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={`app-body ${isHome ? "landing-page" : ""}`}>
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
