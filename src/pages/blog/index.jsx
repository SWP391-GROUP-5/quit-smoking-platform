import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Blog.css";

const blogPosts = [
  {
    id: 1,
    title: "Cách vượt qua cơn thèm thuốc hiệu quả",
    excerpt: "Tìm hiểu các phương pháp thực tế giúp bạn kiểm soát cơn thèm thuốc mỗi ngày.",
    image: "/imagedep/anhblogmot.png", 
  },
  {
    id: 2,
    title: "Những lợi ích sức khỏe khi bỏ thuốc lá",
    excerpt: "Khám phá những thay đổi tích cực cho sức khỏe sau khi bạn ngừng hút thuốc.",
    image: "/imagedep/anhblog2.jpg", 
  },
];

const Blog = () => (
  <div className="blog-page container">
    <h1 className="blog-title">Bài Viết Mới Nhất</h1>
    <div className="blog-list">
      {blogPosts.length === 0 ? (
        <div>Chưa có bài viết nào.</div>
      ) : (
        blogPosts.map((post) => (
          <div className="blog-card" key={post.id}>
            <div className="blog-image">
              {/* Nếu ảnh lỗi, thử dùng ảnh online để test */}
              <img src={post.image} alt={post.title} onError={e => e.target.style.display='none'} />
            </div>
            <div className="blog-content">
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="read-more">
                Đọc Thêm
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

export default Blog;