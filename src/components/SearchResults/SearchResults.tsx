import { Component } from 'react';
import SearchItem from '@components/SearchItem/SearchItem';
import { MovieApiResp } from '@models/movie-api.interface';
import styles from './SearchResults.module.scss';

interface SearchResultsProps {
  searchResult: MovieApiResp[];
}

class SearchResults extends Component<SearchResultsProps> {
  render() {
    const { searchResult } = this.props;
    return (
      <>
        {!searchResult || searchResult.length === 0 ? (
          <h1>Oops, something went wrong...</h1>
        ) : (
          <div className={styles.container}>
            {searchResult.map((searchItem: MovieApiResp) => (
              <SearchItem key={searchItem.id} movie={searchItem} />
            ))}
          </div>
        )}
      </>
    );
  }
}

export default SearchResults;
