import React from 'react';
import { Link } from 'react-router';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🔥 GrillMasters
        </Link>
        
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/profile" className="navbar-link">My Grills</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link navbar-link-cta">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
