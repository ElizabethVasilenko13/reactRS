'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@context/ThemeContext';
import classNames from 'classnames';
import { CharacterInfo } from '@models/rick-and-morty-api.interface';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './DetailItem.module.scss';

type DetailItemPageProps = {
  characterData: CharacterInfo | undefined;
};

const DetailItemPage: React.FC<DetailItemPageProps> = ({ characterData }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const detailPageRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const remainingQuery = new URLSearchParams(searchParams.toString());
  remainingQuery.delete('id');

  const handleClose = () => {
    router.push(`/?${remainingQuery.toString()}`);
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
    <div data-testid="detail-page" className={classNames(styles.detailPage, styles[theme])} ref={detailPageRef}>
      <button type="button" onClick={handleClose} data-testid="close-btn">
        &#x2717;
      </button>
      {characterData ? (
        <>
          <h2>{characterData.name}</h2>
          <div className={styles.image}>
            <Image
              src={characterData.image}
              alt="Character"
              fill
              priority
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className={styles.data}>
            <p data-testid="species">
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
