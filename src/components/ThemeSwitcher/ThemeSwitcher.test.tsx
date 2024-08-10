import { screen, fireEvent, render } from '@testing-library/react';
import { useTheme } from '@context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';

jest.mock('@context/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeSwitcher Component', () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with light theme', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light', toggleTheme: mockToggleTheme });

    render(<ThemeSwitcher />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test('renders correctly with dark theme', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark', toggleTheme: mockToggleTheme });

    render(<ThemeSwitcher />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('toggles theme when clicked', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light', toggleTheme: mockToggleTheme });

    render(<ThemeSwitcher />);

    fireEvent.click(screen.getByRole('checkbox'));

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
