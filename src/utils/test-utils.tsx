import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const customRoutingRender = (ui: ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper: MemoryRouter, ...options });
};

export * from '@testing-library/react';

export { customRoutingRender };
