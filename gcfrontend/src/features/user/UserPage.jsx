// gcfrontend/src/features/user/UserPage.jsx

import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../../services/UserService';

const UserPage = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getUserDetails(userId)
            .then(userData => {
                setUser(userData);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>No user data found.</p>;

    return (
        <div>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            {/* Render more user details here */}
        </div>
    );
};

export default UserPage;
