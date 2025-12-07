import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import Navbar from "../components/Navbar";
import { authAPI } from "../services/api";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Te rog să completezi toate câmpurile");
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.login(formData);

      // Store token
      localStorage.setItem("token", response.token);

      // Redirect to profile
      navigate("/profile");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Autentificare eșuată. Te rog verifică datele introduse."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Navbar />

      <div className="login-container">
        <div className="login-box">
          <h1 className="login-title">Bine ai revenit mare grătaragiu!</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className="login-input"
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Parolă"
                value={formData.password}
                onChange={handleChange}
                className="login-input"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Se autentifică..." : "Autentificare"}
            </button>
          </form>

          <div className="forgot-password">
            <a href="#forgot">Ai uitat parola?</a>
          </div>

          <div className="signup-link">
            Nu ai cont? Apasă aici pentru{" "}
            <Link to="/register">înregistrare</Link>.
          </div>
        </div>
      </div>

      <div className="decorative-elements">
        <div className="decor-grill-1">🔥</div>
        <div className="decor-grill-2">🍖</div>
        <div className="decor-grill-3">🌭</div>
        <div className="decor-grill-4">🥩</div>
      </div>
    </div>
  );
};

export default LoginPage;
