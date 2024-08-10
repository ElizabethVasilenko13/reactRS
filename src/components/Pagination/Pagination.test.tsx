import { fireEvent, screen } from '@testing-library/react';
import { customRender } from '@utils/test-utils';
import { Theme } from '@context/ThemeContext';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const handlePageChange = jest.fn();

  const providerProps: { theme: Theme; toggleTheme: () => void } = {
    theme: 'light',
    toggleTheme: jest.fn(),
  };

  const pageInfo = {
    page: 1,
    totalPages: 3,
  };

  test('increase page number and change URL query parameter when page changes', () => {
    customRender(<Pagination pageInfo={pageInfo} onPageChange={handlePageChange} />, { providerProps });

    fireEvent.click(screen.getByText('>'));
    expect(handlePageChange).toHaveBeenCalledWith({ page: 2 });
  });

  test('decrease page number and change URL query parameter when page changes', () => {
    customRender(<Pagination pageInfo={{ ...pageInfo, page: 2 }} onPageChange={handlePageChange} />, { providerProps });

    fireEvent.click(screen.getByText('<'));
    expect(handlePageChange).toHaveBeenCalledWith({ page: 1 });
  });

  test('disables < button on the first page', () => {
    customRender(<Pagination pageInfo={pageInfo} onPageChange={jest.fn()} />, { providerProps });
    expect(screen.getByText('<')).toBeDisabled();
  });

  test('disables > button on the last page', () => {
    customRender(<Pagination pageInfo={{ ...pageInfo, page: 3 }} onPageChange={jest.fn()} />, { providerProps });
    expect(screen.getByText('>')).toBeDisabled();
  });
});
