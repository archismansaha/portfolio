// src/components/ui/QuestCard/QuestCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuestCard = ({ quest, isCompleted, onClick, getDifficultyBadge }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer h-80"
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Main Card */}
      <div className={`
        h-full bg-gradient-to-br ${quest.bgColor} rounded-2xl border-2 ${quest.borderColor} 
        shadow-2xl p-6 transition-all duration-300 relative overflow-hidden
        ${isCompleted ? 'opacity-100' : 'opacity-70'}
      `}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3)_0%,transparent_50%)]"></div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          {quest.status === 'Completed' ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
            >
              ✓
            </motion.div>
          ) : (
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg animate-pulse">
              ⏳
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-4xl">{quest.icon}</div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyBadge(quest.difficulty)}`}>
                {quest.difficulty}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 font-serif leading-tight">
              {quest.title}
            </h3>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-cyan-300 font-medium">{quest.role}</span>
              <span className="text-gray-300">{quest.duration}</span>
            </div>
          </div>

          {/* Problem Preview */}
          <div className="flex-1 mb-4">
            <div className="bg-black/30 rounded-lg p-3 h-full">
              <h4 className="text-yellow-400 font-bold text-sm mb-2">🎯 Mission:</h4>
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                {quest.problem}
              </p>
            </div>
          </div>

          {/* Tech Stack Preview */}
          <div className="mb-4">
            <h4 className="text-cyan-400 font-bold text-sm mb-2">⚔️ Arsenal:</h4>
            <div className="flex flex-wrap gap-1">
              {quest.techStack.slice(0, 4).map((tech, idx) => (
                <span
                  key={tech.name}
                  className={`${tech.color} text-white text-xs px-2 py-1 rounded-full font-medium`}
                >
                  {tech.name}
                </span>
              ))}
              {quest.techStack.length > 4 && (
                <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                  +{quest.techStack.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-3 border-t border-white/20">
            <div className="text-green-400 font-bold text-sm">
              {quest.reward}
            </div>
            <div className="text-purple-300 text-sm font-medium">
              {isHovered ? 'Click to view details →' : quest.questType}
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: [
                `0 0 20px ${quest.borderColor.includes('green') ? 'rgba(34, 197, 94, 0.3)' :
                           quest.borderColor.includes('purple') ? 'rgba(147, 51, 234, 0.3)' :
                           quest.borderColor.includes('orange') ? 'rgba(234, 88, 12, 0.3)' :
                           'rgba(59, 130, 246, 0.3)'}`,
                `0 0 40px ${quest.borderColor.includes('green') ? 'rgba(34, 197, 94, 0.5)' :
                           quest.borderColor.includes('purple') ? 'rgba(147, 51, 234, 0.5)' :
                           quest.borderColor.includes('orange') ? 'rgba(234, 88, 12, 0.5)' :
                           'rgba(59, 130, 246, 0.5)'}`,
                `0 0 20px ${quest.borderColor.includes('green') ? 'rgba(34, 197, 94, 0.3)' :
                           quest.borderColor.includes('purple') ? 'rgba(147, 51, 234, 0.3)' :
                           quest.borderColor.includes('orange') ? 'rgba(234, 88, 12, 0.3)' :
                           'rgba(59, 130, 246, 0.3)'}`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Completion Sparkles */}
        {quest.status === 'Completed' && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                animate={{
                  y: [-10, -30, -10],
                  x: [0, Math.sin(i * 2) * 15, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
                style={{
                  left: `${30 + i * 20}%`,
                  top: '20%'
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default QuestCard;
