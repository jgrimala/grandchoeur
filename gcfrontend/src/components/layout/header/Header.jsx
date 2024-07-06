import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Header.scss";
/**
 * Header.jsx
 * components\layout\Header.jsx
 */

const Header = () => {
	const { t, i18n } = useTranslation();
	const { user } = useAuth();
	const currentLanguage = i18n.language;

	const changeLanguage = (language) => {
		i18n.changeLanguage(language);
	};

	return (
		<header className="header">
			<nav>
				<ul className="nav-list">
					{user && user.is_admin && (
						<li className="nav-item">
							<Link to="/admin" className="nav-link">
								Admin
							</Link>
						</li>
					)}
					<li className="nav-item">
						<Link to="/" className="nav-link">
							{t("Home")}
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							{t("Login")}
						</Link>
					</li>
					<li className="nav-item">
						{currentLanguage === "fr" && (
							<button onClick={() => changeLanguage("en")} className="nav-link">
								EN
							</button>
						)}
						{currentLanguage === "en" && (
							<button onClick={() => changeLanguage("fr")} className="nav-link">
								FR
							</button>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
