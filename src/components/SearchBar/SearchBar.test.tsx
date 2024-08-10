import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@utils/test-utils';
import { saveLocalStorageData } from '@utils/local-storage';
import SearchBar from './SearchBar';

jest.mock('@utils/local-storage', () => ({
  getLocalStorageData: jest.fn((_, defaultValue) => defaultValue),
  saveLocalStorageData: jest.fn(),
}));

describe('SearchBar Component', () => {
  const onSearchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('process Search button click', () => {
    renderWithProviders(<SearchBar onSearch={onSearchMock} />);

    const inputElement = screen.getByTestId('search-input');
    const searchButton = screen.getByText('Search');
    fireEvent.change(inputElement, { target: { value: 'testQuery' } });
    fireEvent.click(searchButton);
    expect(onSearchMock).toHaveBeenCalledWith({ page: 1 });
    expect(saveLocalStorageData).toHaveBeenCalledWith('searchQuery', 'testQuery');
  });

  // test('shows error on error button click', () => {
  //   renderWithProviders(<SearchBar onSearch={onSearchMock} />);

  //   const errorButton = screen.getByText('Show Error');
  //   expect(() => fireEvent.click(errorButton)).toThrow('I crashed!');
  // });
});
