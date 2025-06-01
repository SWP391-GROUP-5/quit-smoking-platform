import React from 'react';
import './register.css';

const RegisterForm = () => {
  return (
    <div className="register-form">
      <h2>Đăng Ký</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Tên của bạn:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Xác nhận mật khẩu:</label>
          <input type="password" id="confirm-password" name="confirm-password" required />
        </div>
        <button type="submit" className="primary-btn">Đăng Ký</button>
      </form>
    </div>
  );
};

export default RegisterForm; 