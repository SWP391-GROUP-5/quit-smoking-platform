import React from 'react';
import '../styles/Header.css';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-left">
          <div className="logo">
            <a href="/">
              <img src="/imagedep/logo.jpg" alt="Logo Bỏ Thuốc Lá" className="logo-img"/>
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
              <li><a href="/profile">Tài Khoản</a></li>
            </ul>
          </nav>
        </div>
        <div className="auth-buttons">
          <LoginButton />
          <RegisterButton />
        </div>
      </div>
    </header>
  );
};

export default Header; 