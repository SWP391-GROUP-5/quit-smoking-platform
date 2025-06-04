import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { signInWithPopup } from "firebase/auth"; // Removed erroneous import
// import { auth, provider } from "../../firebase"; // Removed erroneous import
import "./login.css";

function LoginForm() {
  const onFinish = (values) => {
    // console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const handleGoogleLogin = async () => {
    // try {
    //   await signInWithPopup(auth, provider);
    //   alert("Đăng nhập Google thành công!");
    // } catch (error) {
    //   alert("Đăng nhập Google thất bại: " + error.message);
    // }
  };

  return (
    <div className="login-form" >
      <h1 >Đăng nhập</h1>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 24 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input placeholder="Nhập tên đăng nhập" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null} className="align-left-item">
          <Checkbox>Ghi nhớ đăng nhập</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form.Item>

        {/* Moved Register link footer above Google Sign-in button */}
        <div className="form-footer-desktop">
          <p>
            Chưa có tài khoản?{" "}
            <a href="/register" className="login-link-desktop">
              Đăng ký
            </a>
          </p>
        </div>

        <Form.Item label={null} style={{ marginTop: '20px' }}>
          <Button type="default" onClick={handleGoogleLogin}>
            Đăng nhập với Google
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
