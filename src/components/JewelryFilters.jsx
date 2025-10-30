import React from "react";

const JewelryFilters = ({ filters, onFilterChange }) => {
  const handleChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="filters">
      <style>
        {`
          .filters {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          
          .filters h3 {
            margin-bottom: 1.5rem;
            color: #2c3e50;
            border-bottom: 2px solid #667eea;
            padding-bottom: 0.5rem;
          }
          
          .filter-group {
            margin-bottom: 1.5rem;
          }
          
          .filter-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
          }
          
          .filter-group select,
          .filter-group input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
          }
          
          .filter-group select:focus,
          .filter-group input:focus {
            outline: none;
            border-color: #667eea;
          }
          
          .price-range {
            display: flex;
            gap: 0.5rem;
            align-items: center;
          }
          
          .price-range input {
            flex: 1;
          }
          
          .reset-filters {
            width: 100%;
            padding: 0.75rem;
            background: #e74c3c;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.3s ease;
          }
          
          .reset-filters:hover {
            background: #c0392b;
          }
        `}
      </style>

      <h3>Filters</h3>

      <div className="filter-group">
        <label>Metal Type</label>
        <select
          value={filters.metalType}
          onChange={(e) => handleChange("metalType", e.target.value)}
        >
          <option value="">All Metals</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Platinum">Platinum</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Gemstone</label>
        <select
          value={filters.gemstone}
          onChange={(e) => handleChange("gemstone", e.target.value)}
        >
          <option value="">All Gemstones</option>
          <option value="Diamond">Diamond</option>
          <option value="Sapphire">Sapphire</option>
          <option value="Pearl">Pearl</option>
          <option value="Ruby">Ruby</option>
          <option value="Emerald">Emerald</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Category</label>
        <select
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="rings">Rings</option>
          <option value="necklaces">Necklaces</option>
          <option value="bracelets">Bracelets</option>
          <option value="earrings">Earrings</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Price Range</label>
        <div className="price-range">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) =>
              handleChange("minPrice", parseInt(e.target.value) || 0)
            }
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) =>
              handleChange("maxPrice", parseInt(e.target.value) || 10000)
            }
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Condition</label>
        <select
          value={filters.condition}
          onChange={(e) => handleChange("condition", e.target.value)}
        >
          <option value="">All Conditions</option>
          <option value="Excellent">Excellent</option>
          <option value="Very Good">Very Good</option>
          <option value="Good">Good</option>
        </select>
      </div>

      <button
        className="reset-filters"
        onClick={() =>
          onFilterChange({
            metalType: "",
            gemstone: "",
            category: "",
            minPrice: 0,
            maxPrice: 10000,
            condition: "",
          })
        }
      >
        Reset Filters
      </button>
    </div>
  );
};

export default JewelryFilters;
