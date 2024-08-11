import { fireEvent, screen, waitFor } from '@testing-library/react';
import { mockSearchResults } from '__mocks__/serachResult';
import { renderWithProviders } from '@utils/test-utils';
import { useRouter, useSearchParams } from 'next/navigation';
import DetailItemPage from './DetailItem';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockCharacterInfo = mockSearchResults[0];

describe('DetailItemPage Component', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });
    mockUseSearchParams.mockReturnValue(new URLSearchParams({ id: '123' }));
  });

  test('renders character data correctly', () => {
    renderWithProviders(<DetailItemPage characterData={mockCharacterInfo} />);

    expect(screen.getByText(mockCharacterInfo.name)).toBeInTheDocument();
    expect(screen.getByTestId('species')).toHaveTextContent(`Species: ${mockCharacterInfo.species}`);
    expect(screen.getByTestId('gender')).toHaveTextContent(`Gender: ${mockCharacterInfo.gender}`);
    expect(screen.getByTestId('location')).toHaveTextContent(`Location: ${mockCharacterInfo.location.name}`);
    expect(screen.getByTestId('status')).toHaveTextContent(`Status: ${mockCharacterInfo.status}`);
  });

  test('displays a message when no character data is provided', () => {
    renderWithProviders(<DetailItemPage characterData={undefined} />);

    expect(screen.getByText(/No additional data about this character/i)).toBeInTheDocument();
  });

  test('closes the detail page when clicking outside', async () => {
    renderWithProviders(<DetailItemPage characterData={mockCharacterInfo} />);

    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/?');
    });
  });

  test('applies theme styles correctly', () => {
    renderWithProviders(<DetailItemPage characterData={mockCharacterInfo} />);

    const detailPage = screen.getByTestId('detail-page');
    expect(detailPage).toHaveClass('light');
  });

  test('closes the detail page when close button is clicked', () => {
    renderWithProviders(<DetailItemPage characterData={mockCharacterInfo} />);

    const closeButton = screen.getByTestId('close-btn');
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith('/?');
  });
});
