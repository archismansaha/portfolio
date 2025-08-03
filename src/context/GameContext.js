// src/context/GameContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const GameContext = createContext();

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  // Core progress tracking
  const [totalXP, setTotalXP] = useLocalStorage('portfolioXP', 0);
  const [currentLevel, setCurrentLevel] = useLocalStorage('portfolioLevel', 1);
  const [unlockedZones, setUnlockedZones] = useLocalStorage('unlockedZones', ['home']);
  const [visitedPages, setVisitedPages] = useLocalStorage('visitedPages', []);
  
  // Skills & Achievements
  const [unlockedSkills, setUnlockedSkills] = useLocalStorage('unlockedSkills', []);
  const [completedPuzzles, setCompletedPuzzles] = useLocalStorage('completedPuzzles', []);
  const [unlockedAnime, setUnlockedAnime] = useLocalStorage('unlockedAnime', []);
  
  // Special unlocks
  const [instagramUnlocked, setInstagramUnlocked] = useLocalStorage('instagramUnlocked', false);
  const [crushAffection, setCrushAffection] = useLocalStorage('crushAffection', 0);
  
  // Gym & Personal Progress
  const [gymStats, setGymStats] = useLocalStorage('gymStats', {
    strength: 85,
    endurance: 78,
    consistency: 92
  });

  // Calculate level based on XP
  const calculateLevel = (xp) => {
    return Math.floor(xp / 1000) + 1;
  };

  // Zone unlock requirements
  const zoneRequirements = {
    'home': { xp: 0, level: 1 },
    'about': { xp: 100, level: 1 },
    'experience': { xp: 250, level: 2 },
    'skills': { xp: 500, level: 3 },
    'projects': { xp: 750, level: 4 },
    'gym': { xp: 1000, level: 5 },
    'animeverse': { xp: 1250, level: 6 },
    'shaayari': { xp: 1500, level: 7 },
    'secretcrush': { xp: 2000, level: 8 },
    'contact': { xp: 100, level: 1 }, // Always accessible
    'instagramunlock': { xp: 3000, level: 10, special: 'instagramUnlocked' }
  };

  // Add XP and check for level up
  const addXP = (amount, source = 'general') => {
    const newXP = totalXP + amount;
    const newLevel = calculateLevel(newXP);
    
    setTotalXP(newXP);
    
    if (newLevel > currentLevel) {
      setCurrentLevel(newLevel);
      // Level up celebration could trigger here
      console.log(`🎉 Level up! Now level ${newLevel}`);
    }
    
    // Check for new zone unlocks
    checkZoneUnlocks(newXP, newLevel);
    
    return { newXP, newLevel, leveledUp: newLevel > currentLevel };
  };

  // Check which zones should be unlocked
  const checkZoneUnlocks = (xp, level) => {
    const newUnlocks = [];
    
    Object.entries(zoneRequirements).forEach(([zone, req]) => {
      if (!unlockedZones.includes(zone)) {
        const meetsXP = xp >= req.xp;
        const meetsLevel = level >= req.level;
        const meetsSpecial = !req.special || eval(req.special); // Be careful with eval in production
        
        if (meetsXP && meetsLevel && meetsSpecial) {
          newUnlocks.push(zone);
        }
      }
    });
    
    if (newUnlocks.length > 0) {
      setUnlockedZones(prev => [...prev, ...newUnlocks]);
      console.log(`🔓 New zones unlocked: ${newUnlocks.join(', ')}`);
    }
  };

  // Mark page as visited
  const visitPage = (pageName) => {
    if (!visitedPages.includes(pageName)) {
      setVisitedPages(prev => [...prev, pageName]);
      addXP(50, `visited_${pageName}`);
    }
  };

  // Complete a puzzle
  const completePuzzle = (puzzleId, xpReward = 100) => {
    if (!completedPuzzles.includes(puzzleId)) {
      setCompletedPuzzles(prev => [...prev, puzzleId]);
      addXP(xpReward, `puzzle_${puzzleId}`);
      return true;
    }
    return false;
  };

  // Unlock a skill
  const unlockSkill = (skillId, xpReward = 150) => {
    if (!unlockedSkills.includes(skillId)) {
      setUnlockedSkills(prev => [...prev, skillId]);
      addXP(xpReward, `skill_${skillId}`);
      return true;
    }
    return false;
  };

  // Unlock anime
  const unlockAnime = (animeId, xpReward = 200) => {
    if (!unlockedAnime.includes(animeId)) {
      setUnlockedAnime(prev => [...prev, animeId]);
      addXP(xpReward, `anime_${animeId}`);
      return true;
    }
    return false;
  };

  // Check if zone is unlocked
  const isZoneUnlocked = (zoneName) => {
    return unlockedZones.includes(zoneName);
  };

  // Get progress percentage
  const getProgressPercentage = () => {
    const totalZones = Object.keys(zoneRequirements).length;
    return Math.round((unlockedZones.length / totalZones) * 100);
  };

  // Reset all progress (for testing/debugging)
  const resetProgress = () => {
    setTotalXP(0);
    setCurrentLevel(1);
    setUnlockedZones(['home']);
    setVisitedPages([]);
    setUnlockedSkills([]);
    setCompletedPuzzles([]);
    setUnlockedAnime([]);
    setInstagramUnlocked(false);
    setCrushAffection(0);
    console.log('🔄 All progress reset!');
  };

  // Initialize zones on first load
  useEffect(() => {
    checkZoneUnlocks(totalXP, currentLevel);
  }, []);

  const value = {
    // State
    totalXP,
    currentLevel,
    unlockedZones,
    visitedPages,
    unlockedSkills,
    completedPuzzles,
    unlockedAnime,
    instagramUnlocked,
    crushAffection,
    gymStats,
    
    // Actions
    addXP,
    visitPage,
    completePuzzle,
    unlockSkill,
    unlockAnime,
    isZoneUnlocked,
    getProgressPercentage,
    resetProgress,
    
    // Setters for direct manipulation
    setTotalXP,
    setCurrentLevel,
    setUnlockedZones,
    setInstagramUnlocked,
    setCrushAffection,
    setGymStats,
    
    // Requirements
    zoneRequirements
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
