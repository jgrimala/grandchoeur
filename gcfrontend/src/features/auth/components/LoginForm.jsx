// src/components/auth/LoginForm.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { login } = useAuth(); // Destructure the login function from useAuth

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await login({ username, password }); // Use the login method from AuthContext
      console.log("Logged in successfully");
      // Redirect or perform other actions after successful login
      // window.location = '/dashboard'; // or use your routing method to redirect
    } catch (error) {
      setError(t("Login failed") + ": " + error.message);
    }
  };

  return (
    <div>
      <h2>{t("Login")}</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">{t("Username")}:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">{t("Log In")}</button>
        {error && <p>{error}</p>}
      </form>
      <p>{t("Not registered yet?")} <Link to="/register">{t("Create an account")}</Link></p>
    </div>
  );
};

export default LoginForm;
