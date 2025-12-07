import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GrillDetailsModal from "../components/GrillDetailsModal";
import { grillsAPI, authAPI } from "../services/api";
import "./BrowseGrillsPage.css";

const BrowseGrillsPage = () => {
  const navigate = useNavigate();
  const [grills, setGrills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [likingGrill, setLikingGrill] = useState(null);
  const [selectedGrill, setSelectedGrill] = useState(null);

  useEffect(() => {
    fetchGrills();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const profileData = await authAPI.getProfile();
        setCurrentUser(profileData.user);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const handleLike = async (grillId) => {
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

  const handleUpdateGrill = async (grillId, updatedData) => {
    try {
      await grillsAPI.update(grillId, updatedData);
      await fetchGrills();
    } catch (err) {
      console.error("Error updating grill:", err);
      throw err;
    }
  };

  const handleDeleteGrill = async (grillId) => {
    try {
      await grillsAPI.delete(grillId);
      await fetchGrills();
    } catch (err) {
      console.error("Error deleting grill:", err);
      throw err;
    }
  };

  const fetchGrills = async () => {
    try {
      setLoading(true);
      const data = await grillsAPI.getAll();
      setGrills(data);
      setError(null);
    } catch (err) {
      setError("Failed to load grills. Make sure the backend is running!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="browse-page">
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

      <div className="browse-container">
        <h1 className="browse-title">Explorează Grătarele</h1>
        <p className="browse-subtitle">
          Descoperă grătarele extraordinare ale comunității noastre!
        </p>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Se încarcă grătarele...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
            <button onClick={fetchGrills} className="retry-btn">
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && grills.length === 0 && (
          <div className="empty-state">
            <p>🔥 Încă nu există grătare postate!</p>
            <p>Fii primul care își împărtășește grătarul!</p>
          </div>
        )}

        {!loading && !error && grills.length > 0 && (
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
                      <div className="overlay-creator">
                        <span className="creator-icon">👤</span>
                        <span>{grill.creator?.name || "Unknown"}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="grill-card-content">
                  <div className="grill-header">
                    <h3 className="grill-title">{grill.name}</h3>
                    <span className="grill-creator">
                      <span className="creator-icon">👤</span>
                      {grill.creator?.name || "Unknown"}
                    </span>
                  </div>
                  {grill.location && (
                    <p className="grill-location">
                      <span className="location-icon">📍</span>
                      {grill.location}
                    </p>
                  )}
                  <div className="grill-footer">
                    <button
                      className={`like-btn ${
                        grill.likes?.includes(currentUser?._id) ? "liked" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(grill._id);
                      }}
                      disabled={likingGrill === grill._id}
                    >
                      <img
                        src={
                          grill.likes?.includes(currentUser?._id)
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
      </div>

      {selectedGrill && (
        <GrillDetailsModal
          grill={selectedGrill}
          currentUser={currentUser}
          onClose={() => setSelectedGrill(null)}
          onUpdate={handleUpdateGrill}
          onDelete={handleDeleteGrill}
        />
      )}

      <Footer />
    </div>
  );
};

export default BrowseGrillsPage;
