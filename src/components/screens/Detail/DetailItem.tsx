import { useEffect, useRef } from 'react';
import { useTheme } from '@context/ThemeContext';
import classNames from 'classnames';
import styles from './DetailItem.module.scss';
import { useRouter } from 'next/router';
import {  CharacterInfo } from '@models/rick-and-morty-api.interface';

type DetailItemPageProps = {
  characterData: CharacterInfo;
}

const DetailItemPage: React.FC<DetailItemPageProps> = ({characterData}) => {
  const router = useRouter();
  const detailPageRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { id, ...remainingQuery } = router.query;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailPageRef.current && !detailPageRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    router.push({
      pathname: '/',
      query: remainingQuery,
    });
  };

  return (
    <div className={classNames(styles.detailPage, styles[theme])} ref={detailPageRef}>
      <button type="button" onClick={handleClose}>
        &#x2717;
      </button>
      {characterData ? (
        <>
          <h2>{characterData.name}</h2>
          <img src={characterData.image} alt="Character" />
          <div className={styles.data}>
            <p data-testid="species">
              {' '}
              <b>Species:</b> {characterData.species}
            </p>
            <p data-testid="gender">
              <b>Gender:</b> {characterData.gender}
            </p>
            <p data-testid="location">
              <b>Location:</b> {characterData.location.name}
            </p>
            <p data-testid="status">
              <b>Status:</b> {characterData.status}
            </p>
          </div>
        </>
      ) : (
        <h2>No additional data about this character</h2>
      )}
    </div>
  );
};

export default DetailItemPage;
