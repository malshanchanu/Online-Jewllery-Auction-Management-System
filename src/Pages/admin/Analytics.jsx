import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.getAnalytics({ timeRange });
      setAnalytics(response);
    } catch (err) {
      setError(err.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (loading) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <div className="loading-spinner">Loading analytics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-container">
        <style>{`
          .analytics-dashboard {
            max-width: 1400px;
            margin: 0 auto;
          }
          
          .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid var(--accent);
          }
          
          .page-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--accent);
            margin: 0;
          }
          
          .time-range-selector {
            display: flex;
            gap: 0.5rem;
            background: var(--surface);
            padding: 0.5rem;
            border-radius: 8px;
            border: 1px solid rgba(var(--accent-rgb), 0.2);
          }
          
          .time-range-btn {
            padding: 0.5rem 1rem;
            border: none;
            background: transparent;
            color: var(--text);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
          }
          
          .time-range-btn.active {
            background: var(--accent);
            color: var(--on-primary);
          }
          
          .time-range-btn:hover:not(.active) {
            background: rgba(var(--accent-rgb), 0.1);
          }
          
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
          }
          
          .stat-card {
            background: var(--card);
            border-radius: 12px;
            padding: 1.5rem;
            border: 1px solid rgba(var(--accent-rgb), 0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            border-color: var(--accent);
          }
          
          .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(135deg, var(--accent), var(--accent-2));
          }
          
          .stat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          }
          
          .stat-title {
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .stat-icon {
            font-size: 1.5rem;
            opacity: 0.7;
          }
          
          .stat-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 0.5rem;
            line-height: 1;
          }
          
          .stat-change {
            font-size: 0.85rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }
          
          .stat-change.positive {
            color: var(--success);
          }
          
          .stat-change.negative {
            color: var(--error);
          }
          
          .stat-change.neutral {
            color: var(--muted);
          }
          
          .charts-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
          }
          
          .chart-card {
            background: var(--card);
            border-radius: 12px;
            padding: 1.5rem;
            border: 1px solid rgba(var(--accent-rgb), 0.1);
          }
          
          .chart-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .chart-placeholder {
            height: 300px;
            background: linear-gradient(135deg, var(--accent), var(--accent-2));
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--on-primary);
            font-size: 1.1rem;
            font-weight: 600;
            text-align: center;
            opacity: 0.8;
          }
          
          .recent-activity {
            background: var(--card);
            border-radius: 12px;
            padding: 1.5rem;
            border: 1px solid rgba(var(--accent-rgb), 0.1);
          }
          
          .activity-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .activity-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 0;
            border-bottom: 1px solid rgba(var(--accent-rgb), 0.1);
          }
          
          .activity-item:last-child {
            border-bottom: none;
          }
          
          .activity-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            color: var(--on-primary);
          }
          
          .activity-icon.order {
            background: var(--accent);
          }
          
          .activity-icon.user {
            background: var(--success);
          }
          
          .activity-icon.bid {
            background: var(--warning);
          }
          
          .activity-content {
            flex: 1;
          }
          
          .activity-text {
            font-weight: 500;
            color: var(--text);
            margin-bottom: 0.25rem;
          }
          
          .activity-time {
            font-size: 0.85rem;
            color: var(--muted);
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
          
          @media (max-width: 768px) {
            .charts-grid {
              grid-template-columns: 1fr;
            }
            
            .stats-grid {
              grid-template-columns: 1fr;
            }
            
            .page-header {
              flex-direction: column;
              gap: 1rem;
              align-items: stretch;
            }
          }
        `}</style>

        <div className="analytics-dashboard">
          <div className="page-header">
            <h1 className="page-title">Analytics Dashboard</h1>
            <div className="time-range-selector">
              <button 
                className={`time-range-btn ${timeRange === '7d' ? 'active' : ''}`}
                onClick={() => setTimeRange('7d')}
              >
                7 Days
              </button>
              <button 
                className={`time-range-btn ${timeRange === '30d' ? 'active' : ''}`}
                onClick={() => setTimeRange('30d')}
              >
                30 Days
              </button>
              <button 
                className={`time-range-btn ${timeRange === '90d' ? 'active' : ''}`}
                onClick={() => setTimeRange('90d')}
              >
                90 Days
              </button>
              <button 
                className={`time-range-btn ${timeRange === '1y' ? 'active' : ''}`}
                onClick={() => setTimeRange('1y')}
              >
                1 Year
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {analytics && (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-title">Total Revenue</span>
                    <span className="stat-icon">💰</span>
                  </div>
                  <div className="stat-value">{formatCurrency(analytics.totalRevenue || 0)}</div>
                  <div className={`stat-change ${analytics.revenueChange >= 0 ? 'positive' : 'negative'}`}>
                    {analytics.revenueChange >= 0 ? '↗' : '↘'} {Math.abs(analytics.revenueChange || 0)}%
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-title">Total Orders</span>
                    <span className="stat-icon">📦</span>
                  </div>
                  <div className="stat-value">{formatNumber(analytics.totalOrders || 0)}</div>
                  <div className={`stat-change ${analytics.ordersChange >= 0 ? 'positive' : 'negative'}`}>
                    {analytics.ordersChange >= 0 ? '↗' : '↘'} {Math.abs(analytics.ordersChange || 0)}%
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-title">Active Users</span>
                    <span className="stat-icon">👥</span>
                  </div>
                  <div className="stat-value">{formatNumber(analytics.activeUsers || 0)}</div>
                  <div className={`stat-change ${analytics.usersChange >= 0 ? 'positive' : 'negative'}`}>
                    {analytics.usersChange >= 0 ? '↗' : '↘'} {Math.abs(analytics.usersChange || 0)}%
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-title">Total Bids</span>
                    <span className="stat-icon">🎯</span>
                  </div>
                  <div className="stat-value">{formatNumber(analytics.totalBids || 0)}</div>
                  <div className={`stat-change ${analytics.bidsChange >= 0 ? 'positive' : 'negative'}`}>
                    {analytics.bidsChange >= 0 ? '↗' : '↘'} {Math.abs(analytics.bidsChange || 0)}%
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-title">Average Order Value</span>
                    <span className="stat-icon">📊</span>
                  </div>
                  <div className="stat-value">{formatCurrency(analytics.averageOrderValue || 0)}</div>
                  <div className={`stat-change ${analytics.aovChange >= 0 ? 'positive' : 'negative'}`}>
                    {analytics.aovChange >= 0 ? '↗' : '↘'} {Math.abs(analytics.aovChange || 0)}%
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-title">Conversion Rate</span>
                    <span className="stat-icon">📈</span>
                  </div>
                  <div className="stat-value">{(analytics.conversionRate || 0).toFixed(1)}%</div>
                  <div className={`stat-change ${analytics.conversionChange >= 0 ? 'positive' : 'negative'}`}>
                    {analytics.conversionChange >= 0 ? '↗' : '↘'} {Math.abs(analytics.conversionChange || 0)}%
                  </div>
                </div>
              </div>

              <div className="charts-grid">
                <div className="chart-card">
                  <div className="chart-title">
                    📈 Revenue Trend
                  </div>
                  <div className="chart-placeholder">
                    Revenue trend chart would be displayed here
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-title">
                    🎯 Top Categories
                  </div>
                  <div className="chart-placeholder">
                    Category breakdown chart would be displayed here
                  </div>
                </div>
              </div>

              <div className="recent-activity">
                <div className="activity-title">
                  🔔 Recent Activity
                </div>
                <div className="activity-item">
                  <div className="activity-icon order">📦</div>
                  <div className="activity-content">
                    <div className="activity-text">New order #12345 placed by John Doe</div>
                    <div className="activity-time">2 hours ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon user">👤</div>
                  <div className="activity-content">
                    <div className="activity-text">New user registration: Jane Smith</div>
                    <div className="activity-time">4 hours ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon bid">🎯</div>
                  <div className="activity-content">
                    <div className="activity-text">New bid placed on Diamond Ring - $2,500</div>
                    <div className="activity-time">6 hours ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon order">📦</div>
                  <div className="activity-content">
                    <div className="activity-text">Order #12344 shipped to customer</div>
                    <div className="activity-time">1 day ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon bid">🎯</div>
                  <div className="activity-content">
                    <div className="activity-text">Bid accepted for Gold Necklace - $1,200</div>
                    <div className="activity-time">2 days ago</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;