import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      setError('Vui lòng nhập đầy đủ thông tin');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ background: '#fff' }}
        />
      </div>
      <div className="form-group">
        <label>Mật khẩu</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ background: '#fff' }}
        />
      </div>
      <button className="primary-btn" type="submit">
        Đăng Nhập
      </button>
    </form>
  );
};

const RegisterForm: React.FC = () => {
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
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ background: '#fff' }}
        />
      </div>
      <div className="form-group">
        <label>Mật khẩu</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ background: '#fff' }}
        />
      </div>
      <div className="form-group">
        <label>Xác nhận mật khẩu</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ background: '#fff' }}
        />
      </div>
      <button className="primary-btn" type="submit">
        Đăng Ký
      </button>
    </form>
  );
};

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>{activeTab === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}</h1>
            <div className="auth-center-wrapper">
              <div className="auth-tabs">
                <button
                  className={activeTab === 'login' ? 'auth-tab active' : 'auth-tab'}
                  onClick={() => setActiveTab('login')}
                >
                  Đăng Nhập
                </button>
                <button
                  className={activeTab === 'register' ? 'auth-tab active' : 'auth-tab'}
                  onClick={() => setActiveTab('register')}
                >
                  Đăng Ký
                </button>
              </div>
              <div className="auth-form-container">
                {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
