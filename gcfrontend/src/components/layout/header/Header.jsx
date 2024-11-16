// Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "../../common/theme/ThemeSwitcher";
import { useAuth } from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faBars } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "../../../features/auth/components/LoginModal";
import RegisterModal from "../../../features/auth/components/RegisterModal";

const Header = ({ toggleSidebar }) => {
	const { t, i18n } = useTranslation();
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const currentLanguage = i18n.language;

	// State for modals and user menu
	const [isUserMenuOpen, setUserMenuOpen] = useState(false);
	const [isLoginModalOpen, setLoginModalOpen] = useState(false);
	const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

	// Reference for detecting outside clicks
	const userMenuRef = useRef(null);

	useEffect(() => {
		// Change language to 'fr' by default if not 'fr' or 'en'
		if (i18n.language !== "fr" && i18n.language !== "en") {
			i18n.changeLanguage("fr");
		}
	}, [i18n]);

	// Handle navigation
	const handleNavigate = (path) => {
		navigate(path);
	};

	// Handle language change
	const changeLanguage = () => {
		i18n.changeLanguage(currentLanguage === "fr" ? "en" : "fr");
	};

	// Handle logout
	const handleLogout = () => {
		logout();
		navigate("/");
	};

	// Handle admin/user icon click
	const handleAdminIconClick = () => {
		if (user) {
			setUserMenuOpen(!isUserMenuOpen);
		} else {
			setLoginModalOpen(true);
		}
	};

	// Modal handlers
	const openRegisterModal = () => {
		setLoginModalOpen(false);
		setRegisterModalOpen(true);
	};

	const openLoginModal = () => {
		setRegisterModalOpen(false);
		setLoginModalOpen(true);
	};

	const closeModal = () => {
		setLoginModalOpen(false);
		setRegisterModalOpen(false);
	};

	// Close user menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
				setUserMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			<header className="header">
				<div className="header-content">
					<div className="navigation-container">
						<Link to="/" className="logo">
							<img
								src="/assets/icons/logo_white.png"
								alt="Le Grand Choeur Logo"
								width="120px"
							/>
						</Link>
					</div>
					<nav className="top-navigation">
						<ul className="nav-list">
							{/* Admin/User Icon */}
							<li className="nav-item" ref={userMenuRef}>
								<button onClick={handleAdminIconClick} className="nav-link">
									<FontAwesomeIcon icon={faCircleUser} className="nav-link" />
								</button>
								{isUserMenuOpen && user && (
									<div className="user-menu">
										<ul>
											<li>
												<button
													onClick={() => {
														navigate("/profile");
														setUserMenuOpen(false);
													}}
												>
													{t("Profile")}
												</button>
											</li>
											{user.is_admin && (
												<li>
													<button
														onClick={() => {
															navigate("/admin");
															setUserMenuOpen(false);
														}}
													>
														{t("Admin")}
													</button>
												</li>
											)}
											<li>
												<button
													onClick={() => {
														handleLogout();
														setUserMenuOpen(false);
													}}
												>
													{t("Logout")}
												</button>
											</li>
										</ul>
									</div>
								)}
							</li>
							{/* Language Switcher */}
							<li className="nav-item">
								<button onClick={changeLanguage} className="nav-link">
									{currentLanguage === "fr" ? "EN" : "FR"}
								</button>
							</li>
							{/* Theme Switcher */}
							<li className="nav-item">
								<ThemeSwitcher />
							</li>
							{/* Menu Sidebar Toggle */}
							<li className="nav-item">
								<button className="nav-link" onClick={toggleSidebar}>
									<FontAwesomeIcon icon={faBars} className="nav-link" />
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			{/* Login Modal */}
			{!user && isLoginModalOpen && (
				<LoginModal closeModal={closeModal} openRegisterModal={openRegisterModal} />
			)}
			{/* Register Modal */}
			{!user && isRegisterModalOpen && (
				<RegisterModal closeModal={closeModal} openLoginModal={openLoginModal} />
			)}
		</>
	);
};

export default Header;
