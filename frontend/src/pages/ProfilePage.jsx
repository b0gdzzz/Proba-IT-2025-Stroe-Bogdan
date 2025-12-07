import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostGrillModal from "../components/PostGrillModal";
import GrillDetailsModal from "../components/GrillDetailsModal";
import { authAPI, usersAPI, grillsAPI } from "../services/api";
import "./ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [grills, setGrills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [likingGrill, setLikingGrill] = useState(null);
  const [selectedGrill, setSelectedGrill] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const profileData = await authAPI.getProfile();
      setUser(profileData.user);

      // Fetch user's grills
      const userGrills = await usersAPI.getUserGrills(profileData.user._id);
      setGrills(userGrills);

      setError(null);
    } catch (err) {
      console.error("Error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchUserGrills = async () => {
    try {
      if (user) {
        const userGrills = await usersAPI.getUserGrills(user._id);
        setGrills(userGrills);
      }
    } catch (err) {
      console.error("Error fetching grills:", err);
    }
  };

  const handleUpdateGrill = async (grillId, updatedData) => {
    try {
      await grillsAPI.update(grillId, updatedData);
      await fetchUserGrills();
    } catch (err) {
      console.error("Error updating grill:", err);
      throw err;
    }
  };

  const handleDeleteGrill = async (grillId) => {
    try {
      await grillsAPI.delete(grillId);
      await fetchUserGrills();
    } catch (err) {
      console.error("Error deleting grill:", err);
      throw err;
    }
  };

  const handleLike = async (grillId, e) => {
    e?.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLikingGrill(grillId);
      const response = await grillsAPI.toggleLike(grillId);

      // Update the grill in the local state
      setGrills(
        grills.map((grill) => (grill._id === grillId ? response.grill : grill))
      );
    } catch (err) {
      console.error("Error toggling like:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLikingGrill(null);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Se încarcă profilul...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="error-container">
          <p>{error}</p>
          <button onClick={fetchProfile}>Încearcă din nou</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
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

      <div className="profile-hero">
        <div className="hero-background"></div>
        <div className="profile-hero-content">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <span className="avatar-initial">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div className="avatar-glow"></div>
          </div>
          <h1 className="profile-username">{user?.name || "User"}</h1>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{grills.length}</span>
              <span className="stat-label">Grătare</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">
                {grills.reduce(
                  (total, grill) => total + (grill.likes?.length || 0),
                  0
                )}
              </span>
              <span className="stat-label">Total Like-uri</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">
                {grills.length > 0
                  ? Math.round(
                      grills.reduce(
                        (total, grill) => total + (grill.likes?.length || 0),
                        0
                      ) / grills.length
                    )
                  : 0}
              </span>
              <span className="stat-label">Medie Like-uri</span>
            </div>
          </div>
          <div className="profile-actions">
            <button
              className="action-btn primary"
              onClick={() => setShowModal(true)}
            >
              <span className="btn-icon">➕</span>
              Postează Grătar Nou
            </button>
            <button className="action-btn secondary" onClick={handleLogout}>
              <span className="btn-icon">🚪</span>
              Deconectare
            </button>
          </div>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile-info-section">
          <div className="info-card">
            <div className="info-card-header">
              <h3>📧 Informații Contact</h3>
            </div>
            <div className="info-card-body">
              <div className="info-row">
                <span className="info-label">Email</span>
                <span className="info-value">{user?.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Telefon</span>
                <span className="info-value">
                  {user?.phone || "Necompletat"}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Membru din</span>
                <span className="info-value">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("ro-RO", {
                        month: "long",
                        year: "numeric",
                      })
                    : "Recent"}
                </span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-header">
              <h3>🏆 Realizări</h3>
            </div>
            <div className="info-card-body">
              <div className="achievements-grid">
                <div
                  className={`achievement-badge ${
                    grills.length >= 1 ? "unlocked" : "locked"
                  }`}
                >
                  <span className="badge-icon">🔥</span>
                  <span className="badge-name">Primul Grătar</span>
                </div>
                <div
                  className={`achievement-badge ${
                    grills.length >= 5 ? "unlocked" : "locked"
                  }`}
                >
                  <span className="badge-icon">⭐</span>
                  <span className="badge-name">5 Grătare</span>
                </div>
                <div
                  className={`achievement-badge ${
                    grills.length >= 10 ? "unlocked" : "locked"
                  }`}
                >
                  <span className="badge-icon">💎</span>
                  <span className="badge-name">10 Grătare</span>
                </div>
                <div
                  className={`achievement-badge ${
                    grills.reduce((t, g) => t + (g.likes?.length || 0), 0) >= 50
                      ? "unlocked"
                      : "locked"
                  }`}
                >
                  <span className="badge-icon">👑</span>
                  <span className="badge-name">50 Like-uri</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="my-grills-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon">🍖</span>
              Colecția Mea de Grătare
            </h2>
            {grills.length > 0 && (
              <button
                className="add-grill-btn"
                onClick={() => setShowModal(true)}
              >
                <span>+ Adaugă Nou</span>
              </button>
            )}
          </div>

          {grills.length === 0 ? (
            <div className="no-grills">
              <div className="empty-state-icon">🥩</div>
              <h3>Încă nu ai grătare</h3>
              <p>Începe calea tă pe grătar postând prima ta capodoperă!</p>
              <button
                className="get-started-btn"
                onClick={() => setShowModal(true)}
              >
                <span className="btn-icon">🔥</span>
                Începe Acum
              </button>
            </div>
          ) : (
            <div className="grills-grid">
              {grills.map((grill) => (
                <div
                  key={grill._id}
                  className="grill-card"
                  onClick={() => setSelectedGrill(grill)}
                  style={{ cursor: "pointer" }}
                >
                  {grill.imageUrl && (
                    <div className="grill-image-container">
                      <img
                        src={grill.imageUrl}
                        alt={grill.name}
                        className="grill-image"
                      />
                      <div className="grill-overlay">
                        <div className="overlay-stats">
                          <div className="overlay-stat">
                            <span className="stat-icon">🥩</span>
                            <span>{grill.likes?.length || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="grill-card-content">
                    <h3 className="grill-title">{grill.name}</h3>
                    {grill.location && (
                      <p className="grill-location">
                        <span className="location-icon">📍</span>
                        {grill.location}
                      </p>
                    )}
                    <div className="grill-footer">
                      <button
                        className={`like-btn ${
                          grill.likes?.includes(user?._id) ? "liked" : ""
                        }`}
                        onClick={(e) => handleLike(grill._id, e)}
                        disabled={likingGrill === grill._id}
                      >
                        <img
                          src={
                            grill.likes?.includes(user?._id)
                              ? "/mic_facut.svg"
                              : "/mic_nefacut.svg"
                          }
                          alt="like"
                          className="like-icon"
                          style={{ width: "40px", height: "20px" }}
                        />
                        <span className="like-count">
                          {grill.likes?.length || 0}
                        </span>
                      </button>
                      <span className="grill-date">
                        {grill.createdAt
                          ? new Date(grill.createdAt).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" }
                            )
                          : "Recent"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <PostGrillModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchUserGrills}
      />

      {selectedGrill && (
        <GrillDetailsModal
          grill={selectedGrill}
          currentUser={user}
          onClose={() => setSelectedGrill(null)}
          onUpdate={handleUpdateGrill}
          onDelete={handleDeleteGrill}
        />
      )}

      <Footer />
    </div>
  );
};

export default ProfilePage;
