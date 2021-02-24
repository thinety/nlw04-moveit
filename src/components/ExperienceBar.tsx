import { useChallenges } from '../context/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css';


function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useChallenges();

  const percentToNextLevel = Math.round(currentExperience * 100 / experienceToNextLevel);

  return (
    <header className={styles['experience-bar']}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span className={styles['current-experience']} style={{ left: `${percentToNextLevel}%` }}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}


export { ExperienceBar };
