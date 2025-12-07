import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import "./Navbar.css";

// Green logo from Figma
const logoImg =
  "https://www.figma.com/api/mcp/asset/e9df6107-1f43-4fb4-bde7-97c6779b2a1e";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-text">Pimp Your Grill</span>
          <img
            src={logoImg}
            alt="Pimp Your Grill Logo"
            className="navbar-logo-img"
          />
        </Link>

        <button
          className="hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
          ></span>
          <span
            className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
          ></span>
          <span
            className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
          ></span>
        </button>

        <ul className={`navbar-menu ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          <li className="navbar-item">
            <Link
              to="/browse"
              className={`navbar-link ${
                location.pathname === "/browse" ? "navbar-link-active" : ""
              }`}
              onClick={closeMobileMenu}
            >
              Explorează Grătarele
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/leaderboard"
              className={`navbar-link ${
                location.pathname === "/leaderboard" ? "navbar-link-active" : ""
              }`}
              onClick={closeMobileMenu}
            >
              Leaderboard
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className="navbar-item">
                <Link
                  to="/profile"
                  className={`navbar-link ${
                    location.pathname === "/profile" ? "navbar-link-active" : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  Profil
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link
                  to="/login"
                  className={`navbar-link ${
                    location.pathname === "/login" ? "navbar-link-active" : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  Autentificare
                </Link>
              </li>
              <li className="navbar-item">
                <Link
                  to="/register"
                  className={`navbar-link ${
                    location.pathname === "/register"
                      ? "navbar-link-active"
                      : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  Înregistrare
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
