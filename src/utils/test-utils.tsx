import { render } from '@testing-library/react';
import { ContextTheme, ThemeContext } from '@context/ThemeContext';

import { configureStore } from '@reduxjs/toolkit';
import { AppStore, rootReducer, RootState } from '@store/store';
import { Provider } from 'react-redux';
import { ReactElement } from 'react';

const testStore = (state: Partial<RootState>): AppStore => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: state,
  });
};

interface ExtendedRenderOptions {
  preloadedState?: RootState | object;
  store?: AppStore;
  themeProviderProps?: ContextTheme;
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = testStore(preloadedState),
    themeProviderProps = { theme: 'light', toggleTheme: jest.fn() },
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <ThemeContext.Provider value={themeProviderProps}>{children}</ThemeContext.Provider>
    </Provider>
  );

  const renderResult = render(ui, { wrapper: Wrapper, ...renderOptions });

  return {
    ...renderResult,
    store,
  };
};
