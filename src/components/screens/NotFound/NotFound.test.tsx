import { screen } from '@testing-library/react';
import { renderWithProviders } from '@utils/test-utils';
import { cloneElement, ReactElement } from 'react';
import { useSearchParams } from 'next/navigation';
import NotFoundPage from './NotFound';

jest.mock(
  'next/link',
  () =>
    ({ children, ...rest }: { children: ReactElement }) =>
      cloneElement(children, { ...rest })
);

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

describe('NotFoundPage Component', () => {
  test('renders the correct title texts', () => {
    renderWithProviders(<NotFoundPage />);

    expect(screen.getByText(/Have lost in space\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Click on the portal to get back home/i)).toBeInTheDocument();
  });

  test('the portal link directs to the home page with current search parameters', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('foo=bar'));

    renderWithProviders(<NotFoundPage />);

    const linkElement = screen.getByTestId('link');
    expect(linkElement).toHaveAttribute('href', '/?foo=bar');
  });
});
