import axios from './AxiosConfig';  // Importing the customized Axios instance

// Fetch all feature flags
export const fetchFeatureFlags = async () => {
    try {
        const API_BASE_URL = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${API_BASE_URL}/featureflags`);
        console.log("Received data:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching feature flags:', error);
        throw error;
    }
};

// Add a new feature flag
export const addFeatureFlag = async (flag) => {
    try {
        const API_BASE_URL = process.env.REACT_APP_API_URL;
        const response = await axios.post(`${API_BASE_URL}/featureflag`, flag);
        return response.data;
    } catch (error) {
        console.error('Error adding feature flag:', error);
        throw error;
    }
};

// Update an existing feature flag
export const updateFeatureFlagEnabledStatus = async (id, isEnabled) => {
    console.log("Updating feature flag:", id, isEnabled);
    try {
        const API_BASE_URL = process.env.REACT_APP_API_URL;
        const response = await axios.put(`${API_BASE_URL}/featureflag/${id}`, { is_enabled: isEnabled });
        console.log("Updated feature flag:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating feature flag enabled status:', error);
        throw error;
    }
};

// Delete a feature flag
export const deleteFeatureFlag = async (id) => {
    try {
        const API_BASE_URL = process.env.REACT_APP_API_URL;
        const response = await axios.delete(`${API_BASE_URL}/featureflag/${id}`);
        return response.data;  // Normally returns a status message or the id of the deleted item
    } catch (error) {
        console.error('Error deleting feature flag:', error);
        throw error;
    }
};

export const getUserThemeFlag = async (userId) => {
    try {
        const API_BASE_URL = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${API_BASE_URL}/featureflag/user/${userId}/theme_dark_mode`);
        return response.data.flag_value;
    } catch (error) {
        console.error('Error fetching user-specific theme flag:', error);
        return false; // Default to light theme
    }
};

// Create or update user-specific feature flag for theme
export const updateUserThemeFlag = async (userId, isDarkMode) => {
    try {
        const API_BASE_URL = process.env.REACT_APP_API_URL;
        const response = await axios.post(`${API_BASE_URL}/featureflag`, {
            user_id: userId,
            feature_name: 'theme_dark_mode',
            is_enabled: isDarkMode,
            created_at: new Date().toISOString()
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user-specific theme flag:', error);
        throw error;
    }
};