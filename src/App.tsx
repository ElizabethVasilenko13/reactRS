import { store } from '@store/store';
import { router } from '@utils/router';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
