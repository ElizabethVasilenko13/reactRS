import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@utils/test-utils';
import { selectedCardsState } from '../../__mocks__/selectedCards';
import Flyout from './Flyout';

jest.mock('@utils/convert-to-CSV', () => ({
  convertToCSV: jest.fn(() => 'mocked-csv-url'),
}));

describe('Flyout Component', () => {
  test('does not render when no cards are selected', () => {
    renderWithProviders(<Flyout />, {
      preloadedState: {
        cards: {
          selectedCards: {},
        },
      },
    });
    expect(screen.queryByText('Unselect All')).toBeNull();
  });

  test('render when card is selected', async () => {
    renderWithProviders(<Flyout />, {
      preloadedState: {
        cards: {
          selectedCards: selectedCardsState,
        },
      },
    });
    expect(screen.queryByText('Unselect All')).toBeInTheDocument();
    expect(screen.queryByText('2 items selected')).toBeInTheDocument();
  });

  test('dispatches unselectAll action on button click', () => {
    const { store } = renderWithProviders(<Flyout />, {
      preloadedState: {
        cards: {
          selectedCards: selectedCardsState,
        },
      },
    });

    fireEvent.click(screen.getByText('Unselect All'));
    expect(store.getState().cards.selectedCards).toEqual({});
  });

  test('download link updates filename for multiple cards', () => {
    renderWithProviders(<Flyout />, {
      preloadedState: {
        cards: {
          selectedCards: selectedCardsState,
        },
      },
    });

    const downloadLink = screen.getByText('Download') as HTMLAnchorElement;
    expect(downloadLink.href.endsWith('mocked-csv-url')).toBe(true);
    expect(downloadLink.download).toBe('2_characters.csv');
  });
});
