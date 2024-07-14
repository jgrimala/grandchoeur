import "./i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import './styles/main.css'; // Import the compiled CSS file
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Router>
			<AuthProvider>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</AuthProvider>
		</Router>
	</React.StrictMode>
);

reportWebVitals();
