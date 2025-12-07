import React, { useState } from "react";
import { grillsAPI } from "../services/api";
import "./PostGrillModal.css";

const PostGrillModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    location: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name.trim()) {
      setError("Grill name is required");
      return;
    }

    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to post a grill");
        return;
      }

      await grillsAPI.create(formData);

      // Reset form
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        location: "",
      });
      setImageFile(null);
      setImagePreview("");

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }

      // Close modal
      onClose();
    } catch (err) {
      console.error("Error creating grill:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create grill. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="post-modal-overlay" onClick={handleOverlayClick}>
      <div className="post-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="post-modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="post-modal-header">
          <h2 className="post-modal-title">🔥 Post Your Grill</h2>
          <p className="post-modal-subtitle">
            Share your BBQ event with the community
          </p>
        </div>

        <form className="post-modal-form" onSubmit={handleSubmit}>
          <div className="post-modal-body">
            <div className="form-field">
              <label htmlFor="name" className="field-label">
                Grill Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="What's your grill called?"
                className="field-input"
                disabled={loading}
                maxLength={100}
              />
            </div>

            <div className="form-field">
              <label htmlFor="description" className="field-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your amazing grill event..."
                rows="6"
                className="field-textarea"
                disabled={loading}
                maxLength={500}
              />
            </div>

            <div className="form-field">
              <label htmlFor="location" className="field-label">
                📍 Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Where will this grill be?"
                className="field-input"
                disabled={loading}
                maxLength={100}
              />
            </div>

            <div className="form-field">
              <label htmlFor="image" className="field-label">
                🖼️ Image
              </label>
              <div className="image-upload-container">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-input-hidden"
                  disabled={loading}
                />
                <label htmlFor="image" className="image-upload-button">
                  📷 Choose Image
                </label>
                {imagePreview && (
                  <div className="image-preview-container">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-preview"
                    />
                    <button
                      type="button"
                      className="image-remove-button"
                      onClick={removeImage}
                      disabled={loading}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            {error && <div className="post-modal-error">{error}</div>}
          </div>

          <div className="post-modal-actions">
            <button
              type="submit"
              className="post-modal-btn post-modal-btn-submit"
              disabled={
                loading || !formData.name.trim() || !formData.description.trim()
              }
            >
              {loading ? "Posting..." : "🔥 Post Grill"}
            </button>
            <button
              type="button"
              className="post-modal-btn post-modal-btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostGrillModal;
