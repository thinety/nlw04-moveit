import { useChallenges } from '../context/ChallengesContext';

import styles from '../styles/components/CompletedChallenges.module.css';


function CompletedChallenges() {
  const { challengesCompleted } = useChallenges();

  return (
    <div className={styles['completed-challenges-container']}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}


export { CompletedChallenges };
