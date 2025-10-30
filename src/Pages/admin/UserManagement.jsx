import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const UserManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'Admin') {
      navigate('/login');
      return;
    }
    loadUsers();
  }, [user, navigate]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await api.getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (userData) => {
    setSelectedUser(userData);
    setShowEditModal(true);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleUpdateUser = async (updatedData) => {
    try {
      await api.updateUser(selectedUser.id, updatedData);
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...updatedData } : u));
      setShowEditModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="user-management">
        <div className="loading-spinner">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="user-management">
      <style>{`
        .user-management {
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
        
        .users-table {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        
        .table-header {
          display: grid;
          grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255,255,255,0.1);
          font-weight: 600;
          color: var(--accent);
        }
        
        .user-row {
          display: grid;
          grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
          gap: 1rem;
          padding: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          align-items: center;
        }
        
        .user-row:hover {
          background: rgba(255,255,255,0.03);
        }
        
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .user-details h4 {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text);
        }
        
        .user-details p {
          margin: 0;
          font-size: 0.8rem;
          color: var(--muted);
        }
        
        .role-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          text-align: center;
        }
        
        .role-admin {
          background: rgba(255, 193, 7, 0.2);
          color: #ffc107;
        }
        
        .role-user {
          background: rgba(40, 167, 69, 0.2);
          color: #28a745;
        }
        
        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }
        
        .btn-edit {
          padding: 0.25rem 0.5rem;
          background: rgba(40, 167, 69, 0.2);
          border: 1px solid #28a745;
          border-radius: 4px;
          color: #28a745;
          cursor: pointer;
          font-size: 0.75rem;
        }
        
        .btn-delete {
          padding: 0.25rem 0.5rem;
          background: rgba(220, 53, 69, 0.2);
          border: 1px solid #dc3545;
          border-radius: 4px;
          color: #dc3545;
          cursor: pointer;
          font-size: 0.75rem;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .modal-content {
          background: rgba(15, 15, 35, 0.95);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          backdrop-filter: blur(10px);
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .modal-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--accent);
        }
        
        .close-button {
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
          font-size: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text);
          font-weight: 500;
        }
        
        .form-input {
          width: 100%;
          padding: 0.75rem;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text);
        }
        
        .form-select {
          width: 100%;
          padding: 0.75rem;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text);
        }
        
        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 1.5rem;
        }
        
        .btn-save {
          padding: 0.75rem 1.5rem;
          background: var(--accent);
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          font-weight: 500;
        }
        
        .btn-cancel {
          padding: 0.75rem 1.5rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          color: var(--text);
          cursor: pointer;
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
        <h1 className="page-title">User Management</h1>
        <button className="back-button" onClick={() => navigate('/admin')}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search users..."
          className="filter-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="User">Users</option>
          <option value="Admin">Admins</option>
        </select>
      </div>

      <div className="users-table">
        <div className="table-header">
          <div>User</div>
          <div>Email</div>
          <div>Role</div>
          <div>Created</div>
          <div>Actions</div>
        </div>
        {filteredUsers.map((userData) => (
          <div key={userData.id} className="user-row">
            <div className="user-info">
              <div className="user-avatar">
                {(userData.fullName || userData.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <h4>{userData.fullName || userData.name}</h4>
                <p>{userData.phoneNumber || 'No phone'}</p>
              </div>
            </div>
            <div>{userData.email}</div>
            <div>
              <span className={`role-badge ${userData.role === 'Admin' ? 'role-admin' : 'role-user'}`}>
                {userData.role}
              </span>
            </div>
            <div>{new Date(userData.createdAt).toLocaleDateString()}</div>
            <div className="action-buttons">
              <button
                className="btn-edit"
                onClick={() => handleEditUser(userData)}
              >
                Edit
              </button>
              {userData.role !== 'Admin' && (
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteUser(userData.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Edit User</h2>
              <button className="close-button" onClick={() => setShowEditModal(false)}>
                ×
              </button>
            </div>
            <EditUserForm
              user={selectedUser}
              onSave={handleUpdateUser}
              onCancel={() => setShowEditModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || user?.name || '',
    email: user?.email || '',
    role: user?.role || 'User',
    phoneNumber: user?.phoneNumber || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          className="form-input"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-input"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Phone Number</label>
        <input
          type="tel"
          className="form-input"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Role</label>
        <select
          className="form-select"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="modal-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-save">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default UserManagement;
