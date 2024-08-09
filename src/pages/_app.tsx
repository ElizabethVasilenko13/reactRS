import type { AppProps } from "next/app";
import ErrorBoundary from '@shared/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from '@context/ThemeContext';
import '@styles/index.scss';
import { wrapper } from '@store/store';
import { Provider } from 'react-redux';

const App = ({Component, ...rest}: AppProps) =>  {
  const {store, props} = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ErrorBoundary>
            <ThemeProvider>
            <Component {...props.pageProps} />

        </ThemeProvider>
    </ErrorBoundary>
    </Provider>
  );
}

export default App;
