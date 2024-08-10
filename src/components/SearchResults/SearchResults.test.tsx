import { screen } from '@testing-library/react';
import { customRoutingRender } from '@utils/test-utils';
import { mockSearchResults } from '../../__mocks__/serachResult';
import SearchResults from './SearchResults';

describe('SearchResult Component', () => {
  test('renders the specified number of cards', () => {
    customRoutingRender(<SearchResults searchResult={mockSearchResults} />);
    const cards = screen.getAllByRole('button');
    expect(cards).toHaveLength(mockSearchResults.length);
  });
  test('displays an appropriate message if no cards are present', () => {
    customRoutingRender(<SearchResults searchResult={[]} />);
    const message = screen.getByText(/Oops, something went wrong.../i);
    expect(message).toBeInTheDocument();
  });
});
