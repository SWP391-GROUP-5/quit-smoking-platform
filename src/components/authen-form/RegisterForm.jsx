import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import "./register.css";

function RegisterForm() {
  const onFinish = async (values) => {
    console.log("Success:", values);
    //thong tin nguoi dung
    //400: bad request

    try {
      // await api.post("register", values);
    } catch (error) {
      // show ra man hinh nguoi dung biet loi
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="register-form">
      <h1 >Đăng ký</h1>
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
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input placeholder="Nhập đầy đủ họ tên của bạn" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập địa chỉ email của bạn" prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input placeholder="Nhập tên đăng nhập của bạn" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          hasFeedback
        >
          <Input.Password placeholder="Tạo mật khẩu" prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null} className="align-left-item">
          <Checkbox>Ghi nhớ đăng nhập</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterForm;
