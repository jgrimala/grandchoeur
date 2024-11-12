// src/components/layout/sidebar/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar, isAuthenticated, isAdmin }) => {
  const { t } = useTranslation();

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
      <div className="sidebar-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={toggleSidebar}>
          &times;
        </button>
        <nav className="sidebar-nav">
          <Link to="/about" className="sidebar-item" onClick={toggleSidebar}>
            {t('About')}
          </Link>
          <Link to="/shows" className="sidebar-item" onClick={toggleSidebar}>
            {t('Shows')}
          </Link>
          {isAuthenticated && (
            <Link to="/chorists" className="sidebar-item" onClick={toggleSidebar}>
              {t('Choristes')}
            </Link>
          )}
          {isAdmin && (
            <>
              <Link to="/admin" className="sidebar-item" onClick={toggleSidebar}>
                {t('Admin')}
              </Link>
              <Link to="/dashboard" className="sidebar-item" onClick={toggleSidebar}>
                {t('Dashboard')}
              </Link>
            </>
          )}
          {/* Authentication Links */}
          {!isAuthenticated ? (
            <Link to="/login" className="sidebar-item" onClick={toggleSidebar}>
              {t('Login')}
            </Link>
          ) : (
            <Link to="/" className="sidebar-item" onClick={() => { toggleSidebar(); logout(); }}>
              {t('Logout')}
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
