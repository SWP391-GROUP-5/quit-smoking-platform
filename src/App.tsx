import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import QuitPlan from './pages/QuitPlan'
import Feedback from './pages/Feedback'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plan" element={<QuitPlan />} />
            <Route path="/feedback" element={<Feedback />} />
            {/* Additional routes would be added here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
