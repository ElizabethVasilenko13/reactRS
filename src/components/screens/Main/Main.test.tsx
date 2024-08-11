import { render, screen } from '@testing-library/react';
import { mockSearchResults } from '__mocks__/serachResult';
import Main from './Main';

jest.mock('@components/SearchResults/SearchResults', () => () => <div>SearchResults</div>);

describe('Main Component', () => {
  test('renders all child components correctly', () => {
    render(<Main charactersData={mockSearchResults} />);

    expect(screen.getByText(/SearchResults/i)).toBeInTheDocument();
  });
});
