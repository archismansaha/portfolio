import React from 'react';
import { motion } from 'framer-motion';

const XPProgress = ({ 
  currentXP = 0, 
  maxXP = 100, 
  level = 1, 
  showToggle = false, 
  onToggle 
}) => {
  const progressPercentage = Math.min((currentXP / maxXP) * 100, 100);

  return (
    <motion.div 
      className="bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-sm p-3 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <span className="text-yellow-400 font-bold text-sm">Level {level}</span>
          
          <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full"
              style={{ width: `${progressPercentage}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <span className="text-white text-sm">{currentXP}/{maxXP} XP</span>
        </div>
        
        {showToggle && (
          <button
            onClick={onToggle}
            className="ml-4 text-white/70 hover:text-white text-xs"
          >
            Hide
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default XPProgress;
