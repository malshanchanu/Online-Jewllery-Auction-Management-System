import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const PAGE_SIZE = 10;

export default function BidManagement() {
  const { user } = useAuth();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ q: '', status: 'all', min: '', max: '' });

  useEffect(() => {
    loadBids();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters.status]);

  const testApiCall = async () => {
    try {
      console.log('Testing API call...');
      console.log('Current user:', user);
      console.log('User token:', user?.token);
      
      const response = await fetch('http://localhost:5184/api/admin/Bids', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Direct API response status:', response.status);
      const data = await response.text();
      console.log('Direct API response data:', data);
      
      if (response.ok) {
        const parsedData = JSON.parse(data);
        console.log('Parsed data:', parsedData);
        setBids(parsedData.items || []);
        setTotal(parsedData.total || 0);
        setError('');
      } else {
        setError(`API Error: ${response.status} - ${data}`);
      }
    } catch (err) {
      console.error('Test API call error:', err);
      setError(`Test API Error: ${err.message}`);
    }
  };

  const loadBids = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Check if user is authenticated
      if (!user) {
        setError('Please log in to view bids');
        return;
      }
      
      // Check if user has admin role
      if (user.role !== 'Admin') {
        setError('Admin access required');
        return;
      }
      
      console.log('Loading bids with direct API call...');
      console.log('Current user:', user);
      console.log('User token:', user?.token);
      
      // Use direct fetch like the Test API button
      const response = await fetch('http://localhost:5184/api/admin/Bids', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Direct API response status:', response.status);
      const data = await response.text();
      console.log('Direct API response data:', data);
      
      if (response.ok) {
        const parsedData = JSON.parse(data);
        console.log('Parsed data:', parsedData);
        setBids(parsedData.items || []);
        setTotal(parsedData.total || 0);
        setError('');
      } else {
        setError(`API Error: ${response.status} - ${data}`);
      }
    } catch (e) {
      console.error('Error loading bids:', e);
      setError(e.message || 'Failed to load bids');
    } finally {
      setLoading(false);
    }
  };

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / PAGE_SIZE)), [total]);

  const handleStatusChange = async (bidId, nextStatus) => {
    try {
      await api.updateBidStatus(bidId, nextStatus);
      setBids(prev => prev.map(b => (b.id === bidId ? { ...b, status: nextStatus } : b)));
    } catch (e) {
      alert(e.message || 'Failed to update status');
    }
  };

  const handleDelete = async (bidId) => {
    if (!window.confirm('Delete this bid? This cannot be undone.')) return;
    try {
      await api.deleteBid(bidId);
      setBids(prev => prev.filter(b => b.id !== bidId));
      setTotal(t => Math.max(0, t - 1));
    } catch (e) {
      alert(e.message || 'Failed to delete bid');
    }
  };

  const exportCsv = () => {
    const headers = ['ID','User','Email','Product','Amount','Currency','Status','PlacedAt'];
    const rows = bids.map(b => [
      b.id,
      b.userName || b.user?.fullName || b.user?.name || '',
      b.userEmail || b.user?.email || '',
      b.productName || b.product?.title || '',
      b.amount,
      b.currency || 'USD',
      b.status,
      b.createdAt || b.placedAt || '',
    ]);
    const csv = [headers, ...rows].map(r => r.map(x => `"${String(x ?? '').replaceAll('"','""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bids_export_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-bids-page page-shell">
      <style>{`
        .admin-bids-page { padding: 0; color: var(--text); }
        .bids-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .bids-title { font-size: 1.3rem; font-weight: 600; color: var(--accent); }
        .filters { display: flex; gap: .75rem; flex-wrap: wrap; }
        .filters input, .filters select { background: rgba(var(--surface-rgb), .7); border: 1px solid rgba(var(--accent-rgb), .2); color: var(--text); border-radius: 8px; padding: .5rem .75rem; }
        .table-wrap { background: rgba(var(--surface-rgb), .6); border: 1px solid rgba(var(--accent-rgb), .2); border-radius: 12px; overflow: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: .75rem; border-bottom: 1px solid rgba(255,255,255,.06); text-align: left; }
        th { background: rgba(255,255,255,.04); position: sticky; top: 0; }
        .badge { padding: .25rem .5rem; border-radius: 6px; font-size: .75rem; font-weight: 600; }
        .s-pending { background: rgba(255,193,7,.15); color: #ffc107; }
        .s-accepted { background: rgba(40,167,69,.15); color: #28a745; }
        .s-rejected { background: rgba(220,53,69,.15); color: #dc3545; }
        .actions { display: flex; gap: .5rem; }
        .btn-sm { padding: .35rem .6rem; border: 1px solid rgba(var(--accent-rgb), .35); background: rgba(255,255,255,.04); color: var(--text); border-radius: 6px; cursor: pointer; }
        .btn-sm:hover { transform: translateY(-1px); }
        .pagination { display: flex; justify-content: flex-end; gap: .5rem; padding: .75rem 0; }
        .muted { color: var(--muted); }
      `}</style>

      <div className="page-container">
      <div className="bids-header">
        <div className="bids-title">Bids Management</div>
        <div className="filters">
          <button className="btn-sm" onClick={testApiCall} style={{backgroundColor: 'var(--accent)', color: 'white'}}>Placed Bids</button>
          <input placeholder="Search user/product" value={filters.q} onChange={e => setFilters(f => ({ ...f, q: e.target.value }))} onKeyDown={e => { if (e.key === 'Enter') { setPage(1); loadBids(); } }} />
          <select value={filters.status} onChange={e => { setPage(1); setFilters(f => ({ ...f, status: e.target.value })); }}>
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <input type="number" placeholder="Min" value={filters.min} onChange={e => setFilters(f => ({ ...f, min: e.target.value }))} />
          <input type="number" placeholder="Max" value={filters.max} onChange={e => setFilters(f => ({ ...f, max: e.target.value }))} />
          <button className="btn-sm" onClick={() => { setPage(1); loadBids(); }}>Apply</button>
          <button className="btn-sm" onClick={exportCsv}>Export CSV</button>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Placed</th>
              <th style={{ width: 210 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" className="muted">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan="8" className="muted">{error}</td></tr>
            ) : bids.length === 0 ? (
              <tr><td colSpan="8" className="muted">No bids found</td></tr>
            ) : bids.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.userName || b.user?.fullName || b.user?.name}</td>
                <td className="muted">{b.userEmail || b.user?.email}</td>
                <td>{b.productName || b.product?.title}</td>
                <td>{(b.currency || 'USD')} {Number(b.amount).toLocaleString()}</td>
                <td>
                  <span className={`badge s-${String(b.status || 'pending').toLowerCase()}`}>{String(b.status || 'pending').toUpperCase()}</span>
                </td>
                <td className="muted">{new Date(b.createdAt || b.placedAt || Date.now()).toLocaleString()}</td>
                <td>
                  <div className="actions">
                    <button className="btn-sm" onClick={() => handleStatusChange(b.id, 'accepted')}>Accept</button>
                    <button className="btn-sm" onClick={() => handleStatusChange(b.id, 'rejected')}>Reject</button>
                    <button className="btn-sm" onClick={() => handleStatusChange(b.id, 'pending')}>Reset</button>
                    <button className="btn-sm" onClick={() => handleDelete(b.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="btn-sm" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
        <span className="muted">Page {page} of {totalPages}</span>
        <button className="btn-sm" disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</button>
      </div>
      </div>
    </div>
  );
}


