import styles from '../styles/components/Profile.module.css';

function Profile() {
  return (
    <div className={styles['profile-container']}>
      <img src='https://github.com/diego3g.png' alt='Diego Fernandes' />
      <div>
        <strong>Diego Fernandes</strong>
        <p>
          <img src='icons/level.svg' alt='Level' />
          Level 1
        </p>
      </div>
    </div>
  );
}

export { Profile };
