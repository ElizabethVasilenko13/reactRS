'use client';

import { CharacterInfo } from '@models/rick-and-morty-api.interface';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@store/store';
import { select, unselect } from '@store/cards/cards.slice';
import { useTheme } from '@context/ThemeContext';
import classNames from 'classnames';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import styles from './SearchItem.module.scss';

type SearchItemProps = {
  item: CharacterInfo;
};

const SearchItem: React.FC<SearchItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const pathname = usePathname();

  const selectedCard = useAppSelector((state) => state.cards.selectedCards[item.id]);
  const isChecked = !!selectedCard;

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(select(item));
    } else {
      dispatch(unselect(item.id));
    }
  };
  const itemUrl = `${pathname}${item.id}/?${searchParams.toString()}`;

  return (
    <Link href={itemUrl} className={classNames(styles.card, styles[theme])}>
      <div className={styles.image}>
        <Image
          src={item.image}
          alt="Character"
          fill
          priority
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
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
    </Link>
  );
};

export default SearchItem;
