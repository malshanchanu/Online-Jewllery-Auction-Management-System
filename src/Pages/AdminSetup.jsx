import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const AdminSetup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const createAdminUser = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      await api.createAdmin();
      setMessage('Admin user created successfully! You can now login with: admin@luxuryjewelry.com / LuxuryAdmin2024!');
    } catch (error) {
      if (error.message.includes('Email already registered')) {
        setMessage('Admin user already exists! You can login with: admin@luxuryjewelry.com / LuxuryAdmin2024!');
      } else {
        setError('Failed to create admin user: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-setup">
      <style>{`
        .admin-setup {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: var(--text);
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .setup-card {
          max-width: 500px;
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          text-align: center;
        }
        
        .setup-title {
          font-size: 2rem;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 1rem;
        }
        
        .setup-description {
          color: var(--muted);
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        
        .admin-credentials {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .credential-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .credential-label {
          font-weight: 500;
          color: var(--text);
        }
        
        .credential-value {
          font-family: monospace;
          background: rgba(255,255,255,0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          color: var(--accent);
        }
        
        .setup-button {
          padding: 1rem 2rem;
          background: var(--accent);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 1rem;
          width: 100%;
        }
        
        .setup-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        .setup-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .message {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        
        .message.success {
          background: rgba(40, 167, 69, 0.2);
          border: 1px solid #28a745;
          color: #28a745;
        }
        
        .message.error {
          background: rgba(220, 53, 69, 0.2);
          border: 1px solid #dc3545;
          color: #dc3545;
        }
        
        .back-button {
          padding: 0.5rem 1rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 6px;
          color: var(--text);
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }
        
        .back-button:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>

      <div className="setup-card">
        <h1 className="setup-title">Admin Setup</h1>
        <p className="setup-description">
          Create the admin user for your luxury jewelry website. This will set up the administrator account with full access to the admin panel.
        </p>
        
        <div className="admin-credentials">
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--accent)' }}>Admin Credentials</h3>
          <div className="credential-item">
            <span className="credential-label">Email:</span>
            <span className="credential-value">admin@luxuryjewelry.com</span>
          </div>
          <div className="credential-item">
            <span className="credential-label">Password:</span>
            <span className="credential-value">LuxuryAdmin2024!</span>
          </div>
        </div>

        {message && (
          <div className={`message ${message.includes('successfully') || message.includes('already exists') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        {error && (
          <div className="message error">
            {error}
          </div>
        )}

        <button 
          className="setup-button" 
          onClick={createAdminUser}
          disabled={loading}
        >
          {loading ? 'Creating Admin User...' : 'Create Admin User'}
        </button>

        <a href="/login" className="back-button">
          ← Back to Login
        </a>
      </div>
    </div>
  );
};

export default AdminSetup;
