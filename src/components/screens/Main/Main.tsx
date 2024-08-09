import SearchBar from '@components/SearchBar/SearchBar';
import SearchResults from '@components/SearchResults/SearchResults';
import Pagination from '@components/Pagination/Pagination';
import Flyout from '@components/Flyout/Flyout';
import ThemeSwitcher from '@components/ThemeSwitcher/ThemeSwitcher';
import styles from './Main.module.scss';
import { CharacterInfo, PageInfo } from '@models/rick-and-morty-api.interface';


type MainPageProps = {
  pageInfo: PageInfo;
  charactersData: CharacterInfo[];
}

const Main: React.FC<MainPageProps> = ({ pageInfo, charactersData}) => {
  return (
    <div className={styles.container}>
      <ThemeSwitcher />
      <SearchBar />
      <Pagination pageInfo={pageInfo} />
      <Flyout />
      <SearchResults searchResult={charactersData ?? []} />
    </div>
  );
};

export default Main;
