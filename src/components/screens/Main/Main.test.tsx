import { render, screen } from '@testing-library/react';
import { mockSearchResults } from '__mocks__/serachResult';
import Main from './Main';

const pageInfo = {
  count: 10,
  pages: 2,
  next: 'url',
  prev: null,
};

jest.mock('@components/SearchBar/SearchBar', () => () => <div>SearchBar</div>);
jest.mock('@components/SearchResults/SearchResults', () => () => <div>SearchResults</div>);
jest.mock('@components/Pagination/Pagination', () => () => <div>Pagination</div>);
jest.mock('@components/Flyout/Flyout', () => () => <div>Flyout</div>);
jest.mock('@components/ThemeSwitcher/ThemeSwitcher', () => () => <div>ThemeSwitcher</div>);

describe('Main Component', () => {
  test('renders all child components correctly', () => {
    render(<Main pageInfo={pageInfo} charactersData={mockSearchResults} />);

    expect(screen.getByText(/SearchBar/i)).toBeInTheDocument();
    expect(screen.getByText(/SearchResults/i)).toBeInTheDocument();
    expect(screen.getByText(/Pagination/i)).toBeInTheDocument();
    expect(screen.getByText(/Flyout/i)).toBeInTheDocument();
    expect(screen.getByText(/ThemeSwitcher/i)).toBeInTheDocument();
  });
});
