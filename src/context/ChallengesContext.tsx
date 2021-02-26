import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { LevelUpModal } from '../components/LevelUpModal';

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
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
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
  initialValues: {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
  };
  children: React.ReactNode;
}
function ChallengesProvider({ initialValues, children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(initialValues.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(initialValues.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(initialValues.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', level.toString());
    Cookies.set('currentExperience', currentExperience.toString());
    Cookies.set('challengesCompleted', challengesCompleted.toString());
  }, [level, currentExperience, challengesCompleted]);

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  };

  const resetChallenge = () => {
    setActiveChallenge(null);
  };

  const completeChallenge = () => {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      setLevel(l => l+1);
      setIsLevelUpModalOpen(true);
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(c => c+1);
  };

  const closeLevelUpModal = () => {
    setIsLevelUpModalOpen(false);
  };

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      experienceToNextLevel,
      challengesCompleted,
      activeChallenge,
      startNewChallenge,
      resetChallenge,
      completeChallenge,
      closeLevelUpModal,
    }}>
      {children}
      { isLevelUpModalOpen ? <LevelUpModal /> : null }
    </ChallengesContext.Provider>
  );
}


export { useChallenges, ChallengesProvider };
