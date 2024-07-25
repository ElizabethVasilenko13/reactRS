import { useEffect, useState } from 'react';
import Loader from '@shared/Loader/Loader';
import SearchBar from '@components/SearchBar/SearchBar';
import SearchResults from '@components/SearchResults/SearchResults';
import { useLocalStorage } from '@hooks/useLocalStorage';
import Pagination from '@components/Pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import { usersApi } from '@store/api/cardsApi';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  const [localStorageData, setLocalStorageData] = useLocalStorage('searchQuery', '');
  const [isLastPage, setIsLastPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPageParam = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState<number>(currentPageParam);

  useEffect(() => {
    setSearchParams({ query: localStorageData, page: currentPage.toString() });
  }, [localStorageData, currentPage, setSearchParams]);

  const handleSearch = (searchQuery: string) => {
    setLocalStorageData(searchQuery);
    setCurrentPage(1);
  };

  const { data: cardsData, isFetching: cardsFetching } = usersApi.useGetCardsQuery({
    name: localStorageData,
    page: currentPage,
  });

  useEffect(() => {
    if (cardsData) {
      setIsLastPage(!cardsData.info.next);
    }
  }, [cardsData]);

  return (
    <>
      <h1>Rick and Morty</h1>
      <SearchBar onSearch={handleSearch} startSearchQuery={localStorageData} />
      {cardsFetching ? (
        <Loader />
      ) : (
        <>
          <Pagination currentPage={currentPage} onPageChange={setCurrentPage} isLastPage={isLastPage} />
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
