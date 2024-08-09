import { CharacterInfo } from '@models/rick-and-morty-api.interface';
import { useAppDispatch, useAppSelector } from '@store/store';
import { select, unselect } from '@store/cards/cards.slice';
import { useTheme } from '@context/ThemeContext';
import classNames from 'classnames';
import styles from './SearchItem.module.scss';
import { useRouter } from 'next/router';

type SearchItemProps = {
  item: CharacterInfo;
};

const SearchItem: React.FC<SearchItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { theme } = useTheme();

  const selectedCard = useAppSelector((state) => state.cards.selectedCards[item.id]);
  const isChecked = !!selectedCard;

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(select(item));
    } else {
      dispatch(unselect(item.id));
    }
  };

  const handleItemClick = () => {
    router.push({pathname: `/${item.id}`, query: { ...router.query }});
  };

  return (
    <button onClick={handleItemClick} className={classNames(styles.card, styles[theme])}>
      <div className={styles.image}>
        <img src={item.image} alt="Character" />
      </div>
      <div className={styles.movieInfo}>
        <h3>{item.name}</h3>
        <input
          data-testid="checkbox"
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
