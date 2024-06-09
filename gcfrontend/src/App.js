import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/layout/header/Header";
import { AuthProvider } from "./context/AuthContext";

/**
 * App.js
 */

function App() {
  return (
    <Router>
      <div className="App">
      <AuthProvider>
        <Header />
        <AppRoutes />
      </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
