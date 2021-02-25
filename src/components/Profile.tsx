import { useChallenges } from '../context/ChallengesContext';

import styles from '../styles/components/Profile.module.css';


function Profile() {
  const { level } = useChallenges();

  return (
    <div className={styles['profile-container']}>
      <img src='https://github.com/diego3g.png' alt='Diego Fernandes' />
      <div>
        <strong>Diego Fernandes</strong>
        <p>
          <img src='icons/level.svg' alt='Level' />
          Level {level}
        </p>
      </div>
    </div>
  );
}


export { Profile };
