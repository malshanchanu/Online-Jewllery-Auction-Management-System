import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BidPlacement = ({ jewelryItem, onBidPlaced, onClose }) => {
  const { user } = useAuth();
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= 0) {
      setError('Please enter a valid bid amount');
      return;
    }

    // Validate user authentication
    if (!user) {
      setError('You must be logged in to place a bid');
      return;
    }

    if (!user.token) {
      setError('Authentication token missing. Please log in again.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if user is authenticated
      console.log('Current user:', user);
      const token = localStorage.getItem('cc_user');
      console.log('Stored token exists:', !!token);
      if (token) {
        const parsed = JSON.parse(token);
        console.log('Token details:', { hasToken: !!parsed.token, tokenLength: parsed.token?.length });
      }

      const bidData = {
        ProductId: jewelryItem.id?.toString(),
        ProductName: jewelryItem.name || jewelryItem.title || 'Luxury Jewelry',
        Amount: parseFloat(bidAmount),
        Currency: 'USD'
      };

      console.log('Placing bid with data:', bidData);
      console.log('Jewelry item:', jewelryItem);
      console.log('User:', user);
      
      const response = await api.placeBid(bidData);
      console.log('Bid placed successfully:', response);
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onBidPlaced && onBidPlaced(response);
        onClose && onClose();
      }, 2000);
    } catch (err) {
      console.error('Bid placement error:', err);
      setError(err.message || 'Failed to place bid');
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
  if (!user) {
    return (
      <div className="bid-login-required">
        <style>{`
          .bid-login-required {
            text-align: center;
            padding: 2rem;
            background: var(--card);
            border-radius: 16px;
            border: 2px solid var(--warning);
            animation: fadeIn 0.5s ease-out;
          }
          
          .login-icon {
            font-size: 4rem;
            color: var(--warning);
            margin-bottom: 1rem;
            animation: pulse 2s infinite;
          }
          
          .login-title {
            font-size: 1.5rem;
            color: var(--warning);
            margin-bottom: 1rem;
            font-weight: 600;
          }
          
          .login-message {
            color: var(--text);
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
          }
          
          .login-button {
            background: linear-gradient(135deg, var(--accent), var(--accent-2));
            color: var(--on-primary);
            border: none;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
          }
          
          .login-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(var(--accent-rgb), 0.4);
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
        
        <div className="login-icon">🔐</div>
        <h3 className="login-title">Login Required</h3>
        <p className="login-message">
          You need to be logged in to place a bid. Please log in to your account first.
        </p>
        <button
          className="login-button"
          onClick={() => {
            onClose && onClose();
            window.location.href = '/login';
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bid-success">
        <style>{`
          .bid-success {
            text-align: center;
            padding: 2rem;
            background: var(--card);
            border-radius: 16px;
            border: 2px solid var(--success);
            animation: fadeIn 0.5s ease-out;
          }
          
          .success-icon {
            font-size: 4rem;
            color: var(--success);
            margin-bottom: 1rem;
            animation: bounce 0.6s ease-out;
          }
          
          .success-title {
            font-size: 1.5rem;
            color: var(--success);
            margin-bottom: 1rem;
            font-weight: 600;
          }
          
          .success-message {
            color: var(--text);
            font-size: 1.1rem;
            margin-bottom: 1rem;
          }
          
          .bid-details {
            background: var(--surface);
            border-radius: 8px;
            padding: 1rem;
            margin: 1rem 0;
            border: 1px solid rgba(var(--accent-rgb), 0.1);
          }
          
          .bid-details h4 {
            color: var(--accent);
            margin-bottom: 0.5rem;
          }
          
          .bid-details p {
            color: var(--text);
            margin: 0.25rem 0;
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `}</style>
        
        <div className="success-icon">✅</div>
        <h3 className="success-title">Bid Placed Successfully!</h3>
        <p className="success-message">
          Your bid has been submitted and is now under review by our team.
        </p>
        
        <div className="bid-details">
          <h4>Bid Details</h4>
          <p><strong>Item:</strong> {jewelryItem.name || jewelryItem.title || 'Luxury Jewelry'}</p>
          <p><strong>Your Bid:</strong> ${parseFloat(bidAmount).toFixed(2)} USD</p>
          <p><strong>Status:</strong> Pending Review</p>
          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        </div>
        
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
          You will be notified via email when your bid status changes.
        </p>
      </div>
    );
  }

  return (
    <div className="bid-placement">
      <style>{`
        .bid-placement {
          background: var(--card);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(var(--accent-rgb), 0.15);
          box-shadow: var(--shadow-lg);
          backdrop-filter: blur(15px);
          animation: fadeIn 0.5s ease-out;
        }
        
        .bid-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .bid-title {
          font-size: 1.8rem;
          color: var(--accent);
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        
        .bid-subtitle {
          color: var(--muted);
          font-size: 1.1rem;
        }
        
        .item-info {
          background: var(--surface);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(var(--accent-rgb), 0.1);
        }
        
        .item-info h3 {
          color: var(--accent);
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }
        
        .item-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .item-detail {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(var(--accent-rgb), 0.1);
        }
        
        .item-detail:last-child {
          border-bottom: none;
        }
        
        .item-detail-label {
          color: var(--muted);
          font-weight: 500;
        }
        
        .item-detail-value {
          color: var(--text);
          font-weight: 600;
        }
        
        .bid-form {
          margin-top: 2rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          display: block;
          color: var(--text);
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }
        
        .form-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid rgba(var(--accent-rgb), 0.2);
          border-radius: 12px;
          background: var(--surface);
          color: #000000;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          outline: none;
        }
        
        .form-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-glow);
        }
        
        .form-input::placeholder {
          color:rgb(0, 0, 0);
        }
        
        .currency-symbol {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          font-weight: 600;
        }
        
        .input-container {
          position: relative;
        }
        
        .form-input.with-symbol {
          padding-left: 2.5rem;
        }
        
        .bid-info {
          background: var(--surface);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
          border-left: 4px solid var(--accent);
        }
        
        .bid-info p {
          color: var(--muted);
          font-size: 0.9rem;
          margin: 0;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }
        
        .btn {
          padding: 0.8rem 2rem;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          color: var(--on-primary);
          box-shadow: 0 4px 15px rgba(var(--accent-rgb), 0.3);
        }
        
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(var(--accent-rgb), 0.4);
        }
        
        .btn-secondary {
          background: var(--surface);
          color: var(--text);
          border: 2px solid rgba(var(--accent-rgb), 0.2);
        }
        
        .btn-secondary:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .error {
          color: var(--error);
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid var(--error);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
          animation: slideInLeft 0.3s ease-out;
        }
        
        @media (max-width: 768px) {
          .bid-placement { padding: 1.5rem; }
          .item-details { grid-template-columns: 1fr; }
          .form-actions { flex-direction: column; }
        }
      `}</style>
      
      <div className="bid-header">
        <h2 className="bid-title">Place Your Bid</h2>
        <p className="bid-subtitle">Submit your offer for this luxury piece</p>
      </div>
      
      <div className="item-info">
        <h3>Item Details</h3>
        <div className="item-details">
          <div className="item-detail">
            <span className="item-detail-label">Item Name:</span>
            <span className="item-detail-value">{jewelryItem.name || jewelryItem.title || 'Luxury Jewelry'}</span>
          </div>
          <div className="item-detail">
            <span className="item-detail-label">Category:</span>
            <span className="item-detail-value">{jewelryItem.category || 'Luxury Jewelry'}</span>
          </div>
          <div className="item-detail">
            <span className="item-detail-label">Your Name:</span>
            <span className="item-detail-value">{user?.name || 'Guest'}</span>
          </div>
          <div className="item-detail">
            <span className="item-detail-label">Email:</span>
            <span className="item-detail-value">{user?.email || 'Not provided'}</span>
          </div>
        </div>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="bid-form">
        <div className="form-group">
          <label htmlFor="bidAmount" className="form-label">
            Your Bid Amount (USD)
          </label>
          <div className="input-container">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              id="bidAmount"
              className="form-input with-symbol"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>
        
        <div className="bid-info">
          <p>
            <strong>Important:</strong> Your bid will be reviewed by our team. 
            You will be notified via email about the status of your bid. 
            Bids are binding and cannot be modified once submitted.
          </p>
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !bidAmount}
          >
            {loading ? 'Placing Bid...' : 'Place Bid'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BidPlacement;
