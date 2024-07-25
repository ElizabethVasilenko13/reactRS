import { useEffect, useState } from 'react';
import Loader from '@shared/Loader/Loader';
import SearchBar from '@components/SearchBar/SearchBar';
import SearchResults from '@components/SearchResults/SearchResults';
import Pagination from '@components/Pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import { usersApi } from '@store/api/cardsApi';
import { useAppSelector } from '@store/store';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  const baseSearchQuery = useAppSelector((state) => state.search.searchCharacterTerm);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageParam = parseInt(searchParams.get('page') || '1', 10);
  const [pagination, setPagination] = useState({ page: currentPageParam, totalPages: currentPageParam });

  const { data: cardsData, isFetching: cardsFetching } = usersApi.useGetCardsQuery({
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

  const updatePage = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearch = (params: { page: number }) => {
    updatePage(params.page);
  };

  const handlePageChange = (params: { page: number }) => {
    updatePage(params.page);
  };

  return (
    <>
      <h1>Rick and Morty</h1>
      <SearchBar onSearch={handleSearch} />
      {cardsFetching ? (
        <Loader />
      ) : (
        <>
          <Pagination pageInfo={pagination} onPageChange={handlePageChange} />
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
