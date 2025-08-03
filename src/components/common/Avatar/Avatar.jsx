// src/components/common/Avatar/Avatar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameContext } from '../../../context/GameContext';

const Avatar = ({ mood = "helpful", messages = [] }) => {
  const { totalXP, currentLevel, getProgressPercentage } = useGameContext();
  const [currentMessage, setCurrentMessage] = useState(null);
  const [showDialogue, setShowDialogue] = useState(false);
  const [avatarState, setAvatarState] = useState('idle');
  const [messageIndex, setMessageIndex] = useState(0);

  // Avatar evolution based on level and XP
  const getAvatarAppearance = () => {
    if (currentLevel >= 15) return 'legendary';
    if (currentLevel >= 10) return 'elite';
    if (currentLevel >= 5) return 'advanced';
    return 'beginner';
  };

  // Level-based personality messages
  const getLevelMessages = () => {
    const levelMessages = {
      1: ["Welcome to my world! Let's start this journey! 🚀"],
      5: ["You're getting the hang of this! Keep exploring! 💪"],
      10: ["Impressive progress! You've unlocked elite status! ⭐"],
      15: ["Legendary explorer! You know me better than most! 👑"],
      20: ["Max level achieved! You're part of my inner circle! 💕"]
    };

    // Return milestone message if just reached a new level milestone
    const milestones = [1, 5, 10, 15, 20];
    const milestone = milestones.find(m => currentLevel >= m);
    return milestone ? levelMessages[milestone] : [];
  };

  // XP-based reactions
  const getXPReactions = () => {
    if (totalXP >= 5000) return ["Your dedication is legendary! 🏆"];
    if (totalXP >= 3000) return ["Wow, you're really committed to knowing me! 😍"];
    if (totalXP >= 2000) return ["This much XP? You're definitely special! 💖"];
    if (totalXP >= 1000) return ["1000+ XP! We're becoming best friends! 🤝"];
    return ["Every point of XP brings us closer! 😊"];
  };

  // Combine all message types
  const getAllMessages = () => {
    const levelMsgs = getLevelMessages();
    const xpMsgs = getXPReactions();
    const defaultMsgs = messages.length > 0 ? messages : [
      "Thanks for exploring my portfolio! 🎮",
      "Your progress is being saved automatically! 💾",
      "Keep unlocking zones to learn more about me! 🔓"
    ];

    return [...levelMsgs, ...xpMsgs, ...defaultMsgs];
  };

  // Cycle through messages
  useEffect(() => {
    const allMessages = getAllMessages();
    
    const showMessage = () => {
      setCurrentMessage(allMessages[messageIndex % allMessages.length]);
      setShowDialogue(true);
      setAvatarState('talking');
      
      setTimeout(() => {
        setShowDialogue(false);
        setAvatarState('idle');
      }, 4000);
      
      setMessageIndex(prev => prev + 1);
    };

    const initialTimer = setTimeout(showMessage, 2000);
    const intervalTimer = setInterval(showMessage, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [mood, currentLevel, totalXP, messageIndex, messages]);

  // Avatar styling based on level
  const getAvatarStyles = () => {
    const appearance = getAvatarAppearance();
    
    const styles = {
      beginner: {
        bg: 'from-blue-400 to-purple-500',
        border: 'border-blue-300',
        glow: 'shadow-blue-400/50',
        icon: '👨‍💻'
      },
      advanced: {
        bg: 'from-purple-500 to-pink-500', 
        border: 'border-purple-300',
        glow: 'shadow-purple-400/50',
        icon: '🦾'
      },
      elite: {
        bg: 'from-pink-500 to-red-500',
        border: 'border-pink-300', 
        glow: 'shadow-pink-400/50',
        icon: '⚡'
      },
      legendary: {
        bg: 'from-yellow-400 via-orange-500 to-red-500',
        border: 'border-yellow-300',
        glow: 'shadow-yellow-400/50', 
        icon: '👑'
      }
    };

    return styles[appearance];
  };

  const avatarStyle = getAvatarStyles();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Dialogue Box */}
      <AnimatePresence>
        {showDialogue && currentMessage && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-2 z-10"
          >
            <div className={`
              relative max-w-xs bg-gradient-to-br ${avatarStyle.bg} text-white 
              px-4 py-3 rounded-2xl shadow-xl border-2 ${avatarStyle.border}
              backdrop-blur-sm
            `}>
              <button
                onClick={() => setShowDialogue(false)}
                className="absolute top-1 right-2 text-white/70 hover:text-white text-sm"
              >
                ×
              </button>
              
              <p className="text-sm leading-relaxed pr-4">
                {currentMessage}
              </p>
              
              {/* XP and Level Display */}
              <div className="text-xs text-white/80 mt-2 border-t border-white/20 pt-2">
                Level {currentLevel} • {totalXP} XP • {getProgressPercentage()}% Complete
              </div>
              
              {/* Speech Bubble Tail */}
              <div className={`
                absolute bottom-0 right-4 transform translate-y-full
                w-0 h-0 border-l-[12px] border-l-transparent
                border-r-[12px] border-r-transparent
                border-t-[12px]
              `} style={{ borderTopColor: avatarStyle.border.includes('blue') ? '#93c5fd' : 
                                            avatarStyle.border.includes('purple') ? '#c084fc' :
                                            avatarStyle.border.includes('pink') ? '#f9a8d4' : '#fde047' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar Container */}
      <motion.div
        animate={avatarState === 'idle' ? {
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0],
          scale: 1
        } : {
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: avatarState === 'idle' ? 3 : 0.6,
          repeat: avatarState === 'idle' ? Infinity : 3,
          ease: "easeInOut"
        }}
        className="relative cursor-pointer"
        onClick={() => setShowDialogue(!showDialogue)}
      >
        {/* Level Badge */}
        <motion.div
          className="absolute -top-2 -left-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center z-10 border-2 border-white"
          animate={{ 
            scale: currentLevel > 10 ? [1, 1.2, 1] : 1,
            rotate: currentLevel > 15 ? [0, 360] : 0
          }}
          transition={{ 
            duration: 2, 
            repeat: currentLevel > 10 ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {currentLevel}
        </motion.div>

        {/* XP Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            background: `conic-gradient(from 0deg, rgba(59, 130, 246, 0.8) ${(totalXP % 1000) / 10}%, transparent ${(totalXP % 1000) / 10}%)`
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Main Avatar */}
        <motion.div
          className={`
            w-16 h-16 rounded-full bg-gradient-to-br ${avatarStyle.bg}
            border-4 ${avatarStyle.border} ${avatarStyle.glow} shadow-2xl
            flex items-center justify-center text-2xl
            backdrop-blur-sm relative overflow-hidden
          `}
        >
          {/* Animated Background Pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 40%, rgba(119, 255, 198, 0.3) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Avatar Icon */}
          <motion.span
            animate={{
              scale: avatarState === 'talking' ? [1, 1.2, 1] : 1
            }}
            transition={{ duration: 0.3 }}
          >
            {avatarStyle.icon}
          </motion.span>
        </motion.div>

        {/* Progress Particles */}
        {currentLevel > 5 && [...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-80"
            animate={{
              y: [-20, -40, -20],
              x: [0, Math.sin(i * 2) * 10, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut"
            }}
            style={{
              left: `${20 + i * 20}%`,
              top: '10%'
            }}
          />
        ))}
      </motion.div>

      {/* Mood Indicator */}
      <motion.div
        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-lg"
        style={{
          backgroundColor: mood === 'flirty' ? '#ff69b4' : mood === 'deep' ? '#6366f1' : '#22c55e'
        }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default Avatar;
