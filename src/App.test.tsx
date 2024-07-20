import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DetailItemPage from '@pages/DetailItemPage/DetailItemPage';

// test('Renders the App', async () => {
//   await act(async () => {
//     render(
//       <MemoryRouter>
//         <App />
//       </MemoryRouter>
//     );
//   });
// });

test('Renders the main page', () => {
  render(
    <MemoryRouter>
      <DetailItemPage />
    </MemoryRouter>
  );

  const textElement = screen.getByText(/item/i);
  expect(textElement).toBeInTheDocument();
});
