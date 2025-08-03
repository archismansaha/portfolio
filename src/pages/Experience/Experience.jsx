// src/pages/Experience/Experience.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Experience = ({ onPageLoad }) => {
  const [selectedMission, setSelectedMission] = useState(null);
  const [completedMissions, setCompletedMissions] = useState([]);

  useEffect(() => {
    if (onPageLoad) {
      onPageLoad();
    }
    
    // Simulate mission completion animation
    const timer = setInterval(() => {
      setCompletedMissions(prev => {
        if (prev.length < experienceData.length) {
          return [...prev, prev.length];
        }
        clearInterval(timer);
        return prev;
      });
    }, 600);

    return () => clearInterval(timer);
  }, [onPageLoad]);

  // Experience data structured as mission logs
  const experienceData = [
    {
      id: 1,
      role: "Senior Backend Developer",
      company: "CloudKaptan",
      duration: "2023 - Present",
      location: "Remote",
      missionType: "Enterprise Integration",
      difficulty: "Legendary",
      status: "Active",
      achievements: [
        "Architected Salesforce CRM integration handling 10K+ daily transactions",
        "Implemented DocuSign API for automated contract workflows",
        "Built NACHA payment processing system with 99.9% uptime",
        "Reduced API response time by 40% through optimization"
      ],
      techStack: [
        { name: "Salesforce", color: "bg-blue-500" },
        { name: "DocuSign API", color: "bg-yellow-500" },
        { name: "NACHA", color: "bg-green-500" },
        { name: "Node.js", color: "bg-green-600" },
        { name: "PostgreSQL", color: "bg-blue-600" },
        { name: "Redis", color: "bg-red-500" }
      ],
      xpGained: 2500,
      icon: "🏢",
      bgColor: "from-blue-900 to-purple-900"
    },
    {
      id: 2,
      role: "AI Backend Engineer",
      company: "Deltadots AI",
      duration: "2022 - 2023",
      location: "Bangalore, India",
      missionType: "AI Content Moderation",
      difficulty: "Epic",
      status: "Completed",
      achievements: [
        "Developed NSFW content moderation system processing 1M+ images daily",
        "Integrated AWS MediaConvert for video processing pipeline",
        "Built real-time ML model deployment using Docker & Kubernetes",
        "Achieved 95% accuracy in content classification"
      ],
      techStack: [
        { name: "AWS MediaConvert", color: "bg-orange-500" },
        { name: "TensorFlow", color: "bg-orange-600" },
        { name: "Docker", color: "bg-blue-500" },
        { name: "Kubernetes", color: "bg-blue-600" },
        { name: "Python", color: "bg-yellow-600" },
        { name: "MongoDB", color: "bg-green-500" }
      ],
      xpGained: 2000,
      icon: "🤖",
      bgColor: "from-purple-900 to-pink-900"
    },
    {
      id: 3,
      role: "IoT Backend Developer",
      company: "Xconics",
      duration: "2021 - 2022",
      location: "Kolkata, India",
      missionType: "IoT Infrastructure",
      difficulty: "Rare",
      status: "Completed",
      achievements: [
        "Built IoT backend handling 50K+ device connections via MQTT",
        "Developed real-time GPS tracking system for fleet management",
        "Implemented Firebase real-time database for live monitoring",
        "Created scalable microservices architecture"
      ],
      techStack: [
        { name: "MQTT", color: "bg-purple-500" },
        { name: "Firebase", color: "bg-yellow-500" },
        { name: "GPS APIs", color: "bg-green-500" },
        { name: "Node.js", color: "bg-green-600" },
        { name: "WebSockets", color: "bg-blue-500" },
        { name: "AWS IoT", color: "bg-orange-500" }
      ],
      xpGained: 1500,
      icon: "📡",
      bgColor: "from-green-900 to-blue-900"
    },
    {
      id: 4,
      role: "Full Stack Developer",
      company: "WhalesBook",
      duration: "2020 - 2021",
      location: "Remote",
      missionType: "Legacy Migration",
      difficulty: "Uncommon",
      status: "Completed",
      achievements: [
        "Migrated monolithic app to NestJS microservices architecture",
        "Implemented Redis queue system for background job processing",
        "Built RESTful APIs serving 100K+ daily requests",
        "Reduced server response time by 60% post-migration"
      ],
      techStack: [
        { name: "NestJS", color: "bg-red-500" },
        { name: "Redis", color: "bg-red-600" },
        { name: "TypeScript", color: "bg-blue-500" },
        { name: "PostgreSQL", color: "bg-blue-600" },
        { name: "Docker", color: "bg-blue-400" },
        { name: "JWT", color: "bg-purple-500" }
      ],
      xpGained: 1200,
      icon: "🐋",
      bgColor: "from-indigo-900 to-purple-900"
    }
  ];

  // Get difficulty badge styling
  const getDifficultyBadge = (difficulty) => {
    const styles = {
      "Legendary": "bg-gradient-to-r from-yellow-400 to-orange-500 text-black",
      "Epic": "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      "Rare": "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
      "Uncommon": "bg-gradient-to-r from-green-500 to-teal-500 text-white"
    };
    return styles[difficulty] || "bg-gray-500 text-white";
  };

  // Mission card component
  const MissionCard = ({ mission, index, isCompleted }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 50, rotateY: -15 }}
        animate={{ 
          opacity: isCompleted ? 1 : 0.3, 
          y: 0, 
          rotateY: 0,
          scale: isCompleted ? 1 : 0.9
        }}
        transition={{ 
          delay: index * 0.2,
          duration: 0.8,
          type: "spring",
          stiffness: 100
        }}
        className="perspective-1000"
      >
        <motion.div
          className="relative w-full h-96 cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Front Card */}
          <div 
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${mission.bgColor} rounded-2xl border border-gray-600 shadow-2xl backface-hidden`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="p-6 h-full flex flex-col justify-between">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{mission.icon}</div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyBadge(mission.difficulty)}`}>
                    {mission.difficulty}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 font-serif">
                  {mission.role}
                </h3>
                <div className="text-cyan-300 font-medium mb-1">{mission.company}</div>
                <div className="text-gray-300 text-sm mb-4">{mission.duration} • {mission.location}</div>
                
                <div className="bg-black/30 rounded-lg p-3 mb-4">
                  <div className="text-yellow-400 text-xs font-bold mb-1">MISSION TYPE</div>
                  <div className="text-white font-medium">{mission.missionType}</div>
                </div>
              </div>

              {/* Footer */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-green-400 font-bold">
                    +{mission.xpGained} XP Gained
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-bold ${
                    mission.status === 'Active' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {mission.status}
                  </div>
                </div>
                
                <div className="text-center text-gray-400 text-sm">
                  Click to view mission details →
                </div>
              </div>
            </div>
          </div>

          {/* Back Card */}
          <div 
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${mission.bgColor} rounded-2xl border border-gray-600 shadow-2xl backface-hidden`}
            style={{ 
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-white font-serif">Mission Log</h4>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h5 className="text-yellow-400 font-bold mb-3 text-sm">🏆 ACHIEVEMENTS UNLOCKED</h5>
                <ul className="space-y-2">
                  {mission.achievements.map((achievement, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-gray-300 text-sm flex items-start"
                    >
                      <span className="text-green-400 mr-2 mt-1">▸</span>
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h5 className="text-cyan-400 font-bold mb-3 text-sm">⚔️ WEAPONS MASTERED</h5>
                <div className="flex flex-wrap gap-2">
                  {mission.techStack.map((tech, idx) => (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`${tech.color} text-white text-xs px-2 py-1 rounded-full font-medium`}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              y: [-20, -100, -20],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4 font-serif">
            Battle History
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Chronicles of epic coding battles fought across different realms. 
            Each mission shaped the developer I am today.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: "Missions Completed", value: "4", icon: "⚔️" },
            { label: "Total XP Earned", value: "7,200", icon: "⭐" },
            { label: "Years of Battle", value: "5+", icon: "🛡️" },
            { label: "Technologies Mastered", value: "20+", icon: "🔧" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-4 border border-gray-600 text-center"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experienceData.map((mission, index) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              index={index}
              isCompleted={completedMissions.includes(index)}
            />
          ))}
        </div>

        {/* Footer Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-500/30 shadow-2xl max-w-4xl mx-auto">
            <blockquote className="text-xl md:text-2xl text-gray-300 italic font-serif mb-4">
              "हर कोड लाइन एक कहानी है, हर बग एक सीख है,
              <br />
              हर प्रोजेक्ट एक नई मंजिल का रास्ता है।"
            </blockquote>
            <div className="text-purple-400 font-bold">— Developer's Journey</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
