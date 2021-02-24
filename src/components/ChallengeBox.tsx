import { useChallenges } from '../context/ChallengesContext';

import styles from '../styles/components/ChallengeBox.module.css';


function ChallengeBox() {
  const { activeChallenge, resetChallenge } = useChallenges();

  return (
    <div className={styles['challenge-box-container']}>
      { activeChallenge === null ? (
        <div className={styles['challenge-not-active']}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src='icons/level-up.svg' alt='Level up' />
            Avance de level completando desafios.
          </p>
        </div>
      ) : (
        <div className={styles['challenge-active']}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt='' />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type='button'
              className={styles['challenge-failed-button']}
              onClick={resetChallenge}
            >
              Falhei
            </button>
            <button
              type='button'
              className={styles['challenge-succeeded-button']}
            >
              Completei
            </button>
          </footer>
        </div>
      ) }
    </div>
  );
}


export { ChallengeBox };
