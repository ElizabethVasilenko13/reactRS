import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import styles from './SearchBar.module.scss';

type SearchBarProps = {
  onSearch: (searchQuery: string) => void;
  startSearchQuery: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  startSearchQuery,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(startSearchQuery);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setSearchQuery(startSearchQuery);
  }, [startSearchQuery]);

  const handleInput = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(value);
  };

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.setItem('searchQuery', searchQuery.trim());
    onSearch(searchQuery.trim());
  };

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div>
      <form className={styles.form}>
        <input
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
      <button
        onClick={handleError}
        type="button"
        className={styles.buttonError}
      >
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
