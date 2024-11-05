// src/components/layout/header/Header.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import ThemeSwitcher from "../../common/theme/ThemeSwitcher";

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

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <header className="header">
      <nav className="navigation">
        <ul className="nav-list">
          <li>
            <button onClick={() => handleNavigate("/")} className="nav-link">
              {t("Home")}
            </button>
          </li>
          {!user && !isLoginPage && (
            <li>
              <button onClick={() => handleNavigate("/login")} className="nav-link">
                {t("Login")}
              </button>
            </li>
          )}
          {user && (
            <li>
              <button onClick={handleLogout} className="nav-link">
                {t("Logout")}
              </button>
            </li>
          )}
          <li>
            <button onClick={() => changeLanguage(currentLanguage === "fr" ? "en" : "fr")} className="nav-link">
              {currentLanguage === "fr" ? "EN" : "FR"}
            </button>
          </li>
          <li>
            <ThemeSwitcher />
          </li>
          <li>
            <button onClick={() => handleNavigate("/dashboard")} className="nav-link">
              {t("Dashboard")}
            </button>
          </li>
          {user && user.is_admin && (
            <li>
              <button onClick={() => handleNavigate("/admin")} className="nav-link">
                {t("Admin")}
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
