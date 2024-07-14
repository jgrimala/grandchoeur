import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Adjust the path as needed

const ChoristsPage = () => {
    const [chorists, setChorists] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchChorists();
    }, []);

    const fetchChorists = async () => {
        // Dummy data fetch simulation
        const data = [
            { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' }
        ];
        setChorists(data);
    };

    return (
        <div>
            <h1>Chorists</h1>
            <ul>
                {chorists.map(chorist => (
                    <li key={chorist.id}>
                        {chorist.name}
                        {user && user.is_admin && (
                            <>
                                <p>Email: {chorist.email}</p>
                                <p>Phone: {chorist.phone}</p>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChoristsPage;
