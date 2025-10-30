import React, { useState, useEffect } from "react";
import JewelryCard from "../components/JewelryCard";
import JewelryFilters from "../components/JewelryFilters";
import JewelrySearch from "../components/JewelrySearch";

const JewelryListPage = () => {
  const [jewelryItems, setJewelryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState({
    metalType: "",
    gemstone: "",
    minPrice: 0,
    maxPrice: 10000,
    condition: "",
    category: "",
  });
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJewelry = () => {
      setTimeout(() => {
        const mockJewelry = [
          {
            id: 1,
            name: "Diamond Engagement Ring",
            description: "Beautiful platinum ring with 1ct diamond",
            price: 2500,
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center",
            metalType: "Platinum",
            gemstone: "Diamond",
            condition: "Excellent",
            category: "rings",
            weight: "3.2g",
            dimensions: "6mm x 6mm",
            auctionEnd: "2024-12-31T23:59:59",
          },
          {
            id: 2,
            name: "Sapphire Bracelet",
            description: "Elegant gold bracelet with blue sapphires",
            price: 1800,
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ad5e5?w=400&h=400&fit=crop&crop=center",
            metalType: "Gold",
            gemstone: "Sapphire",
            condition: "Good",
            category: "bracelets",
            weight: "15.5g",
            dimensions: "7 inches",
            auctionEnd: "2024-12-25T23:59:59",
          },
          {
            id: 3,
            name: "Pearl Necklace",
            description: "Classic pearl necklace with silver clasp",
            price: 950,
            image: "https://images.unsplash.com/photo-1596944948024-92c9bad2b0c3?w=400&h=400&fit=crop&crop=center",
            metalType: "Silver",
            gemstone: "Pearl",
            condition: "Very Good",
            category: "necklaces",
            weight: "12.8g",
            dimensions: "18 inches",
            auctionEnd: "2024-12-20T23:59:59",
          },
          {
            id: 4,
            name: "Emerald Earrings",
            description: "Stunning emerald drop earrings in 18k gold",
            price: 3200,
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9f5a19b8?w=400&h=400&fit=crop&crop=center",
            metalType: "Gold",
            gemstone: "Emerald",
            condition: "Excellent",
            category: "earrings",
            weight: "8.5g",
            dimensions: "2cm drop",
            auctionEnd: "2024-12-28T23:59:59",
          },
          {
            id: 5,
            name: "Ruby Tennis Bracelet",
            description: "Luxurious ruby tennis bracelet with diamonds",
            price: 4500,
            image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&crop=center",
            metalType: "Platinum",
            gemstone: "Ruby",
            condition: "Excellent",
            category: "bracelets",
            weight: "22.3g",
            dimensions: "7.5 inches",
            auctionEnd: "2024-12-30T23:59:59",
          },
          {
            id: 6,
            name: "Diamond Pendant",
            description: "Elegant diamond pendant on white gold chain",
            price: 1800,
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ad5e5?w=400&h=400&fit=crop&crop=center",
            metalType: "White Gold",
            gemstone: "Diamond",
            condition: "Very Good",
            category: "necklaces",
            weight: "6.7g",
            dimensions: "2cm pendant",
            auctionEnd: "2024-12-22T23:59:59",
          },
          {
            id: 7,
            name: "Opal Ring",
            description: "Unique opal ring with intricate gold setting",
            price: 1200,
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center",
            metalType: "Gold",
            gemstone: "Opal",
            condition: "Good",
            category: "rings",
            weight: "4.1g",
            dimensions: "8mm x 8mm",
            auctionEnd: "2024-12-26T23:59:59",
          },
          {
            id: 8,
            name: "Amethyst Chandelier Earrings",
            description: "Dramatic chandelier earrings with amethyst drops",
            price: 950,
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9f5a19b8?w=400&h=400&fit=crop&crop=center",
            metalType: "Silver",
            gemstone: "Amethyst",
            condition: "Very Good",
            category: "earrings",
            weight: "11.2g",
            dimensions: "4cm drop",
            auctionEnd: "2024-12-24T23:59:59",
          },
        ];
        setJewelryItems(mockJewelry);
        setFilteredItems(mockJewelry);
        setLoading(false);
      }, 1500);
    };

    fetchJewelry();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = jewelryItems.filter(
      (item) =>
        item.name.toLowerCase().includes(term.toLowerCase()) ||
        item.description.toLowerCase().includes(term.toLowerCase()) ||
        item.gemstone.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFiltersAndSearch(newFilters, searchTerm);
  };

  const applyFiltersAndSearch = (currentFilters, currentSearchTerm) => {
    const filtered = jewelryItems.filter((item) => {
      const matchesSearch =
        currentSearchTerm === "" ||
        item.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(currentSearchTerm.toLowerCase());

      const matchesFilters =
        (currentFilters.metalType === "" ||
          item.metalType === currentFilters.metalType) &&
        (currentFilters.gemstone === "" ||
          item.gemstone === currentFilters.gemstone) &&
        item.price >= currentFilters.minPrice &&
        item.price <= currentFilters.maxPrice &&
        (currentFilters.condition === "" ||
          item.condition === currentFilters.condition) &&
        (currentFilters.category === "" ||
          item.category === currentFilters.category);

      return matchesSearch && matchesFilters;
    });

    setFilteredItems(filtered);
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    const sorted = [...filteredItems].sort((a, b) => {
      switch (sortType) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return a.name.localeCompare(b.name);
      }
    });
    setFilteredItems(sorted);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <style>
          {`
            .loading-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 60vh;
              gap: 1.5rem;
            }
            
            .loading-spinner {
              width: 60px;
              height: 60px;
              border: 4px solid #f3f3f3;
              border-top: 4px solid #667eea;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            
            .loading-text {
              font-size: 1.2rem;
              color: #666;
              font-weight: 500;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading exquisite jewelry collection...</p>
      </div>
    );
  }

  return (
    <div className="jewelry-list-page">
      <style>
        {`
          .jewelry-list-page {
            padding: 80px 0 50px;
            min-height: 100vh;
            background: #f8f9fa;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
          }
          
          .page-header {
            text-align: center;
            margin-bottom: 3rem;
            animation: fadeInUp 0.8s ease-out;
          }
          
          .page-header h1 {
            font-size: 2.8rem;
            color: #2c3e50;
            margin-bottom: 1rem;
            font-weight: 700;
          }
          
          .page-header p {
            font-size: 1.2rem;
            color: #666;
            max-width: 600px;
            margin: 0 auto;
          }
          
          .controls-container {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
            animation: fadeInUp 0.8s ease-out 0.2s both;
          }
          
          .search-sort-section {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .sort-controls {
            display: flex;
            align-items: center;
            gap: 1rem;
            background: white;
            padding: 1rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          
          .sort-controls label {
            font-weight: 600;
            color: #2c3e50;
            white-space: nowrap;
          }
          
          .sort-controls select {
            padding: 0.75rem;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 1rem;
            background: white;
            cursor: pointer;
            transition: border-color 0.3s ease;
          }
          
          .sort-controls select:focus {
            outline: none;
            border-color: #667eea;
          }
          
          .results-info {
            margin-bottom: 2rem;
            padding: 1rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            animation: fadeInUp 0.8s ease-out 0.4s both;
          }
          
          .results-info p {
            margin: 0;
            color: #666;
            font-weight: 500;
          }
          
          .jewelry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
            animation: fadeInUp 0.8s ease-out 0.6s both;
          }
          
          .no-items {
            grid-column: 1 / -1;
            text-align: center;
            padding: 4rem 2rem;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          
          .no-items h3 {
            margin-bottom: 1rem;
            color: #2c3e50;
            font-size: 1.5rem;
          }
          
          .no-items p {
            color: #666;
            margin-bottom: 2rem;
          }
          
          .reset-search {
            padding: 1rem 2rem;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease;
          }
          
          .reset-search:hover {
            transform: translateY(-2px);
          }
          
          .scroll-top-btn {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
          }
          
          .scroll-top-btn:hover {
            transform: translateY(-4px) scale(1.05);
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @media (max-width: 1024px) {
            .controls-container {
              grid-template-columns: 1fr;
            }
            
            .jewelry-grid {
              grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            }
          }
          
          @media (max-width: 768px) {
            .jewelry-list-page {
              padding: 70px 0 30px;
            }
            
            .page-header h1 {
              font-size: 2.2rem;
            }
            
            .page-header p {
              font-size: 1.1rem;
            }
            
            .sort-controls {
              flex-direction: column;
              align-items: stretch;
              gap: 0.5rem;
            }
            
            .scroll-top-btn {
              bottom: 1rem;
              right: 1rem;
              width: 50px;
              height: 50px;
              font-size: 1.2rem;
            }
          }
        `}
      </style>

      <div className="container">
        <div className="page-header">
          <h1>Exquisite Jewelry Collection</h1>
          <p>
            Discover our curated selection of premium jewelry pieces from around
            the world
          </p>
        </div>

        <div className="controls-container">
          <div className="filters-section">
            <JewelryFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="search-sort-section">
            <JewelrySearch onSearch={handleSearch} />

            <div className="sort-controls">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="name">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="results-info">
          <p>
            Showing {filteredItems.length} of {jewelryItems.length} items
          </p>
        </div>

        <div className="jewelry-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <JewelryCard key={item.id} item={item} />
            ))
          ) : (
            <div className="no-items">
              <h3>No jewelry items match your criteria</h3>
              <p>Try adjusting your filters or search terms</p>
              <button
                className="reset-search"
                onClick={() => {
                  handleFilterChange({
                    metalType: "",
                    gemstone: "",
                    category: "",
                    minPrice: 0,
                    maxPrice: 10000,
                    condition: "",
                  });
                  handleSearch("");
                }}
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        className="scroll-top-btn"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
};

export default JewelryListPage;
