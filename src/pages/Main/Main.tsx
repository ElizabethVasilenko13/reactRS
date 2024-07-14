import { useEffect, useState } from 'react';
import Loader from '@shared/Loader/Loader';
import { MovieApiResp } from '@models/movie-api.interface';
import SearchBar from '@components/SearchBar/SearchBar';
import SearchResults from '@components/SearchResults/SearchResults';
import { fetchData } from '@services/fetchApi';
import { MOVIES_API_URL, MOVIES_TITLE_SEARCH_ENDPOINT } from '@constants/api.constants';
import { useLocalStorage } from '@hooks/useLocalStorage';
import Pagination from '@components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

const Main: React.FC = () => {
  const [searchResult, setSearchResult] = useState<MovieApiResp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [localStorageData, setLocalStorageData] = useLocalStorage('searchQuery', '');
  const [isLastPage, setIsLastPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPageParam = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState<number>(currentPageParam);

  useEffect(() => {
    fetchSearchResultsAndUpdateState(localStorageData, currentPage);
    setSearchParams({ query: localStorageData, page: currentPage.toString() });
  }, [localStorageData, currentPage, setSearchParams]);

  const handleSearch = (searchQuery: string) => {
    setLocalStorageData(searchQuery);
    fetchSearchResultsAndUpdateState(searchQuery, currentPage);
    setCurrentPage(1);
  };

  const fetchSearchResultsAndUpdateState = (searchQuery: string, page: number) => {
    setLoading(true);
    const apiUrl =
      searchQuery.length > 0
        ? `${MOVIES_API_URL}${MOVIES_TITLE_SEARCH_ENDPOINT}${searchQuery}?exact=false&titleType=movie&page=${page}`
        : `${MOVIES_API_URL}titles?page=${page}`;
    fetchData(apiUrl).then((data) => {
      setSearchResult(data.results);
      console.log(data);
      setLoading(false);
      if (!data.next) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    });
  };

  return (
    <>
      <h1>Movies</h1>
      <SearchBar onSearch={handleSearch} startSearchQuery={localStorageData} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Pagination currentPage={currentPage} onPageChange={setCurrentPage} isLastPage={isLastPage} />
          <SearchResults searchResult={searchResult} />
        </>
      )}
    </>
  );
};

export default Main;
