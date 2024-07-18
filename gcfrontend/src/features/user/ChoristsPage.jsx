import React, { useEffect, useState } from 'react';
import { fetchChoirMembers, updateDisplayContact } from '../../services/ChoirMemberService';
import { useAuth } from "../../context/AuthContext"; // Ensure you import useAuth to get the user context
import './ChoristsPage.scss';

const ChoristsPage = ({ isAdmin }) => {
  const [chorists, setChorists] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth(); // Get the authenticated user

  useEffect(() => {
    const fetchChorists = async () => {
      try {
        const data = await fetchChoirMembers();
        setChorists(data);
      } catch (error) {
        console.error("Error fetching chorists: ", error);
        setError("Failed to fetch chorists.");
      }
    };

    fetchChorists();
  }, []);

  const handleDisplayContactChange = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await updateDisplayContact(id, updatedStatus);
      setChorists(chorists.map(chorist => 
        chorist.id === id ? { ...chorist, display_contact: updatedStatus } : chorist
      ));
    } catch (error) {
      console.error("Error updating display contact: ", error);
      setError("Failed to update display contact.");
    }
  };

  return (
    <div className="chorists-page">
      <h2>Chorists</h2>
      {error && <p>{error}</p>}
      <table className="chorists-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Pupitre</th>
            <th>Title</th>
            <th>Join Date</th>
            <th>Display Contact</th>
          </tr>
        </thead>
        <tbody>
          {chorists.map(chorist => (
            <tr key={chorist.id}>
              <td>{chorist.name}</td>
              <td>{chorist.display_contact ? chorist.email : ''}</td>
              <td>{chorist.display_contact ? chorist.phone : ''}</td>
              <td>{chorist.pupitre}</td>
              <td>{chorist.title}</td>
              <td>{chorist.join_date}</td>
              <td>
                {(isAdmin || chorist.user_id === user?.id) ? (
                  <button onClick={() => handleDisplayContactChange(chorist.id, chorist.display_contact)}>
                    {chorist.display_contact ? 'Hide' : 'Show'}
                  </button>
                ) : (
                  chorist.display_contact ? 'Yes' : 'No'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChoristsPage;
