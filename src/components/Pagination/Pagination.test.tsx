import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { customRoutingRender } from '@utils/test-utils';
import Pagination from './Pagination';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

describe('Pagination Component', () => {
  const setSearchParams = jest.fn();

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(), setSearchParams]);
  });

  test('increase page num and chnage URL query parameter when page changes', () => {
    const handlePageChange = jest.fn();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Pagination currentPage={1} onPageChange={handlePageChange} isLastPage={false} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('>'));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
  test('decrease page num and chnage URL query parameter when page changes', () => {
    const handlePageChange = jest.fn();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Pagination currentPage={2} onPageChange={handlePageChange} isLastPage={false} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('<'));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });
  test('disables < button on the first page', () => {
    customRoutingRender(<Pagination currentPage={1} onPageChange={jest.fn()} isLastPage={false} />);
    expect(screen.getByText('<')).toBeDisabled();
  });
  test('disables > button on the last page', () => {
    customRoutingRender(<Pagination currentPage={1} onPageChange={jest.fn()} isLastPage />);
    expect(screen.getByText('>')).toBeDisabled();
  });
});
