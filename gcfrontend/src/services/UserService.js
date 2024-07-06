// gcfrontend/src/services/UserService.js

import axiosInstance from "./AxiosConfig";

const getUserDetails = async (userId) => {
	try {
		const response = await axiosInstance.get(`/user/${userId}`);
		return response.data;
	} catch (error) {
		console.error("Failed to fetch user details:", error);
		throw error;
	}
};

const updateUserDetails = async (userId, userDetails) => {
	try {
		const response = await axiosInstance.put(`/user/${userId}`, userDetails);
		return response.data;
	} catch (error) {
		console.error("Failed to update user details:", error);
		throw error;
	}
};

export { getUserDetails, updateUserDetails };
