// src/components/common/Navbar/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameContext } from '../../../context/GameContext';

const Navbar = () => {
  const location = useLocation();
  const { totalXP, currentLevel, unlockedZones, getProgressPercentage } = useGameContext();
  
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠', zone: 'home' },
    { path: '/about', label: 'About', icon: '👨‍💻', zone: 'about' },
    { path: '/skills', label: 'Skills', icon: '🛡️', zone: 'skills' },
    { path: '/projects', label: 'Projects', icon: '📦', zone: 'projects' },
    { path: '/contact', label: 'Contact', icon: '📬', zone: 'contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-dark/90 backdrop-blur-sm border-b border-primary/30">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Navigation Links */}
          <div className="flex space-x-6">
            {navItems.map((item) => {
              const isUnlocked = unlockedZones.includes(item.zone);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-accent text-dark'
                      : isUnlocked 
                        ? 'text-softText hover:text-accent'
                        : 'text-softText/50 cursor-not-allowed'
                  }`}
                  onClick={(e) => !isUnlocked && e.preventDefault()}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                  {!isUnlocked && <span className="ml-1">🔒</span>}
                </Link>
              );
            })}
          </div>

          {/* 🎯 XP Display - This is what you're missing! */}
          <div className="flex items-center space-x-4">
            {/* Level Badge */}
            <div className="bg-accent text-dark px-3 py-1 rounded-full text-sm font-bold">
              Level {currentLevel}
            </div>
            
            {/* XP Bar */}
            <div className="flex items-center space-x-2">
              <span className="text-softText text-sm font-medium">XP:</span>
              <div className="w-24 h-2 bg-subtleGray rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: `${((totalXP % 1000) / 1000) * 100}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((totalXP % 1000) / 1000) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <span className="text-accent text-sm font-bold">
                {totalXP.toLocaleString()}
              </span>
            </div>
            
            {/* Progress Percentage */}
            <div className="text-highlight text-sm">
              {getProgressPercentage()}% Complete
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
