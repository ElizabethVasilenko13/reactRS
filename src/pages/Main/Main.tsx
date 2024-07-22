import { useEffect, useState } from 'react';
import Loader from '@shared/Loader/Loader';
import { CharacterInfo, RickAndMortyApiResp } from '@models/rick-and-morty-api.interface';
import SearchBar from '@components/SearchBar/SearchBar';
import SearchResults from '@components/SearchResults/SearchResults';
import { fetchData } from '@services/fetchApi';
import { API_CHARACTER_ENDPOINT, RICK_AND_MORTY_API_URL } from '@constants/api.constants';
import { useLocalStorage } from '@hooks/useLocalStorage';
import Pagination from '@components/Pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  const [searchResult, setSearchResult] = useState<CharacterInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [localStorageData, setLocalStorageData] = useLocalStorage('searchQuery', '');
  const [isLastPage, setIsLastPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPageParam = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState<number>(currentPageParam);

  useEffect(() => {
    fetchSearchResultsAndUpdateState(localStorageData, currentPage);
    setSearchParams({ query: localStorageData, page: currentPage.toString() });
  }, [localStorageData, currentPage]);

  useEffect(() => {
    setSearchParams({ query: localStorageData, page: currentPage.toString() });
  }, [setSearchParams]);

  const handleSearch = (searchQuery: string) => {
    setLocalStorageData(searchQuery);
    fetchSearchResultsAndUpdateState(searchQuery, currentPage);
    setCurrentPage(1);
  };

  const fetchSearchResultsAndUpdateState = async (searchQuery: string, page: number) => {
    setLoading(true);
    const apiUrl = `${RICK_AND_MORTY_API_URL}${API_CHARACTER_ENDPOINT}?name=${searchQuery}&page=${page}`;

    try {
      const data = await fetchData<RickAndMortyApiResp>(apiUrl);

      if (typeof data === 'string' || data instanceof Error) {
        console.error(data);
        setLoading(false);
        return;
      }

      setSearchResult(data.results);
      setLoading(false);

      if (!data.info.next) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Rick and Morty</h1>
      <SearchBar onSearch={handleSearch} startSearchQuery={localStorageData} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Pagination currentPage={currentPage} onPageChange={setCurrentPage} isLastPage={isLastPage} />
          <div className={styles.container}>
            <SearchResults searchResult={searchResult} />
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default Main;
