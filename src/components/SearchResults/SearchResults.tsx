import { Component } from 'react';
import { MovieApiResp } from '@models/movie-api.interface';
import styles from './SearchResults.module.css';
import SearchItem from '../SearchItem/SearchItem';

interface SearchResultsProps {
  searchResult: MovieApiResp[];
}

class SearchResults extends Component<SearchResultsProps> {
  render() {
    const { searchResult } = this.props;
    return (
      <div>
        {!searchResult || searchResult.length === 0 ? (
          <h1>Oops, something went wrong...</h1>
        ) : (
          <div className={styles.container}>
            {searchResult.map((searchItem: MovieApiResp) => (
              <SearchItem key={searchItem.id} movie={searchItem} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

// movie={searchItem}

export default SearchResults;
