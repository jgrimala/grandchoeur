// src/components/layout/sidebar/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar, isAuthenticated, isAdmin  }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const handleSidebarClose = () => {
    toggleSidebar();
  };

  return (
	<div className={`sidebar ${isOpen ? 'open' : ''}`} onClick={handleSidebarClose}>
	<div className="sidebar-content" onClick={(e) => e.stopPropagation()}>
	  {/* <button className="close-button" onClick={handleSidebarClose}>
		&times;
	  </button> */}
        <nav className="sidebar-nav">
          <Link to="/about" className="sidebar-item" onClick={handleSidebarClose}>
            {t('About')}
          </Link>
		  <Link to="/chef" className="sidebar-item" onClick={handleSidebarClose}>
            André Pappathomas
          </Link>
		  <Link to="/staff" className="sidebar-item" onClick={handleSidebarClose}>
            {t('Staff')}
          </Link>
		  <Link to="/bells" className="sidebar-item" onClick={handleSidebarClose}>
            {t('Bells')}
          </Link>
		  <Link to="/join-us" className="sidebar-item" onClick={handleSidebarClose}>
            {t('JoinUs')}
          </Link>
		  <Link to="/next-events" className="sidebar-item" onClick={handleSidebarClose}>
            {t('nextEvents')}
          </Link>
          <Link to="/past-shows" className="sidebar-item" onClick={handleSidebarClose}>
            {t('PastShows')}
          </Link>
		  <Link to="media-contact" className="sidebar-item" onClick={handleSidebarClose}>
            {t('MediaContact')}
          </Link>
		  {user && (
            <>
              {/* <Link
                to="/chorists"
                className="sidebar-item"
                onClick={toggleSidebar}
              >
                {t("Chorists")}
              </Link> */}
              {/* {user.is_admin && (
                <Link
                  to="/admin"
                  className="sidebar-item"
                  onClick={toggleSidebar}
                >
                  {t("Admin")}
                </Link>
              )} */}
              {/* <button
                className="sidebar-item"
                onClick={() => {
                  toggleSidebar();
                  logout();
                  navigate("/");
                }}
              >
                {t("Logout")}
              </button> */}
            </>
          )}
          {/* {!user && (
            <Link
              to="/login"
              className="sidebar-item"
              onClick={toggleSidebar}
            >
              {t("Login")}
            </Link>
          )} */}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
