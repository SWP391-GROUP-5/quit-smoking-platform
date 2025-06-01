import React from 'react';
import '../../styles/Footer.css';
import { Form, Input, Button } from "antd";
import { MailOutlined, MessageOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>Bỏ Thuốc Lá</h2>
            <p>Nền tảng chuyên biệt giúp mọi người bỏ thuốc lá với kế hoạch cá nhân hóa, công cụ theo dõi và hỗ trợ từ cộng đồng.</p>
            <div className="contact">
              <span><i className="fas fa-phone"></i> +123-456-7890</span>
              <span><i className="fas fa-envelope"></i> info@bothuocla.com</span>
            </div>
          </div>

          <div className="footer-section links">
            <h2>Liên Kết Nhanh</h2>
            <ul>
              <li><a href="/about">Về Chúng Tôi</a></li>
              <li><a href="/membership">Thành Viên</a></li>
              <li><a href="/coaches">Chuyên Gia Tư Vấn</a></li>
              <li><a href="/privacy">Chính Sách Bảo Mật</a></li>
              <li><a href="/terms">Điều Khoản Sử Dụng</a></li>
            </ul>
          </div>

          <div className="footer-section contact-form">
            <h2>Liên Hệ</h2>
            <Form
              name="footer_contact"
              layout="vertical"
              onFinish={(values) => console.log('Received values of form: ', values)}
            >
              <Form.Item
                name="email"
                rules={[{ type: 'email', message: 'Email không hợp lệ!' }, { required: true, message: 'Vui lòng nhập email của bạn!' }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Nhập email..." />
              </Form.Item>

              <Form.Item
                name="message"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung tin nhắn!' }]}
              >
                <Input.TextArea prefix={<MessageOutlined />} placeholder="Nội dung tin nhắn..." rows={2} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-send" block>
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Bỏ Thuốc Lá | Bảo Lưu Mọi Quyền</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;