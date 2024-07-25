import { useNavigate } from 'react-router-dom';
import { CharacterInfo } from '@models/rick-and-morty-api.interface';
import { useAppDispath, useAppSelector } from '@store/store';
import { select, unselect } from '@store/cards/cards.slice';
import styles from './SearchItem.module.scss';

type SearchItemProps = {
  item: CharacterInfo;
};

const SearchItem: React.FC<SearchItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispath();

  const selectedCard = useAppSelector((state) => state.cards.selectedCards[item.id]);
  const isChecked = !!selectedCard;

  const navigateToDetailPage = () => {
    navigate(`/${item.id}`);
  };

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(select(item));
    } else {
      dispatch(unselect(item.id));
    }
  };

  return (
    <button type="button" className={styles.card} onClick={navigateToDetailPage}>
      <div className={styles.image}>
        <img src={item.image} alt="Character" />
      </div>
      <div className={styles.movieInfo}>
        <h3>{item.name}</h3>
        <input
          className={styles.checkbox}
          type="checkbox"
          name="selectedItem"
          id="selectedItem"
          checked={isChecked}
          onChange={handleCheckboxClick}
          onClick={(event) => event.stopPropagation()}
        />
      </div>
    </button>
  );
};

export default SearchItem;
