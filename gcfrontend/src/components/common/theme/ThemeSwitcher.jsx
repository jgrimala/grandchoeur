/**
 * ThemeSwitcher.jsx
 * src/components/common/theme/ThemeSwitcher.jsx
 */
import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <button onClick={toggleTheme}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
    );
};

export default ThemeSwitcher;
