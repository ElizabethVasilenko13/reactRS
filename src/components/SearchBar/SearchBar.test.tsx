import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const onSearchMock = jest.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  test('process Search button click', () => {
    render(<SearchBar onSearch={onSearchMock} />);

    const inputElement = screen.getByTestId('search-input');
    const searchButton = screen.getByText('Search');
    fireEvent.change(inputElement, { target: { value: 'testQuery' } });
    fireEvent.click(searchButton);
    expect(onSearchMock).toHaveBeenCalledWith('testQuery');
  });
});
