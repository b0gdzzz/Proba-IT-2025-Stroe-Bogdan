import React, { useState } from "react";
import "./GrillDetailsModal.css";

const GrillDetailsModal = ({
  grill,
  currentUser,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGrill, setEditedGrill] = useState({
    name: grill.name,
    description: grill.description,
    imageUrl: grill.imageUrl || "",
    location: grill.location || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if current user can edit/delete this grill
  const canEdit =
    currentUser &&
    (currentUser._id === grill.creator?._id ||
      currentUser._id === grill.creator ||
      currentUser.role === "admin");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGrill((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onUpdate(grill._id, editedGrill);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating grill:", err);
      alert("Failed to update grill. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this grill? This action cannot be undone."
      )
    ) {
      try {
        setIsDeleting(true);
        await onDelete(grill._id);
        onClose();
      } catch (err) {
        console.error("Error deleting grill:", err);
        alert("Failed to delete grill. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleCancel = () => {
    setEditedGrill({
      name: grill.name,
      description: grill.description,
      imageUrl: grill.imageUrl || "",
      location: grill.location || "",
    });
    setImageFile(null);
    setImagePreview("");
    setIsEditing(false);
  };

  return (
    <div className="grill-modal-overlay" onClick={onClose}>
      <div className="grill-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="grill-modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="grill-modal-image-container">
          {(
            isEditing ? imagePreview || editedGrill.imageUrl : grill.imageUrl
          ) ? (
            <img
              src={
                isEditing
                  ? imagePreview || editedGrill.imageUrl
                  : grill.imageUrl
              }
              alt={isEditing ? editedGrill.name : grill.name}
              className="grill-modal-image"
            />
          ) : (
            <div className="grill-modal-placeholder">
              <span>🔥</span>
            </div>
          )}
          {isEditing && (
            <div className="image-upload-overlay">
              <input
                type="file"
                id="edit-image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input-hidden"
              />
              <label
                htmlFor="edit-image"
                className="image-upload-overlay-button"
              >
                📷 Change Image
              </label>
            </div>
          )}
        </div>

        <div className="grill-modal-body">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editedGrill.name}
                onChange={handleInputChange}
                className="grill-modal-input"
                placeholder="Grill Name"
                maxLength={100}
              />
              <textarea
                name="description"
                value={editedGrill.description}
                onChange={handleInputChange}
                className="grill-modal-textarea"
                placeholder="Description"
                rows={6}
                maxLength={500}
              />
              <input
                type="text"
                name="location"
                value={editedGrill.location}
                onChange={handleInputChange}
                className="grill-modal-input"
                placeholder="Location (optional)"
                maxLength={100}
              />
            </>
          ) : (
            <>
              <h2 className="grill-modal-title">{grill.name}</h2>
              <p className="grill-modal-description">{grill.description}</p>

              <div className="grill-modal-meta">
                <div className="grill-modal-meta-item">
                  <span className="meta-icon">❤️</span>
                  <span className="meta-text">
                    {grill.likes?.length || 0}{" "}
                    {grill.likes?.length === 1 ? "like" : "likes"}
                  </span>
                </div>
                {grill.location && (
                  <div className="grill-modal-meta-item">
                    <span className="meta-icon">📍</span>
                    <span className="meta-text">{grill.location}</span>
                  </div>
                )}
                <div className="grill-modal-meta-item">
                  <span className="meta-icon">📅</span>
                  <span className="meta-text">
                    {new Date(grill.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="grill-modal-meta-item">
                  <span className="meta-icon">🕐</span>
                  <span className="meta-text">
                    {new Date(grill.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </>
          )}

          <div className="grill-modal-actions">
            {isEditing ? (
              <>
                <button
                  className="grill-modal-btn grill-modal-btn-save"
                  onClick={handleSave}
                  disabled={
                    isSaving ||
                    !editedGrill.name.trim() ||
                    !editedGrill.description.trim()
                  }
                >
                  {isSaving ? "Saving..." : "💾 Save Changes"}
                </button>
                <button
                  className="grill-modal-btn grill-modal-btn-cancel"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {canEdit && (
                  <>
                    <button
                      className="grill-modal-btn grill-modal-btn-edit"
                      onClick={() => setIsEditing(true)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="grill-modal-btn grill-modal-btn-delete"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "🗑️ Delete"}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrillDetailsModal;
