import SearchItem from '@components/SearchItem/SearchItem';
import { MovieApiResp } from '@models/movie-api.interface';
import styles from './SearchResults.module.scss';

type SearchResultsProps = {
  searchResult: MovieApiResp[];
};

const SearchResults: React.FC<SearchResultsProps> = ({ searchResult }) => {
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
};

export default SearchResults;
