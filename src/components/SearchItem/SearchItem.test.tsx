import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@utils/test-utils';
import { useRouter } from 'next/router';
import SearchItem from './SearchItem';
import { mockSearchResults } from '../../__mocks__/serachResult';

const mockData = mockSearchResults[0];

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SearchItem Component', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      pathname: '/',
      query: {},
      push: mockPush,
    });
  });

  test('renders character info and checkbox correctly', () => {
    renderWithProviders(<SearchItem item={mockData} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /character/i })).toHaveAttribute('src', mockData.image);
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
  });

  test('navigates to the correct route on item click', () => {
    renderWithProviders(<SearchItem item={mockData} />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: `/${mockData.id}`,
      query: {},
    });
  });

  test('applies correct theme-based styling', () => {
    renderWithProviders(<SearchItem item={mockData} />);

    expect(screen.getByRole('button')).toHaveClass('light');
  });
});
