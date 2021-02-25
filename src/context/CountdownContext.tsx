import { createContext, useContext, useEffect, useState } from 'react';
import { useChallenges } from './ChallengesContext';


interface CountdownContextData {
  time: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

const CountdownContext = createContext<CountdownContextData | undefined>(undefined);
function useCountdown() {
  const contextValue = useContext(CountdownContext);

  if (contextValue === undefined) {
    throw new Error('useCountdown must be used within a CountdownProvider');
  }

  return contextValue;
}

interface CountdownProviderProps {
  children: React.ReactNode;
}
function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useChallenges();

  const [time, setTime] = useState(0.05 * 60);
  const [hasFinished, setHasFinished] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [time]);
  useEffect(() => {
    if (isActive) {
      const id = setInterval(() => {
        setTime(t => t-1);
      }, 1000);

      return () => {
        clearInterval(id);
      };
    }
  }, [isActive]);

  const startCountdown = () => {
    setIsActive(true);
  };
  const resetCountdown = () => {
    setIsActive(false);
    setTime(0.05 * 60);

    // would be better to lift all state up
    setHasFinished(false);
  };

  return (
    <CountdownContext.Provider value={{
      time,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  );
}


export { useCountdown, CountdownProvider };
