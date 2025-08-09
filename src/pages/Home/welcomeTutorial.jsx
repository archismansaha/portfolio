import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeTutorial = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [interactiveXP, setInteractiveXP] = useState(0);
  const typingRef = useRef(null);

  const tutorialSteps = [
    {
      id: 'welcome',
      title: "Welcome to My RPG Portfolio! 🎮",
      subtitle: "This isn't just a portfolio - it's an interactive adventure!",
      content: "Every click earns you XP, every exploration unlocks secrets, and every level brings new surprises. Ready to discover what makes me tick?",
      icon: "🌟",
      bgGradient: "from-indigo-600 via-purple-600 to-blue-600",
      accentColor: "text-yellow-300",
      animation: "bounce"
    },
    {
      id: 'mechanics',
      title: "How It Works ⚡",
      subtitle: "Your actions have power here!",
      content: "Click on ANYTHING that looks interactive - stats, buttons, even the floating elements! Each interaction rewards you with XP points that unlock new areas of my world.",
      icon: "🎯",
      bgGradient: "from-emerald-600 via-teal-600 to-cyan-600",
      accentColor: "text-amber-300",
      animation: "pulse",
      interactive: [
        { element: "💻", label: "Click me!", xp: 50, action: () => {} },
        { element: "⭐", label: "And me!", xp: 30, action: () => {} },
        { element: "🚀", label: "Me too!", xp: 40, action: () => {} }
      ]
    },
    {
      id: 'levels',
      title: "Level Up System 📈",
      subtitle: "Progress unlocks exclusive content!",
      content: "As you gain XP, you'll level up and unlock special areas with unique content, games, and personal insights you won't find anywhere else.",
      icon: "🏆",
      bgGradient: "from-rose-600 via-pink-600 to-purple-600",
      accentColor: "text-yellow-200",
      animation: "rotate"
    },
    {
      id: 'surprises',
      title: "Special Unlocks & Surprises 🎁",
      subtitle: "Hidden gems await at each milestone!",
      content: "Each level brings exciting unlocks - from my personal gym journey to anime favorites, secret crush interactions, and poetry that speaks to the soul.",
      icon: "🔮",
      bgGradient: "from-violet-600 via-indigo-600 to-purple-600",
      accentColor: "text-cyan-300",
      animation: "float"
    },
    {
      id: 'roadmap',
      title: "Your Adventure Roadmap 🗺️",
      subtitle: "Here's what awaits you:",
      content: "Your journey through my digital world, with exclusive content at every level!",
      icon: "🎪",
      bgGradient: "from-orange-600 via-red-600 to-pink-600",
      accentColor: "text-yellow-200",
      animation: "spin",
      showRoadmap: true
    }
  ];

  const unlockRoadmap = [
    { level: 1, title: "Basic Exploration", icon: "🚀", description: "Portfolio basics + About me", unlocked: true, color: "border-green-400" },
    { level: 3, title: "Skills Unlocked", icon: "🛡️", description: "Interactive skill tree + puzzle games", unlocked: false, color: "border-blue-400" },
    { level: 5, title: "Gym Arena Access", icon: "💪", description: "My fitness journey + workout tracking", unlocked: false, surprise: "Virtual gym buddy!", color: "border-red-400" },
    { level: 8, title: "Animeverse Portal", icon: "🎌", description: "Anime favorites + character insights", unlocked: false, surprise: "Anime recommendation engine!", color: "border-purple-400" },
    { level: 10, title: "Project Showcase", icon: "🏗️", description: "Deep-dive into my best work", unlocked: false, color: "border-yellow-400" },
    { level: 12, title: "Secret Crush Mode", icon: "💘", description: "Interactive dating sim experience", unlocked: false, surprise: "Unlock my Instagram!", color: "border-pink-400" },
    { level: 15, title: "Poetry Tavern", icon: "📜", description: "Original Hindi poetry + translations", unlocked: false, surprise: "AI poetry generator!", color: "border-indigo-400" },
    { level: 20, title: "Inner Circle", icon: "👑", description: "Personal stories + exclusive content", unlocked: false, surprise: "Direct contact access!", color: "border-gold-400" }
  ];

  // Enhanced typing effect
  useEffect(() => {
    const currentStepData = tutorialSteps[currentStep];
    const text = currentStepData.content;
    let index = 0;
    
    setTypedText('');
    setIsTypingComplete(false);
    
    const typeText = () => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        index++;
        typingRef.current = setTimeout(typeText, 25);
      } else {
        setIsTypingComplete(true);
      }
    };

    const startTyping = setTimeout(typeText, 800);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
      clearTimeout(startTyping);
    };
  }, [currentStep]);

  // Handle interactive element clicks
  const handleInteractiveClick = (item, index) => {
    setInteractiveXP(prev => prev + item.xp);
    
    // Visual feedback
    const element = document.getElementById(`interactive-${index}`);
    if (element) {
      element.style.transform = 'scale(1.2)';
      element.style.backgroundColor = 'rgba(34, 197, 94, 0.3)';
      setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      }, 200);
    }
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentStepData = tutorialSteps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-2 sm:p-4"
    >
      <motion.div
        key={currentStep}
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`bg-gradient-to-br ${currentStepData.bgGradient} text-white rounded-3xl p-4 sm:p-8 max-w-5xl w-full max-h-[95vh] overflow-y-auto border-4 border-white/30 shadow-2xl relative backdrop-blur-sm`}
      >
        {/* Close button */}
        <motion.button
          onClick={onSkip}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 z-10"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-lg sm:text-xl font-bold">×</span>
        </motion.button>

        {/* Progress bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm text-white/80 font-medium">Progress</span>
            <span className="text-xs sm:text-sm text-white/80 font-medium">
              {currentStep + 1} / {tutorialSteps.length}
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-white rounded-full h-2"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Header with enhanced animated icon */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            animate={
              currentStepData.animation === 'bounce' ? { y: [0, -15, 0] } :
              currentStepData.animation === 'pulse' ? { scale: [1, 1.15, 1] } :
              currentStepData.animation === 'rotate' ? { rotate: [0, 360] } :
              currentStepData.animation === 'float' ? { y: [0, -8, 0], x: [0, 3, 0] } :
              currentStepData.animation === 'spin' ? { rotate: [0, 180, 360] } : {}
            }
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl sm:text-8xl mb-4 inline-block"
          >
            {currentStepData.icon}
          </motion.div>
          
          <h1 className={`text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 ${currentStepData.accentColor} leading-tight`}>
            {currentStepData.title}
          </h1>
          <p className="text-base sm:text-xl text-white/90 font-medium max-w-2xl mx-auto">
            {currentStepData.subtitle}
          </p>
        </div>

        {/* Content Area */}
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          {/* Main content with enhanced typing effect */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-sm border-2 border-white/20 shadow-lg"
          >
            <p className="text-sm sm:text-lg leading-relaxed text-white/95">
              {typedText}
              {!isTypingComplete && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className={`${currentStepData.accentColor} font-bold text-xl`}
                >
                  |
                </motion.span>
              )}
            </p>
          </motion.div>

          {/* Interactive elements for step 2 */}
          {currentStepData.interactive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <div className="text-center">
                <div className={`inline-block bg-white/20 rounded-full px-4 py-2 text-sm font-bold ${currentStepData.accentColor}`}>
                  Interactive XP Earned: {interactiveXP} 🎉
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {currentStepData.interactive.map((item, index) => (
                  <motion.div
                    key={index}
                    id={`interactive-${index}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8 + index * 0.2, duration: 0.6, type: "spring" }}
                    className="bg-white/20 rounded-2xl p-4 text-center cursor-pointer hover:bg-white/30 transition-all duration-300 border-2 border-white/30 hover:border-white/60 group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInteractiveClick(item, index)}
                  >
                    <div className="text-3xl sm:text-4xl mb-2 group-hover:animate-bounce">{item.element}</div>
                    <p className="text-xs sm:text-sm font-medium mb-1">{item.label}</p>
                    <div className={`text-xs font-bold ${currentStepData.accentColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      +{item.xp} XP
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Enhanced roadmap display */}
          {currentStepData.showRoadmap && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4 sm:space-y-6"
            >
              <h3 className={`text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 ${currentStepData.accentColor}`}>
                🎯 Your Unlock Journey
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10">
                {unlockRoadmap.map((unlock, index) => (
                  <motion.div
                    key={unlock.level}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={`bg-white/15 rounded-2xl p-3 sm:p-4 border-2 ${unlock.color} hover:bg-white/20 transition-all duration-300 group`}
                    whileHover={{ scale: 1.02, y: -1 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl sm:text-3xl flex-shrink-0 group-hover:animate-bounce">
                        {unlock.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1 sm:mb-2">
                          <span className={`${currentStepData.accentColor} font-bold text-sm sm:text-base`}>
                            Level {unlock.level}
                          </span>
                          {unlock.unlocked && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-green-400 text-lg"
                            >
                              ✓
                            </motion.span>
                          )}
                        </div>
                        <h4 className="font-bold text-white text-sm sm:text-base mb-1">
                          {unlock.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                          {unlock.description}
                        </p>
                        {unlock.surprise && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 + index * 0.1 }}
                            className="mt-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg px-2 py-1 border border-yellow-400/30"
                          >
                            <p className="text-xs text-yellow-300 font-bold">
                              🎁 Surprise: {unlock.surprise}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Enhanced navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/20">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 ${
              currentStep === 0 
                ? 'text-white/40 cursor-not-allowed' 
                : 'text-white hover:bg-white/10 border border-white/30 hover:border-white/60'
            }`}
          >
            ← Previous
          </button>

          {/* Step indicators */}
          <div className="flex space-x-2">
            {tutorialSteps.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStep ? currentStepData.accentColor.replace('text-', 'bg-') : 
                  index < currentStep ? 'bg-white/80' : 'bg-white/30'
                }`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextStep}
            className={`${currentStepData.accentColor.replace('text-', 'bg-')} hover:opacity-90 text-gray-900 font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-xl transition-all duration-300 shadow-lg border-2 border-white/30`}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentStep === tutorialSteps.length - 1 ? 'Start Adventure! 🚀' : 'Next →'}
          </motion.button>
        </div>

        {/* Skip option */}
        <div className="text-center mt-4">
          <button
            onClick={onSkip}
            className="text-white/60 hover:text-white/90 text-sm px-4 py-2 rounded-lg transition-colors duration-300 border border-white/20 hover:border-white/40"
          >
            Skip Tutorial
          </button>
        </div>

        {/* Special CTA for final step */}
        {currentStep === tutorialSteps.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-6 text-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl p-4 sm:p-6 border-2 border-yellow-400/40 backdrop-blur-sm"
          >
            <div className="text-4xl mb-3">🎊</div>
            <p className="text-yellow-200 font-bold text-lg sm:text-xl mb-2">
              Ready to begin your journey?
            </p>
            <p className="text-white/90 text-sm sm:text-base">
              You'll start with 150 XP bonus and unlock new areas as you explore!
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default WelcomeTutorial;
