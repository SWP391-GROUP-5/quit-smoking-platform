import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Bỏ Thuốc Lá
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Trang Chủ
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              Trang Tổng Quan 
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/quit-plan" className="nav-link">
              Kế Hoạch Cai Thuốc
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Hồ Sơ
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/feedback" className="nav-link">
              Phản Hồi
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
          </li>
        </ul>

        <div className="nav-buttons">
          <Link to="/login" className="nav-button login-button">
            Đăng Nhập
          </Link>
          <Link to="/register" className="nav-button register-button">
            Đăng Ký
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;