import React, { useState } from 'react';
import '../styles/QuitPlan.css';

interface FormData {
  currentHabits: {
    cigarettesPerDay: number;
    yearsSmoking: number;
    firstCigaretteTime: string;
    costPerPack: number;
    currency: string;
    difficultyRefraining: string;
    smokingWhenIll: boolean;
  };
  reasons: {
    health: boolean;
    family: boolean;
    financial: boolean;
    appearance: boolean;
    other: boolean;
    otherReason: string;
  };
  previousAttempts: {
    hasTriedQuitting: boolean;
    numberOfAttempts: number;
    longestQuitDuration: string;
    previousMethods: ('coldTurkey' | 'gradualReduction' | 'nicotineReplacement' | 'medication')[];
    mainChallenges: ('cravings' | 'stress' | 'social' | 'withdrawal')[];
  };
  quitStrategy: {
    quitDate: string;
    approachType: 'cold-turkey' | 'gradual' | 'medication';
    socialSupport: ('family' | 'friends' | 'supportGroup' | 'counselor')[];
    replacementActivities: ('exercise' | 'meditation' | 'hobbies' | 'reading')[];
    triggerSituations: ('stress' | 'social' | 'afterMeal' | 'coffee')[];
  };
}

const QuitPlan: React.FC = () => {
  // State for the multi-step form
  const [step, setStep] = useState(1);
  
  // Format date helper function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // State for form data
  const [formData, setFormData] = useState<FormData>({
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
  const handleChange = (section: string, field: string, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section as keyof typeof prevData],
        [field]: value
      }
    }));
  };

  // Function to handle checkbox changes in reasons
  const handleCheckboxChange = (section: string, field: string) => {
    const sectionData = formData[section as keyof typeof formData] as Record<string, any>;
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
  const addCustomReason = (e: React.FormEvent) => {
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
            
            <div className="form-navigation">
              <button className="primary-btn" onClick={nextStep}>Tiếp Tục</button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="form-step">
            <h2>Lý Do Bỏ Thuốc</h2>
            <p className="step-description">Hiểu rõ động lực bỏ thuốc của bạn là rất quan trọng cho sự thành công. Hãy chọn tất cả các lý do phù hợp với bạn.</p>
            
            <div className="reasons-grid">
              <div className="reason-checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.reasons.health} 
                    onChange={() => handleCheckboxChange('reasons', 'health')} 
                  />
                  <span className="reason-label">Cải thiện sức khỏe</span>
                </label>
              </div>
              
              <div className="reason-checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.reasons.family} 
                    onChange={() => handleCheckboxChange('reasons', 'family')} 
                  />
                  <span className="reason-label">Vì gia đình/con cái</span>
                </label>
              </div>
              
              <div className="reason-checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.reasons.financial} 
                    onChange={() => handleCheckboxChange('reasons', 'financial')} 
                  />
                  <span className="reason-label">Tiết kiệm tiền</span>
                </label>
              </div>
              
              <div className="reason-checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.reasons.appearance} 
                    onChange={() => handleCheckboxChange('reasons', 'appearance')} 
                  />
                  <span className="reason-label">Loại bỏ vẻ ngoài</span>
                </label>
              </div>
              
              <div className="reason-checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.reasons.other} 
                    onChange={() => handleCheckboxChange('reasons', 'other')} 
                  />
                  <span className="reason-label">Lý do khác</span>
                </label>
              </div>
            </div>
            
            <div className="custom-reasons">
              <h3>Lý Do Khác</h3>
              <form onSubmit={addCustomReason}>
                <input 
                  type="text" 
                  value={customReason} 
                  onChange={(e) => setCustomReason(e.target.value)} 
                  placeholder="Thêm lý do của bạn..." 
                />
                <button type="submit">Thêm</button>
              </form>
              <div className="custom-reasons-list">
                {formData.reasons.otherReason && (
                  <div className="custom-reason-item">
                    <span>{formData.reasons.otherReason}</span>
                    <button onClick={() => {
                      setFormData({
                        ...formData,
                        reasons: {
                          ...formData.reasons,
                          otherReason: ''
                        }
                      });
                    }}>Xóa</button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="form-navigation">
              <button className="secondary-btn" onClick={prevStep}>Quay Lại</button>
              <button className="primary-btn" onClick={nextStep}>Tiếp Tục</button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="form-step">
            <h2>Những Lần Thử Bỏ Thuốc Trước Đây</h2>
            <p className="step-description">Chia sẻ kinh nghiệm bỏ thuốc trước đây của bạn sẽ giúp chúng tôi tạo ra một kế hoạch phù hợp hơn.</p>
            
            <div className="form-group checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  checked={formData.previousAttempts.hasTriedQuitting} 
                  onChange={() => handleChange('previousAttempts', 'hasTriedQuitting', !formData.previousAttempts.hasTriedQuitting)} 
                />
                Bạn đã từng thử bỏ thuốc chưa?
              </label>
            </div>
            
            {formData.previousAttempts.hasTriedQuitting && (
              <>
                <div className="form-group">
                  <label>Số lần thử bỏ thuốc?</label>
                  <input 
                    type="number" 
                    value={formData.previousAttempts.numberOfAttempts} 
                    onChange={(e) => handleChange('previousAttempts', 'numberOfAttempts', parseInt(e.target.value) || 0)} 
                  />
                </div>
                
                <div className="form-group">
                  <label>Thời gian bỏ thuốc dài nhất?</label>
                  <select 
                    value={formData.previousAttempts.longestQuitDuration} 
                    onChange={(e) => handleChange('previousAttempts', 'longestQuitDuration', e.target.value)}
                  >
                    <option value="">Chọn một lựa chọn</option>
                    <option value="lessThanWeek">Dưới 1 tuần</option>
                    <option value="oneToTwoWeeks">1-2 tuần</option>
                    <option value="oneToThreeMonths">1-3 tháng</option>
                    <option value="threeToSixMonths">3-6 tháng</option>
                    <option value="moreThanSixMonths">Hơn 6 tháng</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Phương pháp đã thử trước đây:</label>
                  <div className="checkbox-grid">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.previousMethods.includes('coldTurkey')} 
                        onChange={() => {
                          const methods = formData.previousAttempts.previousMethods;
                          const newMethods = methods.includes('coldTurkey')
                            ? methods.filter(m => m !== 'coldTurkey')
                            : [...methods, 'coldTurkey'];
                          handleChange('previousAttempts', 'previousMethods', newMethods);
                        }} 
                      />
                      Bỏ đột ngột
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.previousMethods.includes('gradualReduction')} 
                        onChange={() => {
                          const methods = formData.previousAttempts.previousMethods;
                          const newMethods = methods.includes('gradualReduction')
                            ? methods.filter(m => m !== 'gradualReduction')
                            : [...methods, 'gradualReduction'];
                          handleChange('previousAttempts', 'previousMethods', newMethods);
                        }} 
                      />
                      Giảm dần
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.previousMethods.includes('nicotineReplacement')} 
                        onChange={() => {
                          const methods = formData.previousAttempts.previousMethods;
                          const newMethods = methods.includes('nicotineReplacement')
                            ? methods.filter(m => m !== 'nicotineReplacement')
                            : [...methods, 'nicotineReplacement'];
                          handleChange('previousAttempts', 'previousMethods', newMethods);
                        }} 
                      />
                      Thay thế nicotine
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.previousMethods.includes('medication')} 
                        onChange={() => {
                          const methods = formData.previousAttempts.previousMethods;
                          const newMethods = methods.includes('medication')
                            ? methods.filter(m => m !== 'medication')
                            : [...methods, 'medication'];
                          handleChange('previousAttempts', 'previousMethods', newMethods);
                        }} 
                      />
                      Thuốc hỗ trợ
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Thách thức chính khi bỏ thuốc:</label>
                  <div className="checkbox-grid">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.mainChallenges.includes('cravings')} 
                        onChange={() => {
                          const challenges = formData.previousAttempts.mainChallenges;
                          const newChallenges = challenges.includes('cravings')
                            ? challenges.filter(c => c !== 'cravings')
                            : [...challenges, 'cravings'];
                          handleChange('previousAttempts', 'mainChallenges', newChallenges);
                        }} 
                      />
                      Cơn thèm thuốc
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.mainChallenges.includes('stress')} 
                        onChange={() => {
                          const challenges = formData.previousAttempts.mainChallenges;
                          const newChallenges = challenges.includes('stress')
                            ? challenges.filter(c => c !== 'stress')
                            : [...challenges, 'stress'];
                          handleChange('previousAttempts', 'mainChallenges', newChallenges);
                        }} 
                      />
                      Căng thẳng
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.mainChallenges.includes('social')} 
                        onChange={() => {
                          const challenges = formData.previousAttempts.mainChallenges;
                          const newChallenges = challenges.includes('social')
                            ? challenges.filter(c => c !== 'social')
                            : [...challenges, 'social'];
                          handleChange('previousAttempts', 'mainChallenges', newChallenges);
                        }} 
                      />
                      Áp lực xã hội
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.previousAttempts.mainChallenges.includes('withdrawal')} 
                        onChange={() => {
                          const challenges = formData.previousAttempts.mainChallenges;
                          const newChallenges = challenges.includes('withdrawal')
                            ? challenges.filter(c => c !== 'withdrawal')
                            : [...challenges, 'withdrawal'];
                          handleChange('previousAttempts', 'mainChallenges', newChallenges);
                        }} 
                      />
                      Triệu chứng cai nghiện
                    </label>
                  </div>
                </div>
              </>
            )}
            
            <div className="form-navigation">
              <button className="secondary-btn" onClick={prevStep}>Quay Lại</button>
              <button className="primary-btn" onClick={nextStep}>Tiếp Tục</button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="form-step">
            <h2>Kế Hoạch Bỏ Thuốc</h2>
            <p className="step-description">Hãy tạo kế hoạch bỏ thuốc phù hợp với bạn.</p>
            
            <div className="form-group">
              <label>Ngày bắt đầu bỏ thuốc:</label>
              <input 
                type="date" 
                value={formData.quitStrategy.quitDate} 
                onChange={(e) => handleChange('quitStrategy', 'quitDate', e.target.value)} 
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label>Phương pháp bỏ thuốc:</label>
              <div className="radio-group">
                <label>
                  <input 
                    type="radio" 
                    name="approachType" 
                    value="cold-turkey" 
                    checked={formData.quitStrategy.approachType === 'cold-turkey'} 
                    onChange={() => handleChange('quitStrategy', 'approachType', 'cold-turkey')} 
                  />
                  Bỏ đột ngột
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="approachType" 
                    value="gradual" 
                    checked={formData.quitStrategy.approachType === 'gradual'} 
                    onChange={() => handleChange('quitStrategy', 'approachType', 'gradual')} 
                  />
                  Giảm dần
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="approachType" 
                    value="medication" 
                    checked={formData.quitStrategy.approachType === 'medication'} 
                    onChange={() => handleChange('quitStrategy', 'approachType', 'medication')} 
                  />
                  Sử dụng thuốc hỗ trợ
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label>Hỗ trợ xã hội:</label>
              <div className="checkbox-grid">
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.socialSupport.includes('family')} 
                    onChange={() => {
                      const support = formData.quitStrategy.socialSupport;
                      const newSupport = support.includes('family')
                        ? support.filter(s => s !== 'family')
                        : [...support, 'family'];
                      handleChange('quitStrategy', 'socialSupport', newSupport);
                    }} 
                  />
                  Gia đình
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.socialSupport.includes('friends')} 
                    onChange={() => {
                      const support = formData.quitStrategy.socialSupport;
                      const newSupport = support.includes('friends')
                        ? support.filter(s => s !== 'friends')
                        : [...support, 'friends'];
                      handleChange('quitStrategy', 'socialSupport', newSupport);
                    }} 
                  />
                  Bạn bè
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.socialSupport.includes('supportGroup')} 
                    onChange={() => {
                      const support = formData.quitStrategy.socialSupport;
                      const newSupport = support.includes('supportGroup')
                        ? support.filter(s => s !== 'supportGroup')
                        : [...support, 'supportGroup'];
                      handleChange('quitStrategy', 'socialSupport', newSupport);
                    }} 
                  />
                  Nhóm hỗ trợ
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.socialSupport.includes('counselor')} 
                    onChange={() => {
                      const support = formData.quitStrategy.socialSupport;
                      const newSupport = support.includes('counselor')
                        ? support.filter(s => s !== 'counselor')
                        : [...support, 'counselor'];
                      handleChange('quitStrategy', 'socialSupport', newSupport);
                    }} 
                  />
                  Chuyên gia tư vấn
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label>Hoạt động thay thế:</label>
              <div className="checkbox-grid">
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.replacementActivities.includes('exercise')} 
                    onChange={() => {
                      const activities = formData.quitStrategy.replacementActivities;
                      const newActivities = activities.includes('exercise')
                        ? activities.filter(a => a !== 'exercise')
                        : [...activities, 'exercise'];
                      handleChange('quitStrategy', 'replacementActivities', newActivities);
                    }} 
                  />
                  Tập thể dục
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.replacementActivities.includes('meditation')} 
                    onChange={() => {
                      const activities = formData.quitStrategy.replacementActivities;
                      const newActivities = activities.includes('meditation')
                        ? activities.filter(a => a !== 'meditation')
                        : [...activities, 'meditation'];
                      handleChange('quitStrategy', 'replacementActivities', newActivities);
                    }} 
                  />
                  Thiền định
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.replacementActivities.includes('hobbies')} 
                    onChange={() => {
                      const activities = formData.quitStrategy.replacementActivities;
                      const newActivities = activities.includes('hobbies')
                        ? activities.filter(a => a !== 'hobbies')
                        : [...activities, 'hobbies'];
                      handleChange('quitStrategy', 'replacementActivities', newActivities);
                    }} 
                  />
                  Sở thích
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.replacementActivities.includes('reading')} 
                    onChange={() => {
                      const activities = formData.quitStrategy.replacementActivities;
                      const newActivities = activities.includes('reading')
                        ? activities.filter(a => a !== 'reading')
                        : [...activities, 'reading'];
                      handleChange('quitStrategy', 'replacementActivities', newActivities);
                    }} 
                  />
                  Đọc sách
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label>Tình huống kích thích:</label>
              <div className="checkbox-grid">
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.triggerSituations.includes('stress')} 
                    onChange={() => {
                      const triggers = formData.quitStrategy.triggerSituations;
                      const newTriggers = triggers.includes('stress')
                        ? triggers.filter(t => t !== 'stress')
                        : [...triggers, 'stress'];
                      handleChange('quitStrategy', 'triggerSituations', newTriggers);
                    }} 
                  />
                  Căng thẳng
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.triggerSituations.includes('social')} 
                    onChange={() => {
                      const triggers = formData.quitStrategy.triggerSituations;
                      const newTriggers = triggers.includes('social')
                        ? triggers.filter(t => t !== 'social')
                        : [...triggers, 'social'];
                      handleChange('quitStrategy', 'triggerSituations', newTriggers);
                    }} 
                  />
                  Gặp gỡ xã hội
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.triggerSituations.includes('afterMeal')} 
                    onChange={() => {
                      const triggers = formData.quitStrategy.triggerSituations;
                      const newTriggers = triggers.includes('afterMeal')
                        ? triggers.filter(t => t !== 'afterMeal')
                        : [...triggers, 'afterMeal'];
                      handleChange('quitStrategy', 'triggerSituations', newTriggers);
                    }} 
                  />
                  Sau bữa ăn
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.quitStrategy.triggerSituations.includes('coffee')} 
                    onChange={() => {
                      const triggers = formData.quitStrategy.triggerSituations;
                      const newTriggers = triggers.includes('coffee')
                        ? triggers.filter(t => t !== 'coffee')
                        : [...triggers, 'coffee'];
                      handleChange('quitStrategy', 'triggerSituations', newTriggers);
                    }} 
                  />
                  Uống cà phê
                </label>
              </div>
            </div>
            
            <div className="form-navigation">
              <button className="secondary-btn" onClick={prevStep}>Quay Lại</button>
              <button className="primary-btn" onClick={submitForm}>Tạo Kế Hoạch</button>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="form-step success-step">
            <h2>Kế Hoạch Bỏ Thuốc Đã Được Tạo!</h2>
            <p className="success-message">Chúc mừng! Kế hoạch bỏ thuốc cá nhân của bạn đã được tạo thành công.</p>
            <div className="plan-summary">
              <h3>Tóm Tắt Kế Hoạch:</h3>
              <ul>
                <li>Ngày bắt đầu: {formatDate(formData.quitStrategy.quitDate)}</li>
                <li>Phương pháp: {
                  formData.quitStrategy.approachType === 'cold-turkey' ? 'Bỏ đột ngột' :
                  formData.quitStrategy.approachType === 'gradual' ? 'Giảm dần' :
                  'Sử dụng thuốc hỗ trợ'
                }</li>
                <li>Hỗ trợ xã hội: {formData.quitStrategy.socialSupport.length > 0 ? formData.quitStrategy.socialSupport.join(', ') : 'Không có'}</li>
                <li>Hoạt động thay thế: {formData.quitStrategy.replacementActivities.length > 0 ? formData.quitStrategy.replacementActivities.join(', ') : 'Không có'}</li>
              </ul>
            </div>
            <div className="next-steps">
              <h3>Các Bước Tiếp Theo:</h3>
              <ol>
                <li>Chuẩn bị tinh thần cho ngày bắt đầu</li>
                <li>Thông báo cho gia đình và bạn bè về kế hoạch của bạn</li>
                <li>Loại bỏ tất cả thuốc lá và bật lửa trong nhà</li>
                <li>Tải ứng dụng theo dõi tiến độ</li>
                <li>Tham gia nhóm hỗ trợ trực tuyến</li>
              </ol>
            </div>
            <div className="form-navigation">
              <button className="primary-btn" onClick={() => window.location.href = '/dashboard'}> Điều Trung Tâm Theo Dõi</button>
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
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default QuitPlan; 