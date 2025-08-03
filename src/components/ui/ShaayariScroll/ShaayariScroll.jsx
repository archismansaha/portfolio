// src/components/ui/ShaayariScroll/ShaayariScroll.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ShaayariScroll = ({ 
  shaayari, 
  onNext, 
  onPrev, 
  currentIndex, 
  totalCount, 
  isAutoPlay 
}) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [isReading, setIsReading] = useState(false);

  // Auto-advance progress bar
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isAutoPlay) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            return 0;
          }
          return prev + (100 / 60); // 6 seconds = 60 intervals of 100ms
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, currentIndex]);

  const scrollVariants = {
    enter: { opacity: 0, y: 50, scale: 0.9 },
    center: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 1.1 }
  };

  return (
    <div className="relative">
      {/* Main Scroll Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-br ${shaayari.bgColor} rounded-3xl border-2 border-yellow-400/50 shadow-2xl overflow-hidden min-h-[500px] relative`}
      >
        {/* Parchment Texture Overlay - Fixed */}
        <div className="absolute inset-0 opacity-10 parchment-texture"></div>

        {/* Auto-play Progress Bar */}
        {isAutoPlay && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-black/30">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}

        {/* Header */}
        <div className="p-6 border-b border-yellow-400/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-3xl"
              >
                📜
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-yellow-200 font-serif">
                  Verse {currentIndex + 1}
                </h2>
                <p className="text-yellow-400 text-sm">{shaayari.theme}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${ 
                shaayari.mood === 'romantic' ? 'bg-pink-500' :
                shaayari.mood === 'flirty' ? 'bg-red-500' :
                shaayari.mood === 'melancholy' ? 'bg-gray-600' :
                shaayari.mood === 'motivational' ? 'bg-green-500' :
                shaayari.mood === 'dreamy' ? 'bg-purple-500' :
                'bg-blue-500'
              } text-white`}>
                {shaayari.mood}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={scrollVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Hindi Verse */}
              <motion.div
                className="mb-8"
                onHoverStart={() => setIsReading(true)}
                onHoverEnd={() => setIsReading(false)}
              >
                <pre className="text-2xl md:text-3xl text-yellow-100 font-serif leading-relaxed whitespace-pre-wrap">
                  {shaayari.verse}
                </pre>
              </motion.div>

              {/* Translation Toggle */}
              <motion.button
                onClick={() => setShowTranslation(!showTranslation)}
                className="mb-6 px-6 py-2 bg-black/30 hover:bg-black/50 text-yellow-300 rounded-full border border-yellow-400/30 transition-all font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showTranslation ? 'Hide Translation' : 'Show Translation'} 
                <span className="ml-2">{showTranslation ? '🙈' : '👁️'}</span>
              </motion.button>

              {/* English Translation */}
              <AnimatePresence>
                {showTranslation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-black/20 rounded-2xl p-6 border border-yellow-400/20"
                  >
                    <p className="text-lg text-yellow-200 italic leading-relaxed">
                      {shaayari.translation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="p-6 border-t border-yellow-400/30">
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <motion.button
              onClick={onPrev}
              className="flex items-center space-x-2 px-4 py-2 bg-black/30 hover:bg-black/50 text-yellow-300 rounded-lg border border-yellow-400/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>←</span>
              <span>Previous</span>
            </motion.button>

            {/* Progress Dots */}
            <div className="flex space-x-2">
              {Array.from({ length: totalCount }, (_, i) => (
                <motion.div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${ 
                    i === currentIndex ? 'bg-yellow-400' : 'bg-yellow-400/30'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={onNext}
              className="flex items-center space-x-2 px-4 py-2 bg-black/30 hover:bg-black/50 text-yellow-300 rounded-lg border border-yellow-400/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Next</span>
              <span>→</span>
            </motion.button>
          </div>
        </div>

        {/* Reading Indicator */}
        <AnimatePresence>
          {isReading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-20 right-6 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold"
            >
              Reading... 📖
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -left-4 text-4xl opacity-30 animate-pulse">🕯️</div>
      <div className="absolute -top-4 -right-4 text-4xl opacity-30 animate-pulse">🌹</div>
      <div className="absolute -bottom-4 -left-4 text-4xl opacity-30 animate-pulse">📚</div>
      <div className="absolute -bottom-4 -right-4 text-4xl opacity-30 animate-pulse">✒️</div>
    </div>
  );
};

export default ShaayariScroll;
