import CountryFetcher from '@api/CountryFetcher';
import { store } from '@store/store';
import { router } from '@utils/router';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <CountryFetcher />
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
