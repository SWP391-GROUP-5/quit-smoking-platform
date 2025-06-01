import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterButton = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the register page
  };

  return (
    <button className="register-btn" onClick={handleRegisterClick}>Đăng Ký</button>
  );
};

export default RegisterButton; 