import React, { createContext, useContext, useState } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [audioState, setAudioState] = useState({
    isMuted: false,
    volume: 0.5,
    currentTrack: null
  });

  const value = {
    audioState,
    setAudioState
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
