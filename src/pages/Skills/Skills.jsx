import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Puzzle from '../../components/ui/Puzzle';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Avatar from '../../components/common/Avatar';

const Skills = ({ onPageLoad }) => {
  const [unlockedSkills, setUnlockedSkills] = useLocalStorage('unlockedSkills', []);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(() => {
    if (onPageLoad) onPageLoad();
  }, [onPageLoad]);

  const skillsData = {
    backend: {
      name: 'Backend',
      icon: '⚙️',
      color: 'from-primary to-highlight',
      skills: [
        {
          id: 'nodejs',
          name: 'Node.js',
          icon: '🟢',
          difficulty: 'Expert',
          experience: '3+ years',
          quiz: {
            question: 'What makes Node.js asynchronous?',
            options: ['Threading', 'Event Loop', 'Callbacks', 'Promises'],
            correctAnswer: 1
          }
        },
        {
          id: 'nestjs',
          name: 'NestJS',
          icon: '🔴',
          difficulty: 'Expert',
          experience: '2+ years',
          quiz: {
            question: 'Which decorator creates a NestJS controller?',
            options: ['@Service()', '@Controller()', '@Component()', '@Injectable()'],
            correctAnswer: 1
          }
        },
        {
          id: 'express',
          name: 'Express.js',
          icon: '🚀',
          difficulty: 'Advanced',
          experience: '3+ years',
          quiz: {
            question: 'Express.js is a framework for?',
            options: ['Frontend', 'Backend', 'Database', 'Mobile'],
            correctAnswer: 1
          }
        }
      ]
    },
    frontend: {
      name: 'Frontend',
      icon: '🎨',
      color: 'from-accent to-primary',
      skills: [
        {
          id: 'react',
          name: 'React.js',
          icon: '⚛️',
          difficulty: 'Expert',
          experience: '3+ years',
          quiz: {
            question: 'What is JSX in React?',
            options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'],
            correctAnswer: 0
          }
        },
        {
          id: 'tailwind',
          name: 'Tailwind CSS',
          icon: '🎯',
          difficulty: 'Advanced',
          experience: '2+ years',
          quiz: {
            question: 'Tailwind CSS is a what kind of framework?',
            options: ['Component-based', 'Utility-first', 'Semantic', 'Grid-based'],
            correctAnswer: 1
          }
        }
      ]
    },
    cloud: {
      name: 'Cloud & DevOps',
      icon: '☁️',
      color: 'from-highlight to-accent',
      skills: [
        {
          id: 'aws',
          name: 'AWS',
          icon: '📦',
          difficulty: 'Advanced',
          experience: '2+ years',
          quiz: {
            question: 'What does EC2 stand for?',
            options: ['Elastic Computer Cloud', 'Elastic Compute Cloud', 'Enhanced Computer Cloud', 'Extended Compute Cloud'],
            correctAnswer: 1
          }
        },
        {
          id: 'docker',
          name: 'Docker',
          icon: '🐳',
          difficulty: 'Advanced',
          experience: '2+ years',
          quiz: {
            question: 'Docker is used for?',
            options: ['Virtualization', 'Containerization', 'Version Control', 'Database Management'],
            correctAnswer: 1
          }
        }
      ]
    },
    database: {
      name: 'Database',
      icon: '🗄️',
      color: 'from-primary to-accent',
      skills: [
        {
          id: 'postgresql',
          name: 'PostgreSQL',
          icon: '🐘',
          difficulty: 'Advanced',
          experience: '3+ years',
          quiz: {
            question: 'PostgreSQL is what type of database?',
            options: ['NoSQL', 'Relational', 'Graph', 'Time-series'],
            correctAnswer: 1
          }
        },
        {
          id: 'mongodb',
          name: 'MongoDB',
          icon: '🍃',
          difficulty: 'Advanced',
          experience: '2+ years',
          quiz: {
            question: 'MongoDB stores data in?',
            options: ['Tables', 'Documents', 'Graphs', 'Key-Value pairs'],
            correctAnswer: 1
          }
        }
      ]
    }
  };

  const getAllSkills = () => {
    return Object.values(skillsData).flatMap(category => 
      category.skills.map(skill => ({ ...skill, category: category.name.toLowerCase() }))
    );
  };

  const getFilteredSkills = () => {
    if (currentCategory === 'all') return getAllSkills();
    return getAllSkills().filter(skill => skill.category === currentCategory);
  };

  const isSkillUnlocked = (skillId) => {
    return unlockedSkills.includes(skillId);
  };

  const handlePuzzleComplete = (skillId) => {
    if (!unlockedSkills.includes(skillId)) {
      setUnlockedSkills(prev => [...prev, skillId]);
    }
    setShowPuzzle(false);
    setSelectedSkill(null);
  };

  const handleSkillClick = (skill) => {
    if (isSkillUnlocked(skill.id)) return;
    
    setSelectedSkill(skill);
    setShowPuzzle(true);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Expert': 'from-accent to-primary',
      'Advanced': 'from-primary to-highlight',
      'Intermediate': 'from-highlight to-accent'
    };
    return colors[difficulty] || 'from-subtleGray to-dark';
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
          <h1 className="section-title">Skill Tree</h1>
          <p className="text-center text-softText/80 text-lg mb-12 max-w-2xl mx-auto">
            Unlock my technical abilities by solving puzzles. Each skill represents years of battle-tested experience.
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
            <div className="text-2xl font-bold text-accent">{unlockedSkills.length}</div>
            <div className="text-highlight text-sm">Unlocked</div>
          </div>
          <div className="soft-card text-center border border-highlight/30">
            <div className="text-3xl mb-2">🔒</div>
            <div className="text-2xl font-bold text-softText">{getAllSkills().length - unlockedSkills.length}</div>
            <div className="text-softText/70 text-sm">Locked</div>
          </div>
          <div className="soft-card text-center border border-accent/30">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-accent">{Math.round((unlockedSkills.length / getAllSkills().length) * 100)}%</div>
            <div className="text-highlight text-sm">Complete</div>
          </div>
          <div className="soft-card text-center border border-primary/30">
            <div className="text-3xl mb-2">🛡️</div>
            <div className="text-2xl font-bold text-softText">{Object.keys(skillsData).length}</div>
            <div className="text-softText/70 text-sm">Categories</div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setCurrentCategory('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              currentCategory === 'all' 
                ? 'btn-primary' 
                : 'btn-secondary'
            }`}
          >
            All Skills
          </button>
          {Object.entries(skillsData).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setCurrentCategory(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentCategory === key 
                  ? `bg-gradient-to-r ${category.color} text-dark shadow-soft` 
                  : 'bg-subtleGray text-softText hover:bg-subtleGray/80'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {getFilteredSkills().map((skill, index) => {
            const isUnlocked = isSkillUnlocked(skill.id);
            
            return (
              <motion.div
                key={skill.id}
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
                className={`aspect-square rounded-2xl p-4 cursor-pointer transition-all duration-300 border-2 ${
                  isUnlocked 
                    ? `bg-gradient-to-br ${getDifficultyColor(skill.difficulty)}/20 border-accent shadow-glow hover:scale-105` 
                    : 'bg-subtleGray border-subtleGray/50 hover:border-primary/50 hover:bg-subtleGray/80'
                }`}
                onClick={() => handleSkillClick(skill)}
                whileHover={{ scale: isUnlocked ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Lock/Unlock Indicator */}
                <div className="absolute top-2 right-2">
                  {isUnlocked ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-dark text-xs font-bold"
                    >
                      ✓
                    </motion.div>
                  ) : (
                    <div className="w-6 h-6 bg-subtleGray rounded-full flex items-center justify-center text-xs">
                      🔒
                    </div>
                  )}
                </div>

                <div className="h-full flex flex-col justify-center items-center text-center">
                  {/* Skill Icon */}
                  <div className={`text-4xl mb-3 ${isUnlocked ? 'opacity-100' : 'opacity-50'}`}>
                    {skill.icon}
                  </div>

                  {/* Skill Name */}
                  <h3 className={`font-heading font-bold text-sm mb-2 ${isUnlocked ? 'text-softText' : 'text-softText/50'}`}>
                    {skill.name}
                  </h3>

                  {/* Experience Badge */}
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    isUnlocked ? 'bg-dark/30 text-highlight' : 'bg-subtleGray text-softText/50'
                  }`}>
                    {skill.experience}
                  </div>

                  {/* Difficulty Badge */}
                  <div className={`absolute bottom-2 left-2 text-xs px-2 py-1 rounded-full font-bold ${
                    isUnlocked 
                      ? `bg-gradient-to-r ${getDifficultyColor(skill.difficulty)} text-dark` 
                      : 'bg-subtleGray text-softText/50'
                  }`}>
                    {skill.difficulty}
                  </div>
                </div>

                {/* Glowing Effect for Unlocked Skills */}
                {isUnlocked && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
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
              </motion.div>
            );
          })}
        </motion.div>

        {/* Puzzle Modal */}
        <AnimatePresence>
          {showPuzzle && selectedSkill && (
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
                    <div className="text-4xl mb-3">{selectedSkill.icon}</div>
                    <h2 className="text-2xl font-heading font-bold text-accent mb-2">
                      Unlock {selectedSkill.name}
                    </h2>
                    <p className="text-softText/70">
                      Solve this challenge to add {selectedSkill.name} to your arsenal!
                    </p>
                  </div>

                  <Puzzle
                    question={selectedSkill.quiz.question}
                    options={selectedSkill.quiz.options}
                    correctAnswer={selectedSkill.quiz.correctAnswer}
                    onSolved={() => handlePuzzleComplete(selectedSkill.id)}
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
        currentLevel={20}
        currentXP={2000}
        visitedPages={['skills']}
        mood="encouraging"
        messages={[
          "Each skill unlocked makes you stronger! 💪",
          "Love seeing people explore my abilities! 🔍",
          "Puzzles are fun, right? 🧩",
          "You're doing great! Keep unlocking! ⭐"
        ]}
      />
    </div>
  );
};

export default Skills;
