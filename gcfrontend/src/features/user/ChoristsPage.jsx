import React, { useEffect, useState } from 'react';
import { fetchChoirMembers } from '../../services/ChoirMemberService'; // Update to your actual service path
import './ChoristsPage.scss';

const ChoristsPage = ({ isAdmin }) => {
  const [chorists, setChorists] = useState([]);
  const [error, setError] = useState("");

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
              <td>{chorist.display_contact ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChoristsPage;
