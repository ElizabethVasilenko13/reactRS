import Title from '@shared/Title/Title';
import { CharacterInfo, PageInfo } from '@models/rick-and-morty-api.interface';
import Flyout from '@components/Flyout/Flyout';
import Pagination from '@components/Pagination/Pagination';
import SearchBar from '@components/SearchBar/SearchBar';
import ThemeSwitcher from '@components/ThemeSwitcher/ThemeSwitcher';
import Main from './Main/Main';

type LayoutPageProps = {
  children?: React.ReactNode;
  pageInfo: PageInfo;
  charactersData: CharacterInfo[];
};

const MainLayout: React.FC<LayoutPageProps> = ({ children, pageInfo, charactersData }) => {
  return (
    <div className="app-container">
      <Title title="Rick and Morty" />
      <ThemeSwitcher />
      <SearchBar />
      <Pagination pageInfo={pageInfo} />
      <Flyout />
      <div className="router-container">
        <Main charactersData={charactersData} />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
