import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from '@components/errorBoundary';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from '@utils/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
