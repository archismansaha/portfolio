import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../context/GameContext';
import Avatar from '../../components/common/Avatar';

const Home = ({ onPageLoad }) => {
  const [showContent, setShowContent] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [showXPToast, setShowXPToast] = useState(false);
  const [lastXPGain, setLastXPGain] = useState(0);
  const [userInteractions, setUserInteractions] = useState(0);
  const [showSecretButton, setShowSecretButton] = useState(false);
  const navigate = useNavigate();
  
  const { visitPage, addXP, totalXP, currentLevel, unlockedZones } = useGameContext();

  // 🎭 Dynamic prompts that change every few seconds
  const prompts = [
    "Ready to explore my digital universe? 🌌",
    "Curious about the developer behind the code? 👨‍💻",
    "Want to see some epic projects and anime favorites? 🎌",
    "Interested in poetry that compiles feelings? 📝",
    "Ready to unlock the secrets of my portfolio? 🔓"
  ];

  // 🎯 Interactive XP activities with dynamic rewards
  const xpActivities = [
    { id: 'welcome', text: 'Welcome Explorer!', xp: 100, icon: '🎉' },
    { id: 'curiosity', text: 'Curious Mind', xp: 50, icon: '🧠' },
    { id: 'appreciation', text: 'Show Love', xp: 75, icon: '💕' },
    { id: 'exploration', text: 'Digital Explorer', xp: 60, icon: '🔍' },
    { id: 'passion', text: 'Passion Seeker', xp: 80, icon: '🔥' }
  ];

  useEffect(() => {
    if (onPageLoad) onPageLoad();
    
    // Initial XP for visiting
    visitPage('home');
    if (totalXP === 0) {
      handleXPGain(150, 'First Visit Bonus! Welcome to my world! 🎊');
    }
    
    setTimeout(() => setShowContent(true), 500);

    // Cycling prompts
    const promptInterval = setInterval(() => {
      setCurrentPrompt(prev => (prev + 1) % prompts.length);
    }, 3000);

    // Show secret button after some interactions
    if (userInteractions >= 3) {
      setShowSecretButton(true);
    }

    return () => clearInterval(promptInterval);
  }, [onPageLoad, visitPage, totalXP, userInteractions]);

  // 🎊 XP gain with visual feedback
  const handleXPGain = (xp, message) => {
    addXP(xp, message);
    setLastXPGain(xp);
    setShowXPToast(true);
    setUserInteractions(prev => prev + 1);
    
    setTimeout(() => setShowXPToast(false), 2000);
  };

  // 🚀 Enhanced quest start
  const handleBeginQuest = () => {
    handleXPGain(100, 'Quest Started! Adventure begins! 🗺️');
    
    // Check what zones are unlocked and navigate accordingly
    if (unlockedZones.includes('about')) {
      navigate('/about');
    } else {
      // Show encouragement to gain more XP
      setTimeout(() => {
        handleXPGain(25, 'Keep exploring to unlock new zones! 🔓');
      }, 1000);
    }
  };

  // 🎲 Random XP rewards
  const handleRandomReward = () => {
    const randomActivity = xpActivities[Math.floor(Math.random() * xpActivities.length)];
    handleXPGain(randomActivity.xp, `${randomActivity.icon} ${randomActivity.text}!`);
  };

  // 🎯 Responsive stats with interactions
  const statsData = [
    { 
      value: '2+', 
      label: 'Years Experience', 
      emoji: '⏰',
      xp: 40,
      message: 'Experience Appreciated! Time well spent! ⭐'
    },
    { 
      value: '15+', 
      label: 'Technologies', 
      emoji: '💻',
      xp: 50,
      message: 'Tech Stack Explored! Innovation unlocked! 🚀'
    },
    { 
      value: '∞', 
      label: 'Passion', 
      emoji: '💖',
      xp: 100,
      message: 'Passion Discovered! Infinite energy unlocked! 🔥'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark-teal flex items-center justify-center overflow-x-hidden relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/20"
            animate={{
              y: [-20, -60, -20],
              x: [0, Math.sin(i) * 50, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: window.innerWidth < 768 ? '1.5rem' : '2rem'
            }}
          >
            {['⚡', '💻', '🚀', '⭐', '🎯', '💫'][i % 6]}
          </motion.div>
        ))}
      </div>

      {/* XP Toast Notification */}
      <AnimatePresence>
        {showXPToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            className="fixed top-16 sm:top-20 right-2 sm:right-4 md:right-8 z-50 bg-accent text-dark px-3 sm:px-6 py-2 sm:py-3 rounded-xl shadow-glow font-bold text-sm sm:text-base"
          >
            +{lastXPGain} XP! 🎉
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8 max-w-4xl mx-auto w-full relative z-10 pt-16 sm:pt-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold bg-gradient-to-r from-accent via-highlight to-primary bg-clip-text text-transparent mb-2 sm:mb-3 lg:mb-4 leading-tight break-words">
            Archisman Saha
          </h1>
          
          <motion.div
            className="w-12 sm:w-20 lg:w-28 h-0.5 sm:h-1 bg-gradient-accent mx-auto rounded-full mb-3 sm:mb-4 lg:mb-6"
            initial={{ width: 0 }}
            animate={{ width: window.innerWidth < 640 ? 48 : window.innerWidth < 1024 ? 80 : 112 }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          {/* Dynamic Prompt */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPrompt}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-highlight font-poetry italic min-h-[1.2rem] sm:min-h-[1.5rem] px-2 break-words"
            >
              {prompts[currentPrompt]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="space-y-3 sm:space-y-4 lg:space-y-6"
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-softText/90 font-body px-2 break-words">
            Full-Stack Developer • Poet • Gym Enthusiast
          </p>
          
          <p className="text-sm sm:text-base md:text-lg text-highlight max-w-3xl mx-auto leading-relaxed px-4 break-words">
            Welcome to my digital realm where code meets poetry, and pixels dance with passion. 
            Ready to explore the depths of my world?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.8 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="space-y-3 sm:space-y-4"
        >
          <motion.button 
            onClick={handleBeginQuest}
            className="btn-primary text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 glow-animation whitespace-nowrap"
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Begin Quest 🚀
            </motion.span>
          </motion.button>
          
          <div className="text-softText/60 text-xs sm:text-sm font-poetry italic px-4 break-words">
            "Every great journey begins with a single click..."
          </div>
        </motion.div>

        {/* Interactive Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-sm sm:max-w-md lg:max-w-lg mx-auto mt-4 sm:mt-6 lg:mt-8"
        >
          {statsData.map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center cursor-pointer p-2 sm:p-3 lg:p-4 rounded-lg hover:bg-dark/20 transition-all duration-300 group"
              onClick={() => handleXPGain(stat.xp, stat.message)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2 group-hover:animate-bounce">
                {stat.emoji}
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-accent">{stat.value}</div>
              <div className="text-xs sm:text-sm text-highlight leading-tight">{stat.label}</div>
              <div className="text-xs text-accent/60 mt-1 sm:mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Click for +{stat.xp} XP
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Current Progress Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-4 sm:mt-6"
        >
          <div className="bg-dark/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-accent/30 max-w-xs sm:max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="text-accent font-bold text-lg sm:text-xl">Level {currentLevel}</span>
              <span className="text-highlight font-bold text-lg sm:text-xl">{totalXP.toLocaleString()} XP</span>
            </div>
            <div className="w-full h-2 sm:h-3 bg-subtleGray rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                style={{ width: `${((totalXP % 1000) / 1000) * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${((totalXP % 1000) / 1000) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="text-softText/70 text-xs sm:text-sm mt-2 text-center">
              {1000 - (totalXP % 1000)} XP to next level
            </div>
          </div>
        </motion.div>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-6 px-4"
        >
          <motion.button
            onClick={() => handleXPGain(60, '🔍 Curiosity Rewarded!')}
            className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30 rounded-lg transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔍 Explore
          </motion.button>
          
          <motion.button
            onClick={() => handleXPGain(75, '💝 Love Appreciated!')}
            className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-highlight/20 hover:bg-highlight/40 text-highlight border border-highlight/30 rounded-lg transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💝 Love
          </motion.button>

          <motion.button
            onClick={handleRandomReward}
            className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-accent/20 hover:bg-accent/40 text-accent border border-accent/30 rounded-lg transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎲 Surprise
          </motion.button>

          {/* Secret Button */}
          <AnimatePresence>
            {showSecretButton && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-gradient-accent text-dark border border-accent rounded-lg transition-all duration-300 glow-animation text-sm sm:text-base"
                onClick={() => {
                  handleXPGain(200, '🎊 Secret Discovered! Bonus XP!');
                  navigate('/secret-crush');
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔮 Secret
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Motivational Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-6 sm:mt-8"
        >
          <p className="text-softText/70 italic text-xs sm:text-sm font-poetry px-4 break-words">
            "In the symphony of code and creativity, every interaction writes a new verse..." 🎵
          </p>
        </motion.div>
      </div>

      <Avatar
        currentLevel={currentLevel}
        currentXP={totalXP}
        visitedPages={['home']}
        mood="welcoming"
        messages={[
          `Welcome! You've earned ${totalXP} XP so far! Level ${currentLevel} achieved! 🌟`,
          "Every click brings magic to our connection! ✨",
          `${userInteractions} interactions and counting! You're awesome! 💫`,
          "Ready to unlock more zones? Keep exploring! 🚀"
        ]}
      />
    </div>
  );
};

export default Home;