/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Theme, ThemeContext } from '@context/ThemeContext';
import { Provider } from 'react-redux';
import { setupStore, store as defaultStore } from '@store/store';

// Define a type for extended render options, including optional store and preloadedState
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: any;
  store?: any;
  providerProps?: { theme: Theme; toggleTheme: () => void };
}

const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    providerProps = { theme: 'light', toggleTheme: jest.fn() },
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  return render(
    <Provider store={store}>
      <ThemeContext.Provider value={providerProps}>{ui}</ThemeContext.Provider>
    </Provider>,
    renderOptions
  );
};

const customRoutingRender = (
  ui: ReactElement,
  { providerProps = { theme: 'light', toggleTheme: jest.fn() }, ...renderOptions }: ExtendedRenderOptions = {}
) => {
  return render(
    <Provider store={defaultStore}>
      <ThemeContext.Provider value={providerProps}>
        <MemoryRouter>{ui}</MemoryRouter>
      </ThemeContext.Provider>
    </Provider>,
    renderOptions
  );
};

const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    providerProps = { theme: 'light', toggleTheme: jest.fn() },
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <ThemeContext.Provider value={providerProps}>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeContext.Provider>
    </Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export * from '@testing-library/react';
export { customRender, customRoutingRender, renderWithProviders };
