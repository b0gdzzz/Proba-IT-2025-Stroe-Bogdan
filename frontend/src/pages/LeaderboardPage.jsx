import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { grillsAPI, authAPI } from "../services/api";
import "./LeaderboardPage.css";

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [topGrills, setTopGrills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [likingGrill, setLikingGrill] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
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

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await grillsAPI.getLeaderboard();
      setTopGrills(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Failed to load leaderboard");
    } finally {
      setLoading(false);
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
      setTopGrills(
        topGrills.map((grill) =>
          grill._id === grillId ? response.grill : grill
        )
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

  return (
    <div className="leaderboard-page">
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

      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h1 className="leaderboard-title">🏆 Clasament</h1>
          <p className="leaderboard-subtitle">
            Top grătare clasate după voturile comunității
          </p>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Se încarcă clasamentul...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={fetchLeaderboard}>Încearcă din nou</button>
          </div>
        )}

        {!loading && !error && topGrills.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔥</div>
            <h3>Încă nu există grătare!</h3>
            <p>Fii primul care postează un grătar extraordinar</p>
            <button
              className="post-first-btn"
              onClick={() => navigate("/profile")}
            >
              Postează Grătarul Tău
            </button>
          </div>
        )}

        {!loading && !error && topGrills.length > 0 && (
          <div className="leaderboard-list">
            {topGrills.map((grill, index) => (
              <div
                key={grill._id}
                className={`leaderboard-item rank-${index + 1}`}
              >
                <div className="rank-number">
                  <div className="rank-badge">
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                    {index > 2 && `#${index + 1}`}
                  </div>
                </div>

                <div className="grill-content-wrapper">
                  {grill.imageUrl && (
                    <div className="grill-image-container">
                      <img
                        src={grill.imageUrl}
                        alt={grill.name}
                        className="grill-image"
                      />
                    </div>
                  )}

                  <div className="grill-info">
                    <h3 className="grill-name">{grill.name}</h3>
                    <p className="grill-creator">
                      by {grill.creator?.name || "Unknown"}
                    </p>
                    <p className="grill-description">{grill.description}</p>
                  </div>

                  <div className="grill-actions">
                    <button
                      className={`like-button ${
                        grill.likes?.includes(currentUser?._id) ? "liked" : ""
                      }`}
                      onClick={() => handleLike(grill._id)}
                      disabled={likingGrill === grill._id}
                      title={
                        grill.likes?.includes(currentUser?._id)
                          ? "Unlike"
                          : "Like"
                      }
                    >
                      <img
                        src={
                          grill.likes?.includes(currentUser?._id)
                            ? "/mic_facut.svg"
                            : "/mic_nefacut.svg"
                        }
                        alt="like"
                        className="meat-icon"
                        style={{ width: "40px", height: "20px" }}
                      />
                      <span className="likes-count">
                        {grill.likes?.length || 0}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="decorative-elements">
        <div className="decor-grill-1">🔥</div>
        <div className="decor-grill-2">🍖</div>
        <div className="decor-grill-3">🌭</div>
        <div className="decor-grill-4">🥩</div>
      </div>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
