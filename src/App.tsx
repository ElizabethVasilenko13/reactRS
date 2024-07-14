import { Component } from 'react';
import Loader from '@shared/Loader/Loader';
import { MovieApiResp } from '@models/movie-api.interface';
import SearchBar from '@components/SearchBar/SearchBar';
import SearchResults from '@components/SearchResults/SearchResults';
import { fetchData } from '@services/fetchApi';
import {
  MOVIES_API_URL,
  MOVIES_TITLE_SEARCH_ENDPOINT,
} from '@constants/api.constants';

interface AppState {
  searchResult: MovieApiResp[];
  loading: boolean;
}
class App extends Component<unknown, AppState> {
  state: AppState = {
    searchResult: [],
    loading: true,
  };

  private startSearchQuery: string = '';

  componentDidMount() {
    this.startSearchQuery = localStorage.getItem('searchQuery') || '';
    this.fetchSearchResultsAndUpdateState(this.startSearchQuery);
  }

  handleSearch = (searchQuery: string) => {
    this.setState({ loading: true });
    this.fetchSearchResultsAndUpdateState(searchQuery);
  };

  fetchSearchResultsAndUpdateState = (searchQuery: string) => {
    const apiUrl =
      searchQuery.length > 0
        ? `${MOVIES_API_URL}${MOVIES_TITLE_SEARCH_ENDPOINT}${searchQuery}?exact=false&titleType=movie`
        : `${MOVIES_API_URL}titles`;
    fetchData(apiUrl).then((data) => {
      this.setState({ searchResult: data.results, loading: false });
    });
  };

  render() {
    const { searchResult, loading } = this.state;
    return (
      <div className="app-container">
        <h1>Movies</h1>
        <SearchBar
          onSearch={this.handleSearch}
          startSearchQuery={this.startSearchQuery}
        />
        {loading ? <Loader /> : <SearchResults searchResult={searchResult} />}
      </div>
    );
  }
}

export default App;
