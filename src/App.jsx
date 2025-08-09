// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameProvider, useGameContext } from './context/GameContext';

// Components
import Navbar from './components/common/Navbar';
import ProgressDashboard from './components/ui/ProgressDashboard';

// Pages
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import GymArena from './pages/GymArena';
import Animeverse from './pages/Animeverse';
import Shaayari from './pages/Shaayari';
import SecretCrush from './pages/SecretCrush';
import InstagramUnlock from './pages/InstagramUnlock';
import Contact from './pages/Contact';
import HarryPotterFan from './pages/HarryPotter/HarryPotterFan';

// Protected Route Component
const ProtectedRoute = ({ children, zoneName }) => {
  const { isZoneUnlocked } = useGameContext();
  
  if (!isZoneUnlocked(zoneName)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30"
        >
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-3xl font-bold text-red-400 mb-4">Zone Locked</h2>
          <p className="text-gray-300 mb-6">
            You need more XP to unlock this area. Keep exploring!
          </p>
          <motion.button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>
    );
  }
  
  return children;
};

const AppContent = () => {
  const { visitPage } = useGameContext();
  
  const handlePageLoad = (pageName) => {
    visitPage(pageName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900">
      <ProgressDashboard />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home onPageLoad={() => handlePageLoad('home')} />} />
        <Route path="/about" element={
          <ProtectedRoute zoneName="about">
            <AboutMe onPageLoad={() => handlePageLoad('about')} />
          </ProtectedRoute>
        } />
        <Route path="/experience" element={
          <ProtectedRoute zoneName="experience">
            <Experience onPageLoad={() => handlePageLoad('experience')} />
          </ProtectedRoute>
        } />
        <Route path="/skills" element={
          <ProtectedRoute zoneName="skills">
            <Skills onPageLoad={() => handlePageLoad('skills')} />
          </ProtectedRoute>
        } />
        <Route path="/projects" element={
          <ProtectedRoute zoneName="projects">
            <Projects onPageLoad={() => handlePageLoad('projects')} />
          </ProtectedRoute>
        } />
        <Route path="/gym" element={
          <ProtectedRoute zoneName="gym">
            <GymArena onPageLoad={() => handlePageLoad('gym')} />
          </ProtectedRoute>
        } />
        <Route path="/animeverse" element={
          <ProtectedRoute zoneName="animeverse">
            <Animeverse onPageLoad={() => handlePageLoad('animeverse')} />
          </ProtectedRoute>
        } />
        <Route path="/shaayari" element={
          <ProtectedRoute zoneName="shaayari">
            <Shaayari onPageLoad={() => handlePageLoad('shaayari')} />
          </ProtectedRoute>
        } />
        <Route path="/secret-crush" element={
          <ProtectedRoute zoneName="secretcrush">
            <SecretCrush onPageLoad={() => handlePageLoad('secretcrush')} />
          </ProtectedRoute>
        } />
        <Route path="/instagram" element={
          <ProtectedRoute zoneName="instagramunlock">
            <InstagramUnlock onPageLoad={() => handlePageLoad('instagramunlock')} />
          </ProtectedRoute>
        } />
        <Route path="/contact" element={
          <ProtectedRoute zoneName="contact">
            <Contact onPageLoad={() => handlePageLoad('contact')} />
          </ProtectedRoute>
        } />

          <Route path="/harry-potter" element={
        
            <HarryPotterFan  />
        
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <Router>
        <AppContent />
      </Router>
    </GameProvider>
  );
}

export default App;
