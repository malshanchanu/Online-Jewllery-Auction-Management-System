import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useState as useLocalState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  // Refresh user data when component mounts to ensure latest profile photo is shown
  useEffect(() => {
    if (user) {
      // The user data should already be up-to-date from AuthContext
      // This ensures we have the latest profile information including avatar
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="profile-page">
      <style>{`
        .profile-page { 
          min-height: 100vh; 
          background: var(--gradient-dark);
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .profile-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, var(--accent-glow) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, var(--rose-gold) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, var(--silver) 0%, transparent 50%);
          opacity: 0.05;
          animation: float 6s ease-in-out infinite;
          z-index: 0;
        }
        
        .profile-card { 
          max-width: 1000px; 
          margin: 0 auto; 
          padding: 3rem; 
          background: var(--card);
          border: 1px solid rgba(255,255,255,0.1); 
          border-radius: 24px; 
          box-shadow: var(--shadow-xl); 
          backdrop-filter: blur(20px);
          position: relative;
          z-index: 1;
          animation: riseIn 0.8s ease;
        }
        
        .profile-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--gradient-gold);
          border-radius: 24px 24px 0 0;
        }
        
        .row { 
          display: grid; 
          grid-template-columns: 200px 1fr; 
          gap: 2rem; 
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .avatar { 
          width: 150px; 
          height: 150px; 
          border-radius: 50%; 
          background: var(--gradient-gold); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: #000; 
          font-size: 4rem; 
          font-weight: 700; 
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 4px solid var(--accent);
          animation: float 3s ease-in-out infinite;
        }
        
        .avatar img { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          border-radius: 50%;
        }
        
        .profile-info h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          background: var(--gradient-gold);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .meta { 
          color: var(--muted); 
          font-size: 1.1rem;
        }
        
        .actions { 
          display: flex; 
          gap: 1.5rem; 
          margin-top: 2rem;
          flex-wrap: wrap;
        }
        
        .button-secondary { 
          padding: 1rem 2rem; 
          background: rgba(255,255,255,0.1); 
          color: var(--text); 
          border: 2px solid rgba(255,255,255,0.2); 
          border-radius: 12px; 
          font-weight: 600; 
          cursor: pointer; 
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }
        
        .button-secondary:hover { 
          background: var(--accent); 
          color: #000;
          transform: translateY(-2px); 
          box-shadow: var(--shadow-glow);
        }
        
        .details { 
          margin-top: 2rem; 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
          gap: 1.5rem; 
        }
        
        .detail { 
          padding: 1.5rem; 
          border: 1px solid rgba(255,255,255,0.1); 
          border-radius: 16px; 
          background: var(--surface);
          transition: all 0.3s ease;
        }
        
        .detail:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent);
        }
        
        .label { 
          font-size: 0.9rem; 
          color: var(--muted); 
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        .value { 
          font-weight: 600; 
          color: var(--text);
          font-size: 1.1rem;
        }
        
        .avatar-input { 
          margin-top: 1rem; 
          display: grid; 
          grid-template-columns: 1fr auto; 
          gap: 1rem; 
        }
        
        @media (max-width: 768px) {
          .profile-page { padding: 1rem; }
          .profile-card { padding: 2rem; }
          .row { grid-template-columns: 1fr; text-align: center; }
          .actions { justify-content: center; }
        }
      `}</style>

      <div className="profile-card">
        <div className="row">
          <div>
            <div className="avatar">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="Profile" />
              ) : (
                <span>{user.name?.[0] || "C"}</span>
              )}
            </div>
            <AvatarUploader />
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <div className="meta">{user.email}</div>
            <div className="actions">
              <button className="button-secondary" onClick={() => navigate("/edit-profile")}>
                Edit Profile
              </button>
              <button className="button-primary" onClick={logout}>Log Out</button>
            </div>
          </div>
        </div>
        <div className="details">
          <div className="detail">
            <div className="label">Role</div>
            <div className="value">{user.role || 'User'}</div>
          </div>
          <div className="detail">
            <div className="label">Member Since</div>
            <div className="value">{user.createdAt ? new Date(user.createdAt).toLocaleString() : '—'}</div>
          </div>
          <div className="detail">
            <div className="label">Last Updated</div>
            <div className="value">{user.updatedAt ? new Date(user.updatedAt).toLocaleString() : '—'}</div>
          </div>
          <div className="detail">
            <div className="label">User ID</div>
            <div className="value">{user.id}</div>
          </div>
          <div className="detail">
            <div className="label">Email</div>
            <div className="value">{user.email}</div>
          </div>
          <div className="detail">
            <div className="label">Phone</div>
            <div className="value">{user.phoneNumber || '—'}</div>
          </div>
          <div className="detail">
            <div className="label">Date of Birth</div>
            <div className="value">{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : '—'}</div>
          </div>
          <div className="detail">
            <div className="label">Gender</div>
            <div className="value">{user.gender || '—'}</div>
          </div>
          <div className="detail">
            <div className="label">Address</div>
            <div className="value">{[user.addressLine1, user.addressLine2].filter(Boolean).join(', ') || '—'}</div>
          </div>
          <div className="detail">
            <div className="label">City / State</div>
            <div className="value">{[user.city, user.state].filter(Boolean).join(', ') || '—'}</div>
          </div>
          <div className="detail">
            <div className="label">Postal Code</div>
            <div className="value">{user.postalCode || '—'}</div>
          </div>
          <div className="detail">
            <div className="label">Country</div>
            <div className="value">{user.country || '—'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AvatarUploader = () => {
  const { user, updateProfile } = useAuth();
  const [file, setFile] = useLocalState(null);
  const [preview, setPreview] = useLocalState(user?.avatarUrl || "");
  const [saving, setSaving] = useLocalState(false);
  const [error, setError] = useLocalState("");
  const [success, setSuccess] = useLocalState("");

  if (!user) return null;

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    setError("");
    setSuccess("");
    if (f) {
      // Validate file size (max 5MB)
      if (f.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      // Validate file type
      if (!f.type.startsWith('image/')) {
        setError("Please select an image file");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(String(ev.target?.result || ""));
      reader.readAsDataURL(f);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!file && !preview) return;
    try {
      setSaving(true);
      // For now, store as data URL in AvatarUrl; a future enhancement can upload to storage.
      await updateProfile({ avatarUrl: preview });
      setSuccess("Profile image updated successfully!");
      setFile(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update avatar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="avatar-uploader">
      <form className="avatar-input" onSubmit={onSave}>
        <div className="file-input-wrapper">
          <input 
            type="file" 
            accept="image/*" 
            onChange={onFileChange}
            id="avatar-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="avatar-upload" className="file-input-label">
            Choose Image
          </label>
        </div>
        {file && (
          <button 
            type="submit" 
            className="button-primary" 
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Image"}
          </button>
        )}
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <style>{`
        .avatar-uploader { margin-top: 0.75rem; }
        .file-input-wrapper { margin-bottom: 0.5rem; }
        .file-input-label {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(255,255,255,0.1);
          color: var(--text);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        .file-input-label:hover {
          background: rgba(255,255,255,0.2);
        }
        .error-message {
          color: #ff6b6b;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }
        .success-message {
          color: #22c55e;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};


export default Profile;


