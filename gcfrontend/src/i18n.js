/**
 * i18n.js
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import AboutPage from "./components/pages/AboutPage";

const resources = {
	en: {
		translation: {
			About: "About Us",
			Administrator: "Administrator",
			Alto: "Alto",
			Audio: "Audio Files",
			Basse: "Bass",
			Bells: "Our Bells' History",
			Birthday: "Birthday",	
			Blog: "Blog",
			Chorists: "Chorists",
			Dashboard: "Dashboard",
			Director: "Director",
			Email: "Email*",
			Home: "Home",
			JoinUs: "Want to join us?",
			Login: "Login",
			Logout: "Logout",
			MediaContact: "Contact for Media",
			Musician: "Musician",
			nextEvents: "Our Next Events",
			No: "No",
			Password: "Password*",
			PastShows: "Our Past Events",
			Path: "Choose your path",
			Schedules: "Schedules",
			Scores: "Scores",
			Soloist: "Solist",	
			Soprano: "Soprano",
			Staff: "Our Team",
			Technician: "Technician",
			Tenor: "Tenor",
			ThemeDark: "Dark Theme",
			ThemeLight: "Light Theme",
			Username: "Username*",
			Yes: "Yes",

			"Change Language": "Change Language",
			"Full Name": "Full Name*",
			"Header Subtitle": "An original community choir, from Montréal",
			"Log In": "Log In",
			"Login failed": "Login failed",
			"Login form": "Login form",
			"Registration form": "Registration form",
			"Select Role": "Select Role",
			"Only email": "Only email",
		},
	},
	fr: {
		translation: {
			About: "À Propos",
			Administrator: "Administrateur",
			Alto: "Alto",
			Audio: "Fichiers Audio",
			Basse: "Basse",
			Bells: "L'Histoire de nos Cloches",
			Birthday: "Date d'Anniversaire",
			Blog: "Blog",
			Chorists: "Choristes",
			Dashboard: "Tableau de Bord",
			Director: "Directeur",
			Email: "Courriel*",
			Home: "Accueil",
			JoinUs: "Se joindre à nous !",
			Login: "Connexion",
			Logout: "Déconnexion",
			MediaContact: "Contact pour les Média",
			Musician: "Musicien",
			nextEvents: "Nos Prochains évènments",
			No: "Non",
			Password: "Mot de passe*",
			PastShows: "Nos évènements passés",
			Path: "Choisi ton parcours",
			Schedules: "Horaires",
			Scores: "Partitions",
			Soloist: "Soliste",	
			Soprano: "Soprano",
			Staff: "Notre Équipe",
			Technicien: "Technicien",
			Tenor: "Ténor",
			ThemeDark: "Thème Foncé",
			ThemeLight: "Thème clair",
			Username: "Nom d'utilisateur*",
			Yes: "Oui",

			"Change Language": "Changer de langue",
			"Full Name": "Nom complet*",
			"Header Subtitle": "Une chorale communautaire originale de Montréal",
			"Log In": "Se connecter",
			"Login failed": "Échec de la connexion",
			"Login form": "Formulaire de connexion",
			"Registration form": "Nouveau compte",
			"Select Role": "Choisir un rôle",
			"Only email": "Seulement le courriel",
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
