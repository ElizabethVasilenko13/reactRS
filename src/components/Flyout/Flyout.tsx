'use client';

import { useAppSelector } from '@store/store';
import { useDispatch } from 'react-redux';
import { unselectAll } from '@store/cards/cards.slice';
import { convertToCSV } from '@utils/convert-to-CSV';
import { CharacterInfo } from '@models/rick-and-morty-api.interface';
import { useTheme } from '@context/ThemeContext';
import classNames from 'classnames';
import styles from './Flyout.module.scss';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const selectedCards = useAppSelector((state) => state.cards.selectedCards);
  const selectedCardsCount = Object.keys(selectedCards).length;

  if (selectedCardsCount === 0) return null;

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const dataTransform = (item: CharacterInfo) => [item.name, item.species, `${window.location.origin}/${item.id}`];
  const csvUrl = convertToCSV(selectedCards, dataTransform);

  const downloadFileName = `${selectedCardsCount}_character${selectedCardsCount > 1 ? 's' : ''}.csv`;

  return (
    <div className={classNames(styles.flyout, styles[theme])}>
      <button type="button" onClick={handleUnselectAll}>
        Unselect All
      </button>
      <p>
        {selectedCardsCount} item{selectedCardsCount > 1 ? 's' : ''} selected
      </p>
      <a href={csvUrl} download={downloadFileName}>
        Download
      </a>
    </div>
  );
};

export default Flyout;
