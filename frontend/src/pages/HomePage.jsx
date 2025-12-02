import React from 'react';
import Navbar from '../components/Navbar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Share Your Best <span className="gradient-text">BBQ Grill</span>
          </h1>
          <p className="hero-subtitle">
            Post photos of your amazing BBQ setups and vote for the best grills in the community. 
            Join fellow grill masters and showcase your culinary creations!
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Post Your Grill</button>
            <button className="btn btn-secondary">Browse Grills</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card card-1">�</div>
          <div className="floating-card card-2">🍖</div>
          <div className="floating-card card-3">🌭</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Join GrillMasters?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📸</div>
            <h3 className="feature-title">Post Your Grill</h3>
            <p className="feature-description">
              Share photos and descriptions of your BBQ setup. Show off your grilling masterpiece!
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3 className="feature-title">Vote & Compete</h3>
            <p className="feature-description">
              Vote for the best grills and see your setup climb the rankings. May the best grill win!
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3 className="feature-title">BBQ Community</h3>
            <p className="feature-description">
              Connect with fellow BBQ enthusiasts. Share tips, tricks, and recipes.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3 className="feature-title">Discover Top Grills</h3>
            <p className="feature-description">
              Browse the highest-rated BBQ setups. Get inspired for your next cookout!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2 className="cta-title">Ready to show off your grill?</h2>
        <p className="cta-subtitle">Join the ultimate BBQ community today</p>
        <button className="btn btn-primary btn-large">Start Grilling</button>
      </section>
    </div>
  );
};

export default HomePage;