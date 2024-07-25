import { ChangeEvent, MouseEvent, useState } from 'react';
import { useAppDispath, useAppSelector } from '@store/store';
import { saveSearchTerm } from '@store/search/search.slice';
import { saveLocalStorageData } from '@utils/local-storage';
import styles from './SearchBar.module.scss';

type SearchBarProps = {
  onSearch: (params: { page: number }) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const baseSearchQuery = useAppSelector((state) => state.search.searchCharacterTerm);
  const [searchQuery, setSearchQuery] = useState<string>(baseSearchQuery);
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispath();

  const handleInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(value);
  };

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch({ page: 1 });
    saveLocalStorageData('searchQuery', searchQuery.trim());
    dispatch(saveSearchTerm(searchQuery.trim()));
  };

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div>
      <form className={styles.form}>
        <input
          data-testid="search-input"
          className={styles.input}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInput}
        />
        <button onClick={handleSearch} type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <button onClick={handleError} type="button" className={styles.buttonError}>
        Show Error
      </button>
      {isError &&
        (() => {
          throw new Error('I crashed!');
        })()}
    </div>
  );
};

export default SearchBar;
