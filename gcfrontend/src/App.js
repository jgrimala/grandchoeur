import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/layout/header/Header";
import Sidebar from "./components/layout/sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import LoginModal from "./features/auth/components/LoginModal"; // Assuming you have these imports
import RegisterModal from "./features/auth/components/RegisterModal";
import "./App.scss";
import "./styles/main.scss";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const { user } = useAuth();
  const isAuthenticated = !!user;
  const isAdmin = user?.is_admin;

  const location = useLocation();
  const isHome = location.pathname === "/";

  const closeModal = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
  };

  return (
    <ThemeProvider>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
      />
      <div
        className={`app-body ${
          isSidebarOpen || isLoginModalOpen || isRegisterModalOpen
            ? "disable-interactions"
            : ""
        } ${isHome ? "landing-page" : ""}`}
      >
        {/* Overlay for closing modals */}
        {(isLoginModalOpen || isRegisterModalOpen) && (
          <div
            className="overlay"
            onClick={closeModal}
          ></div>
        )}
        <main className="main-content">
          <AppRoutes isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
        </main>
      </div>

      {/* Modals */}
      {isLoginModalOpen && (
        <LoginModal closeModal={closeModal} openRegisterModal={() => setRegisterModalOpen(true)} />
      )}
      {isRegisterModalOpen && (
        <RegisterModal closeModal={closeModal} openLoginModal={() => setLoginModalOpen(true)} />
      )}
    </ThemeProvider>
  );
}

export default App;
