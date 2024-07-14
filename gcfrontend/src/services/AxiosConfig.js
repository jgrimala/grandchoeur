// gcfrontend/src/services/axiosConfig.js

import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost/Grandchoeur/gcbackend/public/index.com", // Adjust this URL to your actual backend URL
	withCredentials: true, // Ensure credentials are included with every request
	headers: {
		"Content-Type": "application/json",
	},
});

const token = localStorage.getItem('token');
if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;
