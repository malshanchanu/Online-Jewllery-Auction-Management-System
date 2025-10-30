import React, { useState } from "react";

const JewelrySearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-container">
      <style>
        {`
          .search-container {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          
          .search-form {
            display: flex;
            gap: 0.5rem;
          }
          
          .search-input {
            flex: 1;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
          }
          
          .search-input:focus {
            outline: none;
            border-color: #667eea;
          }
          
          .search-button {
            padding: 0.75rem 1.5rem;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.3s ease;
          }
          
          .search-button:hover {
            transform: translateY(-2px);
          }
          
          @media (max-width: 768px) {
            .search-form {
              flex-direction: column;
            }
          }
        `}
      </style>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search jewelry items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default JewelrySearch;
