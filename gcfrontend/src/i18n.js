/**
 * i18n.js
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
	en: {
		translation: {
			Home: "Home",
			Login: "Login",
			Logout: "Logout",
			"Change Language": "Change Language",
			Username: "Username",
			Password: "Password",
			"Log In": "Log In",
			"Login failed": "Login failed",
		},
	},
	fr: {
		translation: {
			Home: "Accueil",
			Login: "Connexion",
			Logout: "Déconnexion",
			"Change Language": "Changer de langue",
			Username: "Nom d'utilisateur",
			Password: "Mot de passe",
			"Log In": "Se connecter",
			"Login failed": "Échec de la connexion",
		},
	},
};

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		resources,
		fallbackLng: "en",
		detection: {
			order: [
				"querystring",
				"cookie",
				"localStorage",
				"navigator",
				"htmlTag",
				"path",
				"subdomain",
			],
			caches: ["localStorage", "cookie"],
		},
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
