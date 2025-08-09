import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameContext } from '../../context/GameContext';
import Avatar from '../../components/common/Avatar';

const AboutMe = ({ onPageLoad }) => {
  const [showStats, setShowStats] = useState(false);
  const [showXPToast, setShowXPToast] = useState(false);
  const [lastXPGain, setLastXPGain] = useState(0);
  const [discoveredSecrets, setDiscoveredSecrets] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [userInteractions, setUserInteractions] = useState(0);

  const { 
    visitPage, 
    addXP, 
    totalXP, 
    currentLevel, 
    isZoneUnlocked 
  } = useGameContext();

  // 🎊 XP gain handler with visual feedback
  const handleXPGain = useCallback((xp, message) => {
    addXP(xp, message);
    setLastXPGain(xp);
    setShowXPToast(true);
    setUserInteractions(prev => prev + 1);
    
    setTimeout(() => setShowXPToast(false), 2000);
  }, [addXP]);

  useEffect(() => {
    if (onPageLoad) onPageLoad();
    visitPage('about');
    
    // Progressive reveals
    setTimeout(() => setShowStats(true), 1000);
  }, [onPageLoad, visitPage]);

  const characterStats = [
    { 
      label: 'Coding', 
      value: 95, 
      icon: '💻', 
      color: 'from-blue-500 to-purple-500',
      xp: 50,
      message: 'Code mastery recognized! +50 XP 🚀'
    },
    { 
      value: 88, 
      icon: '🎨', 
      color: 'from-pink-500 to-rose-500',
      xp: 45,
      message: 'Creative spirit appreciated! +45 XP ✨'
    },
    { 
      label: 'Strength', 
      value: 82, 
      icon: '💪', 
      color: 'from-red-500 to-orange-500',
      xp: 40,
      message: 'Physical prowess noted! +40 XP 💪'
    },
    { 
      label: 'Poetry', 
      value: 92, 
      icon: '📝', 
      color: 'from-green-500 to-teal-500',
      xp: 55,
      message: 'Poetic soul discovered! +55 XP 💫'
    },
  ];

  const traits = [
    { 
      title: 'Backend Wizard', 
      desc: 'Node.js, NestJS, Express mastery', 
      icon: '⚙️',
      xp: 60,
      message: 'Backend expertise acknowledged! +60 XP'
    },
    { 
      title: 'Cloud Architect', 
      desc: 'AWS, Docker, DevOps expertise', 
      icon: '☁️',
      xp: 65,
      message: 'Cloud mastery recognized! +65 XP'
    },
    { 
      title: 'Database Sage', 
      desc: 'PostgreSQL, MongoDB, Redis', 
      icon: '🗄️',
      xp: 55,
      message: 'Database wisdom appreciated! +55 XP'
    },
    { 
      title: 'Frontend Artist', 
      desc: 'React, Tailwind, Modern UX', 
      icon: '🎭',
      xp: 70,
      message: 'Frontend artistry admired! +70 XP'
    },
  ];

  const quotes = [
    "Code is poetry in motion, each function a verse, each algorithm a stanza in the epic of digital creation.",
    "In the symphony of technology and humanity, I am both the conductor and the composer.",
    "Every line of code tells a story, every bug teaches a lesson, every solution opens a new door.",
    "Between the gym and the keyboard, I sculpt both body and mind into instruments of creation."
  ];

  const personalSecrets = [
    { id: 'coffee', text: 'Fueled by coffee and curiosity ☕', xp: 25 },
    { id: 'night', text: 'Best coding happens after midnight 🌙', xp: 30 },
    { id: 'music', text: 'Lofi beats enhance my productivity 🎵', xp: 35 },
    { id: 'dreams', text: 'Dreams in algorithms and data structures 💭', xp: 40 }
  ];

  const discoverSecret = (secret) => {
    if (!discoveredSecrets.includes(secret.id)) {
      setDiscoveredSecrets(prev => [...prev, secret.id]);
      handleXPGain(secret.xp, `Secret discovered: ${secret.text}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-8">
      {/* XP Toast Notification */}
      <AnimatePresence>
        {showXPToast && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            className="fixed top-20 right-4 z-50 bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl shadow-2xl font-bold"
          >
            +{lastXPGain} XP! 🎉
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Character Profile
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Character Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-center">
            {/* Avatar Section */}
            <div className="text-center">
              <motion.div
                className="text-6xl sm:text-8xl mb-4 inline-block cursor-pointer"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleXPGain(30, 'Avatar interaction! You found me! 👋')}
              >
                👨‍💻
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">
                Level {currentLevel} Developer
              </h2>
              <p className="text-lg sm:text-xl text-cyan-400 font-semibold">Full Stack Wizard</p>
              
              {/* Interactive Class Badge */}
              <motion.div 
                className="mt-4 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleXPGain(35, 'Class recognition: Polymath discovered! 🧠')}
              >
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-4 border border-purple-400/30">
                  <div className="text-sm text-gray-300">Class</div>
                  <div className="text-white font-bold text-lg">Polymath</div>
                  <div className="text-xs text-gray-400 mt-1">Click to acknowledge (+35 XP)</div>
                </div>
              </motion.div>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Interactive XP Bar */}
              <motion.div
                className="cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => handleXPGain(25, 'XP bar inspected! Attention to detail! 🔍')}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg text-gray-300">Experience Points</span>
                  <span className="text-xl font-bold text-blue-400">{totalXP.toLocaleString()}/3000 XP</span>
                </div>
                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((totalXP / 3000) * 100, 100)}%` }}
                    transition={{ delay: 1, duration: 2, ease: "easeOut" }}
                  />
                </div>
                <div className="text-sm text-cyan-400 mt-2">
                  Next level: {Math.max(3000 - totalXP, 0)} XP remaining
                </div>
                <div className="text-xs text-gray-400 mt-1">Click for +25 XP</div>
              </motion.div>

              {/* Bio with hidden secrets */}
              <div className="bg-black/30 rounded-xl p-4 sm:p-6 border border-gray-600 relative">
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  A passionate full-stack developer who weaves code like poetry and builds systems like architectural masterpieces. 
                  When not crafting digital experiences, you'll find me at the gym sculpting both mind and body, or penning verses 
                  that bridge the gap between technology and human emotion.
                </p>
                
                {/* Hidden Secret Spots */}
                <div className="absolute top-2 right-2 grid grid-cols-2 gap-1">
                  {personalSecrets.map((secret) => (
                    <motion.div
                      key={secret.id}
                      className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
                        discoveredSecrets.includes(secret.id) 
                          ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => discoverSecret(secret)}
                      title={discoveredSecrets.includes(secret.id) ? secret.text : 'Hidden secret - click to discover!'}
                    />
                  ))}
                </div>

                {/* Discovered Secrets Display */}
                <AnimatePresence>
                  {discoveredSecrets.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-purple-400/20"
                    >
                      <h4 className="text-purple-400 font-bold text-sm mb-2">🎊 Discovered Secrets:</h4>
                      <div className="space-y-1">
                        {discoveredSecrets.map(secretId => {
                          const secret = personalSecrets.find(s => s.id === secretId);
                          return (
                            <motion.div
                              key={secretId}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-xs text-cyan-400"
                            >
                              • {secret.text}
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Interactive Quick Facts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div 
                  className="bg-black/30 rounded-xl p-4 border border-blue-400/20 cursor-pointer"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleXPGain(20, 'Location discovered: Kolkata connection! 🌍')}
                >
                  <div className="text-blue-400 font-bold">Location 📍</div>
                  <div className="text-gray-300">Kolkata, India</div>
                  <div className="text-xs text-blue-400/60 mt-1">Click for +20 XP</div>
                </motion.div>
                
                <motion.div 
                  className="bg-black/30 rounded-xl p-4 border border-cyan-400/20 cursor-pointer"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(34, 211, 238, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleXPGain(25, 'Availability checked: Ready for opportunities! 💼')}
                >
                  <div className="text-cyan-400 font-bold">Availability 💼</div>
                  <div className="text-gray-300">Open to opportunities</div>
                  <div className="text-xs text-cyan-400/60 mt-1">Click for +25 XP</div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Character Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showStats ? 1 : 0, y: showStats ? 0 : 30 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6 text-center">
            Core Abilities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {characterStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                className="text-center cursor-pointer group"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleXPGain(stat.xp, stat.message)}
              >
                <div className="text-4xl sm:text-5xl mb-3 group-hover:animate-bounce">
                  {stat.icon}
                </div>
                <div className="mb-3">
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">{stat.value}/100</div>
                  <div className="text-sm text-gray-300 font-semibold">{stat.label}</div>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ delay: 2 + index * 0.1, duration: 1.5 }}
                  />
                </div>
                <div className="text-xs text-blue-400/60 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click for +{stat.xp} XP
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Special Traits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {traits.map((trait, index) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.7 + index * 0.1, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleXPGain(trait.xp, trait.message)}
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl sm:text-4xl group-hover:animate-pulse">
                  {trait.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-bold text-blue-400 mb-2 group-hover:text-cyan-400 transition-colors">
                    {trait.title}
                  </h4>
                  <p className="text-gray-300 text-sm sm:text-base mb-2">{trait.desc}</p>
                  <div className="text-xs text-blue-400/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to appreciate (+{trait.xp} XP)
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Personal Quote Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            <div className="mb-4 flex justify-center space-x-2">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentQuote(index);
                    handleXPGain(15, `Quote ${index + 1} appreciated! Wisdom gained! 📚`);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentQuote ? 'bg-purple-400' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl italic text-gray-300 mb-4 leading-relaxed"
              >
                "{quotes[currentQuote]}"
              </motion.blockquote>
            </AnimatePresence>
            
            <cite className="text-purple-400 font-semibold">— My Development Philosophy</cite>
            
            <div className="mt-4 flex justify-center space-x-4">
              <motion.button
                onClick={() => {
                  setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
                  handleXPGain(10, 'Previous quote explored! 📖');
                }}
                className="text-blue-400 hover:text-cyan-400 transition-colors duration-300 px-4 py-2 rounded-lg border border-blue-400/30 hover:border-cyan-400/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Previous
              </motion.button>
              <motion.button
                onClick={() => {
                  setCurrentQuote((prev) => (prev + 1) % quotes.length);
                  handleXPGain(10, 'Next quote discovered! 📚');
                }}
                className="text-blue-400 hover:text-cyan-400 transition-colors duration-300 px-4 py-2 rounded-lg border border-blue-400/30 hover:border-cyan-400/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next →
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* XP Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-6 border border-purple-400/30">
            <h4 className="text-purple-400 font-bold text-lg mb-2">🎯 Exploration Progress</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-cyan-400 font-bold text-xl">{userInteractions}</div>
                <div className="text-gray-400">Interactions</div>
              </div>
              <div>
                <div className="text-blue-400 font-bold text-xl">{discoveredSecrets.length}/4</div>
                <div className="text-gray-400">Secrets Found</div>
              </div>
              <div>
                <div className="text-purple-400 font-bold text-xl">{Math.min(Math.round((userInteractions / 15) * 100), 100)}%</div>
                <div className="text-gray-400">Page Completion</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Avatar
        currentLevel={currentLevel}
        currentXP={totalXP}
        visitedPages={['about']}
        mood="friendly"
        messages={[
          `Getting to know the real me? I like that! You've made ${userInteractions} discoveries! 😊`,
          "My stats are looking good today! Click around to learn more! 💪",
          `You've found ${discoveredSecrets.length} secrets so far! Keep exploring! 🔍`,
          "Thanks for taking the time to understand me! Every click matters! 💕"
        ]}
      />
    </div>
  );
};

export default AboutMe;
