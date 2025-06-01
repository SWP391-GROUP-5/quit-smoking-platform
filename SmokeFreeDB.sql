-- Tạo cơ sở dữ liệu
CREATE DATABASE SmokeFreeDB;
GO

USE SmokeFreeDB;
GO

-- Bảng User
CREATE TABLE [User] (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FullName VARCHAR(100),
    DateOfBirth DATE,
    PhoneNumber VARCHAR(20),
    AccountStatus VARCHAR(20) DEFAULT 'pending verification',
    RegistrationDate DATETIME DEFAULT GETDATE(),
    LastLoginDate DATETIME,
    SessionToken VARCHAR(500),
    Streak INT DEFAULT 0
);

-- Bảng Coach
CREATE TABLE Coach (
    CoachID INT PRIMARY KEY IDENTITY(1,1),
    FullName VARCHAR(100),
    Email VARCHAR(255) UNIQUE NOT NULL,
    PhoneNumber VARCHAR(20),
    Specialization VARCHAR(100),
    Language VARCHAR(50),
    AvailabilitySchedule TEXT,
    SuccessRate FLOAT,
    Credentials TEXT
);

-- Bảng Admin
CREATE TABLE Admin (
    AdminID INT PRIMARY KEY IDENTITY(1,1),
    FullName VARCHAR(100),
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(50)
);

-- Bảng Content
CREATE TABLE Content (
    ContentID INT PRIMARY KEY IDENTITY(1,1),
    Title VARCHAR(255) NOT NULL,
    Type VARCHAR(50) NOT NULL,
    Category VARCHAR(50),
    Language VARCHAR(50),
    URL VARCHAR(500),
    Status VARCHAR(20) DEFAULT 'pending',
    CreatedByAdminID INT,
    CreationDate DATETIME DEFAULT GETDATE(),
    LastUpdated DATETIME,
    Keywords TEXT,
    FOREIGN KEY (CreatedByAdminID) REFERENCES Admin(AdminID)
);

-- Bảng UserContent (bảng nối cho mối quan hệ nhiều-nhiều giữa User và Content)
CREATE TABLE UserContent (
    UserID INT NOT NULL,
    ContentID INT NOT NULL,
    SavedDate DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (UserID, ContentID),
    FOREIGN KEY (UserID) REFERENCES [User](UserID),
    FOREIGN KEY (ContentID) REFERENCES Content(ContentID)
);

