// src/components/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRight,
	faEnvelope,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
	const navigate = useNavigate();

	const handleAboutClick = (e) => {
		e.preventDefault();
		navigate("/about"); // Navigate to the "About" page
	};

	return (
		<div
			className="home-page"
			style={{
				backgroundImage: `url('/assets/images/choir_color_splash_04.jpg')`,
			}} // Retaining background image here
		>
			<div className="left-section">
				<h1 className="main-heading">
					<div className="title-container">
						<span className="line">
							Le <span className="subline">Grand Choeur</span>
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
						Une chorale communautaire originale de Montréal
					</div>
				</h2>

				<div className="action-links-container">
					<div className="action-links-box">
					<a href="/about" onClick={handleAboutClick} className="about-link">
						En savoir <FontAwesomeIcon icon={faPlus} className="my-icon theme-icon" />
					</a>
					</div>
					{/* <div className="action-links-mail">
					<a href="mailto:cinqgrandescloches@gmail.com" className="email-link">
						<FontAwesomeIcon icon={faEnvelope} className="email-icon" />
					</a>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Home;
