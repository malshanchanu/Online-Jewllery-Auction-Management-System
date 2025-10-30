// Minimal API client for backend calls
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5184";

function getAuthToken() {
  try {
    const saved = localStorage.getItem("cc_user");
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    console.log('Auth token check:', { hasToken: !!parsed?.token, tokenLength: parsed?.token?.length, userRole: parsed?.role });
    return parsed?.token || null;
  } catch {
    return null;
  }
}

export async function request(path, { method = "GET", body, headers = {} } = {}) {
  console.log(`Making ${method} request to ${API_BASE_URL}${path}`, body);
  const token = getAuthToken();
  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };
  if (token) {
    finalHeaders["Authorization"] = `Bearer ${token}`;
    console.log('Authorization header set with token length:', token.length);
  } else {
    console.log('No token found for request');
  }

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    console.log(`Response status: ${res.status}, text:`, text);
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!res.ok) {
      const message = (data && (data.message || data.error)) || `Request failed (${res.status})`;
      console.error("Request failed:", message, data);
      console.error("Request details:", { path, method, body, headers: finalHeaders });
      throw new Error(message);
    }
    console.log("Request successful:", data);
    return data;
  } catch (error) {
    console.error("Network error:", error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Failed to fetch - check if backend is running');
    }
    throw error;
  }
}

export const api = {
  // Authentication
  register: (payload) => request("/api/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/api/auth/login", { method: "POST", body: payload }),
  
  // Users (admin or self with auth)
  getUsers: () => request("/api/users", { method: "GET" }),
  getAllUsers: () => request("/api/users", { method: "GET" }),
  getUser: (id) => request(`/api/users/${id}`, { method: "GET" }),
  updateUser: (id, payload) => request(`/api/users/${id}`, { method: "PUT", body: payload }),
  deleteUser: (id) => request(`/api/users/${id}`, { method: "DELETE" }),
  
  // Admin specific endpoints
  createAdmin: () => request("/api/auth/create-admin", { method: "POST" }),
  getAnalytics: () => request("/api/admin/analytics", { method: "GET" }),
  getOrders: () => request("/api/admin/orders", { method: "GET" }),
  
  // Bids (Admin)
  getBids: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/api/admin/Bids${query ? `?${query}` : ''}`, { method: "GET" });
  },
  getBid: (id) => request(`/api/admin/Bids/${id}`, { method: "GET" }),
  updateBidStatus: (id, status) => request(`/api/admin/Bids/${id}/status`, { method: "PUT", body: { status } }),
  deleteBid: (id) => request(`/api/admin/Bids/${id}`, { method: "DELETE" }),
  
  // Bids (User)
  placeBid: (payload) => request("/api/UserBids", { method: "POST", body: payload }),
  getUserBids: () => request("/api/UserBids/my-bids", { method: "GET" }),
  getBidById: (id) => request(`/api/UserBids/${id}`, { method: "GET" }),
  
  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/api/products${query ? `?${query}` : ''}`, { method: "GET" });
  },
  getProduct: (id) => request(`/api/products/${id}`, { method: "GET" }),
  getFeaturedProducts: (limit = 10) => request(`/api/products/featured?limit=${limit}`, { method: "GET" }),
  getProductCategories: () => request("/api/products/categories", { method: "GET" }),
  getProductTags: () => request("/api/products/tags", { method: "GET" }),
  getProductsByCategory: (category, limit = 20) => request(`/api/products/category/${category}?limit=${limit}`, { method: "GET" }),
  createProduct: (payload) => request("/api/products", { method: "POST", body: payload }),
  updateProduct: (id, payload) => request(`/api/products/${id}`, { method: "PUT", body: payload }),
  deleteProduct: (id) => request(`/api/products/${id}`, { method: "DELETE" }),
  updateProductStock: (id, quantity) => request(`/api/products/${id}/stock`, { method: "PUT", body: { quantity } }),
  getLowStockProducts: (threshold = 5) => request(`/api/products/low-stock?threshold=${threshold}`, { method: "GET" }),
};

export default api;


