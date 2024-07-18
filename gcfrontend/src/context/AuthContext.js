import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../services/AxiosConfig"; // Ensure you have the correct path to your Axios instance
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null); // Provides a default context with user set to null

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	// Add useEffect here to log user state updates
	useEffect(() => {
		console.log("Updated user state:", user);
	}, [user]); // Dependency array includes user to react to changes

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
				navigate("/dashboard"); // Use navigate to redirect
			} else {
				throw new Error(
					response.data.message || "Login failed with no success flag."
				);
			}
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		}
	};

	const logout = () => {
		setUser(null);
		console.log("User set to null, current user state:", user);  // This will still show the old value because state updates are asynchronous
		localStorage.removeItem("token");
		navigate("/");
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				setUser(decodedToken.data); // Set user from decoded token data
			} catch (error) {
				console.error("Error decoding token:", error);
			}
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
