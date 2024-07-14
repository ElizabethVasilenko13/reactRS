import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { MOVIES_API_URL } from '@constants/api.constants';
import { fetchData } from '@services/fetchApi';
import { MovieApiResp } from '@models/movie-api.interface';
import styles from './DetailItemPage.module.scss';

const DetailItemPage: React.FC = () => {
  const navigate = useNavigate();
  const detailPageRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const [movieData, setMovieData] = useState<MovieApiResp | null>(null);

  const fetchMovieData = () => {
    const apiUrl = `${MOVIES_API_URL}titles/${id}`;
    fetchData(apiUrl).then((data) => {
      setMovieData(data.results);
    });
  };

  useEffect(() => {
    if (id) {
      fetchMovieData();
    }
  }, [id]);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleClickOutside = (event: MouseEvent) => {
      if (detailPageRef.current && !detailPageRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.body.style.overflow = '';

      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    document.body.style.overflow = '';
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
      {movieData ? (
        <div>
          <h2>{movieData.titleText.text}</h2>
          {movieData.primaryImage && <img src={movieData.primaryImage.url} alt="Movie" />}
          <div className={styles.year}> {movieData.releaseYear && `Release year ${movieData.releaseYear.year}`}</div>
        </div>
      ) : (
        <h2>No additional data about this movie</h2>
      )}
    </div>
  );
};

export default DetailItemPage;
