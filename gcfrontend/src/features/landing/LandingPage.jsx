import React from "react";

/**
 * LandingPage.jsx
 * features\landing\LandingPage.jsx
 */

// This component defines the layout of the landing page.
const LandingPage = ({ children }) => {
	return (
		<div>
			<main>
				{children} {/* This will render the child components */}
			</main>
			<footer>{/* <Footer /> */}</footer>
		</div>
	);
};

export default LandingPage;
