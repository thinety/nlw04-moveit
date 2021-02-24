import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

function Countdown() {
  const [time, setTime] = useState(25 * 60);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minutesLeft, minutesRight] = minutes.toString().padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = seconds.toString().padStart(2, '0').split('');

  const [active, setActive] = useState(false);
  const startCountdown = () => {
    setActive(true);
  };

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(t => t-1);
      }, 1000);
    }
  }, [active, time]);

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

      <button
        type='button'
        className={styles['countdown-button']}
        onClick={startCountdown}
      >
        Iniciar um ciclo
      </button>
    </div>
  );
}

export { Countdown };
