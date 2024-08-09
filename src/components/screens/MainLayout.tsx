import Title from '@shared/Title/Title';
import Main from './Main/Main';
import { CharacterInfo, PageInfo } from '@models/rick-and-morty-api.interface';


type LayoutPageProps = {
  children?: React.ReactNode;
  pageInfo: PageInfo;
  charactersData: CharacterInfo[];
}

const MainLayout: React.FC<LayoutPageProps> = ({ children, pageInfo, charactersData }) => {
  return (
    <div className='app-container'>
      <Title title="Rick and Morty"/>
      <div className='router-container'>
        <Main charactersData={charactersData} pageInfo={pageInfo}/>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;