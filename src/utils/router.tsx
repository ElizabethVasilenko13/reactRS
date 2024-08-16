import { routes } from '@constants/routes';
import HookForm from '@pages/HookForm/HookForm';
import Main from '@pages/Main/Main';
import UncontrollredForm from '@pages/UncontrollredForm/UncontrollredForm';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: routes.UNCONTROLLED_FORM,
    element: <UncontrollredForm />,
  },
  {
    path: routes.HOOK_FORM,
    element: <HookForm />,
  },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);
