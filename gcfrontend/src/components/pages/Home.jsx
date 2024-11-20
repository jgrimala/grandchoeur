// src/components/pages/Home.jsx
import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRight,
	faEnvelope,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Home = ({ sidebarOpen }) => {
	const navigate = useNavigate();
	const { theme } = useContext(ThemeContext); 
	const { t } = useTranslation();

	const handleAboutClick = (e) => {
		e.preventDefault();
		navigate("/about"); // Navigate to the "About" page
	};

	const backgroundImageUrl =
    theme === "light"
      ? "/assets/images/GC_redish_tint.jpg"
      : "/assets/images/GC_blueish_tint2.jpg";

	return (
		<div
			className="home-page"
			style={{
				backgroundImage: `url('${backgroundImageUrl}')`,
			}} 
		>
			{!sidebarOpen && (
			<div className="left-section">
				<h1 className="main-heading">
					<div className="title-container">
						<span className="line">
							Le <span className="subline">Grand Chœur</span>
						</span>
					</div>
					<div className="title-container">
						<span className="line">
							du <span className="subline">Centre-Sud</span>
						</span>
					</div>
				</h1>
				<h2 className="subtitle">
					<div className="subtitle-line">
						{t('Header Subtitle')}
					</div>
				</h2>
			</div>
			  )}
		</div>
	);
};

export default Home;
