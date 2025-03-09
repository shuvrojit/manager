import { render, RenderOptions } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { ReactElement } from 'react';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { ...options });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render, screen };
