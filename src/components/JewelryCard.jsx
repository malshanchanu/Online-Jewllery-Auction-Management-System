import React, { useState } from "react";
import { Link } from "react-router-dom";

const JewelryCard = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert(
      `Quick view: ${item.name}\nPrice: $${item.price}\nClick "View Details" for more information.`
    );
  };

  return (
    <div className="jewelry-card">
      <style>
        {`
          .jewelry-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            position: relative;
            cursor: pointer;
          }
          
          .jewelry-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 15px 45px rgba(0,0,0,0.15);
          }
          
          .card-image {
            position: relative;
            height: 250px;
            overflow: hidden;
          }
          
          .card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          
          .jewelry-card:hover .card-image img {
            transform: scale(1.1);
          }
          
          .image-placeholder {
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #f3f4f6, #e5e7eb);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            font-size: 3rem;
          }
          
          .card-overlay {
            position: absolute;
            top: 1rem;
            left: 1rem;
            right: 1rem;
            display: flex;
            justify-content: space-between;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .jewelry-card:hover .card-overlay {
            opacity: 1;
          }
          
          .card-overlay span {
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            backdrop-filter: blur(10px);
          }
          
          .item-condition {
            background: rgba(39, 174, 96, 0.9);
            color: white;
          }
          
          .item-metal {
            background: rgba(255, 215, 0, 0.9);
            color: #000;
          }
          
          .quick-view-btn {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            padding: 0.8rem 1.5rem;
            background: rgba(255,255,255,0.95);
            color: #2c3e50;
            border: none;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          }
          
          .jewelry-card:hover .quick-view-btn {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          
          .quick-view-btn:hover {
            background: #fff;
            transform: translate(-50%, -50%) scale(1.05) !important;
          }
          
          .card-content {
            padding: 1.5rem;
          }
          
          .item-name {
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #2c3e50;
            transition: color 0.3s ease;
          }
          
          .jewelry-card:hover .item-name {
            color: #667eea;
          }
          
          .item-description {
            color: #666;
            margin-bottom: 1rem;
            line-height: 1.5;
            font-size: 0.9rem;
          }
          
          .item-details {
            margin-bottom: 1rem;
          }
          
          .gemstone-tag {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
            display: inline-block;
          }
          
          .card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .item-price {
            font-size: 1.4rem;
            font-weight: 700;
            color: #e74c3c;
          }
          
          .view-details-btn {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .view-details-btn:hover {
            color: #764ba2;
            gap: 0.8rem;
          }
          
          .loading-spinner {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            .card-footer {
              flex-direction: column;
              gap: 1rem;
              align-items: flex-start;
            }
            
            .view-details-btn {
              align-self: flex-end;
            }
            
            .quick-view-btn {
              opacity: 1;
              transform: translate(-50%, -50%) scale(0.9);
            }
          }
        `}
      </style>

      <div className="card-image">
        {!imageLoaded && !imageError && <div className="loading-spinner"></div>}
        {imageError ? (
          <div className="image-placeholder">💎</div>
        ) : (
          <img
            src={item.image}
            alt={item.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
        )}

        <div className="card-overlay">
          <span className="item-condition">{item.condition}</span>
          <span className="item-metal">{item.metalType}</span>
        </div>

        <button
          className="quick-view-btn"
          onClick={handleQuickView}
          aria-label={`Quick view of ${item.name}`}
        >
          👀 Quick View
        </button>
      </div>

      <div className="card-content">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-description">{item.description}</p>

        <div className="item-details">
          <span className="gemstone-tag">💎 {item.gemstone}</span>
        </div>

        <div className="card-footer">
          <div className="item-price">${item.price.toLocaleString()}</div>
          <Link to={`/jewelry/${item.id}`} className="view-details-btn">
            View Details <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JewelryCard;
