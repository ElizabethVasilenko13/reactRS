import { fireEvent, screen } from '@testing-library/react';
import { customRoutingRender } from '@utils/test-utils';
import SearchItem from './SearchItem';
import { mockSearchResults } from '../../__mocks__/serachResult';

const mockedUsedNavigate = jest.fn();
const mockData = mockSearchResults[0];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('SearchItem Component', () => {
  test('renders the relevant card data', () => {
    customRoutingRender(<SearchItem item={mockData} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText(/Character/i)).toHaveAttribute('src', mockData.image);
  });
  test('clicking on a card opens a detailed card component', () => {
    customRoutingRender(<SearchItem item={mockData} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockedUsedNavigate).toHaveBeenCalledWith(`/${mockData.id}`);
  });
});
