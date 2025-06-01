import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/Home.css";

const blogPosts = [
  {
    id: 1,
    title: 'Cách vượt qua cơn thèm thuốc hiệu quả',
    excerpt: 'Tìm hiểu các phương pháp thực tế giúp bạn kiểm soát cơn thèm thuốc mỗi ngày.',
    image: '/imagedep/anhblogmot.png',
  },
  {
    id: 2,
    title: 'Những lợi ích sức khỏe khi bỏ thuốc lá',
    excerpt: 'Khám phá những thay đổi tích cực cho sức khỏe sau khi bạn ngừng hút thuốc.',
    image: '/imagedep/anhblog2.jpg',
  },
];

const Home = () => {
  const navigate = useNavigate();

  const images = [
    '/imagedep/anhhome1.jpg',
    '/imagedep/anhhome2.jpg',
    '/imagedep/anhhome3.jpg',
    '/imagedep/anhhome4.jpg',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    fade: true,
    arrows: false,
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Làm Chủ Cuộc Sống. Bỏ Thuốc Lá Ngay Hôm Nay.</h1>
            <p>Tham gia cùng hàng nghìn người đã bỏ thuốc thành công với kế hoạch cá nhân hóa, cộng đồng hỗ trợ và các kỹ thuật đã được chứng minh.</p>
            <div className="cta-buttons">
              <button
                className="primary-btn"
                onClick={() => navigate('/login')}
              >
                Bắt Đầu Hành Trình
              </button>
              <button className="secondary-btn">Tìm Hiểu Thêm</button>
            </div>
          </div>
          <div className="hero-image">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index} className="carousel-image-container">
                  <img
                    src={image}
                    alt={`Minh họa sức khỏe ${index + 1}`}
                    style={{
                      // Move most styles to CSS class
                      // width: '100%',
                      // maxWidth: 520,
                      // borderRadius: 16,
                      // boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                      // objectFit: 'cover',
                      // background: '#e0e0e0',
                      // margin: '0 auto'
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Chúng Tôi Giúp Bạn Bỏ Thuốc Như Thế Nào</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Theo Dõi Tiến Độ</h3>
              <p>Giám sát số điếu thuốc tránh được, tiền tiết kiệm và cải thiện sức khỏe theo thời gian thực.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Kế Hoạch Cá Nhân</h3>
              <p>Nhận kế hoạch bỏ thuốc được tùy chỉnh dựa trên thói quen và sở thích của bạn.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Hỗ Trợ Cộng Đồng</h3>
              <p>Kết nối với những người khác trên cùng hành trình để chia sẻ kinh nghiệm và động lực.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Hệ Thống Thành Tựu</h3>
              <p>Nhận huy hiệu và phần thưởng khi đạt được các cột mốc quan trọng trong hành trình.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">Câu Chuyện Thành Công</h2>
          <div className="testimonials-slider">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Sau 15 năm hút thuốc, tôi không nghĩ mình có thể bỏ được. Nền tảng này đã giúp tôi làm được điều đó với những lời nhắc nhở hàng ngày và cộng đồng hỗ trợ."</p>
              </div>
              <div className="testimonial-author">
                <h4>Nguyễn Văn A</h4>
                <p>Đã bỏ thuốc 2 năm</p>
              </div>
            </div>
            {/* More testimonials would be added here in a real slider */}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10,000+</h3>
              <p>Người Bỏ Thuốc Thành Công</p>
            </div>
            <div className="stat-item">
              <h3>2T+</h3>
              <p>Tiền Tiết Kiệm Được</p>
            </div>
            <div className="stat-item">
              <h3>5T+</h3>
              <p>Điếu Thuốc Không Hút</p>
            </div>
            <div className="stat-item">
              <h3>100K+</h3>
              <p>Mục Tiêu Sức Khỏe Đạt Được</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      {/* 
      <section className="blog-preview">
        <div className="container">
          <h2 className="section-title">Bài Viết Mới Nhất</h2>
          <div className="blog-grid">
            {blogPosts.slice(0, 2).map((post) => (
              <div className="blog-card" key={post.id}>
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-content">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="read-more">
                    Đọc Thêm
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link to="/blog" className="read-more" style={{ fontSize: 18 }}>
              Xem Tất Cả Bài Viết
            </Link>
          </div>
        </div>
      </section>
      */}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Sẵn Sàng Bắt Đầu Hành Trình Không Khói Thuốc?</h2>
          <p>Tham gia cộng đồng của chúng tôi và nhận được tất cả công cụ bạn cần để bỏ thuốc thành công.</p>
          <button className="primary-btn">Đăng Ký Ngay</button>
        </div>
      </section>
    </div>
  );
};

export default Home;