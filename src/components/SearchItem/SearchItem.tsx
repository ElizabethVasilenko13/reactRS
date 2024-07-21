import { useNavigate } from 'react-router-dom';
import { CharacterInfo } from '@models/rick-and-morty-api.interface';
import styles from './SearchItem.module.scss';

type SearchItemProps = {
  item: CharacterInfo;
};

const SearchItem: React.FC<SearchItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const navigateToDetailPage = () => {
    navigate(`/${item.id}`);
  };

  return (
    <button type="button" className={styles.card} onClick={navigateToDetailPage}>
      <div className={styles.image}>
        <img src={item.image} alt="Movie" />
      </div>
      <div className={styles.movieInfo}>
        <h3>{item.name}</h3>
      </div>
    </button>
  );
};

export default SearchItem;
