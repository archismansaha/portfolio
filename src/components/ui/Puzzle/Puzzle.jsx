// src/components/ui/Puzzle/Puzzle.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Puzzle = ({ question, options, correctAnswer, onSolved }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [avatarReaction, setAvatarReaction] = useState(null);

  // Avatar reactions based on different scenarios
  const avatarReactions = {
    thinking: { emoji: '🤔', message: "Hmm, take your time..." },
    encouraging: { emoji: '😊', message: "You got this!" },
    correct: { emoji: '🎉', message: "Brilliant! Well done!" },
    incorrect: { emoji: '😅', message: "Oops! Try again?" },
    celebrating: { emoji: '🥳', message: "Skill unlocked!" }
  };

  // Show random encouraging reaction when component loads
  useEffect(() => {
    const reactions = ['thinking', 'encouraging'];
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    setAvatarReaction(avatarReactions[randomReaction]);
    
    const timer = setTimeout(() => setAvatarReaction(null), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return; // Prevent changes after submission
    
    setSelectedAnswer(answerIndex);
    setAvatarReaction(avatarReactions.thinking);
    
    // Hide reaction after a moment
    setTimeout(() => setAvatarReaction(null), 2000);
  };

  // Submit answer
  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setAvatarReaction(avatarReactions.correct);
      
      // Show celebrating reaction and call onSolved after delay
      setTimeout(() => {
        setAvatarReaction(avatarReactions.celebrating);
        onSolved();
      }, 1500);
    } else {
      setAvatarReaction(avatarReactions.incorrect);
      
      // Allow retry after 3 seconds
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswer(null);
        setAvatarReaction(null);
      }, 3000);
    }
  };

  // Reset puzzle
  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setAvatarReaction(avatarReactions.encouraging);
    
    setTimeout(() => setAvatarReaction(null), 2000);
  };

  return (
    <div className="relative">
      {/* Avatar Reaction Corner */}
      <AnimatePresence>
        {avatarReaction && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0, x: 20, y: -20 }}
            className="absolute -top-4 -right-4 z-20"
          >
            {/* Speech Bubble */}
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-2xl shadow-lg text-sm font-medium min-w-max">
                {avatarReaction.message}
                
                {/* Speech bubble tail */}
                <div className="absolute bottom-0 right-4 transform translate-y-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-purple-500"></div>
              </div>
              
              {/* Avatar Emoji */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0] 
                }}
                transition={{ 
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="absolute -bottom-2 -right-2 text-3xl bg-white rounded-full p-1 shadow-lg border-2 border-purple-200"
              >
                {avatarReaction.emoji}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Puzzle Content */}
      <div className="space-y-6">
        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-xl font-bold text-white mb-2">🧩 Skill Challenge</h3>
          <p className="text-lg text-gray-300">{question}</p>
        </motion.div>

        {/* Multiple Choice Options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`
                w-full text-left p-4 rounded-xl border-2 transition-all duration-300 font-medium
                ${selectedAnswer === index
                  ? showResult
                    ? isCorrect
                      ? 'bg-green-600 border-green-400 text-white shadow-lg shadow-green-400/25'
                      : 'bg-red-600 border-red-400 text-white shadow-lg shadow-red-400/25'
                    : 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-400/25'
                  : showResult && index === correctAnswer
                    ? 'bg-green-600 border-green-400 text-white shadow-lg shadow-green-400/25'
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500'
                }
                ${showResult ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'}
              `}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                
                {/* Option indicators */}
                <div className="flex items-center space-x-2">
                  {selectedAnswer === index && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xl"
                    >
                      {showResult ? (isCorrect ? '✅' : '❌') : '👆'}
                    </motion.span>
                  )}
                  
                  {showResult && index === correctAnswer && selectedAnswer !== index && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xl"
                    >
                      ✅
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Result Message */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className={`text-center p-4 rounded-xl border-2 ${
                isCorrect
                  ? 'bg-green-900/50 border-green-500/50 text-green-300'
                  : 'bg-red-900/50 border-red-500/50 text-red-300'
              }`}
            >
              <div className="text-3xl mb-2">
                {isCorrect ? '🎉' : '💭'}
              </div>
              <p className="font-bold text-lg">
                {isCorrect 
                  ? 'Perfect! Skill Unlocked!' 
                  : 'Not quite right. Think again!'
                }
              </p>
              {!isCorrect && (
                <p className="text-sm mt-2 opacity-75">
                  Don't worry, you'll get it next time! 💪
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-4">
          {!showResult ? (
            <motion.button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className={`
                px-8 py-3 rounded-xl font-bold text-white transition-all duration-300
                ${selectedAnswer !== null
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-600 cursor-not-allowed opacity-50'
                }
              `}
              whileHover={selectedAnswer !== null ? { scale: 1.05 } : {}}
              whileTap={selectedAnswer !== null ? { scale: 0.95 } : {}}
            >
              Submit Answer 🚀
            </motion.button>
          ) : !isCorrect && (
            <motion.button
              onClick={handleReset}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again 🔄
            </motion.button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${
                selectedAnswer !== null ? 'bg-purple-400' : 'bg-gray-600'
              }`}
              animate={selectedAnswer !== null ? {
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              } : {}}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Puzzle;
