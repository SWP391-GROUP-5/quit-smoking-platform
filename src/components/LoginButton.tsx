import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <button className="login-btn" onClick={handleLoginClick}>Đăng Nhập</button>
  );
};

export default LoginButton; 