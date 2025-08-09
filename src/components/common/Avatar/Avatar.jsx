import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameContext } from '../../../context/GameContext';

const Avatar = ({ 
  currentLevel = 1, 
  currentXP = 0, 
  visitedPages = [], 
  mood = "helpful", 
  messages = [] 
}) => {
  const [currentMessage, setCurrentMessage] = useState(null);
  const [showDialogue, setShowDialogue] = useState(false);
  const [avatarState, setAvatarState] = useState('idle');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // 🎯 Key UX improvements: Control popup behavior
  const [lastPopupTime, setLastPopupTime] = useState(0);
  const [userDismissedCount, setUserDismissedCount] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const cooldownTimeRef = useRef(30000); // 30 seconds cooldown
  const hoverTimeoutRef = useRef(null);
  const messageTimeoutRef = useRef(null);

  const { totalXP, getProgressPercentage } = useGameContext();

  // 🎨 Enhanced avatar appearance based on level and XP
  const getAvatarAppearance = useCallback(() => {
    if (currentLevel >= 20) return {
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      glow: 'shadow-yellow-400/50',
      ring: 'ring-4 ring-yellow-400/30',
      icon: '👑',
      title: 'Legendary'
    };
    if (currentLevel >= 15) return {
      gradient: 'from-purple-500 to-pink-500',
      glow: 'shadow-purple-400/50', 
      ring: 'ring-4 ring-purple-400/30',
      icon: '⚡',
      title: 'Elite'
    };
    if (currentLevel >= 10) return {
      gradient: 'from-blue-500 to-cyan-500',
      glow: 'shadow-blue-400/50',
      ring: 'ring-4 ring-blue-400/30', 
      icon: '🦾',
      title: 'Advanced'
    };
    if (currentLevel >= 5) return {
      gradient: 'from-green-500 to-blue-500',
      glow: 'shadow-green-400/50',
      ring: 'ring-4 ring-green-400/30',
      icon: '🚀',
      title: 'Skilled'
    };
    return {
      gradient: 'from-primary to-highlight',
      glow: 'shadow-primary/50',
      ring: 'ring-2 ring-primary/30',
      icon: '👨‍💻',
      title: 'Beginner'
    };
  }, [currentLevel]);

  // 🎯 Smart popup control - prevents annoying repeated popups
  const shouldShowPopup = useCallback(() => {
    const now = Date.now();
    const timeSinceLastPopup = now - lastPopupTime;
    
    // Don't show if user dismissed multiple times recently
    if (userDismissedCount >= 3) return false;
    
    // Respect cooldown period
    if (timeSinceLastPopup < cooldownTimeRef.current) return false;
    
    // Show on first interaction or after cooldown
    return !hasUserInteracted || timeSinceLastPopup >= cooldownTimeRef.current;
  }, [lastPopupTime, userDismissedCount, hasUserInteracted]);

  // 🎭 Get contextual messages based on user progress
  const getContextualMessages = useCallback(() => {
    const baseMessages = messages.length > 0 ? messages : [
      "Thanks for exploring my portfolio! 🎮",
      "Your progress is being saved automatically! 💾",
      "Keep unlocking zones to learn more about me! 🔓"
    ];

    const levelMessages = {
      1: ["Welcome to my world! Let's start this journey! 🚀"],
      5: ["You're getting the hang of this! Keep exploring! 💪"],
      10: ["Impressive progress! You've unlocked advanced status! ⭐"],
      15: ["Elite explorer! You know me better than most! 👑"],
      20: ["Max level achieved! You're part of my inner circle! 💕"]
    };

    const progressMessages = [];
    if (totalXP >= 5000) progressMessages.push("Your dedication is legendary! 🏆");
    if (totalXP >= 2000) progressMessages.push("Wow, you're really committed to knowing me! 😍");
    if (visitedPages.length >= 5) progressMessages.push("You've explored so many areas! 🗺️");

    return [...(levelMessages[currentLevel] || []), ...progressMessages, ...baseMessages];
  }, [messages, currentLevel, totalXP, visitedPages]);

  // 🎨 Handle mouse enter with smart popup logic
  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Only show popup if conditions are met
    if (shouldShowPopup() && !showDialogue && !isMinimized) {
      hoverTimeoutRef.current = setTimeout(() => {
        const contextualMessages = getContextualMessages();
        setCurrentMessage(contextualMessages[messageIndex % contextualMessages.length]);
        setShowDialogue(true);
        setAvatarState('talking');
        setLastPopupTime(Date.now());
        setHasUserInteracted(true);

        // Auto-hide after 4 seconds
        messageTimeoutRef.current = setTimeout(() => {
          setShowDialogue(false);
          setAvatarState('idle');
        }, 4000);
      }, 800); // Small delay to prevent accidental triggers
    }
  }, [shouldShowPopup, showDialogue, isMinimized, getContextualMessages, messageIndex]);

  // 🎯 Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  // 🎮 Handle direct avatar click
  const handleAvatarClick = useCallback(() => {
    if (isMinimized) {
      setIsMinimized(false);
      return;
    }

    const contextualMessages = getContextualMessages();
    setCurrentMessage(contextualMessages[messageIndex % contextualMessages.length]);
    setShowDialogue(!showDialogue);
    setAvatarState(showDialogue ? 'idle' : 'talking');
    setMessageIndex(prev => prev + 1);
    setHasUserInteracted(true);
  }, [isMinimized, getContextualMessages, messageIndex, showDialogue]);

  // 🚫 Handle user dismissal
  const handleDismiss = useCallback(() => {
    setShowDialogue(false);
    setAvatarState('idle');
    setUserDismissedCount(prev => prev + 1);
    
    // Increase cooldown time after dismissals
    cooldownTimeRef.current = Math.min(cooldownTimeRef.current * 1.5, 300000); // Max 5 minutes
  }, []);

  // 🔄 Cleanup timeouts
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    };
  }, []);

  const appearance = getAvatarAppearance();

  if (isMinimized) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <button
          onClick={handleAvatarClick}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-highlight shadow-lg border-2 border-accent flex items-center justify-center text-2xl"
        >
          💬
        </button>
      </motion.div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 💬 Enhanced Dialogue Box */}
      <AnimatePresence>
        {showDialogue && currentMessage && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-24 right-0 z-10 max-w-xs"
          >
            <div className={`relative bg-gradient-to-br ${appearance.gradient} text-white px-4 py-3 rounded-2xl shadow-xl border-2 border-white/20 backdrop-blur-sm`}>
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-1 right-2 text-white/70 hover:text-white text-lg leading-none"
                aria-label="Close message"
              >
                ×
              </button>
              
              <p className="text-sm leading-relaxed pr-6 mb-2">
                {currentMessage}
              </p>
              
              {/* Progress info */}
              <div className="text-xs text-white/80 border-t border-white/20 pt-2">
                <div className="flex justify-between">
                  <span>Level {currentLevel}</span>
                  <span>{totalXP.toLocaleString()} XP</span>
                </div>
                <div className="text-center mt-1">
                  {getProgressPercentage()}% Portfolio Explored
                </div>
              </div>
              
              {/* Speech bubble tail */}
              <div className="absolute bottom-0 right-6 transform translate-y-full">
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-white/90" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎨 Enhanced Avatar Container */}
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleAvatarClick}
        className="relative cursor-pointer"
        animate={avatarState === 'idle' ? {
          y: [0, -8, 0],
          rotate: [0, 2, -2, 0],
          scale: 1
        } : {
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: avatarState === 'idle' ? 4 : 0.6,
          repeat: avatarState === 'idle' ? Infinity : 3,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Level badge */}
        <motion.div
          className="absolute -top-2 -left-2 bg-accent text-dark text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center z-10 border-2 border-white shadow-lg"
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

        {/* XP Progress Ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, ${appearance.gradient.includes('yellow') ? '#FFD166' : '#006D77'} ${((totalXP % 1000) / 1000) * 360}deg, transparent ${((totalXP % 1000) / 1000) * 360}deg)`
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Main Avatar Circle */}
        <motion.div
          className={`w-20 h-20 rounded-full bg-gradient-to-br ${appearance.gradient} ${appearance.ring} ${appearance.glow} shadow-2xl flex items-center justify-center text-3xl backdrop-blur-sm relative overflow-hidden border-4 border-white/20`}
        >
          {/* Animated Background Pattern */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Avatar Icon with animation */}
          <motion.span
            animate={{
              scale: avatarState === 'talking' ? [1, 1.2, 1] : 1,
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: avatarState === 'talking' ? 0.3 : 4,
              repeat: avatarState === 'talking' ? 2 : Infinity
            }}
            className="relative z-10"
          >
            {appearance.icon}
          </motion.span>

          {/* Interaction hint */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/50"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Mood indicator */}
        <motion.div
          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs"
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
        >
          {mood === 'flirty' ? '😏' : mood === 'deep' ? '🤔' : '😊'}
        </motion.div>

        {/* Minimize button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(true);
            setShowDialogue(false);
          }}
          className="absolute -top-1 -right-1 w-6 h-6 bg-subtleGray hover:bg-gray-500 text-white rounded-full flex items-center justify-center text-xs transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Minimize avatar"
        >
          −
        </button>

        {/* Progress particles for high levels */}
        {currentLevel > 10 && [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full opacity-80"
            animate={{
              y: [-15, -30, -15],
              x: [0, Math.sin(i * 2) * 15, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut"
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: '15%'
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Avatar;
