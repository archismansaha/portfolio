import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestCard from '../../components/ui/QuestCard';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Avatar from '../../components/common/Avatar';

const Projects = ({ onPageLoad }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [completedProjects, setCompletedProjects] = useLocalStorage('completedProjects', []);
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  useEffect(() => {
    if (onPageLoad) onPageLoad();
  }, [onPageLoad]);

  const projectsData = [
    {
      id: 'medace',
      title: 'MedAce Healthcare System',
      role: 'Full-Stack Developer',
      questType: 'Epic Quest',
      difficulty: 'Legendary',
      status: 'Completed',
      duration: '6 months',
      xpReward: 5000,
      problem: 'Healthcare providers struggled with fragmented patient records across multiple systems.',
      outcome: 'Built a unified healthcare record system serving 10,000+ patients with 99.9% uptime.',
      techStack: [
        { name: 'Node.js', color: 'bg-primary' },
        { name: 'MongoDB', color: 'bg-highlight' },
        { name: 'React.js', color: 'bg-accent' },
        { name: 'Express', color: 'bg-subtleGray' },
        { name: 'JWT', color: 'bg-primary' }
      ],
      features: [
        'Patient record management with HIPAA compliance',
        'Real-time appointment scheduling system', 
        'Medical history tracking and analytics',
        'Multi-role access control for doctors/nurses/admin'
      ],
      icon: '🏥',
      bgGradient: 'from-primary to-highlight',
      borderColor: 'border-primary'
    },
    {
      id: 'decentmail',
      title: 'DecentMail',
      role: 'Blockchain Developer',
      questType: 'Innovation Quest',
      difficulty: 'Epic',
      status: 'Completed',
      duration: '4 months',
      xpReward: 4000,
      problem: 'Traditional email systems lack privacy and user data ownership.',
      outcome: 'Created a decentralized email platform on Polygon with end-to-end encryption.',
      techStack: [
        { name: 'React.js', color: 'bg-accent' },
        { name: 'Tailwind CSS', color: 'bg-highlight' },
        { name: 'Hardhat', color: 'bg-primary' },
        { name: 'Polygon', color: 'bg-accent' },
        { name: 'Solidity', color: 'bg-subtleGray' }
      ],
      features: [
        'Decentralized message storage on IPFS',
        'Smart contract-based identity management',
        'End-to-end encryption for privacy',
        'Gas-optimized transactions on Polygon network'
      ],
      icon: '📧',
      bgGradient: 'from-accent to-primary',
      borderColor: 'border-accent'
    },
    {
      id: 'bidnirman',
      title: 'Bidnirman Construction Platform',
      role: 'Lead Developer',
      questType: 'Business Quest',
      difficulty: 'Rare',
      status: 'Completed',
      duration: '5 months',
      xpReward: 3500,
      problem: 'Construction companies faced inefficient bidding processes with manual paperwork.',
      outcome: 'Developed an MVP that streamlined bidding for 500+ construction projects.',
      techStack: [
        { name: 'Node.js', color: 'bg-primary' },
        { name: 'MongoDB', color: 'bg-highlight' },
        { name: 'React.js', color: 'bg-accent' },
        { name: 'AWS S3', color: 'bg-primary' },
        { name: 'Socket.io', color: 'bg-subtleGray' }
      ],
      features: [
        'Real-time bidding system with live updates',
        'Document management and file upload system',
        'Automated bid evaluation and ranking',
        'Contractor verification and rating system'
      ],
      icon: '🏗️',
      bgGradient: 'from-highlight to-accent',
      borderColor: 'border-highlight'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      "Legendary": "from-accent to-primary text-dark",
      "Epic": "from-primary to-highlight text-softText",
      "Rare": "from-highlight to-accent text-dark",
      "Uncommon": "from-primary to-subtleGray text-softText"
    };
    return colors[difficulty] || "from-subtleGray to-dark text-softText";
  };

  const getFilteredProjects = () => {
    if (filterDifficulty === 'all') return projectsData;
    return projectsData.filter(project => project.difficulty === filterDifficulty);
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
          <h1 className="section-title">Quest Board</h1>
          <p className="text-center text-softText/80 text-lg mb-12 max-w-2xl mx-auto">
            Epic adventures in code and innovation. Each quest represents a battle fought and won in the realm of software development.
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="soft-card text-center border border-primary/30">
            <div className="text-3xl mb-2">⚔️</div>
            <div className="text-2xl font-bold text-accent">3</div>
            <div className="text-highlight text-sm">Quests Completed</div>
          </div>
          <div className="soft-card text-center border border-highlight/30">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-softText">0</div>
            <div className="text-softText/70 text-sm">Active Quests</div>
          </div>
          <div className="soft-card text-center border border-accent/30">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-accent">12.5K</div>
            <div className="text-highlight text-sm">Total XP Earned</div>
          </div>
          <div className="soft-card text-center border border-primary/30">
            <div className="text-3xl mb-2">🛡️</div>
            <div className="text-2xl font-bold text-softText">15+</div>
            <div className="text-softText/70 text-sm">Tech Mastered</div>
          </div>
        </motion.div>

        {/* Difficulty Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setFilterDifficulty('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filterDifficulty === 'all' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            🗂️ All Quests
          </button>
          {['Legendary', 'Epic', 'Rare', 'Uncommon'].map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setFilterDifficulty(difficulty)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                filterDifficulty === difficulty 
                  ? `bg-gradient-to-r ${getDifficultyColor(difficulty)} shadow-soft` 
                  : 'bg-subtleGray text-softText hover:bg-subtleGray/80'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {getFilteredProjects().map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              className="card-interactive"
              onClick={() => setSelectedProject(project)}
            >
              {/* Difficulty Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getDifficultyColor(project.difficulty)} shadow-soft`}>
                  {project.difficulty}
                </span>
              </div>

              {/* Project Icon */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 float-animation">{project.icon}</div>
                <h3 className="text-xl font-heading font-bold text-accent mb-2">{project.title}</h3>
                <p className="text-highlight font-medium text-sm">{project.role}</p>
              </div>

              {/* Brief Description */}
              <p className="text-softText/80 text-sm mb-6 line-clamp-3">{project.problem}</p>

              {/* Tech Stack Preview */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="bg-primary/20 text-highlight px-2 py-1 rounded text-xs border border-primary/30">
                      {tech.name}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-accent text-xs">+{project.techStack.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Quest Info */}
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-accent font-bold">+{project.xpReward} XP</span>
                  <span className="text-softText/70 ml-2">• {project.duration}</span>
                </div>
                <div className="text-highlight text-sm font-medium">
                  View Quest →
                </div>
              </div>

              {/* Completion Status */}
              {project.status === 'Completed' && (
                <div className="absolute top-4 left-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-dark font-bold text-sm shadow-glow">
                    ✓
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
                className="bg-subtleGray rounded-2xl border-2 border-primary shadow-glow-primary max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center space-x-6">
                      <div className="text-6xl">{selectedProject.icon}</div>
                      <div>
                        <h2 className="text-3xl font-heading font-bold text-accent mb-2">
                          {selectedProject.title}
                        </h2>
                        <div className="flex items-center space-x-4 mb-2">
                          <span className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${getDifficultyColor(selectedProject.difficulty)} shadow-soft`}>
                            {selectedProject.difficulty}
                          </span>
                          <span className="text-highlight font-medium text-lg">{selectedProject.role}</span>
                        </div>
                        <div className="text-softText/70">
                          {selectedProject.duration} • +{selectedProject.xpReward} XP
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-softText/70 hover:text-softText text-3xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Problem & Solution */}
                    <div className="space-y-6">
                      <div className="bg-dark/50 rounded-xl p-6 border border-primary/20">
                        <h3 className="text-accent font-bold mb-3 flex items-center text-lg">
                          <span className="mr-2">⚠️</span> The Challenge
                        </h3>
                        <p className="text-softText leading-relaxed">{selectedProject.problem}</p>
                      </div>

                      <div className="bg-dark/50 rounded-xl p-6 border border-highlight/20">
                        <h3 className="text-highlight font-bold mb-3 flex items-center text-lg">
                          <span className="mr-2">🏆</span> Victory Achieved
                        </h3>
                        <p className="text-softText leading-relaxed">{selectedProject.outcome}</p>
                      </div>
                    </div>

                    {/* Tech & Features */}
                    <div className="space-y-6">
                      <div className="bg-dark/50 rounded-xl p-6 border border-accent/20">
                        <h3 className="text-accent font-bold mb-4 flex items-center text-lg">
                          <span className="mr-2">🛠️</span> Tech Arsenal
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.techStack.map((tech, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="bg-primary/20 text-highlight px-3 py-2 rounded-lg text-sm border border-primary/30 font-medium"
                            >
                              {tech.name}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-dark/50 rounded-xl p-6 border border-highlight/20">
                        <h3 className="text-highlight font-bold mb-4 flex items-center text-lg">
                          <span className="mr-2">✨</span> Key Features
                        </h3>
                        <ul className="space-y-3">
                          {selectedProject.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start text-softText"
                            >
                              <span className="text-accent mr-3 mt-1">▸</span>
                              <span className="leading-relaxed">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Avatar
        currentLevel={18}
        currentXP={1800}
        visitedPages={['projects']}
        mood="proud"
        messages={[
          "Each project taught me something valuable! 🚀",
          "Building solutions is my passion! 💻",
          "These quests shaped who I am today! ⭐",
          "Want to collaborate on the next adventure? 😊"
        ]}
      />
    </div>
  );
};

export default Projects;
