import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const RegisterForm = ({ closeModal, openLoginModal }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [telephone, setTelephone] = useState("");
	const [birthday, setBirthday] = useState("");
	const [section, setSection] = useState("");
	const [displayContact, setDisplayContact] = useState("");
	const [error, setError] = useState("");
	const { t } = useTranslation();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		try {
			await axios.post(
				"http://localhost/GrandChoeur/gcbackend/public/index.php/user",
				{
					username,
					email,
					password,
					full_name: fullName,
					is_admin: false,
				}
			);
			closeModal();
			openLoginModal();
		} catch (error) {
			setError(t("Registration failed") + ": " + error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="modal-form">
			<h2 className="modal-title">{t("Registration form")}</h2>
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
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder={t("Email")}
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
			<div className="form-group full-name-group">
				<input
					id="fullName"
					type="text"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					placeholder={t("Full Name")}
					required
				/>
			</div>

			<div className="form-group phone-group">
				<input
					id="telephone"
					type="text"
					value={telephone}
					onChange={(e) => setTelephone(e.target.value)}
					placeholder={t("Telephone")}
					required
				/>
			</div>

			<div className="form-group-row">
				<label htmlFor="birthdate" className="form-label">
					{t("Birthday")}
				</label>
				<input
					id="birthdate"
					type="date"
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
					className="uniform-width-inputs"
					placeholder="yyyy-mm-dd"
					required
				/>
			</div>

			<div className="form-group-row">
				<label htmlFor="section" className="form-label">
					{t("Section")}
				</label>
				<select
					id="section"
					value={section}
					onChange={(e) => setSection(e.target.value)}
					className="uniform-width-inputs"
					required
				>	
					<option value="">{t("Select Role")}</option>
					<option value="soprano">{t("Soprano")}</option>
					<option value="alto">{t("Alto")}</option>
					<option value="tenor">{t("Tenor")}</option>
					<option value="basse">{t("Basse")}</option>
					<option value="soloist">{t("Soloist")}</option>
					<option value="musician">{t("Musician")}</option>
					<option value="technical">{t("Technicien")}</option>
					<option value="director">{t("Director")}</option>
					<option value="admin">{t("Administrator")}</option>
				</select>
			</div>

			<div className="form-group-row">
				<label htmlFor="display_contact" className="form-label">
					{t("Display Contact")}
				</label>
				<select
					id="display_contact"
					value={displayContact}
					onChange={(e) => setDisplayContact(e.target.value)}
					className="uniform-width-inputs"
					required
				>
					<option value="">{t("Select option")}</option>
					<option value="yes">{t("Yes")}</option>
					<option value="no">{t("No")}</option>
					<option value="only-email">{t("Only email")}</option>
				</select>
			</div>

			{error && <p className="error-message">{error}</p>}
			<div className="button-container">
				<button type="submit" className="modal-button">
					{t("Register")}
				</button>
			</div>
			<p className="switch-modal-text">
				{t("Already have an account?")}
				<span className="link-text" onClick={openLoginModal}>
					{t("Login here")}
				</span>
			</p>
		</form>
	);
};

export default RegisterForm;
