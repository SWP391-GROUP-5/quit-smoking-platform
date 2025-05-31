import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>Bỏ Thuốc Lá</h2>
            <p>Nền tảng chuyên biệt giúp mọi người bỏ thuốc lá với kế hoạch cá nhân hóa, công cụ theo dõi và hỗ trợ từ cộng đồng.</p>
            <div className="contact">
              <span><i className="fas fa-phone"></i> +123-456-7890</span>
              <span><i className="fas fa-envelope"></i> info@bothuocla.com</span>
            </div>
          </div>

          <div className="footer-section links">
            <h2>Liên Kết Nhanh</h2>
            <ul>
              <li><a href="/about">Về Chúng Tôi</a></li>
              <li><a href="/membership">Thành Viên</a></li>
              <li><a href="/coaches">Chuyên Gia Tư Vấn</a></li>
              <li><a href="/privacy">Chính Sách Bảo Mật</a></li>
              <li><a href="/terms">Điều Khoản Sử Dụng</a></li>
            </ul>
          </div>

          <div className="footer-section contact-form">
            <h2>Liên Hệ</h2>
            <form>
              <input type="email" placeholder="Địa chỉ email của bạn..." />
              <textarea placeholder="Nội dung tin nhắn..."></textarea>
              <button type="submit" className="btn-send">Gửi</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Bỏ Thuốc Lá | Bảo Lưu Mọi Quyền</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 