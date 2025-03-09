import { describe, it, expect } from 'vitest';
import { render, screen } from './test/test-utils';
import { HomePage } from './pages/Home';
import { AboutPage } from './pages/About';
import { NotFoundPage } from './pages/NotFound';
import { MainLayout } from './components/layout/MainLayout';

describe('App Components', () => {
  describe('Pages', () => {
    it('renders home page content', () => {
      render(<HomePage />);
      expect(screen.getByRole('heading', { name: /welcome to our app/i })).toBeInTheDocument();
    });

    it('renders about page content', () => {
      render(<AboutPage />);
      expect(screen.getByRole('heading', { name: /about us/i })).toBeInTheDocument();
    });

    it('renders not found page content', () => {
      render(<NotFoundPage />);
      expect(screen.getByRole('heading', { name: /404 - page not found/i })).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders main layout with navigation', () => {
      render(<MainLayout />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    });
  });

  describe('Routing', () => {
    it('renders correct content for routes', () => {
      render(<></>, { useRoutes: true, initialEntries: ['/'] });
      expect(screen.getByRole('heading', { name: /welcome to our app/i })).toBeInTheDocument();

      render(<></>, { useRoutes: true, initialEntries: ['/about'] });
      expect(screen.getByRole('heading', { name: /about us/i })).toBeInTheDocument();

      render(<></>, { useRoutes: true, initialEntries: ['/unknown'] });
      expect(screen.getByRole('heading', { name: /404 - page not found/i })).toBeInTheDocument();
    });
  });
});
