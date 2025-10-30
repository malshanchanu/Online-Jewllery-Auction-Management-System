import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleProfileClick = () => {
    setIsMenuOpen(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event, dropdown) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown(dropdown);
    } else if (event.key === 'Escape') {
      closeDropdown();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-item')) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <style>
        {`
          .navbar {
            background: rgba(var(--surface-rgb, 20, 23, 32), 0.95);
            -webkit-backdrop-filter: saturate(180%) blur(20px);
            backdrop-filter: saturate(180%) blur(20px);
            border-bottom: 1px solid rgba(var(--accent-rgb, 197, 165, 114), 0.1);
            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
            padding: 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            height: 70px;
          }
          
          .navbar.scrolled {
            height: 60px;
            background: rgba(var(--surface-rgb, 20, 23, 32), 0.98);
            box-shadow: 0 4px 24px rgba(0,0,0,0.15);
            border-bottom: 1px solid rgba(var(--accent-rgb, 197, 165, 114), 0.15);
          }
          
          .nav-container {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 2rem;
            height: 100%;
            position: relative;
          }
          
          .nav-logo {
            text-decoration: none;
            color: var(--text);
            font-size: 1.5rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
            z-index: 1001;
          }
          
          .nav-logo:hover {
            transform: scale(1.05);
            filter: drop-shadow(0 0 10px rgba(var(--accent-rgb, 197, 165, 114), 0.3));
          }
          
          .nav-logo h2 {
            margin: 0;
            font-size: 1.5rem;
            background: linear-gradient(135deg, var(--text), var(--accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .nav-menu {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            position: relative;
          }
          
          .nav-item {
            position: relative;
          }
          
          .nav-link {
            text-decoration: none;
            color: var(--text);
            font-weight: 500;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            padding: 0.75rem 1rem;
            font-size: 0.95rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }
          
          .nav-link:hover {
            color: var(--accent);
            background: rgba(var(--accent-rgb, 197, 165, 114), 0.1);
            transform: translateY(-1px);
          }
          
          .nav-link.active {
            color: var(--accent);
            font-weight: 600;
            background: rgba(var(--accent-rgb, 197, 165, 114), 0.15);
          }
          
          .nav-link.active::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: -2px;
            left: 0;
            background: linear-gradient(90deg, var(--accent), var(--accent-2));
            border-radius: 2px;
            animation: slideIn 0.3s ease;
          }
          
          @keyframes slideIn {
            from { width: 0; }
            to { width: 100%; }
          }
          
          .dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            background: rgba(var(--surface-rgb, 20, 23, 32), 0.98);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(var(--accent-rgb, 197, 165, 114), 0.2);
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            min-width: 200px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            padding: 0.5rem 0;
            margin-top: 0.5rem;
          }
          
          .dropdown.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
          
          .dropdown-item {
            display: block;
            padding: 0.75rem 1rem;
            color: var(--text);
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.2s ease;
            border-radius: 6px;
            margin: 0 0.5rem;
          }
          
          .dropdown-item:hover {
            background: rgba(var(--accent-rgb, 197, 165, 114), 0.1);
            color: var(--accent);
            transform: translateX(4px);
          }
          
          .dropdown-item.active {
            color: var(--accent);
            background: rgba(var(--accent-rgb, 197, 165, 114), 0.15);
            font-weight: 500;
          }
          
          .nav-actions {
            display: flex;
            gap: 0.75rem;
            align-items: center;
            margin-left: 1rem;
          }
          
          .btn {
            padding: 0.6rem 1.2rem;
            background: linear-gradient(135deg, var(--accent), var(--accent-2));
            color: var(--on-primary);
            border: none;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 0.9rem;
            box-shadow: 0 4px 15px rgba(197, 165, 114, 0.3);
            position: relative;
            overflow: hidden;
          }
          
          .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }
          
          .btn:hover::before {
            left: 100%;
          }
          
          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(197, 165, 114, 0.4);
            filter: brightness(1.1);
          }
          
          .btn-secondary {
            background: rgba(var(--text-rgb, 255, 255, 255), 0.1);
            color: var(--text);
            border: 1px solid rgba(var(--accent-rgb, 197, 165, 114), 0.3);
            box-shadow: none;
          }
          
          .btn-secondary:hover {
            background: rgba(var(--accent-rgb, 197, 165, 114), 0.2);
            border-color: var(--accent);
          }
          
          .nav-toggle {
            display: none;
            flex-direction: column;
            cursor: pointer;
            background: none;
            border: none;
            padding: 0.5rem;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          
          .nav-toggle:hover {
            background: rgba(var(--accent-rgb, 197, 165, 114), 0.1);
          }
          
          .bar {
            width: 25px;
            height: 2px;
            background-color: var(--text);
            margin: 3px 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 2px;
          }
          
          .nav-toggle.active .bar:nth-child(1) { 
            transform: rotate(-45deg) translate(-5px, 6px); 
            background-color: var(--accent);
          }
          .nav-toggle.active .bar:nth-child(2) { 
            opacity: 0; 
            transform: scaleX(0);
          }
          .nav-toggle.active .bar:nth-child(3) { 
            transform: rotate(45deg) translate(-5px, -6px); 
            background-color: var(--accent);
          }
          
          .dropdown-arrow {
            transition: transform 0.3s ease;
            font-size: 0.8rem;
          }
          
          .nav-item:hover .dropdown-arrow {
            transform: rotate(180deg);
          }
          
          @media (max-width: 1024px) {
            .nav-menu {
              position: fixed;
              left: -100%;
              top: 70px;
              flex-direction: column;
              background: rgba(var(--surface-rgb, 20, 23, 32), 0.98);
              backdrop-filter: blur(20px);
              width: 100%;
              text-align: center;
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              box-shadow: 0 20px 40px rgba(0,0,0,0.2);
              padding: 2rem 0;
              gap: 0.5rem;
              border-top: 1px solid rgba(var(--accent-rgb, 197, 165, 114), 0.1);
            }
            
            .nav-menu.active { 
              left: 0; 
            }
            
            .nav-item {
              width: 100%;
            }
            
            .nav-link {
              width: 100%;
              justify-content: center;
              padding: 1rem;
              border-radius: 0;
            }
            
            .dropdown {
              position: static;
              opacity: 1;
              visibility: visible;
              transform: none;
              background: rgba(0,0,0,0.2);
              border: none;
              box-shadow: none;
              margin: 0;
              padding: 0;
              max-height: 0;
              overflow: hidden;
              transition: max-height 0.3s ease;
            }
            
            .dropdown.active {
              max-height: 300px;
            }
            
            .dropdown-item {
              margin: 0;
              border-radius: 0;
            }
            
            .nav-actions {
              flex-direction: column;
              gap: 1rem;
              margin: 1rem 0 0 0;
              width: 100%;
            }
            
            .btn { 
              width: 200px; 
              margin: 0;
            }
            
            .nav-toggle { 
              display: flex; 
            }
            
            .navbar.scrolled { 
              height: 60px; 
            }
            
            .nav-container { 
              padding: 0 1rem; 
            }
          }
          
          @media (max-width: 480px) {
            .nav-logo h2 {
              font-size: 1.2rem;
            }
            
            .btn {
              width: 180px;
              padding: 0.5rem 1rem;
            }
          }
        `}
      </style>

      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span style={{fontSize: '1.8rem'}}>💎</span>
          <h2>CrystalCrown</h2>
        </Link>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="nav-item">
            <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </div>

          <div className="nav-item">
            <Link to="/jewelry" className={`nav-link ${isActive("/jewelry") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
              Jewelry
            </Link>
          </div>

          <div className="nav-item" onMouseEnter={() => setActiveDropdown('services')} onMouseLeave={closeDropdown}>
            <span 
              className={`nav-link ${activeDropdown === 'services' ? 'active' : ''}`} 
              onClick={() => toggleDropdown('services')}
              onKeyDown={(e) => handleKeyDown(e, 'services')}
              tabIndex="0"
              role="button"
              aria-expanded={activeDropdown === 'services'}
              aria-haspopup="true"
            >
              Services <span className="dropdown-arrow">▼</span>
            </span>
            <div 
              className={`dropdown ${activeDropdown === 'services' ? 'active' : ''}`}
              role="menu"
              aria-hidden={activeDropdown !== 'services'}
            >
              <Link to="/checkout" className={`dropdown-item ${isActive("/checkout") ? "active" : ""}`} onClick={() => {setIsMenuOpen(false); closeDropdown();}}>Checkout</Link>
              <Link to="/payment-method" className={`dropdown-item ${isActive("/payment-method") ? "active" : ""}`} onClick={() => {setIsMenuOpen(false); closeDropdown();}}>Payment Methods</Link>
              <Link to="/payment-history" className={`dropdown-item ${isActive("/payment-history") ? "active" : ""}`} onClick={() => {setIsMenuOpen(false); closeDropdown();}}>Payment History</Link>
              <Link to="/invoice" className={`dropdown-item ${isActive("/invoice") ? "active" : ""}`} onClick={() => {setIsMenuOpen(false); closeDropdown();}}>Invoices</Link>
            </div>
          </div>

          <div className="nav-item" onMouseEnter={() => setActiveDropdown('insurance')} onMouseLeave={closeDropdown}>
            <span 
              className={`nav-link ${activeDropdown === 'insurance' ? 'active' : ''}`} 
              onClick={() => toggleDropdown('insurance')}
              onKeyDown={(e) => handleKeyDown(e, 'insurance')}
              tabIndex="0"
              role="button"
              aria-expanded={activeDropdown === 'insurance'}
              aria-haspopup="true"
            >
              Insurance <span className="dropdown-arrow">▼</span>
            </span>
            <div 
              className={`dropdown ${activeDropdown === 'insurance' ? 'active' : ''}`}
              role="menu"
              aria-hidden={activeDropdown !== 'insurance'}
            >
              <Link to="/insurance-options" className={`dropdown-item ${isActive("/insurance-options") ? "active" : ""}`} onClick={() => {setIsMenuOpen(false); closeDropdown();}}>Insurance Options</Link>
              <Link to="/shipping-insurance" className={`dropdown-item ${isActive("/shipping-insurance") ? "active" : ""}`} onClick={() => {setIsMenuOpen(false); closeDropdown();}}>Shipping Insurance</Link>
            </div>
          </div>

          <div className="nav-item" onMouseEnter={() => setActiveDropdown('certificates')} onMouseLeave={closeDropdown}>
            <span 
              className={`nav-link ${activeDropdown === 'certificates' ? 'active' : ''}`} 
              onClick={() => toggleDropdown('certificates')}
              onKeyDown={(e) => handleKeyDown(e, 'certificates')}
              tabIndex="0"
              role="button"
              aria-expanded={activeDropdown === 'certificates'}
              aria-haspopup="true"
            >
              Certificates <span className="dropdown-arrow">▼</span>
            </span>
            <div 
              className={`dropdown ${activeDropdown === 'certificates' ? 'active' : ''}`}
              role="menu"
              aria-hidden={activeDropdown !== 'certificates'}
            >
              <Link to="/upload-cert" className={`dropdown-item ${isActive("/upload-cert") ? "active" : ""}`} onClick={() => {setIsMenuOpen(false); closeDropdown();}}>Upload Certificate</Link>
              <Link to="/view-cert" className={`dropdown-item ${isActive("/view-cert") ? "active" : ""}`} onClick={() => {setIsMenuOpen(false); closeDropdown();}}>View Certificates</Link>
              <Link to="/gia-certificate" className={`dropdown-item ${isActive("/gia-certificate") ? "active" : ""}`} onClick={() => {setIsMenuOpen(false); closeDropdown();}}>GIA Certificate</Link>
              <Link to="/ags-certificate" className={`dropdown-item ${isActive("/ags-certificate") ? "active" : ""}`} onClick={() => {setIsMenuOpen(false); closeDropdown();}}>AGS Certificate</Link>
              <Link to="/appraisal-doc" className={`dropdown-item ${isActive("/appraisal-doc") ? "active" : ""}`} onClick={() => {setIsMenuOpen(false); closeDropdown();}}>Appraisal Documents</Link>
              <Link to="/auth-verification" className={`dropdown-item ${isActive("/auth-verification") ? "active" : ""}`} onClick={() => {setIsMenuOpen(false); closeDropdown();}}>Authenticity Verification</Link>
            </div>
          </div>

          <div className="nav-item">
            <Link to="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </div>

          <div className="nav-item">
            <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </div>

          <div className="nav-actions">
            <button className="btn btn-secondary" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            {user ? (
              <>
                {user.role === 'Admin' && (
                  <Link to="/admin" className="btn btn-secondary" style={{textDecoration: 'none', display: 'inline-block'}}>
                    Admin Panel
                  </Link>
                )}
                {user.role !== 'Admin' && (
                  <>
                    <Link to="/my-bids" className="btn btn-secondary" style={{textDecoration: 'none', display: 'inline-block'}}>
                      My Bids
                    </Link>
                    <Link to="/wishlist" className="btn btn-secondary" style={{textDecoration: 'none', display: 'inline-block'}}>
                      Wishlist
                    </Link>
                  </>
                )}
                <button className="btn btn-secondary" onClick={handleProfileClick} aria-label="Go to profile">
                  {user.name ? `Hi, ${user.name.split(' ')[0]}` : 'Profile'}
                </button>
                <button className="btn" onClick={handleLogout} aria-label="Logout">
                  Logout
                </button>
              </>
            ) : (
              <button className="btn" onClick={handleLoginClick} aria-label="Login to your account">
                Login
              </button>
            )}
          </div>
        </div>

        <button className={`nav-toggle ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
