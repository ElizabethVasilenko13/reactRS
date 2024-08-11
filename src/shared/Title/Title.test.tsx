import { screen } from '@testing-library/react';
import { renderWithProviders } from '@utils/test-utils';
import Title from './Title';

describe('Title Component', () => {
  test('renders the correct HTML tag based on the level prop', () => {
    const { container } = renderWithProviders(
      <div>
        <Title title="Heading 1" level={1} />
        <Title title="Heading 2" level={2} />
        <Title title="Heading 3" level={3} />
        <Title title="Heading 4" level={4} />
        <Title title="Heading 5" level={5} />
        <Title title="Heading 6" level={6} />
      </div>
    );

    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(container.querySelector('h3')).toBeInTheDocument();
    expect(container.querySelector('h4')).toBeInTheDocument();
    expect(container.querySelector('h5')).toBeInTheDocument();
    expect(container.querySelector('h6')).toBeInTheDocument();
  });

  test('applies the correct theme-based CSS class', () => {
    const { container } = renderWithProviders(<Title title="Theme Title" level={1} />);

    const header = container.querySelector('h1');
    expect(header).toHaveClass('header');
    expect(header).toHaveClass('light');
  });

  test('applies the color style from the color prop', () => {
    renderWithProviders(<Title title="Colored Title" level={1} color="red" />);

    const header = screen.getByText(/Colored Title/i);
    expect(header).toHaveStyle('color: red');
  });

  test('renders the title text correctly', () => {
    renderWithProviders(<Title title="Test Title" level={1} />);

    const header = screen.getByText(/Test Title/i);
    expect(header).toBeInTheDocument();
  });
});
