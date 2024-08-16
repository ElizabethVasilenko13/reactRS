import { Link } from 'react-router-dom';
import styles from './Main.module.scss';
import { useAppSelector } from '@store/store';
import Tile from '@shared/components/Tile/Tile';

const Main = () => {
  const { uncontrolledFormSubmissions, reactHookFormSubmissions } = useAppSelector((state) => state.form);

  return (
    <div className={styles.mainContainer}>
      <header>
        <h1>Main Page</h1>
        <nav>
          <ul>
            <li>
              <Link to="/uncontrolled-form">Uncontrolled Form</Link>
            </li>
            <li>
              <Link to="/react-hook-form">React Hook Form</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h2>Uncontrolled Form Submissions</h2>
          {uncontrolledFormSubmissions.map((submission, index) => (
            <Tile key={index} submissionInfo={submission} />
          ))}
        </section>
        <section>
          <h2>React Hook Form Submissions</h2>
          {reactHookFormSubmissions.map((submission, index) => (
            <Tile key={index} submissionInfo={submission} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Main;
