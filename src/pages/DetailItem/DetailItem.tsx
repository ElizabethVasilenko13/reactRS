import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { cardsApi } from '@store/api/cardsApi';
import Loader from '@shared/Loader/Loader';
import { CharacterId } from '@models/rick-and-morty-api.interface';
import { skipToken } from '@reduxjs/toolkit/query';
import { useTheme } from '@context/ThemeContext';
import classNames from 'classnames';
import styles from './DetailItem.module.scss';

const DetailItemPage: React.FC = () => {
  const navigate = useNavigate();
  const detailPageRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: CharacterId }>();
  const location = useLocation();
  const { theme } = useTheme();

  const { data: characterData, isFetching: cardFetching } = cardsApi.useGetCardQuery(id ?? skipToken);

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
    navigate({
      pathname: '/',
      search: location.search,
    });
  };

  if (cardFetching) {
    return <Loader data-testid="loader" />;
  }

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
