import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Quit Smoking
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Trang chủ
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              Bảng điều khiển
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/quit-plan" className="nav-link">
              Kế hoạch cai thuốc
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Hồ sơ
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/feedback" className="nav-link">
              Phản hồi
            </Link>
          </li>
        </ul>

        <div className="nav-buttons">
          <Link to="/login" className="nav-button login-button">
            Đăng nhập
          </Link>
          <Link to="/register" className="nav-button register-button">
            Đăng ký
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 