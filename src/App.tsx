import { useEffect, useState } from 'react';
import Loader from '@shared/Loader/Loader';
import { MovieApiResp } from '@models/movie-api.interface';
import SearchBar from '@components/SearchBar/SearchBar';
import SearchResults from '@components/SearchResults/SearchResults';
import { fetchData } from '@services/fetchApi';
import { MOVIES_API_URL, MOVIES_TITLE_SEARCH_ENDPOINT } from '@constants/api.constants';
import { useLocalStorage } from '@hooks/useLocalStorage';

const App: React.FC = () => {
  const [searchResult, setSearchResult] = useState<MovieApiResp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [localStorageData, setLocalStorageData] = useLocalStorage('searchQuery', '');

  useEffect(() => {
    fetchSearchResultsAndUpdateState(localStorageData);
  }, [localStorageData]);

  const handleSearch = (searchQuery: string) => {
    setLoading(true);
    setLocalStorageData(searchQuery);
    fetchSearchResultsAndUpdateState(searchQuery);
  };

  const fetchSearchResultsAndUpdateState = (searchQuery: string) => {
    const apiUrl =
      searchQuery.length > 0
        ? `${MOVIES_API_URL}${MOVIES_TITLE_SEARCH_ENDPOINT}${searchQuery}?exact=false&titleType=movie`
        : `${MOVIES_API_URL}titles`;
    fetchData(apiUrl).then((data) => {
      setSearchResult(data.results);
      setLoading(false);
    });
  };

  return (
    <div className="app-container">
      <h1>Movies</h1>
      <SearchBar onSearch={handleSearch} startSearchQuery={localStorageData} />
      {loading ? <Loader /> : <SearchResults searchResult={searchResult} />}
    </div>
  );
};

export default App;
