import axios from "./AxiosConfig"; // Importing the customized Axios instance

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Fetch all choir members
export const fetchChoirMembers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/choir-members`);
    return response.data;
  } catch (error) {
    console.error("Error fetching choir members:", error);
    throw error;
  }
};

// Add a new choir member
export const addChoirMember = async (member) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/choir-member`, member);
    return response.data;
  } catch (error) {
    console.error("Error adding choir member:", error);
    throw error;
  }
};

// Update an existing choir member
export const updateChoirMember = async (id, member) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/choir-member/${id}`, member);
    return response.data;
  } catch (error) {
    console.error("Error updating choir member:", error);
    throw error;
  }
};

// Delete a choir member
export const deleteChoirMember = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/choir-member/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting choir member:", error);
    throw error;
  }
};
