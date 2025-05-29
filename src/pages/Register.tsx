import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    // Demo: lưu trạng thái đăng ký thành công
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Đăng Ký</h1>
            <form onSubmit={handleSubmit} style={{maxWidth: 400}}>
              {error && <div style={{color: 'red'}}>{error}</div>}
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{background: '#fff'}} />
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{background: '#fff'}} />
              </div>
              <div className="form-group">
                <label>Xác nhận mật khẩu</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={{background: '#fff'}} />
              </div>
              <button className="primary-btn" type="submit">Đăng Ký</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
