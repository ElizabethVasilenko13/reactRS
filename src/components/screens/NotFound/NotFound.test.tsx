import { screen } from '@testing-library/react';
import { renderWithProviders } from '@utils/test-utils';
import { cloneElement, ReactElement } from 'react';
import NotFoundPage from './NotFound';

jest.mock(
  'next/link',
  () =>
    ({ children, ...rest }: { children: ReactElement }) =>
      cloneElement(children, { ...rest })
);

describe('NotFoundPage Component', () => {
  test('renders the correct title texts', () => {
    renderWithProviders(<NotFoundPage />);

    expect(screen.getByText(/Have lost in space\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Click on the portal to get back home/i)).toBeInTheDocument();
  });

  test('renders images with the appropriate alt texts', () => {
    renderWithProviders(<NotFoundPage />);

    const lostImg = screen.getByAltText('Lost img');
    expect(lostImg).toBeInTheDocument();

    const loaderImg = screen.getByAltText('Portal img');
    expect(loaderImg).toBeInTheDocument();
  });
});
