import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/home">
          <img 
            src="/logo.png" 
            alt="" 
            style={{ height: '30px', marginRight: '10px' }}
          />
          AutoCASA
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a 
                className={`nav-link ${isActive('/home')}`} 
                href="/home"
              >
                <FaHome className="me-2" />
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${isActive('/profile')}`} 
                href="/profile"
              >
                <FaUser className="me-2" />
                Profile
              </a>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link" 
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
