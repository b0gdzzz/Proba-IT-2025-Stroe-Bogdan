import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { grillsAPI } from '../services/api';
import './BrowseGrillsPage.css';

const BrowseGrillsPage = () => {
  const [grills, setGrills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGrills();
  }, []);

  const fetchGrills = async () => {
    try {
      setLoading(true);
      const data = await grillsAPI.getAll();
      setGrills(data);
      setError(null);
    } catch (err) {
      setError('Failed to load grills. Make sure the backend is running!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="browse-page">
      <Navbar />
      
      <div className="browse-container">
        <h1 className="browse-title">Browse BBQ Grills</h1>
        <p className="browse-subtitle">Check out the amazing grills from our community!</p>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading grills...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
            <button onClick={fetchGrills} className="retry-btn">Try Again</button>
          </div>
        )}

        {!loading && !error && grills.length === 0 && (
          <div className="empty-state">
            <p>🔥 No grills posted yet!</p>
            <p>Be the first to share your BBQ setup!</p>
          </div>
        )}

        {!loading && !error && grills.length > 0 && (
          <div className="grills-grid">
            {grills.map((grill) => (
              <div key={grill._id} className="grill-card">
                <div className="grill-header">
                  <h3 className="grill-title">{grill.title}</h3>
                  <span className="grill-author">by {grill.author}</span>
                </div>
                <p className="grill-content">{grill.content}</p>
                <div className="grill-footer">
                  <span className="grill-date">
                    {new Date(grill.createdAt).toLocaleDateString()}
                  </span>
                  <button className="vote-btn">🔥 Vote</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseGrillsPage;
