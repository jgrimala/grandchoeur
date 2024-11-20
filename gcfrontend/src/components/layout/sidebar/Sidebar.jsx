import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar, isAuthenticated, isAdmin }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const handleSidebarClose = () => {
    toggleSidebar(); // Close the sidebar when clicking outside or on close button
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar && !sidebar.contains(event.target)) {
        toggleSidebar(); // Close the sidebar if clicked outside
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener on component unmount or when sidebar is closed
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <div>
      {/* Overlay: This is the transparent background that blocks interactions when the sidebar is open */}
      {isOpen && (
        <div className="overlay" onClick={handleSidebarClose}></div>
      )}
      
      {/* Sidebar content */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-content">
          {/* Close button */}
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
              {t('NextEvents')}
            </Link>
            <Link to="/past-shows" className="sidebar-item" onClick={handleSidebarClose}>
              {t('PastShows')}
            </Link>
            <Link to="media-contact" className="sidebar-item" onClick={handleSidebarClose}>
              {t('MediaContact')}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
