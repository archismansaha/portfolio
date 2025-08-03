import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const InstagramUnlock = ({ onPageLoad }) => {
  const [isUnlocked, setIsUnlocked] = useLocalStorage('instagramUnlocked', false);
  const [animatedText, setAnimatedText] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const fullText = "You've explored me... now connect with me 💌";

  useEffect(() => {
    if (onPageLoad) onPageLoad();

    if (!isUnlocked) {
      setTimeout(() => {
        setAnimatedText("Access Denied: Complete the Secret Crush quest first! 🔒");
      }, 1000);
      return;
    }

    // Animate the reveal text
    let index = 0;
    const typeText = () => {
      if (index <= fullText.length) {
        setAnimatedText(fullText.slice(0, index));
        index++;
        setTimeout(typeText, 80);
      } else {
        setTimeout(() => setShowMessage(true), 1000);
      }
    };

    setTimeout(typeText, 1500);
  }, [onPageLoad, isUnlocked]);

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center soft-card border-2 border-subtleGray shadow-soft max-w-md"
        >
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-heading font-bold text-softText mb-4">Access Restricted</h1>
          <p className="text-softText/80 mb-6">{animatedText}</p>
          <motion.button
            onClick={() => window.history.back()}
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark relative overflow-hidden">
      {/* Celebration Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating celebration elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-accent opacity-70"
            animate={{
              y: [-20, -120, -20],
              x: [0, Math.sin(i) * 80, 0],
              rotate: [0, 360, 720],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 6 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${1.5 + Math.random() * 1}rem`
            }}
          >
            {['💕', '💖', '✨', '🌟', '💌', '🎉', '💫', '🔥'][i % 8]}
          </motion.div>
        ))}

        {/* Gradient Overlays */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 min-h-screen flex items-center justify-center">
        <div className="text-center w-full">
          {/* Animated Reveal Text */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-poetry text-accent mb-6 min-h-[80px] flex items-center justify-center">
              {animatedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-accent ml-2"
              >
                {animatedText.length < fullText.length ? '|' : ''}
              </motion.span>
            </h1>
          </motion.div>

          {/* Instagram Reveal */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                className="mb-12"
              >
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 30px rgba(255, 209, 102, 0.6)",
                      "0 0 60px rgba(255, 209, 102, 0.8)",
                      "0 0 30px rgba(255, 209, 102, 0.6)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="soft-card bg-gradient-to-br from-accent/20 to-primary/20 border-4 border-accent shadow-glow max-w-2xl mx-auto"
                >
                  <div className="text-6xl mb-6">📸✨</div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-accent mb-4">
                    Portal Unlocked!
                  </h2>
                  
                  <div className="bg-dark/50 rounded-2xl p-6 mb-6 border border-primary/30">
                    <p className="text-highlight text-lg mb-4">
                      Welcome to my inner circle! 🌟
                    </p>
                    <div className="text-4xl font-bold text-accent mb-2">
                      @archismansaha
                    </div>
                    <p className="text-softText/80 text-sm italic">
                      Where the magic happens... gym selfies, coding nights, and everything in between 😉
                    </p>
                  </div>

                  {/* Instagram Button */}
                  <motion.button
                    onClick={() => window.open('https://instagram.com/archismansaha', '_blank')}
                    className="btn-primary text-xl px-8 py-4 mb-6"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      y: [0, -5, 0],
                      boxShadow: [
                        "0 4px 20px rgba(255, 209, 102, 0.4)",
                        "0 8px 30px rgba(255, 209, 102, 0.6)",
                        "0 4px 20px rgba(255, 209, 102, 0.4)"
                      ]
                    }}
                    transition={{ 
                      y: { duration: 2, repeat: Infinity },
                      boxShadow: { duration: 2, repeat: Infinity }
                    }}
                  >
                    Follow Me on Instagram 📱💕
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="mt-12 text-center"
          >
            <p className="text-softText/80 italic text-lg font-poetry">
              "Thanks for taking this journey with me... 💫"
            </p>
            <p className="text-highlight text-sm mt-2">
              - Archisman, your friendly neighborhood developer-poet 💻❤️
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InstagramUnlock;
