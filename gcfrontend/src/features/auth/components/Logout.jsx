import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        logout();
        navigate("/", { replace: true }); // Redirect to home and replace the current entry in the history stack
    }, [logout, navigate]);

    return null; // Render nothing
};

export default Logout;
