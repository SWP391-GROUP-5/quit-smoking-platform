import React, { useState } from 'react';
import '../../styles/QuitPlan.css';

const QuitPlan = () => {
  // State for the multi-step form
  const [step, setStep] = useState(1);
  
  // Format date helper function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // State for form data
  const [formData, setFormData] = useState({
    currentHabits: {
      cigarettesPerDay: 0,
      yearsSmoking: 0,
      firstCigaretteTime: '',
      costPerPack: 0,
      currency: '',
      difficultyRefraining: '',
      smokingWhenIll: false
    },
    reasons: {
      health: false,
      family: false,
      financial: false,
      appearance: false,
      other: false,
      otherReason: ''
    },
    previousAttempts: {
      hasTriedQuitting: false,
      numberOfAttempts: 0,
      longestQuitDuration: '',
      previousMethods: [],
      mainChallenges: []
    },
    quitStrategy: {
      quitDate: '',
      approachType: 'cold-turkey',
      socialSupport: [],
      replacementActivities: [],
      triggerSituations: []
    }
  });

  // Function to handle form data changes
  const handleChange = (section, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));
  };

  // Function to handle checkbox changes in reasons
  const handleCheckboxChange = (section, field) => {
    const sectionData = formData[section];
    setFormData({
      ...formData,
      [section]: {
        ...sectionData,
        [field]: !sectionData[field]
      }
    });
  };

  // Function to add custom reason
  const [customReason, setCustomReason] = useState('');
  const addCustomReason = (e) => {
    e.preventDefault();
    if (customReason.trim() !== '') {
      const quitReasons = formData.reasons;
      setFormData({
        ...formData,
        reasons: {
          ...quitReasons,
          otherReason: customReason.trim()
        }
      });
      setCustomReason('');
    }
  };

  // Function to handle step navigation
  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  // Function to submit the form
  const submitForm = () => {
    // In a real app, this would send the data to a backend
    console.log('Form submitted with data:', formData);
    // Navigate to the success page or show a confirmation
    setStep(5);
  };

  // Calculate nicotine dependency score (simplified Fagerström Test)
  const calculateDependencyScore = () => {
    let score = 0;
    const habits = formData.currentHabits;
    
    // Cigarettes per day
    if (habits.cigarettesPerDay >= 31) score += 3;
    else if (habits.cigarettesPerDay >= 21) score += 2;
    else if (habits.cigarettesPerDay >= 11) score += 1;
    
    // Time to first cigarette
    if (habits.firstCigaretteTime === 'within5min') score += 3;
    else if (habits.firstCigaretteTime === 'within30min') score += 2;
    else if (habits.firstCigaretteTime === 'within1hour') score += 1;
    
    // Difficulty refraining
    if (habits.difficultyRefraining === 'veryDifficult') score += 1;
    
    // Smoking when ill
    if (habits.smokingWhenIll) score += 1;
    
    return score;
  };

  // Render the appropriate step
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="form-step">
            <h2>Thói Quen Hút Thuốc Hiện Tại</h2>
            <p className="step-description">Hãy bắt đầu bằng việc tìm hiểu thói quen hút thuốc hiện tại của bạn. Thông tin này sẽ giúp tạo ra một kế hoạch bỏ thuốc phù hợp.</p>
            
            <div className="form-group">
              <label>Bạn hút bao nhiêu điếu thuốc mỗi ngày?</label>
              <input 
                type="number" 
                value={formData.currentHabits.cigarettesPerDay} 
                onChange={(e) => handleChange('currentHabits', 'cigarettesPerDay', parseInt(e.target.value) || 0)} 
              />
            </div>
            
            <div className="form-group">
              <label>Bạn đã hút thuốc bao nhiêu năm?</label>
              <input 
                type="number" 
                value={formData.currentHabits.yearsSmoking} 
                onChange={(e) => handleChange('currentHabits', 'yearsSmoking', parseInt(e.target.value) || 0)} 
              />
            </div>
            
            <div className="form-group">
              <label>Một bao thuốc lá có giá bao nhiêu?</label>
              <input 
                type="number" 
                value={formData.currentHabits.costPerPack} 
                onChange={(e) => handleChange('currentHabits', 'costPerPack', parseFloat(e.target.value) || 0)} 
              />
            </div>
            
            <div className="form-group">
              <label>Bạn hút điếu thuốc đầu tiên sau khi thức dậy bao lâu?</label>
              <select 
                value={formData.currentHabits.firstCigaretteTime} 
                onChange={(e) => handleChange('currentHabits', 'firstCigaretteTime', e.target.value)}
              >
                <option value="">Chọn một lựa chọn</option>
                <option value="within5min">Trong vòng 5 phút</option>
                <option value="within30min">Trong vòng 6-30 phút</option>
                <option value="within1hour">Trong vòng 31-60 phút</option>
                <option value="after1hour">Sau 60 phút</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Bạn có thấy khó khăn khi không hút thuốc ở những nơi cấm hút thuốc không?</label>
              <select 
                value={formData.currentHabits.difficultyRefraining} 
                onChange={(e) => handleChange('currentHabits', 'difficultyRefraining', e.target.value)}
              >
                <option value="">Chọn một lựa chọn</option>
                <option value="veryDifficult">Có, rất khó khăn</option>
                <option value="somewhatDifficult">Hơi khó khăn</option>
                <option value="notDifficult">Không, không khó khăn</option>
              </select>
            </div>
            
            <div className="form-group checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  checked={formData.currentHabits.smokingWhenIll} 
                  onChange={() => handleChange('currentHabits', 'smokingWhenIll', !formData.currentHabits.smokingWhenIll)} 
                />
                Bạn có hút thuốc ngay cả khi bị ốm nặng phải nằm trên giường cả ngày không?
              </label>
            </div>
            
            <div className="dependency-score">
              <h3>Điểm Phụ Thuộc Nicotine:</h3>
              <div className="score">{calculateDependencyScore()}/7</div>
              <p className="score-info">
                {calculateDependencyScore() <= 2 ? 'Mức độ phụ thuộc thấp' : 
                 calculateDependencyScore() <= 4 ? 'Mức độ phụ thuộc trung bình' : 'Mức độ phụ thuộc cao'}
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h2>Lý Do Bỏ Thuốc</h2>
            <p className="step-description">Hãy cho chúng tôi biết lý do tại sao bạn muốn bỏ thuốc. Điều này sẽ giúp chúng tôi tạo ra một kế hoạch phù hợp với mục tiêu của bạn.</p>
            
            <div className="form-group checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  checked={formData.reasons.health} 
                  onChange={() => handleCheckboxChange('reasons', 'health')} 
                />
                Cải thiện sức khỏe
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={formData.reasons.family} 
                  onChange={() => handleCheckboxChange('reasons', 'family')} 
                />
                Vì gia đình
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={formData.reasons.financial} 
                  onChange={() => handleCheckboxChange('reasons', 'financial')} 
                />
                Tiết kiệm tiền
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={formData.reasons.appearance} 
                  onChange={() => handleCheckboxChange('reasons', 'appearance')} 
                />
                Cải thiện ngoại hình
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={formData.reasons.other} 
                  onChange={() => handleCheckboxChange('reasons', 'other')} 
                />
                Lý do khác
              </label>
            </div>
            
            {formData.reasons.other && (
              <div className="form-group">
                <label>Vui lòng cho biết lý do khác:</label>
                <input 
                  type="text" 
                  value={customReason} 
                  onChange={(e) => setCustomReason(e.target.value)} 
                  placeholder="Nhập lý do của bạn"
                />
                <button onClick={addCustomReason}>Thêm Lý Do</button>
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h2>Những Lần Bỏ Thuốc Trước Đây</h2>
            <p className="step-description">Thông tin về những lần bỏ thuốc trước đây sẽ giúp chúng tôi hiểu rõ hơn về thách thức và tạo ra một kế hoạch phù hợp hơn.</p>
            
            <div className="form-group">
              <label>Bạn đã từng thử bỏ thuốc chưa?</label>
              <select 
                value={formData.previousAttempts.hasTriedQuitting} 
                onChange={(e) => handleChange('previousAttempts', 'hasTriedQuitting', e.target.value === 'true')}
              >
                <option value="">Chọn một lựa chọn</option>
                <option value="true">Có</option>
                <option value="false">Chưa</option>
              </select>
            </div>
            
            {formData.previousAttempts.hasTriedQuitting && (
              <>
                <div className="form-group">
                  <label>Số lần thử bỏ thuốc:</label>
                  <input 
                    type="number" 
                    value={formData.previousAttempts.numberOfAttempts} 
                    onChange={(e) => handleChange('previousAttempts', 'numberOfAttempts', parseInt(e.target.value) || 0)} 
                  />
                </div>
                
                <div className="form-group">
                  <label>Thời gian bỏ thuốc dài nhất:</label>
                  <select 
                    value={formData.previousAttempts.longestQuitDuration} 
                    onChange={(e) => handleChange('previousAttempts', 'longestQuitDuration', e.target.value)}
                  >
                    <option value="">Chọn một lựa chọn</option>
                    <option value="lessThanWeek">Dưới 1 tuần</option>
                    <option value="oneWeek">1 tuần</option>
                    <option value="oneMonth">1 tháng</option>
                    <option value="threeMonths">3 tháng</option>
                    <option value="sixMonths">6 tháng</option>
                    <option value="oneYear">1 năm</option>
                    <option value="moreThanYear">Hơn 1 năm</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Phương pháp đã thử:</label>
                  <div className="checkbox-group">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.previousMethods.includes('coldTurkey')} 
                        onChange={() => {
                          const methods = [...formData.previousAttempts.previousMethods];
                          const index = methods.indexOf('coldTurkey');
                          if (index === -1) methods.push('coldTurkey');
                          else methods.splice(index, 1);
                          handleChange('previousAttempts', 'previousMethods', methods);
                        }} 
                      />
                      Bỏ đột ngột
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.previousMethods.includes('gradualReduction')} 
                        onChange={() => {
                          const methods = [...formData.previousAttempts.previousMethods];
                          const index = methods.indexOf('gradualReduction');
                          if (index === -1) methods.push('gradualReduction');
                          else methods.splice(index, 1);
                          handleChange('previousAttempts', 'previousMethods', methods);
                        }} 
                      />
                      Giảm dần
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.previousMethods.includes('nicotineReplacement')} 
                        onChange={() => {
                          const methods = [...formData.previousAttempts.previousMethods];
                          const index = methods.indexOf('nicotineReplacement');
                          if (index === -1) methods.push('nicotineReplacement');
                          else methods.splice(index, 1);
                          handleChange('previousAttempts', 'previousMethods', methods);
                        }} 
                      />
                      Thay thế nicotine
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.previousMethods.includes('medication')} 
                        onChange={() => {
                          const methods = [...formData.previousAttempts.previousMethods];
                          const index = methods.indexOf('medication');
                          if (index === -1) methods.push('medication');
                          else methods.splice(index, 1);
                          handleChange('previousAttempts', 'previousMethods', methods);
                        }} 
                      />
                      Thuốc hỗ trợ
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Thách thức chính:</label>
                  <div className="checkbox-group">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.mainChallenges.includes('cravings')} 
                        onChange={() => {
                          const challenges = [...formData.previousAttempts.mainChallenges];
                          const index = challenges.indexOf('cravings');
                          if (index === -1) challenges.push('cravings');
                          else challenges.splice(index, 1);
                          handleChange('previousAttempts', 'mainChallenges', challenges);
                        }} 
                      />
                      Cơn thèm thuốc
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.mainChallenges.includes('stress')} 
                        onChange={() => {
                          const challenges = [...formData.previousAttempts.mainChallenges];
                          const index = challenges.indexOf('stress');
                          if (index === -1) challenges.push('stress');
                          else challenges.splice(index, 1);
                          handleChange('previousAttempts', 'mainChallenges', challenges);
                        }} 
                      />
                      Căng thẳng
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.mainChallenges.includes('social')} 
                        onChange={() => {
                          const challenges = [...formData.previousAttempts.mainChallenges];
                          const index = challenges.indexOf('social');
                          if (index === -1) challenges.push('social');
                          else challenges.splice(index, 1);
                          handleChange('previousAttempts', 'mainChallenges', challenges);
                        }} 
                      />
                      Áp lực xã hội
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.mainChallenges.includes('withdrawal')} 
                        onChange={() => {
                          const challenges = [...formData.previousAttempts.mainChallenges];
                          const index = challenges.indexOf('withdrawal');
                          if (index === -1) challenges.push('withdrawal');
                          else challenges.splice(index, 1);
                          handleChange('previousAttempts', 'mainChallenges', challenges);
                        }} 
                      />
                      Triệu chứng cai nghiện
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      case 4:
        return (
          <div className="form-step">
            <h2>Chiến Lược Bỏ Thuốc</h2>
            <p className="step-description">Hãy cùng xây dựng chiến lược bỏ thuốc phù hợp với bạn.</p>
            
            <div className="form-group">
              <label>Ngày bỏ thuốc:</label>
              <input 
                type="date" 
                value={formData.quitStrategy.quitDate} 
                onChange={(e) => handleChange('quitStrategy', 'quitDate', e.target.value)} 
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label>Phương pháp bỏ thuốc:</label>
              <select 
                value={formData.quitStrategy.approachType} 
                onChange={(e) => handleChange('quitStrategy', 'approachType', e.target.value)}
              >
                <option value="cold-turkey">Bỏ đột ngột</option>
                <option value="gradual">Giảm dần</option>
                <option value="medication">Sử dụng thuốc hỗ trợ</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Hỗ trợ xã hội:</label>
              <div className="checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.socialSupport.includes('family')} 
                    onChange={() => {
                      const support = [...formData.quitStrategy.socialSupport];
                      const index = support.indexOf('family');
                      if (index === -1) support.push('family');
                      else support.splice(index, 1);
                      handleChange('quitStrategy', 'socialSupport', support);
                    }} 
                  />
                  Gia đình
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.socialSupport.includes('friends')} 
                    onChange={() => {
                      const support = [...formData.quitStrategy.socialSupport];
                      const index = support.indexOf('friends');
                      if (index === -1) support.push('friends');
                      else support.splice(index, 1);
                      handleChange('quitStrategy', 'socialSupport', support);
                    }} 
                  />
                  Bạn bè
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.socialSupport.includes('supportGroup')} 
                    onChange={() => {
                      const support = [...formData.quitStrategy.socialSupport];
                      const index = support.indexOf('supportGroup');
                      if (index === -1) support.push('supportGroup');
                      else support.splice(index, 1);
                      handleChange('quitStrategy', 'socialSupport', support);
                    }} 
                  />
                  Nhóm hỗ trợ
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.socialSupport.includes('counselor')} 
                    onChange={() => {
                      const support = [...formData.quitStrategy.socialSupport];
                      const index = support.indexOf('counselor');
                      if (index === -1) support.push('counselor');
                      else support.splice(index, 1);
                      handleChange('quitStrategy', 'socialSupport', support);
                    }} 
                  />
                  Tư vấn viên
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label>Hoạt động thay thế:</label>
              <div className="checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.replacementActivities.includes('exercise')} 
                    onChange={() => {
                      const activities = [...formData.quitStrategy.replacementActivities];
                      const index = activities.indexOf('exercise');
                      if (index === -1) activities.push('exercise');
                      else activities.splice(index, 1);
                      handleChange('quitStrategy', 'replacementActivities', activities);
                    }} 
                  />
                  Tập thể dục
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.replacementActivities.includes('meditation')} 
                    onChange={() => {
                      const activities = [...formData.quitStrategy.replacementActivities];
                      const index = activities.indexOf('meditation');
                      if (index === -1) activities.push('meditation');
                      else activities.splice(index, 1);
                      handleChange('quitStrategy', 'replacementActivities', activities);
                    }} 
                  />
                  Thiền định
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.replacementActivities.includes('hobbies')} 
                    onChange={() => {
                      const activities = [...formData.quitStrategy.replacementActivities];
                      const index = activities.indexOf('hobbies');
                      if (index === -1) activities.push('hobbies');
                      else activities.splice(index, 1);
                      handleChange('quitStrategy', 'replacementActivities', activities);
                    }} 
                  />
                  Sở thích
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.replacementActivities.includes('reading')} 
                    onChange={() => {
                      const activities = [...formData.quitStrategy.replacementActivities];
                      const index = activities.indexOf('reading');
                      if (index === -1) activities.push('reading');
                      else activities.splice(index, 1);
                      handleChange('quitStrategy', 'replacementActivities', activities);
                    }} 
                  />
                  Đọc sách
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label>Tình huống kích thích:</label>
              <div className="checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.triggerSituations.includes('stress')} 
                    onChange={() => {
                      const triggers = [...formData.quitStrategy.triggerSituations];
                      const index = triggers.indexOf('stress');
                      if (index === -1) triggers.push('stress');
                      else triggers.splice(index, 1);
                      handleChange('quitStrategy', 'triggerSituations', triggers);
                    }} 
                  />
                  Căng thẳng
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.triggerSituations.includes('social')} 
                    onChange={() => {
                      const triggers = [...formData.quitStrategy.triggerSituations];
                      const index = triggers.indexOf('social');
                      if (index === -1) triggers.push('social');
                      else triggers.splice(index, 1);
                      handleChange('quitStrategy', 'triggerSituations', triggers);
                    }} 
                  />
                  Giao tiếp xã hội
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.triggerSituations.includes('afterMeal')} 
                    onChange={() => {
                      const triggers = [...formData.quitStrategy.triggerSituations];
                      const index = triggers.indexOf('afterMeal');
                      if (index === -1) triggers.push('afterMeal');
                      else triggers.splice(index, 1);
                      handleChange('quitStrategy', 'triggerSituations', triggers);
                    }} 
                  />
                  Sau bữa ăn
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.triggerSituations.includes('coffee')} 
                    onChange={() => {
                      const triggers = [...formData.quitStrategy.triggerSituations];
                      const index = triggers.indexOf('coffee');
                      if (index === -1) triggers.push('coffee');
                      else triggers.splice(index, 1);
                      handleChange('quitStrategy', 'triggerSituations', triggers);
                    }} 
                  />
                  Uống cà phê
                </label>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="form-step success-step">
            <h2>Kế Hoạch Bỏ Thuốc Đã Được Tạo!</h2>
            <p>Chúc mừng! Kế hoạch bỏ thuốc của bạn đã được tạo thành công. Dưới đây là tóm tắt kế hoạch của bạn:</p>
            
            <div className="plan-summary">
              <h3>Thông Tin Cơ Bản</h3>
              <p>Ngày bỏ thuốc: {formatDate(formData.quitStrategy.quitDate)}</p>
              <p>Phương pháp: {
                formData.quitStrategy.approachType === 'cold-turkey' ? 'Bỏ đột ngột' :
                formData.quitStrategy.approachType === 'gradual' ? 'Giảm dần' :
                'Sử dụng thuốc hỗ trợ'
              }</p>
              
              <h3>Hỗ Trợ Xã Hội</h3>
              <ul>
                {formData.quitStrategy.socialSupport.map(support => (
                  <li key={support}>{
                    support === 'family' ? 'Gia đình' :
                    support === 'friends' ? 'Bạn bè' :
                    support === 'supportGroup' ? 'Nhóm hỗ trợ' :
                    'Tư vấn viên'
                  }</li>
                ))}
              </ul>
              
              <h3>Hoạt Động Thay Thế</h3>
              <ul>
                {formData.quitStrategy.replacementActivities.map(activity => (
                  <li key={activity}>{
                    activity === 'exercise' ? 'Tập thể dục' :
                    activity === 'meditation' ? 'Thiền định' :
                    activity === 'hobbies' ? 'Sở thích' :
                    'Đọc sách'
                  }</li>
                ))}
              </ul>
              
              <h3>Tình Huống Kích Thích</h3>
              <ul>
                {formData.quitStrategy.triggerSituations.map(trigger => (
                  <li key={trigger}>{
                    trigger === 'stress' ? 'Căng thẳng' :
                    trigger === 'social' ? 'Giao tiếp xã hội' :
                    trigger === 'afterMeal' ? 'Sau bữa ăn' :
                    'Uống cà phê'
                  }</li>
                ))}
              </ul>
            </div>
            
            <div className="next-steps">
              <h3>Các Bước Tiếp Theo</h3>
              <ol>
                <li>Chuẩn bị tinh thần và môi trường cho ngày bỏ thuốc</li>
                <li>Thông báo cho gia đình và bạn bè về kế hoạch của bạn</li>
                <li>Loại bỏ tất cả thuốc lá và bật lửa trong nhà</li>
                <li>Tải ứng dụng theo dõi tiến độ</li>
                <li>Tham gia nhóm hỗ trợ trực tuyến</li>
              </ol>
            </div>
            
            <div className="action-buttons">
              <button className="primary-btn" onClick={() => window.location.href = '/dashboard'}>
                Đến Trang Tổng Quan
              </button>
              <button className="secondary-btn" onClick={() => window.print()}>
                In Kế Hoạch
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="quit-plan-page">
      <div className="container">
        <div className="form-container">
          {renderStep()}
          
          {step < 5 && (
            <div className="form-navigation">
              {step > 1 && (
                <button className="secondary-btn" onClick={prevStep}>
                  Quay Lại
                </button>
              )}
              <button 
                className="primary-btn" 
                onClick={step === 4 ? submitForm : nextStep}
              >
                {step === 4 ? 'Hoàn Thành' : 'Tiếp Tục'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuitPlan; 