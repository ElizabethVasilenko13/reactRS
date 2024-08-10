import { screen } from '@testing-library/react';
import { renderWithProviders } from '@utils/test-utils';
import { mockSearchResults } from '../../__mocks__/serachResult';
import SearchResults from './SearchResults';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SearchResult Component', () => {
  test('renders the specified number of cards', () => {
    renderWithProviders(<SearchResults searchResult={mockSearchResults} />);
    const cards = screen.getAllByRole('button');
    expect(cards).toHaveLength(mockSearchResults.length);
  });
  test('displays an appropriate message if no cards are present', () => {
    renderWithProviders(<SearchResults searchResult={[]} />);
    const message = screen.getByText(/Oops, something went wrong.../i);
    expect(message).toBeInTheDocument();
  });
});
