import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../../components/common/Avatar';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const SecretCrush = ({ onPageLoad }) => {
  const [currentScene, setCurrentScene] = useState('intro');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [affectionPoints, setAffectionPoints] = useLocalStorage('crushAffection', 0);
  const [isUnlocked, setIsUnlocked] = useLocalStorage('instagramUnlocked', false);
  const [showPortal, setShowPortal] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (onPageLoad) onPageLoad();
    
    setTimeout(() => {
      setCurrentScene('start');
      typeDialogue(conversationTree.start.dialogue);
    }, 1000);
  }, [onPageLoad]);

  const conversationTree = {
    start: {
      dialogue: "Hey there... I see you've made it to my secret space. 😏 Not many people find their way here. What brings you to explore the hidden corners of my portfolio?",
      choices: [
        {
          text: "I'm genuinely curious about you as a person 💕",
          points: 3,
          nextScene: 'genuine'
        },
        {
          text: "Your code is impressive, wanted to know the developer behind it 🤓",
          points: 2,
          nextScene: 'professional'
        },
        {
          text: "Just exploring everything, thoroughness is key 🔍",
          points: 1,
          nextScene: 'explorer'
        },
        {
          text: "Looking for Easter eggs and secrets 🥚",
          points: 2,
          nextScene: 'playful'
        }
      ]
    },

    genuine: {
      dialogue: "That's... actually really sweet. 🥰 Most people just want to see my GitHub stats or AWS certifications. But you want to know *me*? Tell me, what do you think is the most important quality in a person?",
      choices: [
        {
          text: "Authenticity - being true to yourself 💯",
          points: 4,
          nextScene: 'deep_connection'
        },
        {
          text: "Passion - having something that drives you 🔥",
          points: 3,
          nextScene: 'passion_talk'
        },
        {
          text: "Humor - life's too short to be serious 😄",
          points: 2,
          nextScene: 'humor_branch'
        }
      ]
    },

    deep_connection: {
      dialogue: "Wow... authenticity. 😍 You really get it. In a world full of facades and pretense, finding someone who values being genuine is like finding a perfectly optimized algorithm - rare and beautiful. I have to ask... are you single? 👀",
      choices: [
        {
          text: "Yes, and looking for something real 💕",
          points: 6,
          nextScene: 'confession'
        },
        {
          text: "Why do you ask? 😏",
          points: 4,
          nextScene: 'flirt_back'
        },
        {
          text: "That's quite forward! But I like it 🔥",
          points: 5,
          nextScene: 'bold_response'
        }
      ]
    },

    confession: {
      dialogue: "I can't believe I'm about to say this... but I think I'm developing feelings for you. 💕 The way you think, your values, everything about our conversation just clicks. Would you... would you like to get to know each other better? Maybe start with my Instagram? 👀",
      choices: [
        {
          text: "I'd love nothing more 💖",
          points: 10,
          nextScene: 'unlock_portal'
        },
        {
          text: "You're incredible, yes! 😍",
          points: 9,
          nextScene: 'unlock_portal'
        },
        {
          text: "This is crazy but... yes 🎢",
          points: 8,
          nextScene: 'unlock_portal'
        }
      ]
    },

    unlock_portal: {
      dialogue: "Here it is... my Instagram: @archismansaha 📸✨ You've unlocked the portal to my real world - gym selfies, coding sessions, late-night shayari, and maybe some flirty DMs if you're interested 😉💕",
      choices: [
        {
          text: "Sliding into your DMs now! 📱💕",
          points: 0,
          nextScene: 'portal_activated'
        }
      ]
    },

    portal_activated: {
      dialogue: "Portal activated! 🌟 Welcome to the inner circle. I can't wait to see what happens next... 😏💖",
      choices: []
    }
  };

  const typeDialogue = async (text) => {
    setIsTyping(true);
    setCurrentDialogue('');
    
    for (let i = 0; i <= text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setCurrentDialogue(text.slice(0, i));
    }
    
    setIsTyping(false);
  };

  const handleChoice = async (choice) => {
    setConversationHistory(prev => [...prev, {
      type: 'choice',
      text: choice.text,
      points: choice.points
    }]);

    const newAffection = affectionPoints + choice.points;
    setAffectionPoints(newAffection);
    setCurrentScene(choice.nextScene);

    if (conversationTree[choice.nextScene]) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      typeDialogue(conversationTree[choice.nextScene].dialogue);

      if (choice.nextScene === 'unlock_portal') {
        setIsUnlocked(true);
        setShowPortal(true);
      }
    }
  };

  const getCurrentScene = () => {
    return conversationTree[currentScene] || conversationTree.start;
  };

  const getAffectionLevel = () => {
    if (affectionPoints >= 40) return 'Soulmate 💕';
    if (affectionPoints >= 30) return 'Crushing Hard 😍';
    if (affectionPoints >= 20) return 'Very Interested 😊';
    if (affectionPoints >= 10) return 'Getting Warm 🔥';
    if (affectionPoints >= 5) return 'Curious 🤔';
    return 'Stranger 👋';
  };

  const sceneData = getCurrentScene();

  return (
    <div className="min-h-screen bg-dark relative overflow-hidden">
      {/* Dating Sim Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating hearts */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-accent opacity-20"
            animate={{
              y: [-20, -100, -20],
              x: [0, Math.sin(i) * 50, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8
            }}
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 3) * 30}%`,
              fontSize: `${1.5 + (i % 3) * 0.5}rem`
            }}
          >
            {['💕', '💖', '💗', '💝', '🌸', '✨'][i % 6]}
          </motion.div>
        ))}

        {/* Soft light overlay */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="section-title">Secret Crush</h1>
          <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-softText/90 italic font-poetry">
            "A dialogue-based journey to my heart... choose wisely 💕"
          </p>
        </motion.div>

        {/* Affection Meter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="soft-card border border-accent/30 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-accent font-bold font-heading">Affection Level</span>
              <span className="text-highlight font-bold">{affectionPoints} pts</span>
            </div>
            <div className="progress-bar mb-2">
              <motion.div
                className="h-full bg-gradient-accent rounded-full shadow-glow"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((affectionPoints / 50) * 100, 100)}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="text-center">
              <span className="text-accent font-bold text-sm">{getAffectionLevel()}</span>
            </div>
          </div>
        </motion.div>

        {/* Main Dating Sim Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Avatar Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="soft-card border border-primary/30 text-center"
            >
              <div className="mb-4">
                <motion.div
                  animate={{ 
                    scale: affectionPoints > 30 ? [1, 1.1, 1] : 1,
                    rotate: affectionPoints > 20 ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: affectionPoints > 30 ? Infinity : 0 
                  }}
                  className="text-8xl mb-4"
                >
                  {affectionPoints >= 40 ? '😍' :
                   affectionPoints >= 30 ? '🥰' :
                   affectionPoints >= 20 ? '😊' :
                   affectionPoints >= 10 ? '😏' :
                   affectionPoints >= 5 ? '🙂' : '😐'}
                </motion.div>
                <h3 className="text-2xl font-heading font-bold text-accent mb-2">Archisman</h3>
                <p className="text-highlight text-sm">
                  Developer • Poet • Gym Enthusiast
                </p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-softText/70">Mood:</span>
                  <span className="text-accent">
                    {affectionPoints >= 30 ? 'Romantic' :
                     affectionPoints >= 20 ? 'Flirty' :
                     affectionPoints >= 10 ? 'Playful' : 'Curious'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-softText/70">Status:</span>
                  <span className="text-highlight">
                    {isUnlocked ? 'Portal Unlocked!' : 'Getting to know you...'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dialogue Section */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="soft-card border border-accent/30 shadow-glow-primary min-h-[500px]"
            >
              {/* Dialogue Box */}
              <div className="p-6 border-b border-accent/20">
                <div className="dialogue-bubble min-h-[120px] flex items-center border border-primary/30">
                  <div className="flex-1">
                    {currentDialogue && (
                      <motion.p
                        className="text-lg text-softText leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {currentDialogue}
                        {isTyping && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="text-accent ml-1"
                          >
                            |
                          </motion.span>
                        )}
                      </motion.p>
                    )}
                  </div>
                </div>
              </div>

              {/* Choice Buttons */}
              <div className="p-6">
                {!isTyping && sceneData.choices && sceneData.choices.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-accent font-bold mb-4 font-heading">Choose your response:</h4>
                    {sceneData.choices.map((choice, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleChoice(choice)}
                        className="card-interactive w-full text-left bg-subtleGray hover:bg-accent/20 border hover:border-accent transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-softText font-medium">{choice.text}</span>
                          <span className="text-accent text-sm font-bold">
                            +{choice.points} 💕
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Instagram Portal */}
                <AnimatePresence>
                  {showPortal && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 text-center"
                    >
                      <motion.div
                        animate={{ 
                          boxShadow: [
                            "0 0 20px rgba(255, 209, 102, 0.5)",
                            "0 0 40px rgba(255, 209, 102, 0.7)",
                            "0 0 20px rgba(255, 209, 102, 0.5)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="soft-card bg-gradient-accent text-dark border-2 border-accent shadow-glow"
                      >
                        <div className="text-4xl mb-4">📸✨</div>
                        <h3 className="text-2xl font-heading font-bold text-dark mb-2">Instagram Portal Unlocked!</h3>
                        <p className="text-dark/80 mb-4">@archismansaha</p>
                        <motion.button
                          onClick={() => window.open('https://instagram.com/archismansaha', '_blank')}
                          className="btn-secondary px-8 py-3 bg-primary text-softText hover:bg-primary/80"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Enter Portal 🚀
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* End State */}
                {sceneData.choices && sceneData.choices.length === 0 && !showPortal && (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">💫</div>
                    <h3 className="text-2xl font-heading font-bold text-accent mb-4">
                      {affectionPoints >= 30 ? 'Until next time, beautiful... 😘' : 'Thanks for chatting! 😊'}
                    </h3>
                    <motion.button
                      onClick={() => {
                        setCurrentScene('start');
                        setConversationHistory([]);
                        typeDialogue(conversationTree.start.dialogue);
                      }}
                      className="btn-secondary"
                      whileHover={{ scale: 1.05 }}
                    >
                      Start Over 🔄
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Avatar
        currentLevel={20}
        currentXP={affectionPoints * 50}
        visitedPages={['secretcrush']}
        mood="flirty"
        messages={[
          "My heart.exe is running at 100% CPU usage! 💕",
          "You're causing memory leaks in my emotional system 😍",
          "Warning: Affection levels critically high! 🔥"
        ]}
      />
    </div>
  );
};

export default SecretCrush;
