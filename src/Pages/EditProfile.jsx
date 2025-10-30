import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : "",
    gender: user?.gender || "",
    addressLine1: user?.addressLine1 || "",
    addressLine2: user?.addressLine2 || "",
    city: user?.city || "",
    state: user?.state || "",
    postalCode: user?.postalCode || "",
    country: user?.country || "",
  });

  // Image upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.avatarUrl || "");
  const [imageLoading, setImageLoading] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;

    setImageLoading(true);
    setError("");
    
    try {
      // Convert file to base64 for now (in production, upload to cloud storage)
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result;
        await updateProfile({ avatarUrl: base64Image });
        setImagePreview(base64Image);
        setSelectedFile(null);
        setSuccess("Profile image updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      setError("Failed to upload image: " + err.message);
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const updateData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
      };

      await updateProfile(updateData);
      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      setError("Failed to update profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="edit-profile-page">
      <style>{`
        .edit-profile-page {
          padding: 120px 0 60px;
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
        }
        
        .edit-profile-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.35);
          backdrop-filter: blur(10px);
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        
        .page-subtitle {
          color: var(--muted);
          font-size: 1.1rem;
        }
        
        .form-section {
          margin-bottom: 2rem;
          padding: 1.5rem;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          background: rgba(255,255,255,0.02);
        }
        
        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--accent);
        }
        
        .image-upload-section {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .avatar-preview {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0b0b0c;
          font-size: 48px;
          font-weight: 700;
          overflow: hidden;
          position: relative;
        }
        
        .avatar-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .image-upload-controls {
          flex: 1;
        }
        
        .file-input-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 1rem;
        }
        
        .file-input {
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        
        .file-input-button {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          color: #0b0b0c;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .file-input-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
        
        .upload-button {
          padding: 0.5rem 1rem;
          background: rgba(255,255,255,0.1);
          color: var(--text);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          margin-left: 0.5rem;
          transition: all 0.3s ease;
        }
        
        .upload-button:hover {
          background: rgba(255,255,255,0.2);
        }
        
        .upload-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .form-grid-full {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-label {
          font-weight: 500;
          color: var(--text);
          font-size: 0.9rem;
        }
        
        .form-input {
          padding: 0.9rem 1rem;
          border-radius: 10px;
          background: #0f1218;
          color: var(--text);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.1);
        }
        
        .form-select {
          padding: 0.9rem 1rem;
          border-radius: 10px;
          background: #0f1218;
          color: var(--text);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 1rem;
          cursor: pointer;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }
        
        .btn {
          padding: 0.9rem 2rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          color: #0b0b0c;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
        
        .btn-secondary {
          background: rgba(255,255,255,0.1);
          color: var(--text);
          border: 1px solid rgba(255,255,255,0.2);
        }
        
        .btn-secondary:hover {
          background: rgba(255,255,255,0.2);
        }
        
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }
        
        .message {
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 1rem;
          text-align: center;
          font-weight: 500;
        }
        
        .message-success {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }
        
        .message-error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .image-upload-section {
            flex-direction: column;
            text-align: center;
          }
          
          .edit-profile-container {
            margin: 1rem;
            padding: 1rem;
          }
        }
      `}</style>

      <div className="edit-profile-container">
        <div className="page-header">
          <h1 className="page-title">Edit Profile</h1>
          <p className="page-subtitle">Update your personal information and profile picture</p>
        </div>

        {error && <div className="message message-error">{error}</div>}
        {success && <div className="message message-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Profile Image Section */}
          <div className="form-section">
            <h3 className="section-title">Profile Picture</h3>
            <div className="image-upload-section">
              <div className="avatar-preview">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile Preview" />
                ) : (
                  <span>{user.name?.[0] || "U"}</span>
                )}
              </div>
              <div className="image-upload-controls">
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                    id="profile-image"
                  />
                  <label htmlFor="profile-image" className="file-input-button">
                    Choose Image
                  </label>
                </div>
                {selectedFile && (
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    disabled={imageLoading}
                    className="upload-button"
                  >
                    {imageLoading ? "Uploading..." : "Upload Image"}
                  </button>
                )}
                {selectedFile && (
                  <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-field">
                <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Prefer not to say</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div></div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="form-section">
            <h3 className="section-title">Address Information</h3>
            <div className="form-grid-full">
              <div className="form-field">
                <label htmlFor="addressLine1" className="form-label">Address Line 1</label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-grid-full">
              <div className="form-field">
                <label htmlFor="addressLine2" className="form-label">Address Line 2</label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="city" className="form-label">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-field">
                <label htmlFor="state" className="form-label">State/Province</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="postalCode" className="form-label">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-field">
                <label htmlFor="country" className="form-label">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
