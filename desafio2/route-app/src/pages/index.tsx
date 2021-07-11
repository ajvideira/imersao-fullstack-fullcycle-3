import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { api } from '../api';
import styles from '../styles/Home.module.css';

type Props = {
  routes: {
    title: string;
    startPosition: {
      latitude: number;
      longitude: number;
    };
    endPosition: {
      latitude: number;
      longitude: number;
    };
  }[];
};

const Home: NextPage<Props> = ({ routes }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Code Education - Imersão FullCycle 3.0</title>
      </Head>

      <main className={styles.main}>
        <h1>Code Education - Imersão FullCycle 3.0 - Desafio 2</h1>
        <h3>Routes</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th rowSpan={2}>Title</th>
              <th colSpan={2}>Start Position</th>
              <th colSpan={2}>End Position</th>
            </tr>
            <tr>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr>
                <td>{route.title}</td>
                <td>{route.startPosition.latitude}</td>
                <td>{route.startPosition.longitude}</td>
                <td>{route.endPosition.latitude}</td>
                <td>{route.endPosition.longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await api.get('/routes');
  console.log(data);
  return {
    props: {
      routes: data,
    },
  };
};
