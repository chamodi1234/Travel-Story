import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const Header = () => {
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNavbarOpen, setNavbarOpen] = useState(false); 
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  
  const handleToggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  const isAdminOrUserPage = () => {
    const path = location.pathname;
    return path.includes('/admin') || path.includes('/user');
  };

 
  const isHomePage = () => {
    return location.pathname === '/';
  };

  return (
    <header style={styles.header}>
      <nav className="navbar navbar-expand-lg" style={styles.navbar}>
        <div className="container">
          <h2 className="navbar-brand">
            <span className="text-white" style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '2rem' }}>Travel</span>
            <span className="text-white" style={{ fontFamily: 'Lora', fontStyle: 'italic', fontSize: '2rem' }}>Story</span>
            <span className="text-white" style={{ fontFamily: 'Arial', fontSize: '2rem' }}>App</span>
          </h2>

          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={isNavbarOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
             
              {!isHomePage() && (
                <li className="nav-item">
                  <a className="nav-link text-white" href="/">
                    Home
                  </a>
                </li>
              )}

              
              {isHomePage() && (
                <li className="nav-item">
                  <a className="btn btn text-white" href="/login" style={{ backgroundColor: "#000", color: '#fff', border: 'none' }}>
                    Login
                  </a>
                </li>
              )}

            
              {!isHomePage() && (
                <li className="nav-item">
                  <a className="nav-link text-white" href="/stories">
                    Stories
                  </a>
                </li>
              )}

              {(isAdminOrUserPage() && !isNavbarOpen) && (
                <li className="nav-item">
                  <div
                    className="nav-link text-white"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  >
                    <FaUserCircle size={24} />
                  </div>

                  {isDropdownOpen && (
                    <div className="dropdown-menu show">
                      <Button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </Button>
                    </div>
                  )}
                </li>
              )}

              {isNavbarOpen && isAdminOrUserPage() && (
                <li className="nav-item">
                  <div className="nav-link text-white">
                    <Button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    height: "40px"
  },
  navbar: {
    backgroundColor: '#333333',
    borderBottom: '2px solid #444',
    padding: '10px 20px',
  },
};

export default Header;
