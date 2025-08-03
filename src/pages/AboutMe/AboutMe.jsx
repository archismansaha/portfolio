import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Avatar from '../../components/common/Avatar';

const AboutMe = ({ onPageLoad }) => {
  const [currentXP, setCurrentXP] = useState(0);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (onPageLoad) onPageLoad();
    
    // Animate XP
    setTimeout(() => {
      setCurrentXP(2847);
      setShowStats(true);
    }, 1000);
  }, [onPageLoad]);

  const characterStats = [
    { label: 'Coding', value: 95, icon: '💻', color: 'from-primary to-highlight' },
    { label: 'Creativity', value: 88, icon: '🎨', color: 'from-accent to-primary' },
    { label: 'Strength', value: 82, icon: '💪', color: 'from-highlight to-accent' },
    { label: 'Poetry', value: 92, icon: '📝', color: 'from-primary to-accent' },
  ];

  const traits = [
    { title: 'Backend Wizard', desc: 'Node.js, NestJS, Express mastery', icon: '⚙️' },
    { title: 'Cloud Architect', desc: 'AWS, Docker, DevOps expertise', icon: '☁️' },
    { title: 'Database Sage', desc: 'PostgreSQL, MongoDB, Redis', icon: '🗄️' },
    { title: 'Frontend Artist', desc: 'React, Tailwind, Modern UX', icon: '🎭' },
  ];

  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="section-title">Character Profile</h1>
        </motion.div>

        {/* Main Character Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="soft-card border-2 border-primary/30 shadow-glow-primary"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Avatar Section */}
            <div className="text-center">
              <motion.div
                className="text-8xl mb-4 float-animation"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                👨‍💻
              </motion.div>
              <h2 className="text-3xl font-heading font-bold text-accent mb-2">
                Level 25 Developer
              </h2>
              <p className="text-xl text-highlight font-semibold">Full Stack Wizard</p>
              <div className="mt-4 space-y-2">
                <div className="bg-dark rounded-lg p-3">
                  <div className="text-sm text-softText/70">Class</div>
                  <div className="text-accent font-bold">Polymath</div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* XP Bar */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-heading text-softText">Experience Points</span>
                  <span className="text-xl font-bold text-accent">{currentXP.toLocaleString()}/3000 XP</span>
                </div>
                <div className="progress-bar h-4">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentXP / 3000) * 100}%` }}
                    transition={{ delay: 1, duration: 2, ease: "easeOut" }}
                  />
                </div>
                <div className="text-sm text-highlight mt-2">Next level: 153 XP remaining</div>
              </div>

              {/* Bio */}
              <div className="bg-dark/50 rounded-lg p-4 border border-primary/20">
                <p className="text-softText leading-relaxed">
                  A passionate full-stack developer who weaves code like poetry and builds systems like architectural masterpieces. 
                  When not crafting digital experiences, you'll find me at the gym sculpting both mind and body, or penning verses 
                  that bridge the gap between technology and human emotion.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark/50 rounded-lg p-3 border border-accent/20">
                  <div className="text-accent font-bold">Location</div>
                  <div className="text-softText">Kolkata, India</div>
                </div>
                <div className="bg-dark/50 rounded-lg p-3 border border-highlight/20">
                  <div className="text-highlight font-bold">Availability</div>
                  <div className="text-softText">Open to opportunities</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Character Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showStats ? 1 : 0, y: showStats ? 0 : 30 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="soft-card"
        >
          <h3 className="text-2xl font-heading font-bold text-highlight mb-6 text-center">Core Abilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {characterStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="mb-3">
                  <div className="text-2xl font-bold text-accent">{stat.value}/100</div>
                  <div className="text-sm text-softText font-semibold">{stat.label}</div>
                </div>
                <div className="progress-bar h-2">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ delay: 2 + index * 0.1, duration: 1.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Special Traits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {traits.map((trait, index) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.7 + index * 0.1, duration: 0.6 }}
              className="card-interactive"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{trait.icon}</div>
                <div>
                  <h4 className="text-lg font-heading font-bold text-accent mb-2">{trait.title}</h4>
                  <p className="text-softText/80 text-sm">{trait.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Personal Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="text-center"
        >
          <div className="soft-card border border-accent/30">
            <blockquote className="text-xl md:text-2xl font-poetry italic text-softText mb-4 leading-relaxed">
              "Code is poetry in motion, each function a verse, each algorithm a stanza in the epic of digital creation."
            </blockquote>
            <cite className="text-accent font-semibold">— My Development Philosophy</cite>
          </div>
        </motion.div>
      </div>

      <Avatar
        currentLevel={25}
        currentXP={2847}
        visitedPages={['about']}
        mood="friendly"
        messages={[
          "Getting to know the real me? I like that! 😊",
          "My stats are looking good today! 💪",
          "Every developer has a story... this is mine 📖",
          "Thanks for taking the time to understand me! 💕"
        ]}
      />
    </div>
  );
};

export default AboutMe;
