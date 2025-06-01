import React from "react";
import LoginForm from "../authen-form/LoginForm";
import RegisterForm from "../authen-form/RegisterForm";
import "./index.css";

const AuthenTemplate = ({ isLogin = true }) => {
  return (
    <div className="authen-template-desktop">
      {/* FORM BÊN TRÁI (30%) */}
      <div className="authen-template-desktop__form">
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>

      {/* ẢNH BÊN PHẢI (70%) */}
      <div className="authen-template-desktop__image">
        <img
        src="/login/gattan.jpg"
          alt="Hình ảnh minh họa về việc bỏ thuốc lá"
          className="authen-desktop-image"
        />
      </div>
    </div>
  );
};

export default AuthenTemplate;
