import { RouteObject } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}

export const routes: RouteObject[] = [
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
];
