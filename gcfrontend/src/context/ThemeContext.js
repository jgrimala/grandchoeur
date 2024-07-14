// src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

	useEffect(() => {
		const root = document.documentElement;
		root.classList.remove('light', 'dark'); // Remove existing theme classes
		root.classList.add(theme); // Add the current theme class
	}, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
