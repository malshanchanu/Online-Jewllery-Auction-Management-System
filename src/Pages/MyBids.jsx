import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const MyBids = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      setLoading(true);
      console.log('Fetching user bids...');
      const response = await api.getUserBids();
      console.log('User bids response:', response);
      setBids(response.items || []);
    } catch (err) {
      console.error('Error fetching bids:', err);
      setError(err.message || 'Failed to load your bids');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted': return 'var(--success)';
      case 'rejected': return 'var(--error)';
      case 'pending': return 'var(--accent)';
      default: return 'var(--muted)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted': return '✅';
      case 'rejected': return '❌';
      case 'pending': return '⏳';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <div className="loading-container">
            <style>{`
              .loading-container {
                text-align: center;
                padding: 4rem 2rem;
              }
              
              .loading-spinner {
                width: 50px;
                height: 50px;
                border: 4px solid var(--surface);
                border-top: 4px solid var(--accent);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 2rem;
              }
              
              .loading-text {
                color: var(--muted);
                font-size: 1.1rem;
              }
              
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading your bids...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="my-bids">
          <style>{`
            .my-bids {
              max-width: 1000px;
              margin: 0 auto;
            }
            
            .bids-header {
              text-align: center;
              margin-bottom: 3rem;
              animation: fadeIn 0.8s ease-out;
            }
            
            .bids-title {
              font-size: 2.5rem;
              background: var(--gradient-gold);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              margin-bottom: 1rem;
              font-weight: 700;
            }
            
            .bids-subtitle {
              color: var(--muted);
              font-size: 1.2rem;
            }
            
            .bids-stats {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 2rem;
              margin-bottom: 3rem;
            }
            
            .stat-card {
              background: var(--card);
              border: 1px solid rgba(var(--accent-rgb), 0.15);
              border-radius: 16px;
              padding: 2rem;
              text-align: center;
              box-shadow: var(--shadow-lg);
              backdrop-filter: blur(15px);
              animation: riseIn 0.8s ease-out;
            }
            
            .stat-number {
              font-size: 2.5rem;
              font-weight: 700;
              color: var(--accent);
              margin-bottom: 0.5rem;
            }
            
            .stat-label {
              color: var(--muted);
              font-size: 1rem;
              font-weight: 500;
            }
            
            .bids-list {
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
            }
            
            .bid-card {
              background: var(--card);
              border: 1px solid rgba(var(--accent-rgb), 0.15);
              border-radius: 16px;
              padding: 2rem;
              box-shadow: var(--shadow-lg);
              backdrop-filter: blur(15px);
              animation: riseIn 0.8s ease-out;
              transition: all 0.3s ease;
            }
            
            .bid-card:hover {
              transform: translateY(-2px);
              box-shadow: var(--shadow-xl);
            }
            
            .bid-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 1.5rem;
              flex-wrap: wrap;
              gap: 1rem;
            }
            
            .bid-info {
              flex: 1;
            }
            
            .bid-product {
              font-size: 1.3rem;
              font-weight: 600;
              color: var(--text);
              margin-bottom: 0.5rem;
            }
            
            .bid-amount {
              font-size: 1.8rem;
              font-weight: 700;
              color: var(--accent);
              margin-bottom: 0.5rem;
            }
            
            .bid-status {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.5rem 1rem;
              border-radius: 25px;
              font-weight: 600;
              font-size: 0.9rem;
            }
            
            .bid-details {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 1rem;
              margin-top: 1.5rem;
              padding-top: 1.5rem;
              border-top: 1px solid rgba(var(--accent-rgb), 0.1);
            }
            
            .bid-detail {
              display: flex;
              flex-direction: column;
              gap: 0.25rem;
            }
            
            .bid-detail-label {
              color: var(--muted);
              font-size: 0.9rem;
              font-weight: 500;
            }
            
            .bid-detail-value {
              color: var(--text);
              font-weight: 600;
            }
            
            .empty-state {
              text-align: center;
              padding: 4rem 2rem;
              background: var(--card);
              border-radius: 16px;
              border: 1px solid rgba(var(--accent-rgb), 0.15);
            }
            
            .empty-icon {
              font-size: 4rem;
              color: var(--muted);
              margin-bottom: 1rem;
            }
            
            .empty-title {
              font-size: 1.5rem;
              color: var(--text);
              margin-bottom: 1rem;
              font-weight: 600;
            }
            
            .empty-message {
              color: var(--muted);
              font-size: 1.1rem;
              margin-bottom: 2rem;
            }
            
            .empty-action {
              display: inline-block;
              padding: 1rem 2rem;
              background: linear-gradient(135deg, var(--accent), var(--accent-2));
              color: var(--on-primary);
              text-decoration: none;
              border-radius: 12px;
              font-weight: 600;
              transition: all 0.3s ease;
            }
            
            .empty-action:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(var(--accent-rgb), 0.4);
            }
            
            .error {
              background: rgba(239, 68, 68, 0.1);
              border: 1px solid var(--error);
              border-radius: 12px;
              padding: 2rem;
              text-align: center;
              color: var(--error);
            }
            
            @media (max-width: 768px) {
              .bids-title { font-size: 2rem; }
              .bid-header { flex-direction: column; align-items: stretch; }
              .bid-details { grid-template-columns: 1fr; }
              .bids-stats { grid-template-columns: 1fr; }
            }
          `}</style>
          
          <div className="bids-header">
            <h1 className="bids-title">My Bids</h1>
            <p className="bids-subtitle">Track your placed bids and their status</p>
          </div>
          
          {error ? (
            <div className="error">
              <h3>Error Loading Bids</h3>
              <p>{error}</p>
            </div>
          ) : bids.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3 className="empty-title">No Bids Yet</h3>
              <p className="empty-message">
                You haven't placed any bids yet. Start exploring our luxury jewelry collection and place your first bid!
              </p>
              <a href="/" className="empty-action">
                Browse Jewelry
              </a>
            </div>
          ) : (
            <>
              <div className="bids-stats">
                <div className="stat-card">
                  <div className="stat-number">{bids.length}</div>
                  <div className="stat-label">Total Bids</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">
                    {bids.filter(bid => bid.status === 'pending').length}
                  </div>
                  <div className="stat-label">Pending</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">
                    {bids.filter(bid => bid.status === 'accepted').length}
                  </div>
                  <div className="stat-label">Accepted</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">
                    {bids.filter(bid => bid.status === 'rejected').length}
                  </div>
                  <div className="stat-label">Rejected</div>
                </div>
              </div>
              
              <div className="bids-list">
                {bids.map((bid, index) => (
                  <div key={bid.id || index} className="bid-card">
                    <div className="bid-header">
                      <div className="bid-info">
                        <div className="bid-product">{bid.productName || 'Luxury Jewelry'}</div>
                        <div className="bid-amount">${bid.amount.toFixed(2)} {bid.currency}</div>
                      </div>
                      <div 
                        className="bid-status"
                        style={{ 
                          backgroundColor: getStatusColor(bid.status) + '20',
                          color: getStatusColor(bid.status)
                        }}
                      >
                        {getStatusIcon(bid.status)} {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                      </div>
                    </div>
                    
                    <div className="bid-details">
                      <div className="bid-detail">
                        <span className="bid-detail-label">Bid ID</span>
                        <span className="bid-detail-value">{bid.id}</span>
                      </div>
                      <div className="bid-detail">
                        <span className="bid-detail-label">Date Placed</span>
                        <span className="bid-detail-value">
                          {new Date(bid.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="bid-detail">
                        <span className="bid-detail-label">Time</span>
                        <span className="bid-detail-value">
                          {new Date(bid.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="bid-detail">
                        <span className="bid-detail-label">Product ID</span>
                        <span className="bid-detail-value">{bid.productId}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBids;
