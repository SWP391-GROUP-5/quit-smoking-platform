import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/authen-button/Navbar'
import Footer from './components/authen-button/Footer'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import QuitPlan from './pages/quit-plan'
import Profile from './pages/profile'
import Feedback from './pages/feedback'
import Login from './pages/login'
import Register from './pages/register'
import Blog from './pages/blog'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Navbar />
      <ScrollToTop />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quit-plan" element={<QuitPlan />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Blog />} />
          {/* Additional routes would be added here */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App