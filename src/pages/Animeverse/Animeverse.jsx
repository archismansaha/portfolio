import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Puzzle from '../../components/ui/Puzzle';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Avatar from '../../components/common/Avatar';

const Animeverse = ({ onPageLoad }) => {
  const [unlockedAnime, setUnlockedAnime] = useLocalStorage('unlockedAnime', []);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [revealedCharacter, setRevealedCharacter] = useState(null);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    if (onPageLoad) onPageLoad();
  }, [onPageLoad]);

  const animeData = [
    {
      id: 'mha',
      title: 'My Hero Academia',
      quote: 'I am here!',
      character: 'All Might',
      bgImage: '🦸‍♂️',
      bgGradient: 'from-primary to-highlight',
      borderColor: 'border-primary',
      favoriteCharacter: 'Deku (Izuku Midoriya)',
      whyFavorite: 'His journey from quirkless to hero inspires me daily! The way he analyzes quirks reminds me of debugging code - methodical, persistent, and always learning from failures. Plus, his notebook-taking habits match my documentation obsession! 📝💚',
      personalConnection: 'Watching Deku overcome challenges without natural talent hits close to home as a self-taught developer.',
      genre: 'Superhero',
      quiz: {
        question: 'Complete this iconic quote: "I am ____!"',
        options: ['strong', 'here', 'ready', 'number one'],
        correctAnswer: 1
      }
    },
    {
      id: 'jjk', 
      title: 'Jujutsu Kaisen',
      quote: 'Power is everything.',
      character: 'Sukuna',
      bgImage: '👹',
      bgGradient: 'from-accent to-primary',
      borderColor: 'border-accent',
      favoriteCharacter: 'Gojo Satoru',
      whyFavorite: 'The strongest sorcerer with unlimited power? That\'s basically me with unlimited AWS credits! 😎 His confidence, strategic thinking, and ability to make complex techniques look effortless reminds me of writing clean, scalable code.',
      personalConnection: 'His teaching style and mentorship approach resonates with my role as a workshop instructor.',
      genre: 'Supernatural',
      quiz: {
        question: 'What does Sukuna believe is everything?',
        options: ['Strength', 'Power', 'Fear', 'Curse energy'],
        correctAnswer: 1
      }
    },
    {
      id: 'onepiece',
      title: 'One Piece', 
      quote: 'I\'m gonna become King of the Pirates.',
      character: 'Monkey D. Luffy',
      bgImage: '🏴‍☠️',
      bgGradient: 'from-highlight to-accent',
      borderColor: 'border-highlight',
      favoriteCharacter: 'Roronoa Zoro',
      whyFavorite: 'Three-sword style = three monitors setup! 🖥️⚔️ His dedication to training mirrors my gym routine, and his loyalty to the crew reflects my commitment to team projects. Also, getting lost in code navigation is basically the same as his directional challenges! 😅',
      personalConnection: 'His discipline and never-give-up attitude in both training and battles inspires my coding marathons.',
      genre: 'Adventure',
      quiz: {
        question: 'What does Luffy want to become?',
        options: ['Pirate King', 'Strongest Fighter', 'World Explorer', 'Treasure Hunter'],
        correctAnswer: 0
      }
    },
    {
      id: 'aot',
      title: 'Attack on Titan',
      quote: 'If you win, you live. If you lose, you die.',
      character: 'Eren Yeager',
      bgImage: '⚔️',
      bgGradient: 'from-subtleGray to-primary',
      borderColor: 'border-subtleGray',
      favoriteCharacter: 'Levi Ackerman',
      whyFavorite: 'Clean code, clean kills! His attention to detail and precision in combat is like writing bug-free code on the first try. Short king energy with maximum efficiency - basically the perfect senior developer!',
      personalConnection: 'His leadership style and ability to make hard decisions under pressure relates to my project management.',
      genre: 'Dark Fantasy',
      quiz: {
        question: 'Complete: "If you win, you live. If you lose, you ____."',
        options: ['fail', 'die', 'retreat', 'learn'],
        correctAnswer: 1
      }
    }
  ];

  const isAnimeUnlocked = (animeId) => {
    return unlockedAnime.includes(animeId);
  };

  const handlePuzzleComplete = (animeId) => {
    if (!unlockedAnime.includes(animeId)) {
      setUnlockedAnime(prev => [...prev, animeId]);
    }
    setShowPuzzle(false);
    setSelectedAnime(null);
    
    const anime = animeData.find(a => a.id === animeId);
    setRevealedCharacter(anime);
    setTimeout(() => setRevealedCharacter(null), 5000);
  };

  const handleTileClick = (anime) => {
    if (isAnimeUnlocked(anime.id)) {
      setRevealedCharacter(anime);
      setTimeout(() => setRevealedCharacter(null), 8000);
    } else {
      setSelectedAnime(anime);
      setShowPuzzle(true);
    }
  };

  const getFilteredAnime = () => {
    if (filterType === 'all') return animeData;
    return animeData.filter(anime => anime.genre.toLowerCase() === filterType);
  };

  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="section-title">Animeverse</h1>
          <p className="text-center text-softText/80 text-lg mb-12 max-w-2xl mx-auto">
            My personal collection of anime worlds. Solve quote puzzles to unlock my favorite characters and discover why they inspire my coding journey!
          </p>
        </motion.div>

        {/* Progress Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="soft-card text-center border border-primary/30">
            <div className="text-3xl mb-2">🔓</div>
            <div className="text-2xl font-bold text-accent">{unlockedAnime.length}</div>
            <div className="text-highlight text-sm">Unlocked</div>
          </div>
          <div className="soft-card text-center border border-highlight/30">
            <div className="text-3xl mb-2">🔒</div>
            <div className="text-2xl font-bold text-softText">{animeData.length - unlockedAnime.length}</div>
            <div className="text-softText/70 text-sm">Locked</div>
          </div>
          <div className="soft-card text-center border border-accent/30">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-accent">{Math.round((unlockedAnime.length / animeData.length) * 100)}%</div>
            <div className="text-highlight text-sm">Complete</div>
          </div>
          <div className="soft-card text-center border border-primary/30">
            <div className="text-3xl mb-2">🎌</div>
            <div className="text-2xl font-bold text-softText">{animeData.length}</div>
            <div className="text-softText/70 text-sm">Total Anime</div>
          </div>
        </motion.div>

        {/* Genre Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setFilterType('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filterType === 'all' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            All Anime
          </button>
          {['superhero', 'supernatural', 'adventure', 'dark fantasy'].map((genre) => (
            <button
              key={genre}
              onClick={() => setFilterType(genre)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-300 ${
                filterType === genre 
                  ? 'bg-gradient-to-r from-accent to-primary text-dark shadow-soft' 
                  : 'bg-subtleGray text-softText hover:bg-subtleGray/80'
              }`}
            >
              {genre}
            </button>
          ))}
        </motion.div>

        {/* Anime Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {getFilteredAnime().map((anime, index) => {
            const isUnlocked = isAnimeUnlocked(anime.id);
            
            return (
              <motion.div
                key={anime.id}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  y: isUnlocked ? [0, -5, 0] : 0
                }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.6,
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="card-interactive aspect-square"
                onClick={() => handleTileClick(anime)}
              >
                {/* Lock/Unlock Indicator */}
                <div className="absolute top-3 right-3 z-10">
                  {isUnlocked ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-dark font-bold text-sm shadow-glow"
                    >
                      ✓
                    </motion.div>
                  ) : (
                    <div className="w-8 h-8 bg-subtleGray rounded-full flex items-center justify-center text-sm">
                      🔒
                    </div>
                  )}
                </div>

                {/* Anime Content */}
                <div className="h-full flex flex-col justify-center items-center text-center p-4 relative">
                  <div className={`text-6xl mb-4 ${isUnlocked ? 'opacity-100' : 'opacity-30'}`}>
                    {anime.bgImage}
                  </div>
                  
                  <h3 className={`font-heading font-bold text-lg mb-2 ${isUnlocked ? 'text-accent' : 'text-softText/50'}`}>
                    {anime.title}
                  </h3>

                  {isUnlocked ? (
                    <div className="space-y-2">
                      <p className="text-sm text-softText italic">
                        "{anime.quote}"
                      </p>
                      <p className="text-xs text-highlight font-medium">
                        - {anime.character}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-softText/60 italic">
                        "Quote locked..."
                      </p>
                      <p className="text-xs text-softText/50 mt-2">
                        Click to solve puzzle!
                      </p>
                    </div>
                  )}

                  {/* Glowing Effect for Unlocked */}
                  {isUnlocked && (
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(255, 209, 102, 0.3)",
                          "0 0 30px rgba(255, 209, 102, 0.5)",
                          "0 0 20px rgba(255, 209, 102, 0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Character Reveal Modal */}
        <AnimatePresence>
          {revealedCharacter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
                className="bg-subtleGray rounded-2xl border-2 border-accent shadow-glow max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{revealedCharacter.bgImage}</div>
                    <h2 className="text-3xl font-heading font-bold text-accent mb-2">
                      {revealedCharacter.title}
                    </h2>
                    <div className="bg-dark/50 rounded-lg p-4 mb-6">
                      <p className="text-xl text-softText italic mb-2">
                        "{revealedCharacter.quote}"
                      </p>
                      <p className="text-highlight font-medium">
                        - {revealedCharacter.character}
                      </p>
                    </div>
                  </div>

                  <div className="bg-dark/50 rounded-xl p-6 mb-6">
                    <h3 className="text-accent font-bold mb-4 text-lg flex items-center">
                      ⭐ My Favorite Character
                    </h3>
                    <h4 className="text-2xl font-heading font-bold text-softText mb-3">
                      {revealedCharacter.favoriteCharacter}
                    </h4>
                    <p className="text-softText/90 leading-relaxed mb-4">
                      {revealedCharacter.whyFavorite}
                    </p>
                    <div className="bg-primary/20 rounded-lg p-3">
                      <p className="text-highlight text-sm">
                        <strong>Personal Connection:</strong> {revealedCharacter.personalConnection}
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setRevealedCharacter(null)}
                      className="btn-secondary px-6 py-2"
                    >
                      Close ✨
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Puzzle Modal */}
        <AnimatePresence>
          {showPuzzle && selectedAnime && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-subtleGray rounded-2xl border-2 border-primary shadow-glow-primary max-w-2xl w-full"
              >
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">{selectedAnime.bgImage}</div>
                    <h2 className="text-2xl font-heading font-bold text-accent mb-2">
                      Unlock {selectedAnime.title}
                    </h2>
                    <p className="text-softText/70">
                      Answer the quote puzzle to reveal my favorite character!
                    </p>
                  </div>

                  <Puzzle
                    question={selectedAnime.quiz.question}
                    options={selectedAnime.quiz.options}
                    correctAnswer={selectedAnime.quiz.correctAnswer}
                    onSolved={() => handlePuzzleComplete(selectedAnime.id)}
                  />

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setShowPuzzle(false)}
                      className="text-softText/70 hover:text-softText text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Avatar
        currentLevel={12}
        currentXP={1200}
        visitedPages={['animeverse']}
        mood="excited"
        messages={[
          "Anime and coding - my two passions! 🎌💻",
          "Each character teaches me something new! ⭐",
          "Ready to unlock more of my favorites? 🔓",
          "Which anime should we binge next? 😊"
        ]}
      />
    </div>
  );
};

export default Animeverse;
