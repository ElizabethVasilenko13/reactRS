import { createBrowserRouter } from 'react-router-dom';
import DetailItemPage from '@pages/DetailItemPage/DetailItemPage';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/:id',
        element: <DetailItemPage />,
      },
    ],
  },
]);
