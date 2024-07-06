import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { AuthContext } from "../../../context/AuthContext";
import { updateUserThemeFlag } from "../../../services/FeatureFlagService";

const ThemeSwitcher = () => {
	const { theme, setTheme } = useContext(ThemeContext);
	const { user } = useContext(AuthContext);

	const toggleTheme = async () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);

		if (user && user.id) {
			try {
				await updateUserThemeFlag(user.id, newTheme === "dark");
			} catch (error) {
				console.error("Failed to update theme flag:", error);
			}
		}
	};

	return (
		<button onClick={toggleTheme}>
			Switch to {theme === "light" ? "dark" : "light"} theme
		</button>
	);
};

export default ThemeSwitcher;
