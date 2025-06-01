import React, { useState, useEffect } from 'react';
import '../../styles/Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    cccd: '',
    smokingStatus: '',
    yearsOfSmoking: 0,
    cigarettesPerDay: 0
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // TODO: Fetch user profile data from API
    // This is a mock data for now
    setProfile({
      fullName: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      dateOfBirth: '1990-01-01',
      gender: 'male',
      address: 'Hà Nội, Việt Nam',
      cccd: '123456789012',
      smokingStatus: 'active',
      yearsOfSmoking: 5,
      cigarettesPerDay: 20
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to update profile
      setMessage('Cập nhật thông tin thành công!');
      setIsEditing(false);
    } catch (error) {
      setMessage('Có lỗi xảy ra khi cập nhật thông tin.');
    }
  };

  return (
    <div className="profile-container">
      <h1>Thông Tin Cá Nhân</h1>
      
      {message && <div className="message">{message}</div>}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Họ và tên:</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Số điện thoại:</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Ngày sinh:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={profile.dateOfBirth}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Giới tính:</label>
          <select
            name="gender"
            value={profile.gender}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div className="form-group">
          <label>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Căn Cước Công Dân:</label>
          <input
            type="text"
            name="cccd"
            value={profile.cccd}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Tình trạng hút thuốc:</label>
          <select
            name="smokingStatus"
            value={profile.smokingStatus}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="active">Đang hút thuốc</option>
            <option value="quitting">Đang bỏ thuốc</option>
            <option value="quit">Đã bỏ thuốc</option>
          </select>
        </div>

        <div className="form-group">
          <label>Số năm hút thuốc:</label>
          <input
            type="number"
            name="yearsOfSmoking"
            value={profile.yearsOfSmoking}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Số điếu thuốc mỗi ngày:</label>
          <input
            type="number"
            name="cigarettesPerDay"
            value={profile.cigarettesPerDay}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="button-group">
          {!isEditing ? (
            <button type="button" onClick={() => setIsEditing(true)} className="edit-button">
              Chỉnh sửa
            </button>
          ) : (
            <>
              <button type="submit" className="save-button">
                Lưu thay đổi
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">
                Hủy
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile; 