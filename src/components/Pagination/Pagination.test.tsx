import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@utils/test-utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from './Pagination';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Pagination Component', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  const pageInfo = {
    count: 10,
    pages: 2,
    next: 'url',
    prev: null,
  };

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUsePathname.mockReturnValue('/test');
    mockUseSearchParams.mockReturnValue(new URLSearchParams({ page: '1' }));
  });

  test('increases page number and changes URL query parameter when > button is clicked', () => {
    renderWithProviders(<Pagination pageInfo={pageInfo} />);

    fireEvent.click(screen.getByText('>'));
    expect(mockPush).toHaveBeenCalledWith('/test?page=2');
  });

  test('decreases page number and changes URL query parameter when < button is clicked', () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams({ page: '2' }));

    renderWithProviders(<Pagination pageInfo={{ ...pageInfo, pages: 2 }} />);

    fireEvent.click(screen.getByText('<'));
    expect(mockPush).toHaveBeenCalledWith('/test?page=1');
  });

  test('disables < button on the first page', () => {
    renderWithProviders(<Pagination pageInfo={pageInfo} />);
    expect(screen.getByText('<')).toBeDisabled();
  });

  test('disables > button on the last page', () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams({ page: '2' }));

    renderWithProviders(<Pagination pageInfo={{ ...pageInfo, pages: 2 }} />);
    expect(screen.getByText('>')).toBeDisabled();
  });
});
