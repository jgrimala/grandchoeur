// src/components/layout/header/Header.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import ThemeSwitcher from "../../common/theme/ThemeSwitcher";
import "./Header.scss";

const Header = () => {
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
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">{t("Home")}</Link>
          </li>
          {!user && !isLoginPage && (
            <li className="nav-item">
              <Link to="/login" className="nav-link">{t("Login")}</Link>
            </li>
          )}
          {user && (
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link">{t("Logout")}</button>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
