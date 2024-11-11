/**
 * ThemeSwitcher.jsx
 * src/components/common/theme/ThemeSwitcher.jsx
 */

// ThemeSwitcher.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        console.log("Switching to:", newTheme);
        setTheme(newTheme);
    };

    return (	
        <button className="nav-link" onClick={toggleTheme}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
    );
};

export default ThemeSwitcher;
