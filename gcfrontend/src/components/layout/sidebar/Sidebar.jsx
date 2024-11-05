import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";


const Sidebar = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const isAdmin = isAuthenticated && user.is_admin;

  return (
    <div>
      <ul>
        {isAuthenticated ? (
          <>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/shows">Shows</Link></li>
            <li><Link to="/scores">My Scores</Link></li>
            <li><Link to="/chorists">Chorists</Link></li>
            {isAdmin ? <li><Link to="/feature-flags">Feature Flags</Link></li> : null}
          </>
        ) : (
          <>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/shows">Shows</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
