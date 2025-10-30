import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      // Mock wishlist data for now
      const mockWishlist = [
        {
          id: '1',
          name: 'Diamond Engagement Ring',
          price: 2500,
          originalPrice: 3000,
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
          category: 'Rings',
          metalType: 'Platinum',
          gemstone: 'Diamond',
          carat: 1.0,
          addedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          name: 'Gold Necklace',
          price: 1200,
          originalPrice: 1500,
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
          category: 'Necklaces',
          metalType: 'Gold',
          gemstone: 'Pearl',
          carat: null,
          addedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          name: 'Emerald Earrings',
          price: 800,
          originalPrice: 1000,
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9f609a8b?w=400',
          category: 'Earrings',
          metalType: 'Silver',
          gemstone: 'Emerald',
          carat: 0.5,
          addedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      setWishlist(mockWishlist);
    } catch (err) {
      setError(err.message || 'Failed to fetch wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      // Mock removal for now
      setWishlist(prev => prev.filter(item => item.id !== productId));
    } catch (err) {
      setError(err.message || 'Failed to remove item from wishlist');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <div className="auth-required">
            <h2>Please log in to view your wishlist</h2>
            <Link to="/login" className="btn-primary">Login</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <div className="loading-spinner">Loading your wishlist...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-container">
        <style>{`
          .wishlist-page {
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .page-header {
            text-align: center;
            margin-bottom: 3rem;
          }
          
          .page-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 1rem;
          }
          
          .page-subtitle {
            font-size: 1.1rem;
            color: var(--muted);
            margin-bottom: 2rem;
          }
          
          .wishlist-stats {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
          }
          
          .stat-item {
            text-align: center;
            padding: 1rem;
            background: var(--card);
            border-radius: 12px;
            border: 1px solid rgba(var(--accent-rgb), 0.1);
            min-width: 120px;
          }
          
          .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 0.5rem;
          }
          
          .stat-label {
            font-size: 0.9rem;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .wishlist-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
          }
          
          .wishlist-item {
            background: var(--card);
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(var(--accent-rgb), 0.1);
            transition: all 0.3s ease;
            position: relative;
          }
          
          .wishlist-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
            border-color: var(--accent);
          }
          
          .item-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            background: linear-gradient(135deg, var(--accent), var(--accent-2));
          }
          
          .item-content {
            padding: 1.5rem;
          }
          
          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
          }
          
          .item-name {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 0.5rem;
            line-height: 1.3;
            flex: 1;
          }
          
          .remove-btn {
            background: var(--error);
            color: white;
            border: none;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-left: 1rem;
          }
          
          .remove-btn:hover {
            background: #dc2626;
            transform: scale(1.1);
          }
          
          .item-category {
            color: var(--muted);
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
          }
          
          .item-specs {
            font-size: 0.85rem;
            color: var(--muted);
            margin-bottom: 1rem;
            line-height: 1.4;
          }
          
          .item-pricing {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }
          
          .item-price {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--accent);
          }
          
          .item-original-price {
            font-size: 1rem;
            color: var(--muted);
            text-decoration: line-through;
          }
          
          .item-discount {
            background: var(--success);
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
          }
          
          .item-actions {
            display: flex;
            gap: 0.75rem;
          }
          
          .btn-primary {
            background: linear-gradient(135deg, var(--accent), var(--accent-2));
            color: var(--on-primary);
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            text-align: center;
            flex: 1;
          }
          
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(var(--accent-rgb), 0.3);
          }
          
          .btn-secondary {
            background: var(--surface);
            color: var(--text);
            border: 2px solid rgba(var(--accent-rgb), 0.2);
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            text-align: center;
            flex: 1;
          }
          
          .btn-secondary:hover {
            border-color: var(--accent);
            background: rgba(var(--accent-rgb), 0.1);
          }
          
          .item-added-date {
            font-size: 0.8rem;
            color: var(--muted);
            margin-top: 1rem;
            text-align: center;
          }
          
          .empty-wishlist {
            text-align: center;
            padding: 4rem 2rem;
            background: var(--card);
            border-radius: 16px;
            border: 1px solid rgba(var(--accent-rgb), 0.1);
          }
          
          .empty-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.5;
          }
          
          .empty-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 1rem;
          }
          
          .empty-subtitle {
            color: var(--muted);
            margin-bottom: 2rem;
            line-height: 1.5;
          }
          
          .loading-spinner {
            text-align: center;
            padding: 3rem;
            color: var(--muted);
            font-size: 1.1rem;
          }
          
          .error-message {
            background: var(--error);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
          }
          
          .auth-required {
            text-align: center;
            padding: 4rem 2rem;
            background: var(--card);
            border-radius: 16px;
            border: 1px solid rgba(var(--accent-rgb), 0.1);
          }
          
          .auth-required h2 {
            color: var(--text);
            margin-bottom: 2rem;
          }
          
          @media (max-width: 768px) {
            .wishlist-grid {
              grid-template-columns: 1fr;
            }
            
            .wishlist-stats {
              flex-direction: column;
              align-items: center;
            }
            
            .item-actions {
              flex-direction: column;
            }
          }
        `}</style>

        <div className="wishlist-page">
          <div className="page-header">
            <h1 className="page-title">My Wishlist</h1>
            <p className="page-subtitle">Save your favorite jewelry pieces for later</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {wishlist.length > 0 ? (
            <>
              <div className="wishlist-stats">
                <div className="stat-item">
                  <div className="stat-value">{wishlist.length}</div>
                  <div className="stat-label">Items</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">
                    {formatPrice(wishlist.reduce((total, item) => total + item.price, 0))}
                  </div>
                  <div className="stat-label">Total Value</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">
                    {formatPrice(wishlist.reduce((total, item) => total + (item.originalPrice - item.price), 0))}
                  </div>
                  <div className="stat-label">You Save</div>
                </div>
              </div>

              <div className="wishlist-grid">
                {wishlist.map((item) => (
                  <div key={item.id} className="wishlist-item">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="item-image"
                    />
                    
                    <div className="item-content">
                      <div className="item-header">
                        <h3 className="item-name">{item.name}</h3>
                        <button 
                          className="remove-btn"
                          onClick={() => removeFromWishlist(item.id)}
                          title="Remove from wishlist"
                        >
                          ×
                        </button>
                      </div>
                      
                      <p className="item-category">{item.category}</p>
                      
                      <div className="item-specs">
                        <p><strong>Metal:</strong> {item.metalType}</p>
                        {item.gemstone && <p><strong>Gemstone:</strong> {item.gemstone}</p>}
                        {item.carat && <p><strong>Carat:</strong> {item.carat}</p>}
                      </div>
                      
                      <div className="item-pricing">
                        <span className="item-price">{formatPrice(item.price)}</span>
                        {item.originalPrice > item.price && (
                          <>
                            <span className="item-original-price">{formatPrice(item.originalPrice)}</span>
                            <span className="item-discount">
                              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                            </span>
                          </>
                        )}
                      </div>
                      
                      <div className="item-actions">
                        <Link to={`/jewelry/${item.id}`} className="btn-primary">
                          View Details
                        </Link>
                        <button className="btn-secondary">
                          Add to Cart
                        </button>
                      </div>
                      
                      <div className="item-added-date">
                        Added on {formatDate(item.addedAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-wishlist">
              <div className="empty-icon">💎</div>
              <h2 className="empty-title">Your wishlist is empty</h2>
              <p className="empty-subtitle">
                Start adding your favorite jewelry pieces to your wishlist.<br/>
                You can save items for later and track price changes.
              </p>
              <Link to="/jewelry" className="btn-primary">
                Browse Jewelry
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
