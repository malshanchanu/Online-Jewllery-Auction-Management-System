import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    isFeatured: '',
    isActive: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0
  });

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, pagination.pageSize, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: pagination.page,
        pageSize: pagination.pageSize,
        ...filters
      };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });

      console.log('Fetching products with params:', params);
      const response = await api.getProducts(params);
      console.log('Products response:', response);
      
      setProducts(response.items || []);
      setPagination(prev => ({ ...prev, total: response.total || 0 }));
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      await api.createProduct(productData);
      setShowCreateModal(false);
      fetchProducts();
    } catch (err) {
      setError(err.message || 'Failed to create product');
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      await api.updateProduct(id, productData);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      setError(err.message || 'Failed to update product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await api.deleteProduct(id);
      fetchProducts();
    } catch (err) {
      setError(err.message || 'Failed to delete product');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      isFeatured: '',
      isActive: ''
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStatusBadge = (isActive, isFeatured) => {
    if (!isActive) return <span className="status-badge inactive">Inactive</span>;
    if (isFeatured) return <span className="status-badge featured">Featured</span>;
    return <span className="status-badge active">Active</span>;
  };

  if (loading) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <div className="loading-spinner">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-container">
        <style>{`
          .product-management {
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
          }
          
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(var(--accent-rgb), 0.3);
          }
          
          .filters-section {
            background: var(--card);
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            border: 1px solid rgba(var(--accent-rgb), 0.1);
          }
          
          .filters-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1rem;
          }
          
          .filter-group {
            display: flex;
            flex-direction: column;
          }
          
          .filter-label {
            font-weight: 600;
            color: var(--text);
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
          }
          
          .filter-input, .filter-select {
            padding: 0.75rem;
            border: 2px solid rgba(var(--accent-rgb), 0.2);
            border-radius: 8px;
            background: var(--surface);
            color: var(--text);
            font-size: 0.9rem;
            transition: all 0.3s ease;
          }
          
          .filter-input:focus, .filter-select:focus {
            border-color: var(--accent);
            outline: none;
            box-shadow: 0 0 0 3px var(--accent-glow);
          }
          
          .filter-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
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
          }
          
          .btn-secondary:hover {
            border-color: var(--accent);
            background: rgba(var(--accent-rgb), 0.1);
          }
          
          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
          }
          
          .product-card {
            background: var(--card);
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(var(--accent-rgb), 0.1);
            transition: all 0.3s ease;
            position: relative;
          }
          
          .product-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
            border-color: var(--accent);
          }
          
          .product-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            background: linear-gradient(135deg, var(--accent), var(--accent-2));
          }
          
          .product-info {
            padding: 1.5rem;
          }
          
          .product-name {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 0.5rem;
            line-height: 1.3;
          }
          
          .product-category {
            color: var(--muted);
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
          }
          
          .product-price {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 1rem;
          }
          
          .product-specs {
            font-size: 0.85rem;
            color: var(--muted);
            margin-bottom: 1rem;
            line-height: 1.4;
          }
          
          .product-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
          }
          
          .btn-small {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
          }
          
          .btn-edit {
            background: var(--accent);
            color: var(--on-primary);
          }
          
          .btn-delete {
            background: var(--error);
            color: white;
          }
          
          .btn-small:hover {
            transform: translateY(-1px);
            opacity: 0.9;
          }
          
          .status-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
          }
          
          .status-badge.active {
            background: var(--success);
            color: white;
          }
          
          .status-badge.featured {
            background: var(--accent);
            color: var(--on-primary);
          }
          
          .status-badge.inactive {
            background: var(--error);
            color: white;
          }
          
          .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            margin-top: 2rem;
          }
          
          .pagination button {
            padding: 0.5rem 1rem;
            border: 2px solid rgba(var(--accent-rgb), 0.2);
            background: var(--surface);
            color: var(--text);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .pagination button:hover:not(:disabled) {
            border-color: var(--accent);
            background: rgba(var(--accent-rgb), 0.1);
          }
          
          .pagination button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
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
            .filters-grid {
              grid-template-columns: 1fr;
            }
            
            .products-grid {
              grid-template-columns: 1fr;
            }
            
            .page-header {
              flex-direction: column;
              gap: 1rem;
              align-items: stretch;
            }
          }
        `}</style>

        <div className="product-management">
          <div className="page-header">
            <h1 className="page-title">Product Management</h1>
            <button 
              className="btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              + Add New Product
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="filters-section">
            <div className="filters-grid">
              <div className="filter-group">
                <label className="filter-label">Search</label>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Category</label>
                <select
                  className="filter-select"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Rings">Rings</option>
                  <option value="Necklaces">Necklaces</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Bracelets">Bracelets</option>
                  <option value="Watches">Watches</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Min Price</label>
                <input
                  type="number"
                  className="filter-input"
                  placeholder="Min price"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Max Price</label>
                <input
                  type="number"
                  className="filter-input"
                  placeholder="Max price"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Status</label>
                <select
                  className="filter-select"
                  value={filters.isActive}
                  onChange={(e) => handleFilterChange('isActive', e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Featured</label>
                <select
                  className="filter-select"
                  value={filters.isFeatured}
                  onChange={(e) => handleFilterChange('isFeatured', e.target.value)}
                >
                  <option value="">All Products</option>
                  <option value="true">Featured Only</option>
                  <option value="false">Non-Featured</option>
                </select>
              </div>
            </div>
            
            <div className="filter-actions">
              <button className="btn-secondary" onClick={clearFilters}>
                Clear Filters
              </button>
              <span className="filter-results">
                {pagination.total} products found
              </span>
            </div>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                {getStatusBadge(product.isActive, product.isFeatured)}
                
                <img 
                  src={product.images?.[0] || '/api/placeholder/300/200'} 
                  alt={product.name}
                  className="product-image"
                />
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">{formatPrice(product.price)}</p>
                  
                  <div className="product-specs">
                    <p><strong>Metal:</strong> {product.metalType}</p>
                    {product.gemstone && <p><strong>Gemstone:</strong> {product.gemstone}</p>}
                    {product.carat && <p><strong>Carat:</strong> {product.carat}</p>}
                    <p><strong>Stock:</strong> {product.stockQuantity} units</p>
                  </div>
                  
                  <div className="product-actions">
                    <button 
                      className="btn-small btn-edit"
                      onClick={() => setEditingProduct(product)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-small btn-delete"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && !loading && (
            <div className="loading-spinner">
              No products found. Try adjusting your filters.
            </div>
          )}

          <div className="pagination">
            <button 
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
            >
              Previous
            </button>
            
            <span>
              Page {pagination.page} of {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            
            <button 
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;