// src/context/GameContext.js
import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
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

  // 🎯 Track initialization to prevent loops
  const isInitialized = useRef(false);
  const pageVisitTimestamps = useRef({});

  // Calculate level based on XP
  const calculateLevel = useCallback((xp) => {
    return Math.floor(xp / 1000) + 1;
  }, []);

  // 🎯 Fixed zone requirements - reasonable for UX
  const zoneRequirements = {
    'home': { xp: 0, level: 1 },
    'about': { xp: 50, level: 1 },
    'experience': { xp: 100, level: 2 },
    'skills': { xp: 300, level: 3 },
    'projects': { xp: 300, level: 4 },
    'gym': { xp: 300, level: 3 },
    'animeverse': { xp: 500, level: 3 },
    'shaayari': { xp: 1200, level: 5 },
    'secretcrush': { xp: 1500, level: 8 },
    'contact': { xp: 50, level: 1 },
    'instagramunlock': { xp: 2000, level: 10, special: 'instagramUnlocked' }
  };

  // 🔓 Zone unlock checking - optimized
  const checkZoneUnlocks = useCallback((xp, level) => {
    const newUnlocks = [];
    
    Object.entries(zoneRequirements).forEach(([zone, req]) => {
      if (!unlockedZones.includes(zone)) {
        const meetsXP = xp >= req.xp;
        const meetsLevel = level >= req.level;
        
        let meetsSpecial = true;
        if (req.special) {
          switch (req.special) {
            case 'instagramUnlocked':
              meetsSpecial = instagramUnlocked;
              break;
            default:
              meetsSpecial = true;
          }
        }
        
        if (meetsXP && meetsLevel && meetsSpecial) {
          newUnlocks.push(zone);
        }
      }
    });
    
    if (newUnlocks.length > 0) {
      setUnlockedZones(prev => {
        const updated = [...prev, ...newUnlocks];
        console.log(`🔓 New zones unlocked: ${newUnlocks.join(', ')}`);
        return updated;
      });
    }
    return newUnlocks;
  }, [unlockedZones, instagramUnlocked, setUnlockedZones]);

  // 🎊 Fixed XP addition - prevents loops
  const addXP = useCallback((amount, source = 'general') => {
    console.log(`Adding ${amount} XP from ${source}`);
    
    setTotalXP(prevXP => {
      const newXP = prevXP + amount;
      const newLevel = calculateLevel(newXP);
      
      // Update level if needed
      if (newLevel > currentLevel) {
        console.log(`🎉 Level up! Now level ${newLevel}`);
        setCurrentLevel(newLevel);
        // Check for zone unlocks with small delay
        setTimeout(() => checkZoneUnlocks(newXP, newLevel), 100);
      }
      
      return newXP;
    });
  }, [calculateLevel, currentLevel, checkZoneUnlocks, setTotalXP, setCurrentLevel]);

  // 🚫 FIXED: visitPage function to prevent continuous calls
  const visitPage = useCallback((pageName) => {
    const now = Date.now();
    const lastVisit = pageVisitTimestamps.current[pageName] || 0;
    const timeSinceLastVisit = now - lastVisit;
    
    // 🎯 Prevent spam - only award XP if more than 5 seconds since last visit
    if (timeSinceLastVisit > 5000) {
      pageVisitTimestamps.current[pageName] = now;
      
      if (!visitedPages.includes(pageName)) {
        setVisitedPages(prev => [...prev, pageName]);
        addXP(50, `visited_${pageName}`);
        console.log(`First time visiting ${pageName} - awarded 50 XP`);
      } else {
        addXP(10, `revisited_${pageName}`);
        console.log(`Revisited ${pageName} - awarded 10 XP`);
      }
    } else {
      console.log(`Visit to ${pageName} ignored - too recent (${Math.round(timeSinceLastVisit/1000)}s ago)`);
    }
  }, [visitedPages, addXP, setVisitedPages]);

  // Complete a puzzle
  const completePuzzle = useCallback((puzzleId, xpReward = 100) => {
    if (!completedPuzzles.includes(puzzleId)) {
      setCompletedPuzzles(prev => [...prev, puzzleId]);
      addXP(xpReward, `puzzle_${puzzleId}`);
      return true;
    }
    return false;
  }, [completedPuzzles, addXP, setCompletedPuzzles]);

  // Unlock a skill
  const unlockSkill = useCallback((skillId, xpReward = 150) => {
    if (!unlockedSkills.includes(skillId)) {
      setUnlockedSkills(prev => [...prev, skillId]);
      addXP(xpReward, `skill_${skillId}`);
      return true;
    }
    return false;
  }, [unlockedSkills, addXP, setUnlockedSkills]);

  // Unlock anime
  const unlockAnime = useCallback((animeId, xpReward = 200) => {
    if (!unlockedAnime.includes(animeId)) {
      setUnlockedAnime(prev => [...prev, animeId]);
      addXP(xpReward, `anime_${animeId}`);
      return true;
    }
    return false;
  }, [unlockedAnime, addXP, setUnlockedAnime]);

  // Check if zone is unlocked
  const isZoneUnlocked = useCallback((zoneName) => {
    return unlockedZones.includes(zoneName);
  }, [unlockedZones]);

  // Get progress percentage
  const getProgressPercentage = useCallback(() => {
    const totalZones = Object.keys(zoneRequirements).length;
    return Math.round((unlockedZones.length / totalZones) * 100);
  }, [unlockedZones]);

  // Get next unlock requirement
  const getNextUnlockRequirement = useCallback(() => {
    const lockedZones = Object.entries(zoneRequirements).filter(
      ([zone]) => !unlockedZones.includes(zone)
    );
    
    if (lockedZones.length === 0) return null;
    
    return lockedZones.reduce((next, [zone, req]) => {
      if (!next || req.xp < next.xp) {
        return { zone, ...req };
      }
      return next;
    }, null);
  }, [unlockedZones]);

  // Reset all progress
  const resetProgress = useCallback(() => {
    setTotalXP(0);
    setCurrentLevel(1);
    setUnlockedZones(['home']);
    setVisitedPages([]);
    setUnlockedSkills([]);
    setCompletedPuzzles([]);
    setUnlockedAnime([]);
    setInstagramUnlocked(false);
    setCrushAffection(0);
    setGymStats({ strength: 85, endurance: 78, consistency: 92 });
    pageVisitTimestamps.current = {};
    console.log('🔄 All progress reset!');
  }, [
    setTotalXP, setCurrentLevel, setUnlockedZones, setVisitedPages,
    setUnlockedSkills, setCompletedPuzzles, setUnlockedAnime,
    setInstagramUnlocked, setCrushAffection, setGymStats
  ]);

  // 🎯 FIXED: Initialize zones only once
  useEffect(() => {
    if (!isInitialized.current) {
      console.log('GameContext: Initial zone unlock check');
      checkZoneUnlocks(totalXP, currentLevel);
      isInitialized.current = true;
    }
  }, []); // Empty dependency array - runs only once

  // 🎯 FIXED: Auto-unlock basic zones without loops
  useEffect(() => {
    if (totalXP >= 50 && !unlockedZones.includes('about')) {
      console.log('Auto-unlocking About zone');
      setUnlockedZones(prev => [...prev, 'about']);
    }
    if (totalXP >= 50 && !unlockedZones.includes('contact')) {
      console.log('Auto-unlocking Contact zone');
      setUnlockedZones(prev => [...prev, 'contact']);
    }
  }, [totalXP]); // Only depends on totalXP

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
    getNextUnlockRequirement,
    resetProgress,
    
    // Setters for direct manipulation
    setTotalXP,
    setCurrentLevel,
    setUnlockedZones,
    setInstagramUnlocked,
    setCrushAffection,
    setGymStats,
    
    // Requirements & Utils
    zoneRequirements,
    calculateLevel
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
