import { useState, useEffect } from 'react';

import { useChallenges } from '../context/ChallengesContext';

import styles from '../styles/components/Countdown.module.css';


function Countdown() {
  const [time, setTime] = useState(0.1 * 60);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minutesLeft, minutesRight] = minutes.toString().padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = seconds.toString().padStart(2, '0').split('');


  const { startNewChallenge } = useChallenges();

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
    setTime(25 * 60);
  };

  return (
    <div>
      <div className={styles['countdown-container']}>
        <div>
          <span>{minutesLeft}</span>
          <span>{minutesRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          className={styles['countdown-button']}
        >
          Ciclo encerrado
        </button>
      ) : (
        isActive ? (
          <button
            type='button'
            className={`${styles['countdown-button']} ${styles['countdown-button-active']}`}
            onClick={resetCountdown}
          >
            Abandonar ciclo
          </button>
        ) : (
          <button
            type='button'
            className={styles['countdown-button']}
            onClick={startCountdown}
          >
            Iniciar um ciclo
          </button>
        )
      ) }

    </div>
  );
}


export { Countdown };
