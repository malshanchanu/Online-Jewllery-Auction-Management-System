import React, { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.getUsers();
        if (mounted) setUsers(data || []);
      } catch (e) {
        setError(e.message || "Failed to load users");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await api.deleteUser(id);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div style={{ padding: "120px 20px" }}>
      <h1>Admin Dashboard</h1>
      <p>Manage users and monitor activity.</p>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "#ff6b6b" }}>{error}</div>}
      {!loading && !error && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th align="left">Name</th>
                <th align="left">Email</th>
                <th align="left">Role</th>
                <th align="left">Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.createdAt ? new Date(u.createdAt).toLocaleString() : "—"}</td>
                  <td>
                    <button className="button-primary" onClick={() => onDelete(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;


