import React, { createContext, useContext, useState } from "react";
import axios from "./../services/AxiosConfig"; // Ensure you have the correct path to your Axios instance
import { useNavigate } from "react-router-dom";   

const AuthContext = createContext(null); // Provides a default context with user set to null

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const login = async (credentials) => {
    //console.log('credentials:', credentials);
    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL;
      console.log('API_BASE_URL:', API_BASE_URL);
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      console.log(response.data); // Add this line
      if (response.data.success) {
        // Assuming your server responds with { success: true, data: { user: {...}, token: "..." } }
        setUser(response.data.data.user); // Save user details to state
        navigate('/admin');  // Use history to navigate
        // Optionally redirect user or handle the login success scenario
      } else {
        // Handle any case where success is false
        throw new Error(
          response.data.message || "Login failed with no success flag."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      // More robust error handling
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Login failed due to network or server issue";
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    //.removeItem("token"); // Remove the token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
