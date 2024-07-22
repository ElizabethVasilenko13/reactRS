import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { API_CHARACTER_ENDPOINT, RICK_AND_MORTY_API_URL } from '@constants/api.constants';
import { fetchData } from '@services/fetchApi';
import { CharacterInfo } from '@models/rick-and-morty-api.interface';
import styles from './DetailItemPage.module.scss';

const DetailItemPage: React.FC = () => {
  const navigate = useNavigate();
  const detailPageRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const [characterData, setCharacterData] = useState<CharacterInfo | null>(null);

  const fetchCharacterData = async () => {
    const apiUrl = `${RICK_AND_MORTY_API_URL}${API_CHARACTER_ENDPOINT}/${id}`;
    const data = await fetchData<CharacterInfo>(apiUrl);

    if (typeof data === 'string' || data instanceof Error) {
      console.error(data);
      return;
    }

    setCharacterData(data);
  };

  useEffect(() => {
    if (id) {
      fetchCharacterData();
    }
  }, [id]);

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
    const currentQueryParams = new URLSearchParams(location.search);
    navigate({
      pathname: '/',
      search: currentQueryParams.toString(),
    });
  };
  return (
    <div className={styles.detailPage} ref={detailPageRef}>
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
