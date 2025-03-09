import { RouteObject } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/Home';
import { AboutPage } from './pages/About';
import { NotFoundPage } from './pages/NotFound';

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];
