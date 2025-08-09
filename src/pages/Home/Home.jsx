import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../context/GameContext';
import Avatar from '../../components/common/Avatar';
import WelcomeTutorial from './welcomeTutorial';


const Home = ({ onPageLoad }) => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [showXPToast, setShowXPToast] = useState(false);
  const [lastXPGain, setLastXPGain] = useState(0);
  const [userInteractions, setUserInteractions] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpData, setLevelUpData] = useState(null);
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);
  const promptIntervalRef = useRef(null);
  const navigate = useNavigate();
  
  const { 
    visitPage, 
    addXP, 
    totalXP, 
    currentLevel, 
    unlockedZones,
    isZoneUnlocked 
  } = useGameContext();

  // 🎯 Memoized data to prevent re-renders
  const specialUnlocks = useMemo(() => ({
    5: { zone: 'gym', title: 'Gym Arena', icon: '💪', description: 'Ready to see my fitness journey?' },
    8: { zone: 'animeverse', title: 'Animeverse', icon: '🎌', description: 'Want to explore my anime world?' },
    12: { zone: 'secretcrush', title: 'Secret Crush', icon: '💘', description: 'Ready for something special?' }
  }), []);

  const prompts = useMemo(() => [
    "Ready to explore my digital universe? 🌌",
    "Curious about the developer behind the code? 👨‍💻",
    "Want to see some epic projects and anime favorites? 🎌",
    "Interested in poetry that compiles feelings? 📝",
    "Ready to unlock the secrets of my portfolio? 🔓"
  ], []);

  useEffect(() => {
    const tutorialSeen = localStorage.getItem('hasSeenRPGTutorial');
    const firstVisit = totalXP === 0 && !tutorialSeen;
    
    if (firstVisit) {
      setShowTutorial(true);
    } else {
      setHasSeenTutorial(true);
    }

    if (onPageLoad) onPageLoad();
    visitPage('home');
  }, [onPageLoad, visitPage, totalXP]);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setHasSeenTutorial(true);
    localStorage.setItem('hasSeenRPGTutorial', 'true');
    addXP(150, '🎓 Tutorial completed! Welcome bonus!');
  };

  const handleTutorialSkip = () => {
    setShowTutorial(false);
    setHasSeenTutorial(true);
    localStorage.setItem('hasSeenRPGTutorial', 'true');
    addXP(50, 'Welcome to the adventure!');
  };

  const tutorialSteps = useMemo(() => [
    {
      title: "Welcome to My RPG Portfolio! 🎮",
      message: "This isn't just a portfolio - it's an interactive experience where you earn XP by exploring!",
      highlight: "Click on ANYTHING that looks interactive!"
    },
    {
      title: "Earn XP & Level Up! ⭐",
      message: "Every click, every interaction gives you XP. The more you explore, the more you unlock!",
      highlight: "Try clicking the stats below to earn your first XP!"
    },
    {
      title: "Unlock Secret Areas! 🔓",
      message: "At Level 5: Gym Arena 💪\nAt Level 8: Animeverse 🎌\nAt Level 12: Secret Crush 💘",
      highlight: "Each level unlocks exclusive content!"
    }
  ], []);

  const statsData = useMemo(() => [
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
  ], []);

  // 🎊 Optimized XP gain handler
  const handleXPGain = useCallback((xp, message) => {
    const oldLevel = currentLevel;
    addXP(xp, message);
    setLastXPGain(xp);
    setShowXPToast(true);
    setUserInteractions(prev => prev + 1);
    
    const toastTimer = setTimeout(() => setShowXPToast(false), 2000);

    // Check for level up
    const newLevel = Math.floor((totalXP + xp) / 1000) + 1;
    if (newLevel > oldLevel) {
      setTimeout(() => {
        setLevelUpData({ 
          level: newLevel, 
          title: `Level ${newLevel} Achieved!`,
          icon: '🎉',
          description: `You're getting stronger, explorer!`
        });
        setShowLevelUpModal(true);
      }, 1500);
    }

    return () => clearTimeout(toastTimer);
  }, [currentLevel, addXP, totalXP]);

  // 🔓 Check for special unlocks
  const checkForSpecialUnlocks = useCallback(() => {
    Object.entries(specialUnlocks).forEach(([level, unlock]) => {
      if (currentLevel >= parseInt(level) && !isZoneUnlocked(unlock.zone)) {
        setLevelUpData(unlock);
        setShowLevelUpModal(true);
      }
    });
  }, [currentLevel, specialUnlocks, isZoneUnlocked]);

  // 🎯 Tutorial handlers
  const nextTutorialStep = useCallback(() => {
    if (currentTutorialStep < tutorialSteps.length - 1) {
      setCurrentTutorialStep(prev => prev + 1);
    } else {
      setShowOnboarding(false);
      localStorage.setItem('hasSeenRPGTutorial', 'true');
      handleXPGain(100, '🎓 Tutorial completed! You\'re ready to explore!');
    }
  }, [currentTutorialStep, tutorialSteps.length, handleXPGain]);

  const skipTutorial = useCallback(() => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenRPGTutorial', 'true');
  }, []);

  // 🚀 Enhanced quest start
  const handleBeginQuest = useCallback(() => {
    handleXPGain(100, 'Quest Started! Adventure begins! 🗺️');
    
    if (isZoneUnlocked('about')) {
      navigate('/about');
    } else {
      setTimeout(() => {
        handleXPGain(25, 'Keep exploring to unlock new zones! 🔓');
      }, 1000);
    }
  }, [handleXPGain, isZoneUnlocked, navigate]);

  // 🎯 Navigate to special areas
  const navigateToSpecialArea = useCallback((zone) => {
    setShowLevelUpModal(false);
    navigate(`/${zone === 'secretcrush' ? 'secret-crush' : zone}`);
  }, [navigate]);

  // 🎲 Random XP rewards
  const handleRandomReward = useCallback(() => {
    const xpActivities = [
      { id: 'welcome', text: 'Welcome Explorer!', xp: 100, icon: '🎉' },
      { id: 'curiosity', text: 'Curious Mind', xp: 50, icon: '🧠' },
      { id: 'appreciation', text: 'Show Love', xp: 75, icon: '💕' },
      { id: 'exploration', text: 'Digital Explorer', xp: 60, icon: '🔍' },
      { id: 'passion', text: 'Passion Seeker', xp: 80, icon: '🔥' }
    ];
    const randomActivity = xpActivities[Math.floor(Math.random() * xpActivities.length)];
    handleXPGain(randomActivity.xp, `${randomActivity.icon} ${randomActivity.text}!`);
  }, [handleXPGain]);

  // 🎮 Optimized initialization
  useEffect(() => {
    if (onPageLoad) onPageLoad();
    
    const hasSeenTutorial = localStorage.getItem('hasSeenRPGTutorial');
    if (!hasSeenTutorial && totalXP === 0) {
      const timer = setTimeout(() => setShowOnboarding(true), 1500);
      return () => clearTimeout(timer);
    }
    
    visitPage('home');
    if (totalXP === 0) {
      handleXPGain(150, 'First Visit Bonus! Welcome to my world! 🎊');
    }
    
    const contentTimer = setTimeout(() => setShowContent(true), 500);
    checkForSpecialUnlocks();
    
    return () => clearTimeout(contentTimer);
  }, [onPageLoad, visitPage, totalXP, handleXPGain, checkForSpecialUnlocks]);

  // 🔄 Optimized prompt cycling
  useEffect(() => {
    promptIntervalRef.current = setInterval(() => {
      setCurrentPrompt(prev => (prev + 1) % prompts.length);
    }, 3000);

    return () => {
      if (promptIntervalRef.current) {
        clearInterval(promptIntervalRef.current);
      }
    };
  }, [prompts.length]);

  // 🎯 Memoized floating elements to prevent re-renders
  const FloatingElements = useMemo(() => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => ( // Reduced from 20 to 15 for performance
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
            fontSize: '2rem'
          }}
        >
          {['⚡', '💻', '🚀', '⭐', '🎯', '💫'][i % 6]}
        </motion.div>
      ))}
    </div>
  ), []);

  // 🎯 Next unlock calculation
  const nextUnlock = useMemo(() => {
    return Object.entries(specialUnlocks).find(([level]) => currentLevel < parseInt(level));
  }, [currentLevel, specialUnlocks]);

  return (
    <div className="min-h-screen bg-gradient-dark-teal flex items-center justify-center overflow-x-hidden relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
         <AnimatePresence>
        {showTutorial && (
          <WelcomeTutorial
            onComplete={handleTutorialComplete}
            onSkip={handleTutorialSkip}
          />
        )}
      </AnimatePresence>

      {/* Help button for returning users */}
      {hasSeenTutorial && (
        <motion.button
          onClick={() => setShowTutorial(true)}
          className="fixed top-4 left-4 bg-primary/80 hover:bg-primary text-softText p-3 rounded-full shadow-lg z-40 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-xl">❓</span>
        </motion.button>
      )} {/* 🎓 Tutorial Modal */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-primary to-highlight text-white rounded-2xl p-8 max-w-2xl w-full border-4 border-accent shadow-glow"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🎮</div>
                <h2 className="text-3xl font-heading font-bold mb-2">
                  {tutorialSteps[currentTutorialStep].title}
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-lg leading-relaxed">
                  {tutorialSteps[currentTutorialStep].message}
                </p>
                <div className="bg-accent/20 rounded-lg p-4 border-2 border-accent">
                  <p className="text-accent font-bold text-center">
                    💡 {tutorialSteps[currentTutorialStep].highlight}
                  </p>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full mx-1 ${
                      index === currentTutorialStep ? 'bg-accent' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={skipTutorial}
                  className="px-4 py-2 text-white/80 hover:text-white transition-colors"
                >
                  Skip Tutorial
                </button>
                <button
                  onClick={nextTutorialStep}
                  className="bg-accent hover:bg-accent/80 text-dark font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {currentTutorialStep === tutorialSteps.length - 1 ? 'Start Playing!' : 'Next →'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎉 Level Up Modal */}
      <AnimatePresence>
        {showLevelUpModal && levelUpData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
              className="bg-gradient-to-br from-accent to-primary text-dark rounded-2xl p-8 max-w-lg w-full border-4 border-white shadow-glow text-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="text-8xl mb-4"
              >
                {levelUpData.icon}
              </motion.div>
              
              <h2 className="text-4xl font-heading font-bold mb-4">
                {levelUpData.title}
              </h2>
              
              <p className="text-lg mb-6 leading-relaxed">
                {levelUpData.description}
              </p>

              {levelUpData.zone && (
                <div className="space-y-4">
                  <div className="bg-white/20 rounded-lg p-4 mb-4">
                    <p className="font-bold text-lg">🎊 New Area Unlocked!</p>
                    <p>You can now access exclusive content!</p>
                  </div>
                  
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => navigateToSpecialArea(levelUpData.zone)}
                      className="bg-dark hover:bg-dark/80 text-accent font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Explore Now! 🚀
                    </button>
                    <button
                      onClick={() => setShowLevelUpModal(false)}
                      className="bg-white/20 hover:bg-white/30 text-dark font-bold px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              )}

              {!levelUpData.zone && (
                <button
                  onClick={() => setShowLevelUpModal(false)}
                  className="bg-dark hover:bg-dark/80 text-accent font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Continue! 🎉
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎯 Tutorial Hint for New Users */}
      {!localStorage.getItem('hasSeenRPGTutorial') && totalXP > 0 && totalXP < 300 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-20 left-4 md:left-8 z-40 bg-primary/90 text-softText px-4 py-2 rounded-lg shadow-soft max-w-xs"
        >
          <p className="text-sm font-bold">💡 Keep clicking interactive elements to earn XP!</p>
          <div className="text-xs text-softText/80 mt-1">
            Next unlock at Level {Object.keys(specialUnlocks)[0]} ⭐
          </div>
        </motion.div>
      )}

      {/* Optimized Floating Elements */}
      {FloatingElements}

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
        {/* Header */}
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
            animate={{ width: '100%' }}
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

        {/* Subtitle */}
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

        {/* Begin Quest Button */}
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
            Begin Quest 🚀
          </motion.button>
          
          <div className="text-softText/60 text-xs sm:text-sm font-poetry italic px-4 break-words">
            "Every great journey begins with a single click..."
          </div>
        </motion.div>

        {/* Enhanced Interactive Stats with Clear XP Hints */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-sm sm:max-w-md lg:max-w-lg mx-auto mt-4 sm:mt-6 lg:mt-8"
        >
          {statsData.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-dark/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border-2 border-primary/30 cursor-pointer group relative overflow-hidden"
              onClick={() => handleXPGain(stat.xp, stat.message)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + index * 0.1 }}
            >
              {/* Animated XP Hint */}
              <motion.div
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [-5, -15, -5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: index * 0.5
                }}
                className="absolute top-1 right-1 text-accent text-xs font-bold pointer-events-none"
              >
                +{stat.xp}
              </motion.div>
              
              <div className="text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2 group-hover:animate-bounce">
                {stat.emoji}
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-accent">{stat.value}</div>
              <div className="text-xs sm:text-sm text-highlight leading-tight">{stat.label}</div>
              <div className="text-xs text-accent/80 mt-1 sm:mt-2 group-hover:opacity-100 opacity-60 transition-opacity font-bold animate-pulse">
                Click for XP!
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Progress Display with Next Unlock Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-4 sm:mt-6 space-y-4"
        >
          <div className="bg-dark/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-accent/30 max-w-md mx-auto">
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

          {/* Next Unlock Preview */}
          {nextUnlock && (
            <div className="bg-gradient-to-r from-primary/20 to-highlight/20 rounded-xl p-4 border border-accent/30 max-w-md mx-auto">
              <div className="text-accent font-bold text-sm mb-2">🎯 Next Unlock:</div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{nextUnlock[1].icon}</span>
                <div>
                  <div className="text-softText font-semibold">{nextUnlock[1].title}</div>
                  <div className="text-softText/70 text-xs">Level {nextUnlock[0]} required</div>
                </div>
              </div>
            </div>
          )}
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
            🔍 Explore (+60)
          </motion.button>
          
          <motion.button
            onClick={() => handleXPGain(75, '💝 Love Appreciated!')}
            className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-highlight/20 hover:bg-highlight/40 text-highlight border border-highlight/30 rounded-lg transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💝 Love (+75)
          </motion.button>

          <motion.button
            onClick={handleRandomReward}
            className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-accent/20 hover:bg-accent/40 text-accent border border-accent/30 rounded-lg transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎲 Surprise (?)
          </motion.button>

          {/* Secret Button after 3 interactions */}
          <AnimatePresence>
            {userInteractions >= 3 && (
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
                🔮 Secret (+200)
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

      {/* Enhanced Avatar */}
      <Avatar
        currentLevel={currentLevel}
        currentXP={totalXP}
        visitedPages={['home']}
        mood="welcoming"
        messages={[
          `Welcome! You've earned ${totalXP} XP so far! Level ${currentLevel} achieved! 🌟`,
          "Click on anything that glows or moves to earn XP! ✨",
          `${userInteractions} interactions and counting! You're awesome! 💫`,
          "Ready to unlock more zones? Keep exploring! 🚀"
        ]}
      />
    </div>
  );
};

export default Home;
