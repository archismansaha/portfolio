// src/components/common/DialogueBox/DialogueBox.jsx
import React from 'react';
import { motion } from 'framer-motion';

const DialogueBox = ({ message, mood = "helpful", onClose }) => {
  const getMoodStyles = () => {
    const styles = {
      helpful: {
        bg: 'from-blue-500 to-purple-600',
        text: 'text-white',
        border: 'border-blue-400'
      },
      flirty: {
        bg: 'from-pink-500 to-red-500', 
        text: 'text-white',
        border: 'border-pink-400'
      },
      deep: {
        bg: 'from-indigo-600 to-purple-700',
        text: 'text-gray-100',
        border: 'border-indigo-400'
      }
    };
    return styles[mood] || styles.helpful;
  };

  const moodStyle = getMoodStyles();

  return (
    <motion.div
      className="relative max-w-xs"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Speech Bubble */}
      <div className={`
        relative bg-gradient-to-br ${moodStyle.bg} ${moodStyle.text} 
        px-4 py-3 rounded-2xl shadow-xl border-2 ${moodStyle.border}
        backdrop-blur-sm
      `}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-white/70 hover:text-white text-sm"
        >
          ×
        </button>
        
        {/* Message */}
        <p className="text-sm leading-relaxed pr-4">
          {message}
        </p>
        
        {/* Speech Bubble Tail */}
        <div className={`
          absolute bottom-0 right-4 transform translate-y-full
          w-0 h-0 border-l-[12px] border-l-transparent
          border-r-[12px] border-r-transparent
          border-t-[12px] border-t-current
        `} style={{ color: mood === 'flirty' ? '#ec4899' : mood === 'deep' ? '#6366f1' : '#8b5cf6' }} />
      </div>
    </motion.div>
  );
};

export default DialogueBox;
