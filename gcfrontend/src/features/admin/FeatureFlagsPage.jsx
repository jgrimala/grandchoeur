import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FeatureFlagsWidget from "./FeatureFlagsWidget";
import { AuthContext } from "../../context/AuthContext";

const FeatureFlagsPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is not logged in or not an admin
        if (!user || !user.is_admin) {
            console.log("Redirecting non-admin user");
            navigate('/'); // Redirect to the home page
        }
    }, [user, navigate]);  // Depend on user and navigate to ensure this runs when user changes

    if (!user || !user.is_admin) {
        return <div>Access Denied</div>; // Optionally render this while waiting to redirect
    }

    return (
        <div>
            <h1>Admin Panel - Feature Flags</h1>
            <FeatureFlagsWidget />
        </div>
    );
};

export default FeatureFlagsPage;