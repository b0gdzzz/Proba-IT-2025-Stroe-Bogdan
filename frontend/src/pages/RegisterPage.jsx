import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import Navbar from "../components/Navbar";
import { authAPI } from "../services/api";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Validation
    if (
      !formData.name ||
      !formData.username ||
      !formData.phone ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Toate câmpurile sunt obligatorii");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Parolele nu se potrivesc");
      return;
    }

    if (formData.password.length < 6) {
      setError("Parola trebuie să aibă cel puțin 6 caractere");
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.register({
        name: formData.name,
        username: formData.username,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });

      // Store token
      localStorage.setItem("token", response.token);

      // Redirect to profile
      navigate("/profile");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Înregistrare eșuată. Te rog încearcă din nou."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Navbar />

      <div className="register-container">
        <div className="register-box">
          <h1 className="register-title">Gata să devii șef pe grătare?</h1>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="name"
                placeholder="Nume complet"
                value={formData.name}
                onChange={handleChange}
                className="register-input"
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🏷️</span>
              <input
                type="text"
                name="username"
                placeholder="Nume de utilizator"
                value={formData.username}
                onChange={handleChange}
                className="register-input"
              />
            </div>

            <div className="input-group">
              <span className="input-icon">📞</span>
              <input
                type="tel"
                name="phone"
                placeholder="Telefon"
                value={formData.phone}
                onChange={handleChange}
                className="register-input"
              />
            </div>

            <div className="input-group">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className="register-input"
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
                className="register-input"
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmă parola"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="register-input"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? "Se înregistrează..." : "Înregistrare"}
            </button>
          </form>
        </div>
      </div>

      <div className="decorative-elements">
        {/* Decorative BBQ elements matching Figma design */}
        <div className="decor-grill-1">🔥</div>
        <div className="decor-grill-2">🍖</div>
        <div className="decor-grill-3">🌭</div>
        <div className="decor-grill-4">🥩</div>
      </div>
    </div>
  );
};

export default RegisterPage;
