// src/components/ui/ProgressDashboard/ProgressDashboard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameContext } from '../../../context/GameContext';

const ProgressDashboard = () => {
  const {
    totalXP,
    currentLevel,
    unlockedZones,
    visitedPages,
    unlockedSkills,
    completedPuzzles,
    unlockedAnime,
    getProgressPercentage,
    resetProgress,
    zoneRequirements
  } = useGameContext();
  
  const [showDetails, setShowDetails] = useState(false);

  const stats = [
    { label: 'Total XP', value: totalXP.toLocaleString(), icon: '⭐', color: 'text-yellow-400' },
    { label: 'Current Level', value: currentLevel, icon: '🏆', color: 'text-orange-400' },
    { label: 'Zones Unlocked', value: `${unlockedZones.length}/${Object.keys(zoneRequirements).length}`, icon: '🌍', color: 'text-green-400' },
    { label: 'Pages Visited', value: visitedPages.length, icon: '👁️', color: 'text-blue-400' },
    { label: 'Skills Unlocked', value: unlockedSkills.length, icon: '🛡️', color: 'text-purple-400' },
    { label: 'Puzzles Solved', value: completedPuzzles.length, icon: '🧩', color: 'text-pink-400' },
    { label: 'Anime Unlocked', value: unlockedAnime.length, icon: '🎌', color: 'text-red-400' },
    { label: 'Progress', value: `${getProgressPercentage()}%`, icon: '📊', color: 'text-cyan-400' }
  ];

  return (
    <div className="fixed top-4 left-4 z-40">
      <motion.button
        onClick={() => setShowDetails(!showDetails)}
        className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg px-3 py-2 text-white hover:bg-black/70 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold">Level {currentLevel}</span>
          <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              style={{ width: `${((totalXP % 1000) / 1000) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${((totalXP % 1000) / 1000) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs text-gray-300">{totalXP} XP</span>
        </div>
      </motion.button>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="mt-2 bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 min-w-[300px]"
          >
            <h3 className="text-white font-bold mb-4 text-center">Progress Dashboard</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-800/50 rounded-lg p-2 text-center"
                >
                  <div className={`text-lg ${stat.color}`}>{stat.icon}</div>
                  <div className="text-white text-sm font-bold">{stat.value}</div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Zone Status */}
            <div className="mb-4">
              <h4 className="text-purple-300 font-bold text-sm mb-2">Zone Status</h4>
              <div className="space-y-1">
                {Object.entries(zoneRequirements).map(([zone, req]) => {
                  const isUnlocked = unlockedZones.includes(zone);
                  return (
                    <div key={zone} className="flex justify-between items-center text-xs">
                      <span className={`capitalize ${isUnlocked ? 'text-green-400' : 'text-gray-500'}`}>
                        {isUnlocked ? '🔓' : '🔒'} {zone.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-gray-400">
                        {req.level}lvl • {req.xp}xp
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reset Button (for development) */}
            {process.env.NODE_ENV === 'development' && (
              <motion.button
                onClick={() => {
                  if (window.confirm('Reset all progress? This cannot be undone!')) {
                    resetProgress();
                  }
                }}
                className="w-full bg-red-600/20 border border-red-500/30 text-red-400 py-2 rounded-lg text-xs hover:bg-red-600/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🔄 Reset Progress (Dev Only)
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgressDashboard;
