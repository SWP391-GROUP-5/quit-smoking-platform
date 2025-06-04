import React from "react";
import LoginForm from "../authen-form/LoginForm";
import RegisterForm from "../authen-form/RegisterForm";
import "./index.css";

const AuthenTemplate = ({ isLogin = true }) => {
  return (
    <div className="authen-template-desktop">
      
      <div className="authen-template-desktop__form">
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>

      <div className="authen-template-desktop__image">
      </div>
    </div>
  );
};

export default AuthenTemplate;
