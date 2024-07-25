import { screen, act, waitFor, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { customRoutingRender } from '@utils/test-utils';
import { fetchData } from '@services/fetchApi';
import { mockSearchResults } from '../../__mocks__/serachResult';
import DetailItemPage from './DetailItem';

jest.mock('@services/fetchApi', () => ({
  fetchData: jest.fn() as jest.MockedFunction<typeof fetchData>,
}));

const mockNavigate = jest.fn();

const mockData = mockSearchResults[0];
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '1' }),
  useLocation: () => ({ search: '' }),
}));

describe('DetailItemPage Component', () => {
  beforeEach(() => {
    (fetchData as jest.MockedFunction<typeof fetchData>).mockResolvedValue(mockData);
  });

  test('displays the character data correctly', async () => {
    await act(async () => {
      customRoutingRender(<DetailItemPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
      expect(screen.getByAltText(/character/i)).toHaveAttribute('src', mockData.image);
      expect(screen.getByTestId('species')).toHaveTextContent(mockData.species);
      expect(screen.getByTestId('gender')).toHaveTextContent(mockData.gender);
      expect(screen.getByTestId('location')).toHaveTextContent(mockData.location.name);
      expect(screen.getByTestId('status')).toHaveTextContent(mockData.status);
    });
  });

  test('clicking close button hides the component', async () => {
    await act(async () => {
      customRoutingRender(<DetailItemPage />);
    });

    fireEvent.click(screen.getByRole('button'));

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: '',
    });
  });
});
