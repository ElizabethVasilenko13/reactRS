import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@context/ThemeContext';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { CharacterInfo } from '@models/rick-and-morty-api.interface';
import styles from './DetailItem.module.scss';

type DetailItemPageProps = {
  characterData: CharacterInfo;
};

const DetailItemPage: React.FC<DetailItemPageProps> = ({ characterData }) => {
  const router = useRouter();
  const detailPageRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { id, ...remainingQuery } = router.query;

  const handleClose = () => {
    router.push({
      pathname: '/',
      query: remainingQuery,
    });
  };

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

  return (
    <div className={classNames(styles.detailPage, styles[theme])} ref={detailPageRef}>
      <button type="button" onClick={handleClose}>
        &#x2717;
      </button>
      {characterData ? (
        <>
          <h2>{characterData.name}</h2>
          <div className={styles.image}>
            <Image src={characterData.image} alt="Character" fill />
          </div>
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
