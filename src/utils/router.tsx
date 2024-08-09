import { createBrowserRouter } from 'react-router-dom';
import DetailItemPage from '@components/screens/Detail/DetailItem';
import NotFound from '@components/screens/NotFound/NotFound';
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
  {
    path: '*',
    element: <NotFound />,
  },
]);
