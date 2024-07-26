import { useEffect, useState } from 'react';
import Loader from '@shared/Loader/Loader';
import SearchBar from '@components/SearchBar/SearchBar';
import SearchResults from '@components/SearchResults/SearchResults';
import Pagination from '@components/Pagination/Pagination';
import Flyout from '@components/Flyout/Flyout';
import ThemeSwitcher from '@components/ThemeSwitcher/ThemeSwitcher';
import { Outlet, useSearchParams } from 'react-router-dom';
import { cardsApi } from '@store/api/cardsApi';
import { useAppSelector } from '@store/store';
import { useTheme } from '@context/ThemeContext';
import classNames from 'classnames';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  const baseSearchQuery = useAppSelector((state) => state.search.searchCharacterTerm);
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  const currentPageParam = parseInt(searchParams.get('page') || '1', 10);
  const [pagination, setPagination] = useState({ page: currentPageParam, totalPages: currentPageParam });

  const { data: cardsData, isFetching: cardsFetching } = cardsApi.useGetCardsQuery({
    name: baseSearchQuery,
    page: pagination.page,
  });

  useEffect(() => {
    setSearchParams({ query: baseSearchQuery, page: pagination.page.toString() });
  }, [baseSearchQuery, pagination.page, searchParams]);

  useEffect(() => {
    if (cardsData) {
      setPagination((prev) => ({ ...prev, totalPages: cardsData.info.pages }));
    }
  }, [cardsData]);

  const updatePage = (params: { page: number }) => {
    setPagination((prev) => ({ ...prev, page: params.page }));
  };

  return (
    <>
      <h1 className={classNames(styles.header, styles[theme])}>Rick and Morty</h1>
      <ThemeSwitcher />
      <SearchBar onSearch={updatePage} />
      <Flyout />
      {cardsFetching ? (
        <Loader />
      ) : (
        <>
          <Pagination pageInfo={pagination} onPageChange={updatePage} />
          <div className={styles.container}>
            <SearchResults searchResult={cardsData?.results ?? []} />
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default Main;
