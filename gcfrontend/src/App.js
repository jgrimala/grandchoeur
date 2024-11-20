// src/App.js
import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/layout/header/Header";
import Sidebar from "./components/layout/sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import "./styles/main.scss";

function App() {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
  
	const toggleSidebar = () => {
	  setSidebarOpen((prev) => !prev); // Toggle the sidebar's open state
	};
  
	const { user } = useAuth();
	const isAuthenticated = !!user;
	const isAdmin = user?.is_admin;
  
	const location = useLocation();
	const isHome = location.pathname === "/";
  
	return (
	  <ThemeProvider>
		<Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
		<Sidebar
		  isOpen={isSidebarOpen}
		  toggleSidebar={toggleSidebar}
		  isAuthenticated={isAuthenticated}
		  isAdmin={isAdmin}
		/>
		<div className={`app-body ${isSidebarOpen ? "sidebar-open" : ""} ${isHome ? "landing-page" : ""}`}>
		  {isSidebarOpen && (
			<div className="overlay" onClick={toggleSidebar}></div>
		  )}
		  <main className="main-content">
			<AppRoutes isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
		  </main>
		</div>
	  </ThemeProvider>
	);
  }
  

export default App;
