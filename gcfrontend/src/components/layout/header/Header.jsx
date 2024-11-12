// src/components/layout/header/Header.jsx

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeSwitcher from '../../common/theme/ThemeSwitcher';
import { useAuth } from "../../../context/AuthContext";
const Header = ({ toggleSidebar }) => {
	const { t, i18n } = useTranslation();
	const { user, logout } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
  
	React.useEffect(() => {
	  if (i18n.language !== 'fr' && i18n.language !== 'en') {
		i18n.changeLanguage('fr');
	  }
	}, [i18n]);
  
	const isLoginPage = location.pathname === "/login";
	const currentLanguage = i18n.language;
  
	const changeLanguage = (language) => i18n.changeLanguage(language);
  
	const handleLogout = () => {
	  logout();
	  navigate('/');
	};

  return (
    <header className="header">
      <div className="header-content">
        <div className="navigation-container">
          <Link to="/" className="logo">
		  <img src="/assets/icons/logo_white.png" alt="Le Grand Choeur Logo" width="120px" />
          </Link>
        </div>
        <nav className="top-navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <button className="nav-link" onClick={toggleSidebar}>
                {t('Choose your path')}
              </button>
            </li>
          {!user && !isLoginPage && (
            <li className="nav-item">
              <button onClick={() => handleNavigate("/login")} className="nav-link">
                {t("Login")}
              </button>
            </li>
          )}
          {user && (
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link">
                {t("Logout")}
              </button>
            </li>
          )}
          <li className="nav-item">
            <button onClick={() => changeLanguage(currentLanguage === "fr" ? "en" : "fr")} className="nav-link">
              {currentLanguage === "fr" ? "EN" : "FR"}
            </button>
          </li>
          <li className="nav-item">
            <ThemeSwitcher />
          </li>
          {user && user.is_admin && (
            <li className="nav-item">
              <button onClick={() => handleNavigate("/admin")} className="nav-link">
                {t("Admin")}
              </button>
            </li>
		  )}
          </ul>
        </nav>
      </div>
	  {/* <div className="menu-separator" /> */}
    </header>
  );
};

export default Header;
