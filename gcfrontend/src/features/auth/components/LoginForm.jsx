import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const LoginForm = ({ closeModal, openRegisterModal }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { t } = useTranslation();
	const { login } = useAuth();

	const handleLogin = async (event) => {
		event.preventDefault();
		setError("");
		try {
			await login({ username, password });
			closeModal(); // Close modal on successful login
		} catch (error) {
			setError(t("Login failed") + ": " + error.message);
		}
	};

	return (
		<form onSubmit={handleLogin} className="modal-form">
			 <h2 className="modal-title">{t("Login form")}</h2>
			<div className="form-group">
				<input
					id="username"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder={t("Username")}
					required
				/>
			</div>
			<div className="form-group">
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder={t("Password")}
					required
				/>
			</div>
			{error && <p className="error-message">{error}</p>}
			<div className="button-container">
			<button type="submit" className="modal-button">
				{t("Log In")}
			</button>
			</div>
			<p className="switch-modal-text">
				{t("Not registered yet?  ")}
				<span className="link-text" onClick={openRegisterModal}>
					{t("Create an account")}
				</span>
			</p>
		</form>
	);
};

export default LoginForm;
