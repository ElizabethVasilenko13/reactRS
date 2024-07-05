import { ChangeEvent, Component, MouseEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
  startSearchQuery: string;
}

interface SearchBarState {
  searchQuery: string;
  isError?: boolean;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state = {
    searchQuery: this.props.startSearchQuery,
    // isError: false,
  };

  handleInput = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: value });
  };

  handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (searchQuery) {
      localStorage.setItem('searchQuery', searchQuery.trim());
      this.props.onSearch(searchQuery.trim());
    }
  };

  handleError = () => {
    throw new Error('I crashed!');
    // this.setState({ isError: true });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <div>
        <form className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={this.handleInput}
          />
          <button
            onClick={this.handleSearch}
            type="submit"
            className={styles.button}
          >
            Search
          </button>
        </form>
        <button
          onClick={this.handleError}
          type="button"
          className={styles.buttonError}
        >
          Show Error
        </button>
        {/* {isError &&
          (() => {
            throw new Error('I crashed!');
          })()} */}
      </div>
    );
  }
}

export default SearchBar;
