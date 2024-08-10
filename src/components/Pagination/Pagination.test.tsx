import { fireEvent, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { renderWithProviders } from '@utils/test-utils';
import Pagination from './Pagination';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Pagination Component', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const pageInfo = {
    count: 10,
    pages: 2,
    next: 'url',
    prev: null,
  };

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      pathname: '/test',
      query: { page: 1 },
      push: mockPush,
    });
  });

  test('increase page number and change URL query parameter when page changes', () => {
    renderWithProviders(<Pagination pageInfo={pageInfo} />);

    fireEvent.click(screen.getByText('>'));
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/test',
      query: { page: 2 },
    });
  });

  test('decreases page number and changes URL query parameter when < button is clicked', () => {
    mockUseRouter.mockReturnValue({
      pathname: '/test',
      query: { page: '2' },
      push: mockPush,
    });

    renderWithProviders(<Pagination pageInfo={{ ...pageInfo, pages: 2 }} />);

    fireEvent.click(screen.getByText('<'));
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/test',
      query: { page: 1 },
    });
  });

  test('disables < button on the first page', () => {
    renderWithProviders(<Pagination pageInfo={pageInfo} />);
    expect(screen.getByText('<')).toBeDisabled();
  });

  test('disables > button on the last page', () => {
    mockUseRouter.mockReturnValue({
      pathname: '/test',
      query: { page: 2 },
      push: mockPush,
    });

    renderWithProviders(<Pagination pageInfo={{ ...pageInfo, pages: 2 }} />);
    expect(screen.getByText('>')).toBeDisabled();
  });
});
