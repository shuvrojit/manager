import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { ReactElement } from 'react';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../routes';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
  useRoutes?: boolean;
}

const customRender = (
  ui: ReactElement,
  { initialEntries = ['/'], useRoutes = false, ...options }: CustomRenderOptions = {}
) => {
  if (useRoutes) {
    const router = createMemoryRouter(routes, { initialEntries });
    return rtlRender(<RouterProvider router={router} />, options);
  }

  // For testing individual components without the full routing setup
  return rtlRender(<MemoryRouter>{ui}</MemoryRouter>, options);
};

/* eslint-disable react-refresh/only-export-components */
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render, screen };
