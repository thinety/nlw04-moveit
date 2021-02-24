import { createContext, useContext, useState } from 'react';

import challenges from '../../challenges.json';


interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}
interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge | null;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
}

const ChallengesContext = createContext<ChallengesContextData | undefined>(undefined);
function useChallenges() {
  const contextValue = useContext(ChallengesContext);

  if (contextValue === undefined) {
    throw new Error('useChallenges must be used within a ChallengesProvider');
  }

  return contextValue;
}

interface ChallengesProviderProps {
  children: React.ReactNode;
}
function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const levelUp = () => {
    setLevel(l => l+1);
  };

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  };

  const resetChallenge = () => {
    setActiveChallenge(null);
  };

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      experienceToNextLevel,
      challengesCompleted,
      activeChallenge,
      levelUp,
      startNewChallenge,
      resetChallenge,
    }}>
      {children}
    </ChallengesContext.Provider>
  );
}


export { useChallenges, ChallengesProvider };
