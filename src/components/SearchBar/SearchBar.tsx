'use client';

import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useTheme } from '@context/ThemeContext';
import classNames from 'classnames';
import { usePathname, useSearchParams, useRouter } from 'next/navigation'; // Import hooks from next/navigation
import styles from './SearchBar.module.scss';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const { theme } = useTheme();
  const pathname = usePathname(); // Get the current pathname
  const searchParams = useSearchParams(); // Get search parameters
  const router = useRouter(); // Use the router to navigate

  const queryName = searchParams.get('name') ?? '';

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
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', '1');
    newParams.set('name', searchQuery);
    router.push(`${pathname}?${newParams.toString()}`);
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
