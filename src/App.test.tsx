import { describe, it, expect } from 'vitest';
import { render, screen } from './test/test-utils';
import { routes } from './routes';

describe('App Routing', () => {
  it('renders home page at root route', () => {
    render(<>{routes[0].element}</>, { initialEntries: ['/'] });
    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
  });

  it('renders about page at /about route', () => {
    render(<>{routes[1].element}</>, { initialEntries: ['/about'] });
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  it('renders not found page for unknown routes', () => {
    render(<>{routes[2].element}</>, { initialEntries: ['/unknown'] });
    expect(screen.getByRole('heading', { name: /not found/i })).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<>{routes[0].element}</>, { initialEntries: ['/'] });
    expect(container).toMatchSnapshot();
  });
});
