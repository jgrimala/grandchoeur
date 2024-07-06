import "./i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
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
