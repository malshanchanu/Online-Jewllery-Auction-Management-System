import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const OrderManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    if (!user || user.role !== 'Admin') {
      navigate('/login');
      return;
    }
    loadOrders();
  }, [user, navigate]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockOrders = [
        {
          id: 'ORD-001',
          customerName: 'John Smith',
          customerEmail: 'john@example.com',
          total: 2500,
          status: 'Pending',
          date: '2024-01-15',
          items: [
            { name: 'Diamond Ring', quantity: 1, price: 2500 }
          ]
        },
        {
          id: 'ORD-002',
          customerName: 'Sarah Johnson',
          customerEmail: 'sarah@example.com',
          total: 1200,
          status: 'Shipped',
          date: '2024-01-14',
          items: [
            { name: 'Gold Necklace', quantity: 1, price: 1200 }
          ]
        },
        {
          id: 'ORD-003',
          customerName: 'Mike Wilson',
          customerEmail: 'mike@example.com',
          total: 800,
          status: 'Delivered',
          date: '2024-01-13',
          items: [
            { name: 'Pearl Earrings', quantity: 1, price: 800 }
          ]
        }
      ];
      setOrders(mockOrders);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update order status');
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="order-management">
        <div className="loading-spinner">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="order-management">
      <style>{`
        .order-management {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: var(--text);
          padding: 2rem;
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .page-title {
          font-size: 2rem;
          font-weight: 600;
          color: var(--accent);
        }
        
        .back-button {
          padding: 0.5rem 1rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 6px;
          color: var(--text);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .back-button:hover {
          background: rgba(255,255,255,0.2);
        }
        
        .filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        
        .filter-input {
          padding: 0.75rem;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text);
          min-width: 200px;
        }
        
        .filter-select {
          padding: 0.75rem;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text);
        }
        
        .orders-table {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        
        .table-header {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255,255,255,0.1);
          font-weight: 600;
          color: var(--accent);
        }
        
        .order-row {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
          gap: 1rem;
          padding: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          align-items: center;
        }
        
        .order-row:hover {
          background: rgba(255,255,255,0.03);
        }
        
        .order-id {
          font-weight: 600;
          color: var(--accent);
        }
        
        .customer-info h4 {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text);
        }
        
        .customer-info p {
          margin: 0;
          font-size: 0.8rem;
          color: var(--muted);
        }
        
        .order-total {
          font-weight: 600;
          color: var(--accent);
        }
        
        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          text-align: center;
        }
        
        .status-pending {
          background: rgba(255, 193, 7, 0.2);
          color: #ffc107;
        }
        
        .status-shipped {
          background: rgba(40, 167, 69, 0.2);
          color: #28a745;
        }
        
        .status-delivered {
          background: rgba(0, 123, 255, 0.2);
          color: #007bff;
        }
        
        .status-cancelled {
          background: rgba(220, 53, 69, 0.2);
          color: #dc3545;
        }
        
        .status-select {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text);
          font-size: 0.75rem;
        }
        
        .order-items {
          font-size: 0.8rem;
          color: var(--muted);
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

      <div className="page-header">
        <h1 className="page-title">Order Management</h1>
        <button className="back-button" onClick={() => navigate('/admin')}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search orders..."
          className="filter-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="orders-table">
        <div className="table-header">
          <div>Order ID</div>
          <div>Customer</div>
          <div>Total</div>
          <div>Status</div>
          <div>Date</div>
          <div>Actions</div>
        </div>
        {filteredOrders.map((order) => (
          <div key={order.id} className="order-row">
            <div className="order-id">{order.id}</div>
            <div className="customer-info">
              <h4>{order.customerName}</h4>
              <p>{order.customerEmail}</p>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} (x{item.quantity})
                    {index < order.items.length - 1 && ', '}
                  </span>
                ))}
              </div>
            </div>
            <div className="order-total">${order.total.toLocaleString()}</div>
            <div>
              <span className={`status-badge status-${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <div>{new Date(order.date).toLocaleDateString()}</div>
            <div>
              <select
                className="status-select"
                value={order.status}
                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
