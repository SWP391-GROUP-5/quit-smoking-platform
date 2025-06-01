import React from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/Blog.css";

const blogPosts = [
  {
    id: 1,
    title: "Cách vượt qua cơn thèm thuốc hiệu quả",
    content: "Nội dung chi tiết về cách vượt qua cơn thèm thuốc hiệu quả...",
    image: "/imagedep/blog1.jpg",
  },
  {
    id: 2,
    title: "Những lợi ích sức khỏe khi bỏ thuốc lá",
    content: "Nội dung chi tiết về những lợi ích sức khỏe khi bỏ thuốc lá...",
    image: "/imagedep/blog2.jpg",
  },
  // Thêm các bài viết thực tế khác của bạn tại đây
];

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) return <div className="container">Bài viết không tồn tại.</div>;

  return (
    <div className="blog-detail-page container">
      <Link to="/blog" className="back-link">
        ← Quay lại Blog
      </Link>
      <h1>{post.title}</h1>
      <img
        src={post.image}
        alt={post.title}
        style={{
          maxWidth: 480,
          width: "100%",
          borderRadius: 12,
          margin: "24px 0",
        }}
      />
      <div className="blog-detail-content">{post.content}</div>
    </div>
  );
};

export default BlogDetail;