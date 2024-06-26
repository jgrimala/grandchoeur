import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserThemeFlag } from '../services/FeatureFlagService';
import { AuthContext } from './AuthContext';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchThemeFlag = async () => {
      if (user && user.id) {
        const isDarkMode = await getUserThemeFlag(user.id);
        setTheme(isDarkMode ? 'dark' : 'light');
      }
    };

    fetchThemeFlag();
  }, [user]);

  useEffect(() => {
    const root = document.documentElement;
    const themeVariables = require(`../styles/themes/${theme}.scss`);
    Object.keys(themeVariables).forEach(variable => {
      root.style.setProperty(`--${variable}`, themeVariables[variable]);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
