import React, { useState } from 'react';
import '../styles/Feedback.css';

const Feedback = () => {
  // State cho form đánh giá
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('app');
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Danh sách đánh giá mẫu
  const sampleFeedbacks = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      rating: 5,
      comment: 'Ứng dụng rất hữu ích, tôi đã cai thuốc được 3 tháng nhờ kế hoạch cá nhân hóa.',
      date: '12/01/2023',
      category: 'app'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      rating: 4,
      comment: 'Cộng đồng hỗ trợ rất nhiệt tình, tôi nhận được nhiều lời khuyên hữu ích.',
      date: '05/02/2023',
      category: 'community'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      rating: 3,
      comment: 'Huấn luyện viên chuyên nghiệp, nhưng tôi mong muốn có nhiều thời gian tư vấn hơn.',
      date: '20/03/2023',
      category: 'coach'
    }
  ];

  // Xử lý gửi đánh giá
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra xác thực đơn giản
    if (rating === 0) {
      setValidationError('Vui lòng chọn số sao đánh giá');
      return;
    }
    
    if (comment.trim() === '') {
      setValidationError('Vui lòng nhập phản hồi của bạn');
      return;
    }
    
    // Trong ứng dụng thực tế, gửi đánh giá đến máy chủ
    console.log('Đánh giá:', { rating, comment, name, email, category });
    
    // Hiển thị thông báo thành công
    setSubmitted(true);
    setValidationError('');
    
    // Reset form
    setRating(0);
    setComment('');
    setName('');
    setEmail('');
    setCategory('app');
  };

  // Tính trung bình đánh giá
  const averageRating = () => {
    const total = sampleFeedbacks.reduce((sum, item) => sum + item.rating, 0);
    return (total / sampleFeedbacks.length).toFixed(1);
  };

  // Hiển thị sao đánh giá
  const renderStars = (count, isStatic = false) => {
    return Array(5).fill(0).map((_, index) => (
      <span 
        key={index}
        className={`star ${index < count ? 'filled' : ''} ${!isStatic ? 'interactive' : ''}`}
        onMouseEnter={!isStatic ? () => setHoverRating(index + 1) : undefined}
        onMouseLeave={!isStatic ? () => setHoverRating(0) : undefined}
        onClick={!isStatic ? () => setRating(index + 1) : undefined}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="feedback-page">
      <div className="container">
        <div className="feedback-header">
          <h1>Đánh Giá & Phản Hồi</h1>
          <p>Chia sẻ trải nghiệm của bạn và giúp chúng tôi cải thiện nền tảng</p>
        </div>

        <div className="feedback-summary">
          <div className="rating-summary">
            <div className="average-rating">
              <span className="rating-number">{averageRating()}</span>
              <div className="rating-stars">
                {renderStars(parseFloat(averageRating()), true)}
              </div>
              <p>Dựa trên {sampleFeedbacks.length} đánh giá</p>
            </div>
            <div className="rating-distribution">
              {[5, 4, 3, 2, 1].map(num => {
                const count = sampleFeedbacks.filter(f => f.rating === num).length;
                const percentage = (count / sampleFeedbacks.length) * 100;
                
                return (
                  <div key={num} className="rating-bar">
                    <span className="rating-label">{num} sao</span>
                    <div className="rating-progress">
                      <div 
                        className="rating-progress-fill" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="rating-count">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="feedback-content">
          <div className="feedback-form-container">
            <h2>Gửi phản hồi của bạn</h2>
            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Cảm ơn bạn đã gửi phản hồi!</h3>
                <p>Ý kiến của bạn rất quan trọng đối với chúng tôi.</p>
                <button 
                  className="primary-btn" 
                  onClick={() => setSubmitted(false)}
                >
                  Gửi phản hồi khác
                </button>
              </div>
            ) : (
              <form className="feedback-form" onSubmit={handleSubmit}>
                {validationError && (
                  <div className="error-message">{validationError}</div>
                )}
                
                <div className="form-group">
                  <label>Đánh giá của bạn</label>
                  <div className="rating-input">
                    {renderStars(hoverRating || rating)}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="category">Loại phản hồi</label>
                  <select 
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="app">Tổng thể ứng dụng</option>
                    <option value="plan">Kế hoạch cai thuốc</option>
                    <option value="dashboard">Bảng điều khiển</option>
                    <option value="community">Cộng đồng</option>
                    <option value="coach">Huấn luyện viên</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="comment">Phản hồi chi tiết</label>
                  <textarea 
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Chia sẻ trải nghiệm của bạn với chúng tôi..."
                    rows={5}
                  ></textarea>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Tên của bạn (tùy chọn)</label>
                    <input 
                      type="text" 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email (tùy chọn)</label>
                    <input 
                      type="email" 
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                
                <button type="submit" className="primary-btn">Gửi phản hồi</button>
              </form>
            )}
          </div>
          
          <div className="recent-feedbacks">
            <h2>Phản hồi gần đây</h2>
            <div className="feedbacks-list">
              {sampleFeedbacks.map(feedback => (
                <div key={feedback.id} className="feedback-card">
                  <div className="feedback-header">
                    <span className="feedback-author">{feedback.name}</span>
                    <span className="feedback-date">{feedback.date}</span>
                  </div>
                  <div className="feedback-rating">
                    {renderStars(feedback.rating, true)}
                    <span className="feedback-category">
                      {feedback.category === 'app' && 'Ứng dụng'}
                      {feedback.category === 'plan' && 'Kế hoạch cai thuốc'}
                      {feedback.category === 'dashboard' && 'Bảng điều khiển'}
                      {feedback.category === 'community' && 'Cộng đồng'}
                      {feedback.category === 'coach' && 'Huấn luyện viên'}
                      {feedback.category === 'other' && 'Khác'}
                    </span>
                  </div>
                  <p className="feedback-text">{feedback.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback; 