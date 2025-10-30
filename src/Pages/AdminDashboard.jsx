import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'Admin') {
      navigate('/login');
      return;
    }
    loadDashboardData();
  }, [user, navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Load users data
      const usersResponse = await api.getAllUsers();
      setStats(prev => ({
        ...prev,
        totalUsers: usersResponse.length,
        recentUsers: usersResponse.slice(-5).reverse()
      }));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard page-shell">
      <style>{`
        .admin-dashboard {
          min-height: 100vh;
          background: var(--gradient-dark);
          color: var(--text);
          padding: 0;
        }
        
        .admin-header {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .admin-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--accent);
        }
        
        .admin-user {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .admin-content { }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .stat-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }
        
        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          color: var(--muted);
          font-size: 0.9rem;
        }
        
        .dashboard-section {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }
        
        .section-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--accent);
        }
        
        .user-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .user-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        
        .user-info {
          display: flex;
          flex-direction: column;
        }
        
        .user-name {
          font-weight: 500;
          color: var(--text);
        }
        
        .user-email {
          font-size: 0.85rem;
          color: var(--muted);
        }
        
        .user-role {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .role-admin {
          background: rgba(255, 193, 7, 0.2);
          color: #ffc107;
        }
        
        .role-user {
          background: rgba(40, 167, 69, 0.2);
          color: #28a745;
        }
        
        .admin-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .action-button {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-primary {
          background: var(--accent);
          color: white;
        }
        
        .btn-secondary {
          background: rgba(255,255,255,0.1);
          color: var(--text);
          border: 1px solid rgba(255,255,255,0.2);
        }
        
        .btn-danger {
          background: #dc3545;
          color: white;
        }
        
        .action-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          font-size: 1.1rem;
          color: var(--muted);
        }
      `}</style>

      <div className="admin-header">
        <h1 className="admin-title">Luxury Jewelry Admin Panel</h1>
        <div className="admin-user">
          <span>Welcome, {user?.name}</span>
          <button className="action-button btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content page-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalOrders}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">${stats.totalRevenue.toLocaleString()}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Recent Users</h2>
          <div className="user-list">
            {stats.recentUsers.map((user, index) => (
              <div key={user.id || index} className="user-item">
                <div className="user-info">
                  <div className="user-name">{user.fullName || user.name}</div>
                  <div className="user-email">{user.email}</div>
                </div>
                <div className={`user-role ${user.role === 'Admin' ? 'role-admin' : 'role-user'}`}>
                  {user.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-actions">
          <button className="action-button btn-primary" onClick={() => navigate('/admin/users')}>
            Manage Users
          </button>
          
          <button className="action-button btn-secondary" onClick={() => navigate('/admin/orders')}>
            View Orders
          </button>
          <button className="action-button btn-secondary" onClick={() => navigate('/admin/analytics')}>
            Analytics
          </button>
                <button className="action-button btn-secondary" onClick={() => navigate('/admin/bids')}>
                  Manage Bids
                </button>
                <button className="action-button btn-secondary" onClick={() => navigate('/admin/products')}>
                  Manage Products
                </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
