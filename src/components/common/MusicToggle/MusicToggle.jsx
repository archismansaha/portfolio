import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Add actual music logic here later
  };

  return (
    <motion.button
      onClick={toggleMusic}
      className={`
        w-12 h-12 rounded-full flex items-center justify-center
        ${isPlaying ? 'bg-pink-500' : 'bg-gray-700'} 
        text-white shadow-lg backdrop-blur-sm border-2 border-white/20
        hover:scale-110 transition-all duration-200
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isPlaying ? '🎵' : '🔇'}
    </motion.button>
  );
};

export default MusicToggle;
