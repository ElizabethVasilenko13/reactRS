/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { MovieApiResp } from '@models/movie-api.interface';
import { useNavigate } from 'react-router-dom';
import noImage from '../../assets/no-image.jpg';
import styles from './SearchItem.module.scss';

type SearchItemProps = {
  movie: MovieApiResp;
};

const SearchItem: React.FC<SearchItemProps> = ({ movie }) => {
  const navigate = useNavigate();
  const navigateToDetailPage = () => {
    navigate(`/${movie.id}`);
  };

  return (
    <div className={styles.card} onClick={navigateToDetailPage}>
      <div className={styles.image}>
        {movie.primaryImage ? <img src={movie.primaryImage.url} alt="Movie" /> : <img src={noImage} alt="Movie" />}
      </div>
      <div className={styles.movieInfo}>
        <h3>{movie.titleText.text}</h3>
        <p>{movie.releaseYear ? `Year: ${movie.releaseYear.year}` : ''}</p>
      </div>
    </div>
  );
};

export default SearchItem;
