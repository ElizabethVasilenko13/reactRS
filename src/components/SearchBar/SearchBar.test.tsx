import { fireEvent, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation'; // Updated import path for the latest Next.js
import { renderWithProviders } from '@utils/test-utils';
import SearchBar from './SearchBar';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/test'),
  useSearchParams: jest.fn(() => new URLSearchParams('name=initial query')),
}));

describe('SearchBar Component', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      pathname: '/test',
      push: mockPush,
    });
  });

  test('updates input value when typing', () => {
    renderWithProviders(<SearchBar />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input.value).toBe('test query');
  });

  test('updates URL query parameters when search button is clicked', () => {
    renderWithProviders(<SearchBar />);

    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'test query' } });
    fireEvent.click(screen.getByText('Search'));

    expect(mockPush).toHaveBeenCalledWith('/test?name=test+query&page=1');
  });

  test('sets input value from URL query on mount', () => {
    renderWithProviders(<SearchBar />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    expect(input.value).toBe('initial query');
  });
});
