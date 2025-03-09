import { describe, it, expect } from 'vitest';
import { render, screen } from './test/test-utils';
import App from './App';

describe('App', () => {
  it('renders welcome message', () => {
    render(<App />);

    // Using getByRole is preferred for better accessibility testing
    const heading = screen.getByRole('heading', { name: /welcome to react/i });

    expect(heading).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  // Example of testing CSS
  it('is visible', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /welcome to react/i });
    expect(heading).toBeVisible();
  });
});
