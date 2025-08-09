import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useGameContext } from '../../context/GameContext';

const PremiumHogwartsExperience = ({ onPageLoad }) => {
  const [journeyStage, setJourneyStage] = useState('platform');
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [showSortingHat, setShowSortingHat] = useState(false);
  const [hatSpeaking, setHatSpeaking] = useState(false);
  const [hatDialogue, setHatDialogue] = useState('');
  const [weatherMode, setWeatherMode] = useState('storm');
  const [magicalEffects, setMagicalEffects] = useState([]);
  
  // Video backgrounds
  const videoRef = useRef(null);
  const ambientAudioRef = useRef(null);
  const { speak } = useSpeechSynthesis();
  const { visitPage, addXP, totalXP, currentLevel } = useGameContext();

  // Video sources from research
  const videoBackgrounds = {
    platform: '/videos/hogwarts-express-station.mp4',
    castle: '/videos/hogwarts-castle-night.mp4',
    great_hall: '/videos/great-hall-floating-candles.mp4',
    common_room: '/videos/gryffindor-common-room.mp4'
  };

  // Audio sources from research
  const audioTracks = {
    hedwig: '/audio/hedwigs-theme.mp3',
    sorting: '/audio/sorting-hat-ceremony.mp3',
    spell_cast: '/audio/spell-casting.mp3',
    thunder: '/audio/thunder-storm.mp3',
    ambient: '/audio/hogwarts-ambient.mp3'
  };

  // Hat speaking with voice synthesis
  const speakHatDialogue = useCallback((text, voice_type = 'wise') => {
    setHatSpeaking(true);
    setHatDialogue(text);
    
    speak({
      text: text,
      rate: 0.7,
      pitch: voice_type === 'wise' ? 0.6 : 0.8,
      voice: window.speechSynthesis.getVoices().find(voice => 
        voice.name.includes('English') && voice.name.includes('Male')
      )
    });
    
    setTimeout(() => setHatSpeaking(false), text.length * 50);
  }, [speak]);

  // Play background video and audio
  const setEnvironment = useCallback((stage) => {
    // Change background video
    if (videoRef.current && videoBackgrounds[stage]) {
      videoRef.current.src = videoBackgrounds[stage];
      videoRef.current.play().catch(console.warn);
    }
    
    // Change ambient audio
    if (ambientAudioRef.current && audioTracks[stage]) {
      ambientAudioRef.current.src = audioTracks[stage];
      ambientAudioRef.current.volume = 0.3;
      ambientAudioRef.current.loop = true;
      ambientAudioRef.current.play().catch(console.warn);
    }
  }, []);

  // Enhanced sorting ceremony with voice
  const startSortingCeremony = useCallback(() => {
    setShowSortingHat(true);
    setJourneyStage('sorting');
    setEnvironment('great_hall');
    
    setTimeout(() => {
      speakHatDialogue("Hmm... another student arrives at Hogwarts. Let me see what lies within your mind...");
      
      setTimeout(() => {
        speakHatDialogue("I shall ask you some questions to determine where you truly belong. Answer truthfully, young one.");
      }, 6000);
    }, 2000);
  }, [speakHatDialogue, setEnvironment]);

  // Weather effects with real videos
  const WeatherOverlay = () => {
    if (weatherMode === 'storm') {
      return (
        <>
          <video 
            autoPlay 
            loop 
            muted 
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
            src="/videos/rain-storm-overlay.mp4"
          />
          {/* Lightning flashes */}
          <motion.div
            className="absolute inset-0 bg-white opacity-0"
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ 
              duration: 0.2, 
              repeat: Infinity, 
              repeatDelay: Math.random() * 5 + 3 
            }}
          />
        </>
      );
    }
    return null;
  };

  // Floating lanterns from video
  const FloatingLanterns = () => (
    <div className="absolute inset-0 pointer-events-none">
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="/videos/floating-lanterns.mp4"
      />
    </div>
  );

  useEffect(() => {
    if (onPageLoad) onPageLoad();
    visitPage('premium-hogwarts');
    setEnvironment('platform');
    
    // Welcome with voice
    setTimeout(() => {
      speakHatDialogue("Welcome to Platform 9¾! Your magical journey awaits...");
      addXP(200, '⚡ Entered the Wizarding World!');
    }, 2000);
  }, [onPageLoad, visitPage, setEnvironment, speakHatDialogue, addXP]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
        src={videoBackgrounds.castle}
      />
      
      {/* Ambient Audio */}
      <audio ref={ambientAudioRef} />
      
      {/* Weather Effects */}
      <WeatherOverlay />
      
      {/* Floating Lanterns */}
      <FloatingLanterns />
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Audio Controls */}
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        <motion.button
          onClick={() => setWeatherMode(prev => 
            prev === 'storm' ? 'clear' : 'storm'
          )}
          className="bg-black/70 text-white p-3 rounded-full backdrop-blur-sm border border-white/30"
          whileHover={{ scale: 1.1 }}
        >
          {weatherMode === 'storm' ? '⛈️' : '🌙'}
        </motion.button>
        
        <motion.button
          onClick={() => {
            if (ambientAudioRef.current) {
              ambientAudioRef.current.muted = !ambientAudioRef.current.muted;
            }
          }}
          className="bg-black/70 text-white p-3 rounded-full backdrop-blur-sm border border-white/30"
          whileHover={{ scale: 1.1 }}
        >
          🔊
        </motion.button>
      </div>

      {/* Enhanced Sorting Hat with Voice */}
      <AnimatePresence>
        {showSortingHat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-amber-900/90 to-yellow-800/90 backdrop-blur-lg text-white rounded-3xl p-8 max-w-3xl w-full border-4 border-yellow-600 relative"
            >
              {/* Animated Sorting Hat */}
              <div className="text-center mb-8">
                <motion.div
                  animate={hatSpeaking ? {
                    scaleY: [1, 1.15, 1],
                    rotateZ: [0, 3, -3, 0]
                  } : {}}
                  transition={{ 
                    duration: 0.5, 
                    repeat: hatSpeaking ? Infinity : 0 
                  }}
                  className="text-9xl mb-6 inline-block"
                  style={{ 
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                    textShadow: '0 0 30px rgba(255,215,0,0.8)'
                  }}
                >
                  🎩
                </motion.div>
                
                {/* Voice visualization */}
                {hatSpeaking && (
                  <motion.div 
                    className="flex justify-center space-x-1 mb-4"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-6 bg-yellow-400 rounded-full"
                        animate={{ 
                          scaleY: [1, 2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </motion.div>
                )}
                
                {hatDialogue && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/50 rounded-xl p-6 mb-6 border border-yellow-500/50"
                  >
                    <p className="text-xl font-serif leading-relaxed">
                      "{hatDialogue}"
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 font-serif"
              style={{ 
                textShadow: '0 0 30px rgba(255,215,0,0.8), 0 0 60px rgba(255,140,0,0.6)' 
              }}>
            ⚡ Hogwarts Legacy ⚡
          </h1>
          
          <p className="text-2xl text-yellow-200 italic max-w-3xl mx-auto leading-relaxed">
            "It is our choices that show what we truly are, far more than our abilities."
          </p>
          
          <motion.button
            onClick={startSortingCeremony}
            className="bg-gradient-to-r from-red-600 to-red-800 text-white px-12 py-6 rounded-2xl text-2xl font-bold border-4 border-yellow-400 shadow-2xl"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 50px rgba(255,215,0,0.8)' 
            }}
            whileTap={{ scale: 0.95 }}
          >
            🎩 Begin Sorting Ceremony
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumHogwartsExperience;
