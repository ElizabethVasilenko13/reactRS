import { MovieApiResp } from '@models/movie-api.interface';
import { Component } from 'react';
import styles from './SearchItem.module.css';

interface SearchItemProps {
  movie: MovieApiResp;
}
class SearchItem extends Component<SearchItemProps> {
  render() {
    const { movie } = this.props;

    return (
      <div className={styles.card}>
        {movie.primaryImage ? (
          <img
            src={movie.primaryImage.url}
            alt="Movie"
            width={50}
            height={50}
          />
        ) : (
          <img src="" alt="Movie" width={40} />
        )}
        <div className={styles.beerInfo}>
          <h3>{movie.titleText.text}</h3>
          <p>Year: {movie.releaseYear.year}</p>
        </div>
      </div>
    );
  }
}

export default SearchItem;
