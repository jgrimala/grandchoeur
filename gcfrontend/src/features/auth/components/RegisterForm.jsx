// src/components/auth/RegisterForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/user", {
        username,
        email,
        password,
        full_name: fullName,
        is_admin: false, // Adjust this as necessary
      });
      console.log("User created:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error creating user", error);
      setError(t("Registration failed") + ": " + error.message);
    }
  };

  return (
    <div>
      <h2>{t("Register")}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">{t("Username")}:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">{t("Email")}:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">{t("Password")}:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="fullName">{t("Full Name")}:</label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <button type="submit">{t("Register")}</button>
        {error && <p>{error}</p>}
      </form>
      <p>{t("Already have an account?")} <Link to="/login">{t("Login here")}</Link></p>
    </div>
  );
};

export default RegisterForm;
