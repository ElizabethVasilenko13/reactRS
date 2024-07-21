import SearchItem from '@components/SearchItem/SearchItem';
import { CharacterInfo } from '@models/rick-and-morty-api.interface';
import styles from './SearchResults.module.scss';

type SearchResultsProps = {
  searchResult: CharacterInfo[];
};

const SearchResults: React.FC<SearchResultsProps> = ({ searchResult }) => {
  return (
    <>
      {!searchResult || searchResult.length === 0 ? (
        <h1>Oops, something went wrong...</h1>
      ) : (
        <div className={styles.container}>
          {searchResult.map((searchItem: CharacterInfo) => (
            <SearchItem key={searchItem.id} item={searchItem} />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchResults;
