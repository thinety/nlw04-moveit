import Head from 'next/head';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { ChallengesProvider } from '../context/ChallengesContext';
import { CountdownProvider } from '../context/CountdownContext';
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import styles from '../styles/pages/Home.module.css';


async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<HomeProps>> {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: parseInt(level),
      currentExperience: parseInt(currentExperience),
      challengesCompleted: parseInt(challengesCompleted),
    },
  };
}

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}
function Home({ level, currentExperience, challengesCompleted }: HomeProps) {
  return (
    <ChallengesProvider
      initialValues={{
        level,
        currentExperience,
        challengesCompleted,
      }}
    >
      <div className={styles['container']}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}


export { getServerSideProps };
export default Home;
