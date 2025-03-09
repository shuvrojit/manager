import { render, RenderOptions } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { ReactElement } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../routes';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
}

const customRender = (
  ui: ReactElement,
  { initialEntries = ['/'], ...options }: CustomRenderOptions = {}
) => {
  const router = createMemoryRouter(routes, { initialEntries });
  return render(<RouterProvider router={router} />, options);
};

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render, screen };