-- Bảng SmokingAssessment
CREATE TABLE SmokingAssessment (
    AssessmentID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    CigarettesPerDay INT,
    YearsSmoking INT,
    BrandPreference VARCHAR(100),
    DailySpending DECIMAL(10,2),
    Triggers TEXT,
    PreferredSmokingTimes TEXT,
    QuitAttemptHistory TEXT,
    AssessmentDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

-- Bảng DailyProgress
CREATE TABLE DailyProgress (
    LogID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    [Date] DATE NOT NULL,
    CigarettesSmoked INT,
    CravingIntensity INT,
    Mood VARCHAR(50),
    Triggers TEXT,
    CopingStrategies TEXT,
    IsSmokeFreeDay BIT,
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

-- Bảng QuitPlan
CREATE TABLE QuitPlan (
    PlanID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    TargetQuitDate DATE,
    MotivationReason TEXT,
    PreviousQuitAttempts TEXT,
    Method VARCHAR(50),
    DailyGoals TEXT,
    WeeklyMilestones TEXT,
    Timeline TEXT,
    LastAdjustedDate DATETIME,
    Status VARCHAR(20),
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

-- Bảng Notification
CREATE TABLE Notification (
    NotificationID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    Type VARCHAR(50),
    Message TEXT,
    ScheduledTime DATETIME,
    DeliveryMethod VARCHAR(50),
    Status VARCHAR(20),
    CreationDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

-- Bảng Achievement
CREATE TABLE Achievement (
    AchievementID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    AchievementType VARCHAR(50),
    Milestone VARCHAR(255),
    EarnedDate DATETIME DEFAULT GETDATE(),
    IsPublic BIT,
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

-- Bảng ForumPost
CREATE TABLE ForumPost (
    PostID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    Title VARCHAR(255),
    Content TEXT,
    Category VARCHAR(50),
    CreationDate DATETIME DEFAULT GETDATE(),
    LastUpdated DATETIME,
    Status VARCHAR(20),
    ReputationScore INT,
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

-- Bảng SuccessStory
CREATE TABLE SuccessStory (
    StoryID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    Title VARCHAR(255),
    Content TEXT,
    Media VARCHAR(500),
    PrivacySettings VARCHAR(20),
    PublicationDate DATETIME DEFAULT GETDATE(),
    Status VARCHAR(20),
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

-- Bảng CoachingSession
CREATE TABLE CoachingSession (
    SessionID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    CoachID INT NOT NULL,
    ScheduledTime DATETIME,
    ActualStartTime DATETIME,
    ActualEndTime DATETIME,
    Status VARCHAR(20),
    RecordingURL VARCHAR(500),
    Notes TEXT,
    Feedback TEXT,
    FOREIGN KEY (UserID) REFERENCES [User](UserID),
    FOREIGN KEY (CoachID) REFERENCES Coach(CoachID)
);

-- Bảng AnalyticsData
CREATE TABLE AnalyticsData (
    AnalyticsID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    DateRange VARCHAR(50),
    ProgressData TEXT,
    GoalsStatus TEXT,
    Recommendations TEXT,
    BenchmarkData TEXT,
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

USE SmokeFreeDB;
GO

-- Xóa dữ liệu cũ (nếu có) để đảm bảo dữ liệu demo sạch
DELETE FROM AnalyticsData;
DELETE FROM CoachingSession;
DELETE FROM SuccessStory;
DELETE FROM ForumPost;
DELETE FROM Achievement;
DELETE FROM Notification;
DELETE FROM QuitPlan;
DELETE FROM DailyProgress;
DELETE FROM SmokingAssessment;
DELETE FROM UserContent;
DELETE FROM Content;
DELETE FROM Admin;
DELETE FROM Coach;
DELETE FROM [User];
GO

-- 1. Chèn dữ liệu vào bảng Admin
INSERT INTO Admin (FullName, Email, Password, Role)
VALUES 
    ('Nguyễn Văn Admin', 'admin1@smokefree.com', 'hashed_password_1', 'SuperAdmin'),
    ('Trần Thị Quản Lý', 'admin2@smokefree.com', 'hashed_password_2', 'ContentManager');
GO

-- 2. Chèn dữ liệu vào bảng User
INSERT INTO [User] (Email, Password, FullName, DateOfBirth, PhoneNumber, AccountStatus, RegistrationDate, LastLoginDate, SessionToken, Streak)
VALUES 
    ('nguyen.van.a@gmail.com', 'hashed_password_user1', 'Nguyễn Văn A', '1990-05-15', '0905123456', 'active', '2025-05-01 10:00:00', '2025-05-30 08:00:00', 'token_user1_123', 5),
    ('tran.thi.b@gmail.com', 'hashed_password_user2', 'Trần Thị B', '1985-08-20', '0916234567', 'active', '2025-05-05 12:00:00', '2025-05-29 09:00:00', 'token_user2_456', 10),
    ('le.hoang.c@gmail.com', 'hashed_password_user3', 'Lê Hoàng C', '1995-03-10', '0927345678', 'pending verification', '2025-05-10 14:00:00', NULL, NULL, 0);
GO

-- 3. Chèn dữ liệu vào bảng Coach
INSERT INTO Coach (FullName, Email, PhoneNumber, Specialization, Language, AvailabilitySchedule, SuccessRate, Credentials)
VALUES 
    ('Phạm Minh D', 'coach1@smokefree.com', '0938456789', 'Smoking Cessation Counseling', 'Vietnamese, English', 'Mon-Fri: 9AM-5PM', 0.85, 'Certified Health Coach, 5 years experience'),
    ('Hoàng Thị E', 'coach2@smokefree.com', '0949567890', 'Behavioral Therapy', 'Vietnamese', 'Tue-Sat: 10AM-6PM', 0.90, 'PhD in Psychology');
GO

-- 4. Chèn dữ liệu vào bảng Content
INSERT INTO Content (Title, Type, Category, Language, URL, Status, CreatedByAdminID, CreationDate, LastUpdated, Keywords)
VALUES 
    ('Hiểu Biết Tác Hại của Thuốc Lá', 'Article', 'Education', 'Vietnamese', 'https://smokefree.com/content/hieu-biet-thuoc-la', 'approved', 1, '2025-05-01 09:00:00', '2025-05-02 10:00:00', 'thuốc lá, tác hại, sức khỏe'),
    ('Video Hướng Dẫn Thiền Giảm Căng Thẳng', 'Video', 'Relaxation', 'Vietnamese', 'https://smokefree.com/content/thien-giam-cang-thang', 'approved', 2, '2025-05-03 11:00:00', NULL, 'thiền, căng thẳng, cai thuốc'),
    ('Bài Tập Thở Để Cai Thuốc', 'Exercise', 'Techniques', 'Vietnamese', 'https://smokefree.com/content/bai-tap-tho', 'pending', 1, '2025-05-05 13:00:00', NULL, 'thở, cai thuốc, kỹ thuật');
GO

-- 5. Chèn dữ liệu vào bảng UserContent (Nội dung yêu thích của người dùng)
INSERT INTO UserContent (UserID, ContentID, SavedDate)
VALUES 
    (1, 1, '2025-05-02 15:00:00'),
    (1, 2, '2025-05-04 16:00:00'),
    (2, 2, '2025-05-05 17:00:00');
GO

-- 6. Chèn dữ liệu vào bảng SmokingAssessment
INSERT INTO SmokingAssessment (UserID, CigarettesPerDay, YearsSmoking, BrandPreference, DailySpending, Triggers, PreferredSmokingTimes, QuitAttemptHistory, AssessmentDate)
VALUES 
    (1, 10, 5, 'Vinataba', 50000.00, 'Stress, social gatherings', 'Morning, after meals', 'Tried quitting twice, relapsed after 1 month', '2025-05-01 10:30:00'),
    (2, 15, 10, 'Marlboro', 70000.00, 'Work breaks, alcohol', 'Evening, night', 'One attempt, lasted 2 weeks', '2025-05-05 11:00:00');
GO

-- 7. Chèn dữ liệu vào bảng DailyProgress
INSERT INTO DailyProgress (UserID, [Date], CigarettesSmoked, CravingIntensity, Mood, Triggers, CopingStrategies, IsSmokeFreeDay)
VALUES 
    (1, '2025-05-28', 5, 7, 'Anxious', 'Work stress', 'Deep breathing', 0),
    (1, '2025-05-29', 3, 5, 'Calm', 'Coffee break', 'Chewing gum', 0),
    (1, '2025-05-30', 0, 3, 'Happy', 'None', 'Meditation', 1),
    (2, '2025-05-29', 8, 8, 'Stressed', 'Meeting', 'Listening to music', 0),
    (2, '2025-05-30', 6, 6, 'Neutral', 'Socializing', 'Drinking water', 0);
GO

-- 8. Chèn dữ liệu vào bảng QuitPlan
INSERT INTO QuitPlan (UserID, TargetQuitDate, MotivationReason, PreviousQuitAttempts, Method, DailyGoals, WeeklyMilestones, Timeline, LastAdjustedDate, Status)
VALUES 
    (1, '2025-06-15', 'Improve health for family', 'Two attempts, relapsed due to stress', 'Cold turkey', 'Reduce to 5 cigarettes/day', '1 smoke-free day/week', 'Week 1: Reduce smoking; Week 2: Set quit date', '2025-05-10 14:00:00', 'active'),
    (2, '2025-07-01', 'Save money and better fitness', 'One attempt, lacked support', 'Nicotine patch', 'Limit smoking to evenings', '2 smoke-free days/week', 'Week 1-2: Use patches; Week 3: Quit', '2025-05-12 15:00:00', 'active');
GO

-- 9. Chèn dữ liệu vào bảng Notification
INSERT INTO Notification (UserID, Type, Message, ScheduledTime, DeliveryMethod, Status, CreationDate)
VALUES 
    (1, 'Reminder', 'Đừng quên ghi nhật ký tiến độ hôm nay!', '2025-05-31 18:00:00', 'Push', 'pending', '2025-05-30 09:00:00'),
    (2, 'Motivation', 'Bạn đã đạt 2 ngày không hút thuốc! Tiếp tục nhé!', '2025-05-30 08:00:00', 'Email', 'sent', '2025-05-29 10:00:00');
GO

-- 10. Chèn dữ liệu vào bảng Achievement
INSERT INTO Achievement (UserID, AchievementType, Milestone, EarnedDate, IsPublic)
VALUES 
    (1, 'Milestone', '5 Smoke-Free Days', '2025-05-30 12:00:00', 1),
    (2, 'Badge', 'First Week Progress', '2025-05-29 13:00:00', 0);
GO

-- 11. Chèn dữ liệu vào bảng ForumPost
INSERT INTO ForumPost (UserID, Title, Content, Category, CreationDate, LastUpdated, Status, ReputationScore)
VALUES 
    (1, 'Cách tôi giảm hút thuốc', 'Chia sẻ kinh nghiệm dùng kẹo cao su để giảm thèm thuốc...', 'Tips', '2025-05-28 16:00:00', '2025-05-29 10:00:00', 'active', 10),
    (2, 'Cần hỗ trợ khi căng thẳng', 'Mọi người làm thế nào để không hút thuốc khi stress?', 'Support', '2025-05-29 17:00:00', NULL, 'active', 5);
GO

-- 12. Chèn dữ liệu vào bảng SuccessStory
INSERT INTO SuccessStory (UserID, Title, Content, Media, PrivacySettings, PublicationDate, Status)
VALUES 
    (1, 'Hành trình 1 tháng không thuốc lá', 'Tôi đã vượt qua thèm thuốc bằng thiền và hỗ trợ từ coach...', 'https://smokefree.com/media/story1.jpg', 'public', '2025-05-30 11:00:00', 'approved');
GO

-- 13. Chèn dữ liệu vào bảng CoachingSession
INSERT INTO CoachingSession (UserID, CoachID, ScheduledTime, ActualStartTime, ActualEndTime, Status, RecordingURL, Notes, Feedback)
VALUES 
    (1, 1, '2025-05-30 14:00:00', '2025-05-30 14:05:00', '2025-05-30 14:45:00', 'completed', 'https://smokefree.com/recording/session1', 'Discussed stress triggers', 'Very helpful session'),
    (2, 2, '2025-06-01 10:00:00', NULL, NULL, 'scheduled', NULL, 'Focus on nicotine patch usage', NULL);
GO

-- 14. Chèn dữ liệu vào bảng AnalyticsData
INSERT INTO AnalyticsData (UserID, DateRange, ProgressData, GoalsStatus, Recommendations, BenchmarkData)
VALUES 
    (1, '2025-05-01 to 2025-05-30', 'Reduced from 10 to 3 cigarettes/day', 'On track: 5 smoke-free days', 'Continue meditation; join support group', 'Average user: 7 cigarettes/day'),
    (2, '2025-05-05 to 2025-05-30', 'Reduced from 15 to 6 cigarettes/day', 'Behind: 2 smoke-free days', 'Increase coaching sessions', 'Average user: 7 cigarettes/day');
GO

-- Xác minh dữ liệu đã chèn
SELECT 'Admin' AS TableName, COUNT(*) AS RecordCount FROM Admin
UNION ALL
SELECT 'User', COUNT(*) FROM [User]
UNION ALL
SELECT 'Coach', COUNT(*) FROM Coach
UNION ALL
SELECT 'Content', COUNT(*) FROM Content
UNION ALL
SELECT 'UserContent', COUNT(*) FROM UserContent
UNION ALL
SELECT 'SmokingAssessment', COUNT(*) FROM SmokingAssessment
UNION ALL
SELECT 'DailyProgress', COUNT(*) FROM DailyProgress
UNION ALL
SELECT 'QuitPlan', COUNT(*) FROM QuitPlan
UNION ALL
SELECT 'Notification', COUNT(*) FROM Notification
UNION ALL
SELECT 'Achievement', COUNT(*) FROM Achievement
UNION ALL
SELECT 'ForumPost', COUNT(*) FROM ForumPost
UNION ALL
SELECT 'SuccessStory', COUNT(*) FROM SuccessStory
UNION ALL
SELECT 'CoachingSession', COUNT(*) FROM CoachingSession
UNION ALL
SELECT 'AnalyticsData', COUNT(*) FROM AnalyticsData;
GO