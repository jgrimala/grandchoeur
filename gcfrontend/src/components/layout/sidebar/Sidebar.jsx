import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";


const Sidebar = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const isAdmin = isAuthenticated && user.is_admin;

  return (
    <div>
     
    </div>
  );
};

export default Sidebar;
