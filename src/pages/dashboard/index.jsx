import React from 'react';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  // Mock data - would be fetched from API in a real app
  const userData = {
    name: 'Nguyễn Văn A',
    quitDate: '2023-01-15',
    daysSmokesFree: 42,
    cigarettesAvoided: 840,
    moneySaved: 462,
    healthImprovements: [
      { day: 1, description: 'Huyết áp và nhịp tim bắt đầu trở về bình thường' },
      { day: 2, description: 'Nồng độ carbon monoxide trong máu giảm xuống mức bình thường' },
      { day: 14, description: 'Tuần hoàn máu cải thiện và chức năng phổi tăng lên' },
      { day: 30, description: 'Ho và khó thở giảm dần' }
    ],
    currentStreak: 42,
    longestStreak: 42,
    nextMilestone: { days: 50, badge: 'Huy Chương Phổi Vàng' },
    recentAchievements: [
      { id: 1, name: '1 Tháng Không Hút Thuốc', date: '2023-02-15', icon: '🥇' },
      { id: 2, name: 'Tiết Kiệm 250K', date: '2023-02-01', icon: '💰' },
      { id: 3, name: 'Tránh 500 Điếu Thuốc', date: '2023-01-25', icon: '🚭' }
    ],
    smokingLogs: [
      { date: '2023-01-13', count: 20 },
      { date: '2023-01-14', count: 15 },
      { date: '2023-01-15', count: 0 },
      { date: '2023-01-16', count: 0 }
    ]
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Tổng Quan</h1>
          <p className="welcome-message">Chào mừng trở lại, {userData.name}</p>
          <p className="quit-date">Bạn đã bỏ thuốc vào: <span>{formatDate(userData.quitDate)}</span></p>
        </div>

        {/* Progress Summary Cards */}
        <div className="progress-summary">
          <div className="summary-card">
            <h3>{userData.daysSmokesFree}</h3>
            <p>Ngày Không Hút Thuốc</p>
          </div>
          <div className="summary-card">
            <h3>{userData.cigarettesAvoided}</h3>
            <p>Điếu Thuốc Đã Tránh</p>
          </div>
          <div className="summary-card">
            <h3>{userData.moneySaved}K</h3>
            <p>Tiền Tiết Kiệm</p>
          </div>
          <div className="summary-card">
            <h3>{userData.currentStreak}</h3>
            <p>Chuỗi Ngày Hiện Tại</p>
          </div>
        </div>

        {/* Progress Details */}
        <div className="dashboard-sections">
          <div className="dashboard-section">
            <h2>Hành Trình Sức Khỏe</h2>
            <div className="health-timeline">
              {userData.healthImprovements.map((improvement, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Ngày {improvement.day}</h4>
                    <p>{improvement.description}</p>
                  </div>
                </div>
              ))}
              <div className="timeline-line"></div>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Thành Tựu Gần Đây</h2>
            <div className="achievements-grid">
              {userData.recentAchievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <h4>{achievement.name}</h4>
                  <p>Đạt được vào {formatDate(achievement.date)}</p>
                  <button className="share-btn">Chia Sẻ</button>
                </div>
              ))}
            </div>
            <div className="next-milestone">
              <h3>Cột Mốc Tiếp Theo: {userData.nextMilestone.badge}</h3>
              <p>Tiếp tục nào! Chỉ còn {userData.nextMilestone.days - userData.daysSmokesFree} ngày nữa!</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${(userData.daysSmokesFree / userData.nextMilestone.days) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Nhật Ký Hút Thuốc</h2>
            <div className="smoking-log" style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3>Ghi Nhận Tình Trạng Hôm Nay</h3>
                <form className="smoking-form">
                  <div className="form-group">
                    <label>Bạn có hút thuốc hôm nay không?</label>
                    <div className="radio-group">
                      <label>
                        <input type="radio" name="smokedToday" value="no" defaultChecked /> Không
                      </label>
                      <label>
                        <input type="radio" name="smokedToday" value="yes" /> Có
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Số điếu thuốc? (nếu có)</label>
                    <input type="number" min="0" placeholder="0" />
                  </div>
                  <div className="form-group">
                    <label>Yếu tố kích thích hoặc ghi chú?</label>
                    <textarea placeholder="Điều gì gây ra cơn thèm? Bạn cảm thấy thế nào?"></textarea>
                  </div>
                  <button type="submit" className="primary-btn">Lưu Ghi Nhận</button>
                </form>
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <img
                  src="\imagedep\anh lich cai thuoc.jpg"
                  alt="Minh họa sức khỏe"
                  style={{
                    maxWidth: 260,
                    width: '300%',
                    maxWidth: 520,
                    borderRadius: 16,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                    objectFit: 'cover',
                    background: '#e0e0e0'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Cần Hỗ Trợ?</h2>
            <div className="support-options">
              <div className="support-card">
                <h3>Nói Chuyện Với Chuyên Gia</h3>
                <p>Đặt lịch tư vấn một kèm một với chuyên gia bỏ thuốc.</p>
                <button className="secondary-btn">Đặt Lịch</button>
              </div>
              <div className="support-card">
                <h3>Diễn Đàn Cộng Đồng</h3>
                <p>Kết nối với những người khác trên cùng hành trình để được hỗ trợ và tư vấn.</p>
                <button className="secondary-btn">Tham Gia Thảo Luận</button>
              </div>
              <div className="support-card">
                <h3>Hỗ Trợ Khẩn Cấp</h3>
                <p>Đang có cơn thèm mạnh? Nhận ngay các mẹo và hỗ trợ.</p>
                <button className="primary-btn">Nhận Hỗ Trợ Ngay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;