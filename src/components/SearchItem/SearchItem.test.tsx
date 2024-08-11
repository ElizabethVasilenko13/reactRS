import { screen } from '@testing-library/react';
import { renderWithProviders } from '@utils/test-utils';
import { useRouter } from 'next/navigation';
import SearchItem from './SearchItem';
import { mockSearchResults } from '../../__mocks__/serachResult';

const mockData = mockSearchResults[0];

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => '/'),
}));

describe('SearchItem Component', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      pathname: '/',
      push: mockPush,
    });
  });

  test('renders character info and checkbox correctly', () => {
    renderWithProviders(<SearchItem item={mockData} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /character/i })).toHaveAttribute('src', mockData.image);
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
  });

  test('applies correct theme-based styling', () => {
    renderWithProviders(<SearchItem item={mockData} />);

    expect(screen.getByTestId('link')).toHaveClass('light');
  });
});
