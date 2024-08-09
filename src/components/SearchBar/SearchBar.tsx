import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useTheme } from '@context/ThemeContext';
import classNames from 'classnames';
import styles from './SearchBar.module.scss';
import { useRouter } from 'next/router';


const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const { theme } = useTheme();
  const router = useRouter();

  const queryName = router.query.name as string ?? '';

  useEffect(() => {
    if (queryName) {
      setSearchQuery(queryName);
    }
  }, [queryName]);

  const handleInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(value);
  };

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, name: searchQuery },
    });
  };

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div className={classNames(styles.container, styles[theme])}>
      <form>
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
