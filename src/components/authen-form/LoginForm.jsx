import React from 'react';
import './login.css';

const LoginForm = () => {
  return (
    <div className="login-form">
      <h2>Đăng Nhập</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="primary-btn">Đăng Nhập</button>
      </form>
    </div>
  );
};

export default LoginForm; 