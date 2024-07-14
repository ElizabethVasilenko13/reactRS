import { useEffect, useState } from 'react';
import Loader from '@shared/Loader/Loader';
import { MovieApiResp } from '@models/movie-api.interface';
import SearchBar from '@components/SearchBar/SearchBar';
import SearchResults from '@components/SearchResults/SearchResults';
import { fetchData } from '@services/fetchApi';
import {
  MOVIES_API_URL,
  MOVIES_TITLE_SEARCH_ENDPOINT,
} from '@constants/api.constants';

const App: React.FC = () => {
  const [searchResult, setSearchResult] = useState<MovieApiResp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [startSearchQuery, setStartSearchQuery] = useState<string>('');

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchQuery') || '';
    setStartSearchQuery(savedSearchQuery);
    fetchSearchResultsAndUpdateState(savedSearchQuery);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setLoading(true);
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
      <SearchBar onSearch={handleSearch} startSearchQuery={startSearchQuery} />
      {loading ? <Loader /> : <SearchResults searchResult={searchResult} />}
    </div>
  );
};

export default App;
