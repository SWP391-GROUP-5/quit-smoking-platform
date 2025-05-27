import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignupButton: React.FC = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  return (
    <button className="signup-btn" onClick={handleSignupClick}>Đăng Ký</button>
  );
};

export default SignupButton; 