/**
 * FeatureFlagsPage.jsx
 * features\admin\FeatureFlagsPage.jsx
 */

import React, { useContext } from "react";
import FeatureFlagsWidget from "./FeatureFlagsWidget";
import { AuthContext } from "../../context/AuthContext";

const FeatureFlagsPage = () => {
	const { user } = useContext(AuthContext);

	console.log("User:", user);

	if (!user || !user.is_admin) {
		return <div>Access Denied</div>;
	}

	return (
		<div>
			<h1>Admin Panel - Feature Flags</h1>
			<FeatureFlagsWidget />
		</div>
	);
};

export default FeatureFlagsPage;
