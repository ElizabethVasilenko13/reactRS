import { MovieApiResp } from '@models/movie-api.interface';
import { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Loader from './shared/Loader/Loader';

interface AppState {
  searchResult: MovieApiResp[];
  loading: boolean;
}
class App extends Component<AppState> {
  state: AppState = {
    searchResult: [],
    loading: true,
  };

  private startSearchQuery: string = '';

  componentDidMount() {
    this.startSearchQuery = localStorage.getItem('searchQuery') || '';
    if (this.startSearchQuery.length > 0) {
      this.fetchSearchResultsAndUpdateState(this.startSearchQuery);
    }
  }

  handleSearch = (searchQuery: string) => {
    console.log(searchQuery);
    this.setState({ loading: true });
    this.fetchSearchResultsAndUpdateState(searchQuery);
  };

  fetchSearchResultsAndUpdateState = (searchQuery: string) => {
    // fetchSearchResults(searchQuery).then((data) => {
    //   this.setState({ searchResult: data, loading: false });
    // });
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
