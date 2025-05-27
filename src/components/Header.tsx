import React from 'react';
import '../styles/Header.css';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-left">
          <div className="logo">
            <a href="/">
              <img src="/logo/logo.jpg" alt="Logo Bỏ Thuốc Lá" className="logo-img"/>
            </a>
          </div>
          <nav className="nav">
            <ul>
              <li><a href="/">Trang Chủ</a></li>
              <li><a href="/dashboard">Trung Tâm Theo Dõi</a></li>
              <li><a href="/plan">Kế Hoạch Bỏ Thuốc</a></li>
              <li><a href="/community">Cộng Đồng</a></li>
              <li><a href="/blog">Bài Viết</a></li>
              <li><a href="/feedback">Đánh Giá</a></li>
            </ul>
          </nav>
        </div>
        <div className="auth-buttons">
          <LoginButton />
          <SignupButton />
        </div>
      </div>
    </header>
  );
};

export default Header; 