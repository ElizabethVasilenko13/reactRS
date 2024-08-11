import SearchResults from '@components/SearchResults/SearchResults';
import { CharacterInfo } from '@models/rick-and-morty-api.interface';
import styles from './Main.module.scss';

type MainPageProps = {
  charactersData: CharacterInfo[];
};

const Main: React.FC<MainPageProps> = ({ charactersData }) => {
  return (
    <div className={styles.container}>
      <SearchResults searchResult={charactersData ?? []} />
    </div>
  );
};

export default Main;
