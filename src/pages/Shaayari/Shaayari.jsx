import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShaayariScroll from '../../components/ui/ShaayariScroll';
import Avatar from '../../components/common/Avatar';

const Shaayari = ({ onPageLoad }) => {
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicMode, setMusicMode] = useState('lofi');
  const [emotionLevel, setEmotionLevel] = useState(0);
  const [showAvatar, setShowAvatar] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  useEffect(() => {
    if (onPageLoad) onPageLoad();
  }, [onPageLoad]);

  const shaayariCollection = [
    {
      id: 1,
      verse: "कोड में बुनी हैं ख्वाहिशें,\nबग्स में छुपे हैं जज्बातें।\nडेवलपर हूं मैं इश्क़ का,\nGitHub पे लिखीं हैं मुहब्बतें।",
      translation: "Dreams are woven in code,\nEmotions hidden in bugs.\nI'm a developer of love,\nWriting romance on GitHub.",
      mood: "romantic",
      emotionLevel: 7,
      theme: "Code & Love",
      bgGradient: "from-primary to-highlight"
    },
    {
      id: 2,
      verse: "जिम में पसीना, कोड में दिमाग,\nदोनों जगह है मेहनत का राग।\nMuscles और Logic दोनों strong,\nLife में balance यही तो song।",
      translation: "Sweat in gym, mind in code,\nBoth places sing hard work's ode.\nMuscles and Logic both strong,\nLife balance is my song.",
      mood: "motivational",
      emotionLevel: 8,
      theme: "Gym & Code",
      bgGradient: "from-accent to-primary"
    },
    {
      id: 3,
      verse: "तेरी आंखों में देखा एक server,\n99.9% uptime का fever।\nHeart.js में लिखा तेरा प्यार,\nPromise resolve हो जाये यार।",
      translation: "I saw a server in your eyes,\n99.9% uptime fever.\nYour love written in Heart.js,\nMay this promise resolve, dear.",
      mood: "flirty",
      emotionLevel: 9,
      theme: "Tech Romance",
      bgGradient: "from-highlight to-accent"
    }
  ];

  const getAvatarEmotions = () => {
    const currentVerse = shaayariCollection[currentVerseIndex];
    const emotions = {
      romantic: [
        "Careful… feelings loading 💔",
        "Heart.exe has stopped working 💕",
        "My emotional APIs are overloaded! 🥺"
      ],
      flirty: [
        "Is it getting warm in here? 🔥",
        "My CPU temperature just spiked 😏",
        "Romance.js is running smoothly 😉"
      ],
      motivational: [
        "Energy levels: Maximum! 💪",
        "Motivation.service is running! 🚀",
        "Ready to conquer the world! 🌟"
      ]
    };
    return emotions[currentVerse?.mood] || emotions.romantic;
  };

  const nextVerse = () => {
    setCurrentVerseIndex((prev) => (prev + 1) % shaayariCollection.length);
    setEmotionLevel(shaayariCollection[(currentVerseIndex + 1) % shaayariCollection.length].emotionLevel);
  };

  const prevVerse = () => {
    setCurrentVerseIndex((prev) => (prev - 1 + shaayariCollection.length) % shaayariCollection.length);
    setEmotionLevel(shaayariCollection[(currentVerseIndex - 1 + shaayariCollection.length) % shaayariCollection.length].emotionLevel);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        nextVerse();
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, currentVerseIndex]);

  useEffect(() => {
    setEmotionLevel(shaayariCollection[currentVerseIndex].emotionLevel);
  }, [currentVerseIndex]);

  return (
    <div className="min-h-screen bg-dark relative overflow-hidden">
      {/* Tavern Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Candlelight flickering */}
        <motion.div
          className="absolute top-20 left-20 w-4 h-8 bg-accent rounded-full opacity-60 blur-sm"
          animate={{
            opacity: [0.4, 0.8, 0.6, 0.9, 0.5],
            scale: [1, 1.1, 0.9, 1.2, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Floating poetry symbols */}
        {['📜', '🕯️', '🥀', '💫', '🍷', '🎭'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20 text-accent"
            animate={{
              y: [-20, -60, -20],
              x: [0, Math.sin(i) * 30, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 1.5
            }}
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + i * 10}%`
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="section-title font-poetry">शायरी तवर्न</h1>
          <div className="w-32 h-1 bg-gradient-accent mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-softText/90 max-w-2xl mx-auto italic font-poetry">
            "Where code meets poetry, and hearts compile emotions into verses of digital love."
          </p>
        </motion.div>

        {/* Music Controls */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="soft-card border border-accent/30">
            <div className="flex items-center space-x-4">
              {/* Play/Pause Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isPlaying ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>

              {/* Music Mode Toggle */}
              <div className="flex bg-subtleGray rounded-lg overflow-hidden">
                <button
                  onClick={() => setMusicMode('lofi')}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    musicMode === 'lofi' ? 'bg-primary text-softText' : 'text-softText/70 hover:bg-subtleGray/80'
                  }`}
                >
                  🎵 Lofi
                </button>
                <button
                  onClick={() => setMusicMode('romantic')}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    musicMode === 'romantic' ? 'bg-accent text-dark' : 'text-softText/70 hover:bg-subtleGray/80'
                  }`}
                >
                  💕 Romantic
                </button>
              </div>

              {/* Auto-play Toggle */}
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isAutoPlay ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {isAutoPlay ? '⏹️ Auto' : '🔄 Auto'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Poetry Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Shaayari Scroll - Main Content */}
          <div className="lg:col-span-3">
            <ShaayariScroll
              shaayari={shaayariCollection[currentVerseIndex]}
              onNext={nextVerse}
              onPrev={prevVerse}
              currentIndex={currentVerseIndex}
              totalCount={shaayariCollection.length}
              isAutoPlay={isAutoPlay}
            />
          </div>

          {/* Emotion Meter & Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Emotion Meter */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="soft-card border border-accent/30"
            >
              <h3 className="text-xl font-heading font-bold text-accent mb-4 text-center">
                💝 Emotion Meter
              </h3>
              
              {/* Emotion Level Visual */}
              <div className="relative mb-4">
                <div className="progress-bar">
                  <motion.div
                    className="h-full bg-gradient-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${emotionLevel * 10}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <div className="text-center mt-2">
                  <span className="text-softText font-bold">{emotionLevel}/10</span>
                  <p className="text-softText/70 text-sm">{shaayariCollection[currentVerseIndex]?.mood}</p>
                </div>
              </div>

              {/* Current Theme */}
              <div className="text-center bg-primary/20 rounded-lg p-3 border border-primary/30">
                <p className="text-highlight text-sm font-medium">
                  Current Theme:
                </p>
                <p className="text-accent font-bold">
                  {shaayariCollection[currentVerseIndex]?.theme}
                </p>
              </div>
            </motion.div>

            {/* Poetry Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="soft-card border border-highlight/30"
            >
              <h3 className="text-lg font-heading font-bold text-highlight mb-4 text-center">
                📊 Poetry Stats
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-softText/70">Total Verses:</span>
                  <span className="text-softText font-bold">{shaayariCollection.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-softText/70">Current:</span>
                  <span className="text-highlight font-bold">{currentVerseIndex + 1}/{shaayariCollection.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-softText/70">Language:</span>
                  <span className="text-accent font-bold">हिंदी + English</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-softText/70">Theme:</span>
                  <span className="text-primary font-bold">Tech Poetry</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Navigation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="soft-card border border-primary/30"
            >
              <h3 className="text-lg font-heading font-bold text-primary mb-4 text-center">
                🎯 Quick Jump
              </h3>
              
              <div className="grid grid-cols-3 gap-2">
                {shaayariCollection.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVerseIndex(index)}
                    className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                      index === currentVerseIndex
                        ? 'bg-accent text-dark scale-110 shadow-glow'
                        : 'bg-subtleGray text-softText/70 hover:bg-subtleGray/80'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="soft-card border border-accent/30 shadow-glow max-w-4xl mx-auto">
            <blockquote className="text-xl md:text-2xl text-softText italic font-poetry mb-4 leading-relaxed">
              "Bytes और बीट्स में बसी है कहानी,<br />
              Code की लाइनों में छुपी है जवानी।"
            </blockquote>
            <div className="text-accent font-bold">— Digital Poet's Signature</div>
          </div>
        </motion.div>
      </div>

      {/* Avatar with Emotional Responses */}
      {showAvatar && (
        <Avatar
          currentLevel={18}
          currentXP={1800}
          visitedPages={['shaayari']}
          mood="deep"
          messages={getAvatarEmotions()}
        />
      )}
    </div>
  );
};

export default Shaayari;
