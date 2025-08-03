// src/hooks/useGameProgress.js
import { useCallback } from 'react';

export const useGameProgress = () => {
  // XP required for each level (exponential growth)
  const getXPForLevel = useCallback((level) => {
    return Math.floor(100 * Math.pow(1.5, level - 1));
  }, []);

  // Calculate current level based on total XP
  const calculateLevel = useCallback((totalXP) => {
    let level = 1;
    let xpNeeded = 0;
    
    while (xpNeeded <= totalXP) {
      level++;
      xpNeeded += getXPForLevel(level - 1);
    }
    
    return level - 1;
  }, [getXPForLevel]);

  // Get XP needed for next level
  const getXPForNextLevel = useCallback((currentLevel) => {
    return getXPForLevel(currentLevel + 1);
  }, [getXPForLevel]);

  // Get current progress towards next level
  const getCurrentLevelProgress = useCallback((totalXP, currentLevel) => {
    let xpAtCurrentLevel = 0;
    
    // Calculate total XP at start of current level
    for (let i = 1; i < currentLevel; i++) {
      xpAtCurrentLevel += getXPForLevel(i);
    }
    
    const xpInCurrentLevel = totalXP - xpAtCurrentLevel;
    const xpNeededForNextLevel = getXPForLevel(currentLevel + 1);
    
    return {
      current: xpInCurrentLevel,
      needed: xpNeededForNextLevel,
      percentage: (xpInCurrentLevel / xpNeededForNextLevel) * 100
    };
  }, [getXPForLevel]);

  return {
    calculateLevel,
    getXPForLevel,
    getXPForNextLevel,
    getCurrentLevelProgress
  };
};

export default useGameProgress;
