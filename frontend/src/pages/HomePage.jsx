import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./HomePage.css";

// Figma asset URLs
const imgImage8 =
  "https://www.figma.com/api/mcp/asset/4e08ebee-e795-4c67-aa37-3fb35257e63e";
const imgImage10 =
  "https://www.figma.com/api/mcp/asset/5668dc4d-45bb-491e-84da-e1a198940159";
const imgVector =
  "https://www.figma.com/api/mcp/asset/2bec8ab9-f259-4347-a67e-aa03711392bd";
const imgVector1 =
  "https://www.figma.com/api/mcp/asset/4791302c-0398-4da5-a0f0-830dfbf9a22c";
const imgVector2 =
  "https://www.figma.com/api/mcp/asset/22051d43-61dc-4dac-b838-aae1859df028";
const imgObjects =
  "https://www.figma.com/api/mcp/asset/2da2206e-9545-48b3-9230-d1839392c4a2";
const imgIcons =
  "https://www.figma.com/api/mcp/asset/abbcd4fb-95e1-40ee-bfa4-832c8ad1b320";
const imgGroup115 =
  "https://www.figma.com/api/mcp/asset/94bca262-7c6f-46a1-9512-02a44d21eff7";
const imgGroup =
  "https://www.figma.com/api/mcp/asset/7b5e84b1-25b1-4c9c-9435-3a0fef834a01";
const imgGroup1 =
  "https://www.figma.com/api/mcp/asset/53be468e-59ef-471d-ae62-2459395fe6a1";
const imgGroup114 =
  "https://www.figma.com/api/mcp/asset/18f12435-b317-4e52-8b54-f394a0eaed3e";
const imgVector3 =
  "https://www.figma.com/api/mcp/asset/50fc9b9d-7950-42ca-b7ee-7ef424e7dbe3";
const imgGroup2 =
  "https://www.figma.com/api/mcp/asset/a3b35972-4bab-48a3-8ef9-8eefc96e77af";
const imgGroup3 =
  "https://www.figma.com/api/mcp/asset/c5fa081e-beb5-41fc-9c04-48aa2110d4b7";
const imgVector4 =
  "https://www.figma.com/api/mcp/asset/7dd8f2cd-e356-4349-94a4-9dd1b1c4a917";
const imgGroup4 =
  "https://www.figma.com/api/mcp/asset/dd887fd6-b64f-4787-b978-ede956fd73ba";
const imgVector5 =
  "https://www.figma.com/api/mcp/asset/4e3d96b5-bc72-47e3-8ec4-57eb33c163c4";
const imgGroup112 =
  "https://www.figma.com/api/mcp/asset/6827aa41-55f2-48f7-ab76-e0d163ecdaeb";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="homepage">
      <Navbar />

      <div className="background-decorations">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
        <div className="decoration-flame flame-1">🔥</div>
        <div className="decoration-flame flame-2">🔥</div>
        <div className="decoration-flame flame-3">🔥</div>
        <div className="decoration-grill grill-1">🍖</div>
        <div className="decoration-grill grill-2">🥩</div>
        <div className="decoration-grill grill-3">🌭</div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Pimp Your <span className="hero-title-grill">Grill</span>
          </h1>
          <p className="hero-subtitle">
            {isLoggedIn
              ? "Bine ai revenit! Descoperă cele mai noi grătare și împărtășește-ți propriile creații cu comunitatea!"
              : "Înregistrează-te pentru a intra și tu în cea mai mare rețea de grătaragii din lume!"}
          </p>
          <div className="hero-buttons">
            {!isLoggedIn && (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/register")}
              >
                Înregistrează-te
              </button>
            )}
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/browse")}
            >
              Explorează Grătarele
            </button>
          </div>
        </div>

        {/* BBQ Illustrations - scattered around */}
        <div className="hero-illustrations">
          <img src={imgGroup115} alt="" className="illus illus-skewer" />
          <img src={imgGroup114} alt="" className="illus illus-grill-small" />
          <img src={imgGroup2} alt="" className="illus illus-burger" />
          <img src={imgGroup3} alt="" className="illus illus-apron" />
          <img src={imgGroup112} alt="" className="illus illus-chef-hat" />
          <img src={imgVector3} alt="" className="illus illus-pepper" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">🔥</div>
            <h3>Comunitate cu gratare</h3>
            <p>
              Descoperă cele mai tari rețete de grătar de la bucătari pasionați.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍🍳</div>
            <h3>Postează-ți propriile preparate</h3>
            <p>
              Împărtășește-ți pasiunea pentru grătar cu întreaga comunitate.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Leaderboard</h3>
            <p>Urcă în clasamentul grătarilor și devină cel mai bun bucătar.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
