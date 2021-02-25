import { useCountdown } from '../context/CountdownContext';

import styles from '../styles/components/Countdown.module.css';


function Countdown() {
  const {
    time,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown,
  } = useCountdown();

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minutesLeft, minutesRight] = minutes.toString().padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = seconds.toString().padStart(2, '0').split('');

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
