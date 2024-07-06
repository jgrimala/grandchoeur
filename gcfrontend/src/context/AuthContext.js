import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "./../services/AxiosConfig"; // Ensure you have the correct path to your Axios instance
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null); // Provides a default context with user set to null

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const login = async (credentials) => {
		try {
			const API_BASE_URL = process.env.REACT_APP_API_URL;
			const response = await axios.post(`${API_BASE_URL}/login`, credentials);
			if (response.data.success) {
				const token = response.data.data.token;
				const decodedToken = jwtDecode(token);
				const user = decodedToken.data; // Extract the nested data object
				console.log("Decoded User:", user); // Add this line to log the decoded user
				setUser(user); // Save user details to state
				localStorage.setItem("token", token); // Save the token to localStorage
				navigate("/admin"); // Use navigate to redirect
			} else {
				throw new Error(
					response.data.message || "Login failed with no success flag."
				);
			}
		} catch (error) {
			console.error("Login error:", error);
			const errorMessage =
				error.response && error.response.data && error.response.data.message
					? error.response.data.message
					: "Login failed due to network or server issue";
			throw new Error(errorMessage);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("token"); // Remove the token from localStorage
		navigate("/login"); // Redirect to login page
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			console.log("Token:", token); // Add this line to log the token
			const decodedToken = jwtDecode(token);
			const user = decodedToken.data; // Extract the nested data object
			console.log("Decoded User on load:", user); // Add this line to log the decoded user on page load
			setUser(user);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export { AuthContext }; // Export AuthContext directly
