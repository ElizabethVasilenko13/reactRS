import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@utils/test-utils';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SearchBar Component', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      pathname: '/test',
      query: { name: '' },
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

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/test',
      query: { page: 1, name: 'test query' },
    });
  });

  test('sets input value from URL query on mount', () => {
    mockUseRouter.mockReturnValue({
      pathname: '/test',
      query: { name: 'initial query' },
      push: mockPush,
    });

    renderWithProviders(<SearchBar />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    expect(input.value).toBe('initial query');
  });
});
