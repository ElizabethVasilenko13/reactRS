import { MovieApiResp } from '@models/movie-api.interface';
import noImage from '@assets/no-image.jpg';
import styles from './SearchItem.module.scss';

type SearchItemProps = {
  movie: MovieApiResp;
};

const SearchItem: React.FC<SearchItemProps> = ({ movie }) => {
  return (
    <div className={styles.card}>
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
